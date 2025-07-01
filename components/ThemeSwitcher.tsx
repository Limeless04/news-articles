"use client"

import { Button } from "./ui/button"
import {Sun, Moon} from "lucide-react"
import { useTheme } from "next-themes"

export const ThemeSwithcer = () => {
    const {theme, setTheme} = useTheme()
    return (
         <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
    )

}