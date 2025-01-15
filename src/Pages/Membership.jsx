import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../Components/paymentform/CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)
function Membership() {
  return (
    <div>Membership


      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default Membership