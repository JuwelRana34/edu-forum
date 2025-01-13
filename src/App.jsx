import './App.css'
import { Outlet } from 'react-router'
import Navbar from './Components/Navbar'
import { useContext } from 'react'
import ThemeContext from './Context/ThemeProvider'

function App() {
  const {theme} = useContext(ThemeContext)
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
    <Navbar/>
    <Outlet/>

    </div>
  )
}

export default App
