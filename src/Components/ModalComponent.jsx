import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import {useNavigate} from "react-router"
export const ModalComponent = ({isOpen, onClose}) => {
  const navigate = useNavigate()
  const nagivatefun = ()=>{
    onClose;
    navigate("/Dashboard/MyProfile")

  }
  return (
    <Dialog open={isOpen} onClose={nagivatefun} className="relative z-50 ">
    <div className="fixed backdrop-blur-sm bg-black/30  inset-0 flex w-screen items-center justify-center p-4">
      <DialogPanel className="max-w-lg text-center shadow-lg space-y-4 border bg-white rounded-md  p-12">
        <img src="https://cdn-icons-png.flaticon.com/128/3472/3472620.png" className=' mx-auto w-12 h-12' alt="" srcset="" />
        <DialogTitle className=" text-2xl font-bold text-green-500">Payment successful </DialogTitle>
        <Description className="text-amber-600 font-semibold">Now you are a gold member</Description>
        
        <div className="flex justify-center gap-4">
          <button className='button' onClick={nagivatefun}>OKay!</button>
         
        </div>
      </DialogPanel>
    </div>
  </Dialog>
  );
};
