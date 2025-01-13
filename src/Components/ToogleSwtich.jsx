import { Switch } from "keep-react"
import { useContext } from "react"
import ThemeContext from "../Context/ThemeProvider"

export const SwitchComponent = () => {
    const { toggleTheme} = useContext(ThemeContext)
  return <Switch className="bg-metal-200" onCheckedChange={toggleTheme} variant='icon' />
}