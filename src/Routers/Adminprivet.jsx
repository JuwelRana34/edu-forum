import { useEffect } from "react"
import useCheckAdmin from "./useCheckAdmin"
import { useNavigate } from "react-router"

function Adminprivet({children}) {
    const role = useCheckAdmin()
    const navigate = useNavigate()

    if (role !== 'admin') {
      return navigate('/')
    }
  return (
    children
  )
}

export default Adminprivet