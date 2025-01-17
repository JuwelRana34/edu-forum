import { useQuery } from '@tanstack/react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, toast } from 'keep-react'
import SecureAxios from '../Hook/SecureAxios'
import { useContext, useState } from 'react'
import UserContext from '../Context/AuthContext'
import {Link} from "react-router"
function MyPosts() {
  const {user} = useContext(UserContext)
  const [page, setPage] = useState(1);
  const {data:myPost = {}, refetch}= useQuery({
    queryKey: ['myPosts', page],
    queryFn: async () => {
      const response = await SecureAxios.get(`/mypost?email=${user.email}&page=${page}`)
      return response.data
    }
  })

  const {items=[],totalPages } = myPost

  const handeldelete = async (id)=>{
   await SecureAxios.delete(`/deleteMyPost/${id}?email=${user.email}`)
      .then((data) => {
        console.log(data)
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
        {items.map((item) => (
          <TableRow key={item._id}>
            <TableCell>
              <div className="max-w-[250px] truncate">{item.Title}</div>
            </TableCell>
            <TableCell>{item.UpVote + item.DownVote}</TableCell>
            <TableCell>
              <Link className='button' to={`/comments/${item._id }`}>Comment</Link>
              </TableCell>
            <TableCell>
            <button onClick={()=>handeldelete(item._id)} className='button bg-rose-500' >Delete</button>
            </TableCell>
           
          </TableRow>
        ))}
      </TableBody>
    </Table>

    {/* Pagination Controls */}
    <div className="flex justify-center gap-4 py-4">
        <button
          className="button"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="button"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default MyPosts