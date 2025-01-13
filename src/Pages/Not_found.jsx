
import {  Empty, EmptyDescription, EmptyImage, EmptyTitle } from 'keep-react'
import { Link, useLocation } from 'react-router'
import { Button } from 'keep-react'

function Not_found() {
   const {pathname}= useLocation()
   
  return ( 
        <Empty>
          <EmptyImage>
            <img className=' w-full lg:w-[80%] mx-auto rounded-md' src="https://img.freepik.com/premium-vector/404-great-design-any-purposes-flat-style-people-internet-network_123447-4010.jpg?ga=GA1.1.1974322130.1689523785&semt=ais_hybrid" alt="" />
          </EmptyImage>
          <EmptyTitle className="mb-[14px] mt-5">404 Not Found</EmptyTitle>
          <EmptyDescription className="mb-8">
          Oops! The page <span className='text-rose-500'> *{pathname}*</span> you are looking for does not exist.

          
          </EmptyDescription>
          
          <Link to="/">
            <Button  className='bg-gray-800' color="primary">Go to home </Button> 
          </Link>
        </Empty>
  )
}

export default Not_found