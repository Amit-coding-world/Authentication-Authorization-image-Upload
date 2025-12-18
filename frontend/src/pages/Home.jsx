import { useContext } from 'react'
import { dataContext } from '../context/UserContext.jsx'

function Home() {
  let { userData } = useContext(dataContext);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading user data...</div>
      </div>
    );
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
    </div>
  );
}

export default Home
