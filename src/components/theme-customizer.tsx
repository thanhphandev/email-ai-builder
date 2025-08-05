"use client"

import * as React from "react"
import { useState } from "react"
import { Settings, Paintbrush, Copy, Check } from "lucide-react"
import { useCustomTheme } from "@/hooks/use-theme"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function ThemeCustomizer() {
  const { currentTheme, mode } = useCustomTheme()
  const [copied, setCopied] = useState(false)

  const copyThemeConfig = () => {
    const themeConfig = {
      name: currentTheme.name,
      mode: mode,
      colors: currentTheme.colors[mode === "dark" ? "dark" : "light"]
    }
    
    navigator.clipboard.writeText(JSON.stringify(themeConfig, null, 2))
    setCopied(true)
    toast.success("Cấu hình theme đã được sao chép!")
    
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Tùy chỉnh theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Paintbrush className="h-4 w-4" />
          Tùy chỉnh Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Theme hiện tại</CardTitle>
              <CardDescription className="text-xs">
                {currentTheme.label} - {mode === "dark" ? "Tối" : mode === "light" ? "Sáng" : "Hệ thống"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs defaultValue="colors" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="colors">Màu sắc</TabsTrigger>
                  <TabsTrigger value="fonts">Font</TabsTrigger>
                  <TabsTrigger value="config">Cấu hình</TabsTrigger>
                </TabsList>
                
                <TabsContent value="colors" className="space-y-2">
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(currentTheme.colors[mode === "dark" ? "dark" : "light"]).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div
                          className="w-full h-6 rounded border"
                          style={{ backgroundColor: value }}
                          title={`${key}: ${value}`}
                        />
                        <Label className="text-xs truncate">{key}</Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="fonts" className="space-y-2">
                  {currentTheme.fonts ? (
                    <div className="space-y-3">
                      {Object.entries(currentTheme.fonts).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <Label className="text-xs font-medium capitalize">{key}:</Label>
                          <div 
                            className="text-xs p-2 rounded border bg-muted/50"
                            style={{ fontFamily: value }}
                          >
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">
                      Theme này không có cấu hình font tùy chỉnh
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="config" className="space-y-2">
                  <div className="text-xs space-y-1">
                    <div><strong>Tên:</strong> {currentTheme.name}</div>
                    <div><strong>Nhãn:</strong> {currentTheme.label}</div>
                    <div><strong>CSS Class:</strong> {currentTheme.cssClass}</div>
                    <div><strong>Chế độ:</strong> {mode}</div>
                  </div>
                  
                  <Button
                    onClick={copyThemeConfig}
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Đã sao chép
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Sao chép cấu hình
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
