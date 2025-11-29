import { ThemeSwitcher } from '@/components/ui/shadcn-io/theme-switcher';
import { useTheme } from "@/components/theme-provider";

export default function ThemeSwitcherComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center justify-center gap-8">
        <ThemeSwitcher value={theme} onChange={setTheme} className="scale-125" />
    </div>
  );
}
