import  { useContext } from 'react'

import { Navigate, useLocation } from 'react-router'
import UserContext from '../Context/AuthContext'
// import Loading from '../Components/Loading'


// eslint-disable-next-line react/prop-types
function PrivetRoute({children}) {
    const {user ,isLoading} = useContext(UserContext)
    const location = useLocation()

    if (isLoading) {
        
        return  <p className='text-center text-xl font-semibold animate-pulse'>loading...</p>
    }

if (!user) {
    return <Navigate state={location.pathname} to='/login'></Navigate>

}
  return (
   children
  )
}

export default PrivetRoute