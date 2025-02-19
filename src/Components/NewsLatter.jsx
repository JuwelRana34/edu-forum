import Swal from "sweetalert2";

function NewsLatter() {
    const handelNewslatter = (e) => {
        e.preventDefault();
          const email = e.target.email.value
          Swal.fire({
              title: "Do you want to subscribe the newsletter?",
              showCancelButton: true,
              confirmButtonText: "Subscribe",
              denyButtonText: `NO`
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(`Subscribed! ${email}`, "", "success");
                e.target.reset();
              }
            });
      };
  return (
    <div style={{backgroundImage:  `linear-gradient(0deg, rgba(0,0,0,0.8), rgba(0,0,0,0.1)),  url(https://img.freepik.com/premium-photo/businessman-giving-presentations-conference-room_1078540-10058.jpg?ga=GA1.1.1974322130.1689523785&semt=ais_hybrid)`}} className=" bg-fuchsia-200 p-4 rounded-md mt-8  bg-cover bg-center">
        
        <form onSubmit={handelNewslatter} className="flex backdrop-blur-sm rounded-md bg-white/40  dark:bg-black/40 flex-wrap w-full max-w-3xl my-10 mx-auto p-6" >
          <input
            className="appearance-none block dark:bg-metal-500 dark:text-metal-200 w-full bg-white/80 text-gray-700   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white/90"
            type="text"
            name="email"
            required
            placeholder="Your Email"
          />
          <button
            className=" bg-blue-600 dark:bg-metal-700 dark:text-metal-300 text-white font-bold py-3 px-4 rounded focus:outline-none hover:bg-blue-600"
            type="submit"
          > Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLatter