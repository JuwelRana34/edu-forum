import { useQuery } from "@tanstack/react-query";
import SecureAxios from "./SecureAxios";

function useAnnouncementes() {

    const {data:announcements  =[] , refetch} = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
          try {
            const response = await SecureAxios.get(`${import.meta.env.VITE_API}/get-all-announcement`);
            // setAnnouncement(response.data)
            return response.data;
          } catch (error) {
            console.error(error);
            throw error;
          }
        }
       })

  return { announcements, refetch}
}

export default useAnnouncementes