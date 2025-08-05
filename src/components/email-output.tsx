"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Code, AlertCircle, Loader2 } from "lucide-react"
import { EmailCode } from "./email-code"
import { EmailPreview } from "./email-preview"

interface EmailOutputProps {
  generatedHtml: string
  error: string
  isLoading: boolean
}

// ----- Component trạng thái Error -----
function ErrorState({ message }: { message: string }) {
  return (
    <div className="bg-background/70 backdrop-blur-sm rounded-2xl p-8 border border-destructive/30 shadow-sm">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-full">
          <AlertCircle className="w-6 h-6 text-destructive" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-destructive mb-2">Generation Failed</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  )
}

// ----- Component trạng thái Loading -----
function LoadingState() {
  return (
    <div className="bg-background/70 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-sm">
      <div className="flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
        <Loader2 className="w-10 h-10 text-[var(--color-primary)] animate-spin" />
        <h3 className="text-lg font-medium text-foreground">Generating Your Email...</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Our AI is crafting a beautiful, responsive email template for you. Please wait a moment.
        </p>
      </div>
    </div>
  )
}

// ----- Component trạng thái Empty -----
function EmptyState() {
  return (
    <div className="bg-background/70 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-sm">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-2xl">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26c.3.16.67.16.97 0L20 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Generate</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
            Enter a description of the email you want to create and click &quot;Generate Email&quot; to get started.
          </p>
        </div>
      </div>
    </div>
  )
}

// ----- Component trạng thái kết quả -----
function ResultState({
  html,
  onHtmlChange,
}: {
  html: string
  onHtmlChange: (html: string) => void
}) {
  return (
    <div className="bg-background/70 backdrop-blur-sm rounded-2xl border border-border shadow-sm overflow-hidden">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted p-1 m-4 rounded-xl">
          <TabsTrigger
            value="preview"
            className="flex items-center space-x-2 rounded-lg py-2 
            data-[state=active]:bg-[var(--color-primary)] 
            data-[state=active]:text-[var(--color-primary-foreground)] 
            hover:brightness-95 focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </TabsTrigger>

          <TabsTrigger
            value="code"
            className="flex items-center space-x-2 rounded-lg py-2 
            data-[state=active]:bg-[var(--color-primary)] 
            data-[state=active]:text-[var(--color-primary-foreground)] 
            hover:brightness-95 focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          >
            <Code className="w-4 h-4" />
            <span>Code</span>
          </TabsTrigger>
        </TabsList>

        <div className="p-4 pt-0">
          <TabsContent value="preview" className="mt-0">
            <EmailPreview html={html} />
          </TabsContent>
          <TabsContent value="code" className="mt-0 max-w-sm md:max-w-full">
            <div className="w-full h-[calc(100vh-2rem)] overflow-auto">
              <EmailCode html={html} onHtmlChange={onHtmlChange} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

// ----- Component chính EmailOutput -----
export default function EmailOutput({ generatedHtml, error, isLoading }: EmailOutputProps) {
  const [currentHtml, setCurrentHtml] = useState(generatedHtml)

  useEffect(() => {
    setCurrentHtml(generatedHtml)
  }, [generatedHtml])

  if (error) return <ErrorState message={error} />
  if (isLoading) return <LoadingState />
  if (!generatedHtml) return <EmptyState />

  return <ResultState html={currentHtml} onHtmlChange={setCurrentHtml} />
}
