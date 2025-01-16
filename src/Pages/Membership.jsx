import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../Components/paymentform/CheckoutForm';
import { ModalComponent } from '../Components/ModalComponent';
import { useState } from 'react';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)
function Membership() {
  
  return (
    <div>

     

<h1 className='text-3xl font-bold my-5 text-center capitalize text-metal-700 '>Become a gold member to unlimited post </h1>
     <div className='md:flex items-center  '>
       <div  className=' md:w-[45%]'>
        <img className='md:w-[80%] mx-auto' src="https://img.freepik.com/free-vector/top-up-credit-concept-illustration_114360-7244.jpg?ga=GA1.1.1974322130.1689523785&semt=ais_hybrid" alt="" srcset="" />
       </div>
       <div className=' grow'>
        <Elements  stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
       </div>
     </div>
      
    </div>
  )
}

export default Membership