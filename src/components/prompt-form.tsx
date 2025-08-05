"use client"

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Sparkles } from 'lucide-react'
import { Label } from './ui/label'

interface PromptFormProps {
    prompt: string
    setPrompt: (prompt: string) => void
    onGenerate: () => void
    isLoading: boolean
    aiProvider: 'openai' | 'gemini'
    setAiProvider: (provider: 'openai' | 'gemini') => void
}

export default function PromptForm({
    prompt,
    setPrompt,
    onGenerate,
    isLoading,
    aiProvider,
    setAiProvider,
}: PromptFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onGenerate()
    }

    return (
        <div className="rounded-lg border bg-background p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* AI Provider */}
                <div>
                    <Label htmlFor="ai-provider" className="block text-sm font-medium mb-2">
                        AI Provider
                    </Label>
                    <Select
                        value={aiProvider}
                        onValueChange={(value: 'openai' | 'gemini') => setAiProvider(value)}
                        disabled={isLoading}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select AI Provider" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                            <SelectItem value="gemini">Google Gemini 2.0</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Prompt Textarea */}
                <div>
                    <Label htmlFor="prompt" className="block text-sm font-medium mb-2">
                        Describe Your Email
                    </Label>
                    <Textarea
                        id="prompt"
                        placeholder="Example: Create a promotional email for our summer sale with a 30% discount code..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[150px] resize-none"
                        disabled={isLoading}
                    />
                    <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>Be as detailed as possible for better results</span>
                        <span>{prompt.length} characters</span>
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading || !prompt.trim()}
                    className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Generating with {aiProvider === 'openai' ? 'GPT-4' : 'Gemini'}...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Generate with {aiProvider === 'openai' ? 'GPT-4' : 'Gemini'}
                        </>
                    )}
                </Button>
            </form>
        </div>
    )
}
