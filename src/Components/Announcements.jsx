import { useContext } from "react"
import UserContext from "../Context/AuthContext"


function Announcements() {
    const {announcement}= useContext(UserContext)
  return (
    <div>
      <h2>Announcements</h2>
      <ul>
        {announcement.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Announcements