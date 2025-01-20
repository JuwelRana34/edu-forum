import './App.css'
import { Outlet } from 'react-router'
import Navbar from './Components/Navbar'
import { useContext } from 'react'
import ThemeContext from './Context/ThemeProvider'
import Foter from './Components/Foter'

function App() {
  const {theme} = useContext(ThemeContext)
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
    <Navbar/>
    <Outlet/>
    <Foter/>
    </div>
  )
}

export default App
