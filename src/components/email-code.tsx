"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Code2, Copy, CopyCheck, Download, Edit3, Eye, Save } from "lucide-react";
import { useCustomTheme } from "@/hooks/use-theme";

interface EmailCodeProps {
  html: string;
  onHtmlChange?: (html: string) => void;
}

export function EmailCode({ html, onHtmlChange }: EmailCodeProps) {
  const { mode, currentTheme } = useCustomTheme(); // { colors, fonts, ... }
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableHtml, setEditableHtml] = useState(html);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Sync với prop html khi thay đổi từ bên ngoài
  useEffect(() => {
    if (!isEditing) {
      setEditableHtml(html);
      setHasUnsavedChanges(false);
    }
  }, [html, isEditing]);

  const handleCopy = async () => {
    try {
      const codeToCopy = isEditing ? editableHtml : html;
      await navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      toast.success("HTML code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy HTML code to clipboard.");
    }
  };

  const handleDownload = () => {
    try {
      const codeToDownload = isEditing ? editableHtml : html;
      const blob = new Blob([codeToDownload], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "email-template.html";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("HTML file downloaded successfully!");
    } catch {
      toast.error("Failed to download the email HTML file.");
    }
  };

  const toggleEditMode = () => {
    if (isEditing && hasUnsavedChanges) {
      // Hỏi người dùng có muốn lưu thay đổi không
      const shouldSave = window.confirm("Bạn có muốn lưu các thay đổi không?");
      if (shouldSave) {
        handleSaveChanges();
      } else {
        // Reset về giá trị gốc
        setEditableHtml(html);
        setHasUnsavedChanges(false);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    if (onHtmlChange) {
      onHtmlChange(editableHtml);
      setHasUnsavedChanges(false);
      toast.success("Thay đổi đã được lưu!");
    }
  };

  const handleCodeChange = (newCode: string) => {
    setEditableHtml(newCode);
    setHasUnsavedChanges(newCode !== html);
    
    // Live update (tùy chọn - có thể bật/tắt)
    if (onHtmlChange) {
      onHtmlChange(newCode);
    }
  };

  // 🎨 destructure colors và fonts từ currentTheme theo typing ThemeColors
  const colors = currentTheme.colors[mode === "dark" ? "dark" : "light"];
  const fonts = currentTheme.fonts;

  return (
    <div
      className="h-full flex flex-col"
      style={{ fontFamily: fonts?.mono ?? "monospace" }}
    >
      {/* Code Controls */}
      <div
        className="p-4 flex items-center justify-between border-b"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center space-x-3">
          <Code2 className="w-4 h-4" style={{ color: colors.mutedForeground }} />
          <span className="text-sm" style={{ color: colors.mutedForeground }}>
            HTML Code
          </span>
        </div>

        <div className="flex space-x-2">
          {/* Edit/View Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleEditMode}
            style={{
              background: isEditing ? colors.accent : "transparent",
              borderColor: colors.border,
              color: isEditing ? colors.accentForeground : colors.foreground,
            }}
          >
            {isEditing ? (
              <>
                <Eye className="w-3 h-3 mr-2" />
                Xem
              </>
            ) : (
              <>
                <Edit3 className="w-3 h-3 mr-2" />
                Sửa
              </>
            )}
          </Button>

          {/* Save Button - chỉ hiện khi đang edit và có thay đổi */}
          {isEditing && hasUnsavedChanges && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveChanges}
              style={{
                background: colors.primary,
                borderColor: colors.primary,
                color: colors.primaryForeground,
              }}
            >
              <Save className="w-3 h-3 mr-2" />
              Lưu
            </Button>
          )}

          {/* Copy Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            style={
              copied
                ? {
                    background: colors.accent,
                    borderColor: colors.border,
                    color: colors.accentForeground,
                  }
                : {
                    background: "transparent",
                    borderColor: colors.border,
                    color: colors.foreground,
                  }
            }
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
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            style={{
              background: "transparent",
              borderColor: colors.border,
              color: colors.foreground,
            }}
          >
            <Download className="w-3 h-3 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Code Display */}
      <div
        className="flex-1 overflow-auto"
        style={{
          background: colors.muted,
          color: colors.foreground,
        }}
      >
        {isEditing ? (
          /* Chế độ chỉnh sửa - textarea */
          <textarea
            value={editableHtml}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-full resize-none focus:outline-none"
            style={{
              background: "transparent",
              color: colors.foreground,
              padding: "1rem",
              fontSize: "0.875rem",
              lineHeight: "1.5",
              fontFamily: fonts?.mono ?? "monospace",
              border: "none",
            }}
            placeholder="Nhập HTML code của bạn..."
            spellCheck={false}
          />
        ) : (
          /* Chế độ xem - syntax highlighter */
          <SyntaxHighlighter
            language="html"
            style={mode === "dark" ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              padding: "1rem",
              height: "100%",
              background: "transparent",
              fontSize: "0.875rem",
              lineHeight: "1.5",
              fontFamily: fonts?.mono ?? "monospace",
            }}
            showLineNumbers
            wrapLongLines
          >
            {editableHtml}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}
