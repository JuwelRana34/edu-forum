import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./Checkout.css";
import { useContext, useEffect, useState } from "react";
import SecureAxios from "../../Hook/SecureAxios";
import UserContext from "../../Context/AuthContext";
import {toast} from "keep-react"
const CheckoutForm = () => {
  const { user } = useContext(UserContext);
  const amount = 5;
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getPaymentIntent = async () => {
        await SecureAxios.post("/create-payment-intent", {
          price: amount,
          })
          .then(({ data }) => setClientSecret(data.client_secret))
          .catch(err => console.error(err))
      
    };
    getPaymentIntent();
  }, []);
  console.log(clientSecret)
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    // Send the payment method ID to your server
  const {paymentIntent} =  await stripe.confirmCardPayment(clientSecret,{
     payment_method: {
        card: card,
        billing_details:{
            name: user.displayName,
            email: user.email,
        },
     }    
 
        
    })
    if(paymentIntent.status === "succeeded"){
        try {
          const res = await  SecureAxios.post('/charge-payment',{
                paymentIntentId: paymentIntent.id,
                amount: (paymentIntent.amount / 100),
                email: user?.email,
            })
            
            toast.success(res.data)
            
        } catch (error) {
            console.log(error)
          toast.error("Payment failed. Please try again.")
        }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button id="paybtn" type="submit" disabled={!stripe}>
        $5 Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
