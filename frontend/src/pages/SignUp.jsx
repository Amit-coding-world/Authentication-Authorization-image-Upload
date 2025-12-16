import { dataContext } from "../context/UserContext.jsx";
import dp from "../assets/dp.png";
import { useState, useContext,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let { serverUrl } = useContext(dataContext);
  let navigate=useNavigate();
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

 

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let data = await axios.post(
        `${serverUrl}/api/signup`,
        {
          firstName,
          lastName,
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      alert("Sign Up Successful");
      // Reset form fields
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  let file=useRef(null)
  let [frontendImage,setFrontendImage]=useState(dp);
  let [backendImage,setBackendImage]=useState(null);

  function handleImage(e){
    let file =e.target.files[0];
    setBackendImage(file); // for backend upload

    let image=URL.createObjectURL(file); // for frontend display using url
    setFrontendImage(image);
  }

 

  return (
    <div className="w-full h-[100vh] bg-black flex justify-center items-center">
      <div className="w-[90%] max-w-[500px] h-[600px] bg-[#141f1f] rounded flex flex-col justify-center items-center gap-[20px]">
        <h1 className="text-white text-[20px] font-semibold">Sign Up</h1>

        <form
          className="w-[100%] flex flex-col items-center justify-center gap-[20px]"
          onSubmit={handleSignUp}
        >
          <input type="file" hidden ref={file} onChange={handleImage}/>

          <div className="w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white">
            <img src={frontendImage} alt="dp.png" className="w-[100%] h-[100%]" />
            <div onClick={()=> {file.current.click()}} className="absolute w-[100%] h-[100%] bg-black top-0 opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center text-white text-[20px] font-semibold">
              +
            </div>
          </div>

          <div className="w-[80%] h-[50px] flex justify-center items-center gap-[10px]">
            <input
              type="text"
              placeholder="first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-[50%] h-[100%] bg-white outline-none rounded-lg px-[10px] py-[5px]"
            />
            <input
              type="text"
              placeholder="last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-[50%] h-[100%] bg-white outline-none rounded-lg px-[10px] py-[5px]"
            />
          </div>
          <input
            type="text"
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-[80%] h-[50px] bg-white outline-none rounded-lg px-[10px] py-[5px]"
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[80%] h-[50px] bg-white outline-none rounded-lg px-[10px] py-[5px]"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[80%] h-[50px] bg-white outline-none rounded-lg px-[10px] py-[5px]"
          />

          <button className="bg-[#07c7e4] text-black px-[10px] py-[5px] rounded-lg">
            Sign Up
          </button>
          <p onClick={()=>navigate("/login")} className="text-white cursor-pointer">Already have an account? <span className="text-[#0ed3e1]">Login</span></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
