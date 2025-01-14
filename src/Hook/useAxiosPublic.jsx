import axios from "axios";


const AxiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API,
});

function useAxiosPublic() {
  return AxiosPublic;
}

export default useAxiosPublic;
