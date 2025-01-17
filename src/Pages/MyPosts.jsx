import { useQuery } from '@tanstack/react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, toast } from 'keep-react'
import SecureAxios from '../Hook/SecureAxios'
import { useContext } from 'react'
import UserContext from '../Context/AuthContext'
import {Link} from "react-router"
function MyPosts() {
  const {user} = useContext(UserContext)
  const {data:myPost = [], refetch}= useQuery({
    queryKey: ['myPosts'],
    queryFn: async () => {
      const response = await SecureAxios.get(`/mypost?email=${user.email}`)
      return response.data
    }
  })

  const handeldelete = async (id)=>{
   await SecureAxios.delete(`/deleteMyPost/${id}`)
      .then(() => {
        refetch()
        toast.success("Successfully deleted")
      }).catch(err=>{
        toast.error("Failed to delete")
      })
  }

  return (
    <div className='min-h-screen'>
      <h1 className='text-3xl py-5 text-center font-bold'>My Posts</h1>
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="max-w-[250px]">Post Title</div>
          </TableHead>
          <TableHead>
            <div className="w-[80px]">Number of votes</div>
          </TableHead>
          <TableHead>
            <div className="w-[85px]">Comment </div>
          </TableHead>
          <TableHead>
            <div className="w-[90px]">Delete </div>
          </TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {myPost.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="max-w-[250px] truncate">{item.Title}</div>
            </TableCell>
            <TableCell>{item.UpVote + item.DownVote}</TableCell>
            <TableCell>
              <Link className='button' to={''}>Comment</Link>
              </TableCell>
            <TableCell>
            <button onClick={()=>handeldelete(item._id)} className='button bg-rose-500' >Delete</button>
            </TableCell>
           
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default MyPosts