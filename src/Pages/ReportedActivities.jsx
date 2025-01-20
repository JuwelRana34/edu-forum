import { useQuery } from '@tanstack/react-query'
import SecureAxios from '../Hook/SecureAxios'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow , toast } from 'keep-react'
import LoadingTable from '../Components/LoadingTable'


function ReportedActivities() {
  const {data:reportDatas= [],refetch, isLoading} = useQuery({
    queryKey: ['reportedActivities'],
    queryFn: async () =>{
      const res = await SecureAxios.get("/get-all-reports")
      return res.data
    }
  })
  
  const handleDelete = async (reportId, commentId) => {
    try {
      await SecureAxios.delete(`/delete-comment/${reportId}/${commentId}`)
        refetch();
        toast.success("Comment deleted successfully.");
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete comment.");
    }
  }
  console.log(reportDatas)
  return (
    <div>
      <h2 className='h2 text-center'>Reported Activities</h2>
      {isLoading ? <LoadingTable />:
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="max-w-[250px]">Reporter email</div>
          </TableHead>
          <TableHead>
            <div className="w-[80px]">Commenter</div>
          </TableHead>
          <TableHead>
            <div className="w-[85px]">Feedback</div>
          </TableHead>
          <TableHead>
            <div className="w-[90px]">Action</div>
          </TableHead>
         
        </TableRow>
      </TableHeader>

     
      <TableBody>
        {reportDatas.map((item) => (
          <TableRow key={item._id}>
            <TableCell>
              <div className="max-w-[250px] truncate">{item.repoter}</div>
            </TableCell>
            <TableCell>{item.commenter}</TableCell>
            <TableCell>{item.feedback}</TableCell>
            <TableCell>
              <Button className='bg-red-100 text-rose-500' onClick={() => handleDelete(item._id , item.commentId)}>Delete</Button>
              
            </TableCell>
            
          </TableRow>
        ))}
      </TableBody>
     
    </Table>
    }
    </div>
  )
}

export default ReportedActivities