import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Constants
const MAX_PROMPT_LENGTH = 5000
const MAX_TOKENS = 4000
const TEMPERATURE = 0.7
const REQUEST_TIMEOUT = 30000 // 30 seconds

// Types
interface APIResponse {
  html?: string
  error?: string
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

// Validation schemas
const SUPPORTED_PROVIDERS = ['openai', 'gemini'] as const
type Provider = typeof SUPPORTED_PROVIDERS[number]

// Optimized system prompt (cached)
const SYSTEM_PROMPT = `You are an expert HTML email developer. Generate a complete, production-ready HTML email based on the user's request.

CRITICAL REQUIREMENTS:
1. Return ONLY the HTML code - no explanations, no markdown, no code blocks
2. Use inline CSS only (no external stylesheets or <style> tags in head)
3. Make it fully responsive for all devices (mobile-first approach)
4. Use email-safe HTML tags and attributes only
5. Include proper DOCTYPE and meta tags for email clients
6. Use tables for layout structure (required for email compatibility)
7. Include alt text for all images
8. Use web-safe fonts with fallbacks
9. Test-friendly colors and sufficient contrast
10. Compatible with major email clients (Gmail, Outlook, Apple Mail, etc.)

EMAIL STRUCTURE:
- Proper HTML5 DOCTYPE
- Meta viewport and charset tags
- Table-based layout with proper spacing
- Inline CSS for all styling
- Professional typography and color scheme
- Clear call-to-action buttons if needed
- Mobile-responsive design

Generate the email based on this request:`

// Error factory
const createError = (message: string, status: number): NextResponse<APIResponse> =>
  NextResponse.json({ error: message }, { status })

// Input validation
const validateInput = (prompt: unknown, provider: unknown) => {
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    throw createError('Prompt is required and must be a non-empty string.', 400)
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    throw createError(`Prompt is too long. Please keep it under ${MAX_PROMPT_LENGTH} characters.`, 400)
  }

  if (!SUPPORTED_PROVIDERS.includes(provider as Provider)) {
    throw createError(`Invalid AI provider. Supported providers: ${SUPPORTED_PROVIDERS.join(', ')}`, 400)
  }

  return { prompt: prompt.trim(), provider: provider as Provider }
}

// API key validation
const validateAPIKeys = (provider: Provider) => {
  const apiKey = provider === 'openai' ? process.env.OPENAI_API_KEY : process.env.GEMINI_API_KEY
  
  if (!apiKey) {
    const envVar = provider === 'openai' ? 'OPENAI_API_KEY' : 'GEMINI_API_KEY'
    throw createError(`${provider.toUpperCase()} API key is not configured. Please add ${envVar} to your environment variables.`, 500)
  }
  
  return apiKey
}

// Fetch with timeout utility
const fetchWithTimeout = async (url: string, options: RequestInit): Promise<Response> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw createError('Request timeout. Please try again.', 408)
    }
    throw error
  }
}

// OpenAI API call
const callOpenAI = async (prompt: string, apiKey: string): Promise<string> => {
  const response = await fetchWithTimeout('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('OpenAI API Error:', errorData)
    
    switch (response.status) {
      case 429:
        throw createError('Rate limit exceeded. Please try again in a moment.', 429)
      case 401:
        throw createError('Invalid OpenAI API key. Please check your configuration.', 500)
      default:
        throw createError('Failed to generate email from OpenAI service.', 500)
    }
  }

  const data: OpenAIResponse = await response.json()
  return data.choices[0]?.message?.content || ''
}

// Gemini API call
const callGemini = async (prompt: string, apiKey: string): Promise<string> => {
  const response = await fetchWithTimeout('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `${SYSTEM_PROMPT}\n\nUser request: ${prompt}`
        }]
      }],
      generationConfig: {
        temperature: TEMPERATURE,
        maxOutputTokens: MAX_TOKENS,
      }
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('Gemini API Error:', errorData)
    
    switch (response.status) {
      case 429:
        throw createError('Rate limit exceeded. Please try again in a moment.', 429)
      case 401:
      case 403:
        throw createError('Invalid Gemini API key. Please check your configuration.', 500)
      default:
        throw createError('Failed to generate email from Gemini service.', 500)
    }
  }

  const data: GeminiResponse = await response.json()
  return data.candidates[0]?.content?.parts[0]?.text || ''
}

