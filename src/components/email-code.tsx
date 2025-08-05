"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Code2, Copy, CopyCheck, Download } from "lucide-react";

interface EmailCodeProps {
  html: string;
}

export function EmailCode({ html }: EmailCodeProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      toast.success("HTML code copied to clipboard!");

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy HTML code to clipboard.");
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "email-template.html"; // Tên file tải về
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

        toast.success("HTML file downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download the email HTML file.");
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Code Controls */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Code2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">HTML Code</span>
        </div>
        <div className="flex space-x-2">
          {/* Copy Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={`transition-colors ${
              copied 
                ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300" 
                : ""
            }`}
          >
            {copied ? (
              <>
                <CopyCheck className="w-3 h-3 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-2" />
                Copy Code
              </>
            )}
          </Button>

          {/* Download Button */}
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="w-3 h-3 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Code Display */}
      <div className="flex-1 overflow-auto">
        <SyntaxHighlighter
          language="html"
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "1rem",
            height: "100%",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
          showLineNumbers
          wrapLongLines
        >
          {html}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
