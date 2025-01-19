import { useForm } from "react-hook-form"
import SecureAxios from "../Hook/SecureAxios"
import { useContext } from "react"
import UserContext from "../Context/AuthContext"
import {toast} from "keep-react"
import { useQuery } from "@tanstack/react-query";
function MakeAnnouncement() {
  const {user, announcement ,setAnnouncement} = useContext(UserContext)
 announcement
  const { register, handleSubmit, reset } = useForm()
  const onSubmit = ({Title,Description}) =>{
      SecureAxios.post('/make-announcement',{
        name: user.displayName,
        photo:user.photoURL,
        title: Title,
        description: Description
      }).then(() =>{
        refetch()
        toast.success('Announcement posted successfully')
        reset()
      }).catch(err =>{
        console.log(err)
        toast.error('Failed to post announcement')
      })
  }

   // announcement get 

 const {data:announcements  =[] , refetch} = useQuery({
  queryKey: ['announcement'],
  queryFn: async () => {
    try {
      const response = await SecureAxios.get(`${import.meta.env.VITE_API}/get-all-announcement`);
      setAnnouncement(response.data)
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
 })

  return (
    <div className=" w-[95%] md:w-1/2 mx-auto">
      <h1 className="text-center text-2xl my-5 font-bold">Make Announcement</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input required className="border rounded focus:outline-green-200 my-2 p-2 " placeholder="Title " {...register("Title")} />
      <textarea required className="border rounded focus:outline-green-200 my-2 p-2 " placeholder="Description " {...register("Description")} />
      {/* <input className="border rounded my-2 p-2 " placeholder="type your " type="number" {...register("age", { min: 18, max: 99 })} /> */}
      <input className="button cursor-pointer" type="submit" />
    </form>
    </div>
    
  )
}

export default MakeAnnouncement