// HTML cleanup utility
const cleanHTML = (html: string): string => {
  let cleaned = html.trim()
  
  // Remove markdown code blocks more efficiently
  if (cleaned.startsWith('```html')) {
    cleaned = cleaned.slice(7).replace(/```\s*$/, '')
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3).replace(/```\s*$/, '')
  }
  
  return cleaned.trim()
}

// Main POST handler
export async function POST(request: NextRequest): Promise<NextResponse<APIResponse>> {
  try {
    // Check authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return createError('Authentication required. Please sign in to generate emails.', 401)
    }

    // Parse request body with error handling
    let body: { prompt?: unknown; provider?: unknown }
    try {
      body = await request.json()
    } catch {
      return createError('Invalid JSON in request body.', 400)
    }

    // Validate input
    const { prompt, provider } = validateInput(body.prompt, body.provider || 'openai')
    
    // Check user's usage limit
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('usage_count, usage_limit')
      .eq('user_id', user.id)
      .single()

    if (subError) {
      console.error('Error fetching subscription:', subError)
      return createError('Failed to check usage limits.', 500)
    }

    if (subscription.usage_count >= subscription.usage_limit) {
      return createError(`Usage limit reached (${subscription.usage_count}/${subscription.usage_limit}). Please upgrade your plan.`, 429)
    }

    // Validate API keys
    const apiKey = validateAPIKeys(provider)

    // Generate HTML based on provider
    let generatedHtml: string
    
    if (provider === 'openai') {
      generatedHtml = await callOpenAI(prompt, apiKey)
    } else {
      generatedHtml = await callGemini(prompt, apiKey)
    }

    // Validate generated content
    if (!generatedHtml) {
      return createError(`No content generated from ${provider} service.`, 500)
    }

    // Clean and return HTML
    const cleanedHtml = cleanHTML(generatedHtml)
    
    // Save template to database
    const templateTitle = prompt.length > 50 ? prompt.substring(0, 50) + '...' : prompt
    
    const { error: templateError } = await supabase
      .from('templates')
      .insert({
        user_id: user.id,
        title: templateTitle,
        prompt: prompt,
        html_content: cleanedHtml,
      })

    if (templateError) {
      console.error('Error saving template:', templateError)
      // Don't fail the request, just log the error
    }

    // Update usage count
    const { error: usageError } = await supabase
      .from('subscriptions')
      .update({ usage_count: subscription.usage_count + 1 })
      .eq('user_id', user.id)

    if (usageError) {
      console.error('Error updating usage count:', usageError)
      // Don't fail the request, just log the error
    }

    return NextResponse.json({ html: cleanedHtml }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json',
      }
    })

  } catch (error) {
    // Handle custom errors (already NextResponse objects)
    if (error instanceof NextResponse) {
      return error
    }

    // Handle unexpected errors
    console.error('API Route Error:', error)
    return createError('An unexpected error occurred while generating the email.', 500)
  }
}

// Handle unsupported methods efficiently
export async function GET(): Promise<NextResponse<APIResponse>> {
  return createError('Method not allowed. Use POST to generate emails.', 405)
}

export async function PUT(): Promise<NextResponse<APIResponse>> {
  return createError('Method not allowed. Use POST to generate emails.', 405)
}

export async function DELETE(): Promise<NextResponse<APIResponse>> {
  return createError('Method not allowed. Use POST to generate emails.', 405)
}

export async function PATCH(): Promise<NextResponse<APIResponse>> {
  return createError('Method not allowed. Use POST to generate emails.', 405)
}