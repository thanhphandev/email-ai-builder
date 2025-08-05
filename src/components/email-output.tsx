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

export default function EmailOutput({ generatedHtml, error, isLoading }: EmailOutputProps) {
  // State để quản lý HTML hiện tại (có thể được chỉnh sửa)
  const [currentHtml, setCurrentHtml] = useState(generatedHtml)

  // Cập nhật currentHtml khi generatedHtml thay đổi
  useEffect(() => {
    setCurrentHtml(generatedHtml)
  }, [generatedHtml])

  const handleHtmlChange = (newHtml: string) => {
    setCurrentHtml(newHtml)
  }
  if (error) {
    return (
      <div className="bg-background/70 backdrop-blur-sm rounded-2xl p-8 border border-destructive/30 shadow-sm">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-full">
            <AlertCircle className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-destructive mb-2">Generation Failed</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-background/70 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-sm">
        <div className="flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <h3 className="text-lg font-medium text-foreground">Generating Your Email...</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Our AI is crafting a beautiful, responsive email template for you. Please wait a moment.
          </p>
        </div>
      </div>
    )
  }

  if (!generatedHtml) {
    return (
      <div className="bg-background/70 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-sm">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-2xl">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
              Enter a description of the email you want to create and click "Generate Email" to get started.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background/70 backdrop-blur-sm rounded-2xl border border-border shadow-sm overflow-hidden">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted p-1 m-4 rounded-xl">
          <TabsTrigger
            value="preview"
            className="flex items-center space-x-2 rounded-lg py-2 
             data-[state=active]:bg-[var(--primary)] 
             data-[state=active]:text-[var(--primary-foreground)] 
             hover:brightness-95 focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </TabsTrigger>

          <TabsTrigger
            value="code"
            className="flex items-center space-x-2 rounded-lg py-2 
             data-[state=active]:bg-[var(--primary)] 
             data-[state=active]:text-[var(--primary-foreground)] 
             hover:brightness-95 focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            <Code className="w-4 h-4" />
            <span>Code</span>
          </TabsTrigger>

        </TabsList>

        <div className="p-4 pt-0">
          <TabsContent value="preview" className="mt-0">
            <EmailPreview html={currentHtml} />
          </TabsContent>
          <TabsContent value="code" className="mt-0 max-w-sm md:max-w-full">
            <div className="w-full h-[calc(100vh-2rem)] overflow-auto">
              <EmailCode
                html={currentHtml}
                onHtmlChange={handleHtmlChange}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
