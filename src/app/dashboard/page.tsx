"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemeSelector } from "@/components/theme-selector"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { UserNav } from "@/components/user-nav"
import { TemplateList } from "@/components/template-list"
import { toast } from "sonner"
import PromptForm from "@/components/prompt-form"
import QuickPrompts from "@/components/quick-prompt"
import EmailOutput from "@/components/email-output"
import { useUser } from "@/hooks/use-user"
import { createClient } from "@/lib/supabase/client"
import { Database } from "@/lib/supabase/types"

type Template = Database['public']['Tables']['templates']['Row']

export default function Home() {
  const { user, subscription, refreshProfile } = useUser()
  const [prompt, setPrompt] = useState("")
  const [generatedHtml, setGeneratedHtml] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [aiProvider, setAiProvider] = useState<"openai" | "gemini">("openai")
  const supabase = createClient()

  // Check if user can generate more emails
  const canGenerate = subscription ? subscription.usage_count < subscription.usage_limit : false

  const handleSelectTemplate = (template: Template) => {
    setPrompt(template.prompt)
    setGeneratedHtml(template.html_content)
    toast.success("Template loaded successfully!")
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate your email.")
      return
    }

    if (!user) {
      toast.error("Please sign in to generate emails.")
      return
    }

    if (!canGenerate) {
      toast.error(`You've reached your usage limit of ${subscription?.usage_limit} emails. Please upgrade your plan.`)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), provider: aiProvider }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate email")
      }

      const data = await response.json()
      setGeneratedHtml(data.html)
      
      // Refresh user profile to update usage count
      await refreshProfile()
      
      toast.success("Your HTML email is ready.")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state while user data is being fetched
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center text-center flex-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                AI Email Generator
              </h1>
              <p className="mt-2 text-accent-foreground text-sm md:text-base max-w-xl">
                Generate production-ready HTML emails instantly with GPT-4 & Gemini.
              </p>
              {subscription && (
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Plan: {subscription.plan_type.toUpperCase()}</span>
                  <span>•</span>
                  <span>Usage: {subscription.usage_count}/{subscription.usage_limit}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <UserNav />
              <ThemeCustomizer />
              <ThemeSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Form */}
          <div className="space-y-6">
            <PromptForm
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              aiProvider={aiProvider}
              setAiProvider={setAiProvider}
              canGenerate={canGenerate}
              usageInfo={subscription ? `${subscription.usage_count}/${subscription.usage_limit}` : ''}
            />
            <QuickPrompts setPrompt={setPrompt} />
          </div>

          {/* Middle - Templates */}
          <div className="space-y-6">
            <TemplateList onSelectTemplate={handleSelectTemplate} />
          </div>

          {/* Right - Output */}
          <EmailOutput generatedHtml={generatedHtml} isLoading={isLoading} error={error} />
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EmailCraft AI. All rights reserved.
      </footer>
    </div>
  )
}
