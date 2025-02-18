import { useForm } from "react-hook-form"
import SecureAxios from "../Hook/SecureAxios"
import { useContext } from "react"
import UserContext from "../Context/AuthContext"
import {toast} from "keep-react"
import useAnnouncementes from "../Hook/useAnnouncementes"
import ThemeContext from "../Context/ThemeProvider"
function MakeAnnouncement() {
  const {user} = useContext(UserContext)
  const {refetch} = useAnnouncementes()
  const {theme} =useContext(ThemeContext)
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



  return (
    <div className=" w-[95%] md:w-1/2 mx-auto">
      <h1 className="text-center text-2xl my-5 font-bold">Make Announcement</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input required className="border rounded focus:outline-green-200 my-2 p-2 " placeholder="Title " {...register("Title")} />
      <textarea required className="border rounded focus:outline-green-200 my-2 p-2 " placeholder="Description " {...register("Description")} />
      {/* <input className="border rounded my-2 p-2 " placeholder="type your " type="number" {...register("age", { min: 18, max: 99 })} /> */}
      <input className={`button cursor-pointer ${theme === "dark"?"bg-metal-800 text-metal-300":''}`} type="submit" />
    </form>
    </div>
    
  )
}

export default MakeAnnouncement