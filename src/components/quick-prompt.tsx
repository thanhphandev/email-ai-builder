import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { quickPrompts } from "@/constants/quick-prompts"

function QuickPrompts({ setPrompt }: { setPrompt: (value: string) => void }) {
  // Group theo category
  const grouped = quickPrompts.reduce((acc: Record<string, typeof quickPrompts>, item) => {
    acc[item.category] = acc[item.category] || []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-sm text-foreground">Quick Prompts</h3>

      {Object.entries(grouped).map(([category, prompts]) => (
        <div key={category} className="space-y-3">
          <h4 className="text-xs uppercase tracking-wide text-muted-foreground">
            {category}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {prompts.map((p, idx) => (
              <TooltipProvider key={idx} delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setPrompt(p.desc)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition hover:bg-muted"
                    >
                      <span className="text-lg">{p.icon}</span>
                      <span className="font-medium text-foreground">{p.title}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-2 text-xs">
                    {p.desc}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuickPrompts
