"use client"

import { useEffect, useRef, useState } from "react"
import DOMPurify from "isomorphic-dompurify"
import { cn } from "@/lib/utils"
import { DeviceFrameset } from "react-device-frameset"
import "react-device-frameset/styles/marvel-devices.min.css"
import { Laptop2, Smartphone, Tablet, Monitor } from "lucide-react"

interface EmailPreviewProps {
  html: string
}

export function EmailPreview({ html }: EmailPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [sanitizedHtml, setSanitizedHtml] = useState("")
  const [viewMode, setViewMode] = useState<"desktop" | "mobile" | "tablet">("desktop")
  const [device, setDevice] = useState<"MacBook Pro" | "iPhone X" | "iPhone 8" | "iPad Mini">("MacBook Pro")
  const [isMobileViewport, setIsMobileViewport] = useState(false)

  // Theo dõi viewport
  useEffect(() => {
    const handleResize = () => setIsMobileViewport(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Sanitize HTML khi thay đổi
  useEffect(() => {
    if (!html) return
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "html", "head", "body", "title", "meta", "style", "link",
        "div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6",
        "a", "img", "table", "tr", "td", "th", "tbody", "thead", "tfoot",
        "ul", "ol", "li", "br", "hr", "strong", "em", "b", "i", "u",
        "center", "font", "small", "big", "sup", "sub"
      ],
      ALLOWED_ATTR: [
        "href", "src", "alt", "title", "width", "height", "style", "class",
        "align", "valign", "border", "cellpadding", "cellspacing",
        "bgcolor", "color", "size", "face", "target"
      ],
      FORBID_TAGS: ["script", "object", "embed", "form", "input", "textarea", "select", "button"],
      FORBID_ATTR: ["onload", "onerror", "onclick", "onmouseover", "onfocus", "onblur"]
    })
    setSanitizedHtml(clean)
  }, [html])

  // Gán srcdoc cho iframe
  useEffect(() => {
    if (iframeRef.current && sanitizedHtml) {
      iframeRef.current.srcdoc = sanitizedHtml
    }
  }, [sanitizedHtml, viewMode, isMobileViewport])

  const deviceOptions = {
    desktop: [{ id: "MacBook Pro", name: "MacBook Pro", device: "MacBook Pro" as const }],
    tablet: [{ id: "iPad Mini", name: "iPad Mini", device: "iPad Mini" as const }],
    mobile: [
      { id: "iPhone X", name: "iPhone X", device: "iPhone X" as const },
      { id: "iPhone 8", name: "iPhone 8", device: "iPhone 8" as const }
    ]
  }

  const handleViewModeChange = (mode: "desktop" | "mobile" | "tablet") => {
    setViewMode(mode)
    setDevice(deviceOptions[mode][0].device)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header Controls: chỉ hiện trên desktop */}
      {!isMobileViewport && (
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Monitor className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Email Preview</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Nút đổi chế độ */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleViewModeChange("desktop")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "desktop"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                <Laptop2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleViewModeChange("tablet")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "tablet"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                <Tablet className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleViewModeChange("mobile")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "mobile"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Chọn device */}
            <select
              value={device}
              onChange={(e) => setDevice(e.target.value as typeof device)}
              className="text-sm border border-border rounded-lg px-3 py-1 bg-background text-foreground"
            >
              {deviceOptions[viewMode].map((opt) => (
                <option key={opt.id} value={opt.device}>{opt.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Preview */}
      <div className="flex-1 flex items-center justify-center bg-muted p-4">
        {isMobileViewport ? (
          <iframe
            ref={iframeRef}
            className="w-full min-h-[500px] rounded-md border border-border"
            sandbox="allow-same-origin"
            title="Email Preview"
            style={{ height: "auto" }}
            onLoad={() => {
              if (iframeRef.current) {
                const iframe = iframeRef.current
                try {
                  const contentHeight = iframe.contentDocument?.documentElement.scrollHeight || 600
                  iframe.style.height = `${contentHeight + 20}px`
                } catch {
                  iframe.style.height = "600px"
                }
              }
            }}
          />
        ) : (
          <div className="scale-75 md:scale-90 lg:scale-100 transition-transform duration-300">
            <DeviceFrameset device={device} color="black">
              <iframe ref={iframeRef} className="w-full h-full border-0" sandbox="allow-same-origin" title="Email Preview" />
            </DeviceFrameset>
          </div>
        )}
      </div>
    </div>
  )
}
