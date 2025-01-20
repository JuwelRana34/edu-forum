import { Button, toast } from "keep-react";
import useAnnouncementes from "../Hook/useAnnouncementes";
import useCheckAdmin from "../Routers/useCheckAdmin";
import SecureAxios from "../Hook/SecureAxios";


function Announcements() {
  const { announcements,refetch } = useAnnouncementes();
  const role = useCheckAdmin()
  const handeldelete = async(id)=>{
       await SecureAxios.delete(`/announcements/delete/${id}`)
       .then(() => {
        refetch()
        toast.success(`announcements deleted successfully!`)
        }).catch(err => { 
          toast.error(`Error: ${err.message}`)
        })
  }

  return (
    announcements?.length > 0 && (
      <div>
        <h2 className="text-center font-bold text-3xl my-5">Announcements</h2>

        {announcements.map((item) => (
          <div key={item._id} className="max-w-4xl mx-auto bg-white shadow-md rounded-lg border border-gray-200 mb-6">
            <div className="flex items-start p-4">
              <img
                className="w-14 h-14 rounded-full border object-cover object-center border-gray-300"
                src={item.photo}
                alt="Author"
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className=" md:flex justify-between gap-2">
                  <div className="w-full ">
                    <h2 className="mt-2 text-xl font-bold text-gray-900">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-gray-700">{item.description}</p>
                  </div>
                    <div className="text-end my-2">
                   {
                    role === "admin" && 
                      <Button onClick={()=>handeldelete(item._id)} className=" hover:bg-rose-200  bg-rose-100 text-rose-500">
                      Delete
                    </Button>
                    
                   } 
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default Announcements;
