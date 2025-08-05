"use client"

import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemeSelector } from "@/components/theme-selector"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { toast } from "sonner"
import PromptForm from "@/components/prompt-form"
import QuickPrompts from "@/components/quick-prompt"
import EmailOutput from "@/components/email-output"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [generatedHtml, setGeneratedHtml] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [aiProvider, setAiProvider] = useState<"openai" | "gemini">("openai")

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate your email.")
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
      toast.success("Your HTML email is ready.")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center text-center flex-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                AI Email Generator
              </h1>
              <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-xl">
                Generate production-ready HTML emails instantly with GPT-4 & Gemini.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeCustomizer />
              <ThemeSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Form */}
          <div className="space-y-6">
            <PromptForm
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              aiProvider={aiProvider}
              setAiProvider={setAiProvider}
            />
            <QuickPrompts setPrompt={setPrompt} />
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
