import { BiCalendar, BiMapPin } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import Swal from "sweetalert2";

export default function EventsWebinars() {

  const events = [
    {
      title: "React Masterclass",
      date: "March 15, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Online Webinar",
    },
    {
      title: "AI & Machine Learning Summit",
      date: "April 5, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Tech Hub, New York",
    },
    {
      title: "Cybersecurity Workshop",
      date: "April 20, 2025",
      time: "4:00 PM - 6:00 PM",
      location: "Virtual Event",
    },
    {
      title: "Startup & Innovation Conference",
      date: "May 10, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Silicon Valley, CA",
    },
  ];

  const handelRegister = (title) => {
    Swal.fire({
        title: `are you sure to register "${title} ?"`,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "register",
        denyButtonText: `Don't register`
      }).then((result) => {
      
        if (result.isConfirmed) {
          Swal.fire("Registered! ", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
  }

  return (
    <div className="   flex flex-col items-center  justify-center p-2">
      <div className=" w-full border dark:border-none bg-white  dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-2">
          🎤 Events & Webinars
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
          Stay updated with the latest educational events, workshops, and webinars!
        </p>


        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-blue-100 dark:bg-gray-700 p-4 rounded-lg shadow"
            >
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {event.title}
                </h3>
                <div className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
                  <BiCalendar className="w-5 h-5 mr-2" /> {event.date}
                </div>
                <div className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
                  <CiLock className="w-5 h-5 mr-2" /> {event.time}
                </div>
                <div className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
                  <BiMapPin className="w-5 h-5 mr-2" /> {event.location}
                </div>
              </div>
              <button onClick={()=> handelRegister(event.title)} className="mt-3 sm:mt-0 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition">
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
