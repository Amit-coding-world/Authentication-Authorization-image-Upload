import { useContext } from 'react'
import { dataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

function Home() {
  let { userData, serverUrl, setUserData, getUserdata } = useContext(dataContext);
  let navigate = useNavigate();

  if (!userData) {
    navigate("/login");
  }

  const handleLogOut = async () => {
    try {
      await axios.post(`${serverUrl}/api/logout`,{},{withCredentials:true})
      await getUserdata()
      setUserData(null)
      navigate("/login")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome, <span className="text-blue-600">{userData.firstName}</span>!
        </h1>
        {userData.profileImage ? (
          <img
            src={userData.profileImage}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg mb-4 hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300 mb-4">
            <span className="text-gray-400 text-4xl">?</span>
          </div>
        )}
      </div>
      <button onClick={handleLogOut} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-6 hover:bg-blue-600 transition-colors duration-300">
        Logout
      </button>
    </div>
  );
}

export default Home
