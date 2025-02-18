import { Button, Input, Label, toast } from "keep-react";
import React, { useContext } from "react";
import ThemeContext from "../Context/ThemeProvider";

function Contact() {
  const { theme } = useContext(ThemeContext);

  const contact = (e) => {
    e.preventDefault(); 
    const { name, email , message} = e.target
    toast.success(`"${name.value}" your message has been sent successfully`)
    e.target.reset()
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center my-5"> Contact Us </h1>
      <div className="md:flex container mx-auto ">
        <div>
          <img
            className="w-full  h-[90%]"
            src="https://img.freepik.com/premium-vector/contact-us-concept-illustration_86047-957.jpg?ga=GA1.1.1974322130.1689523785&semt=ais_hybrid"
            alt=""
          />
        </div>
        <form
          onSubmit={contact}
          className={`my-5 md:w-1/2 mx-auto flex flex-col items-center`}
        >
          <fieldset className="w-full mx-5 px-5 space-y-1">
            <Label htmlFor="name">Enter Name</Label>
            <Input id="name" name="name" required placeholder="Enter name" type="text" />
          </fieldset>
          <fieldset className="w-full mx-5 px-5 space-y-1">
            <Label htmlFor="email">Enter Email</Label>
            <Input id="email" name="email" required placeholder="Enter email" type="email" />
          </fieldset>
          <fieldset className="w-full mx-5 px-5 space-y-1">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              required
              name="message"
              className="w-full border p-3 rounded-md"
              placeholder="Enter message"
            ></textarea>
          </fieldset>

          <Button
            type="submit"
            className={`my-5 button ${theme === "dark" ? "bg-metal-800" : ""}`}
          >   
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default Contact;
