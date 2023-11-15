import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const Add = () => {

  const users = {
    JProfile: "",
    photo:"",
    CompanyName: "",
    JobLocation:"",
    JobExperience:"",
    JobDescription:"",
    JobSkills:"",
    JobRole:"",
    ApplyLink:"",


 }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) =>{
      const {name, value} = e.target;
      setUser({...user, [name]:value});
  }
 

  const submitForm = async(e) =>{
    e.preventDefault();
    try {
      const response = await axios.post("https://letscodings.onrender.com/api/create", user);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response Error:', error.response.data);
        console.error('Status Code:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request Error:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
    }
  };

  

  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Add new Job</h3>
              
        <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
                <label htmlFor="fname">Job Profile</label>
                <input type="text" onChange={inputHandler} id="JProfile" name="JProfile" autoComplete='off' placeholder='Job Role' />
            </div>
           
            <div className="inputGroup">
                <label htmlFor="Cname">Company Name</label>
                <input type="text" onChange={inputHandler} id="CompanyName" name="CompanyName" autoComplete='off' placeholder='Company Name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Job Location</label>
                <input type="text" onChange={inputHandler} id="JobLocation" name="JobLocation" autoComplete='off' placeholder='Job Location' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Job Experience</label>
                <input type="text" onChange={inputHandler} id="JobExperience" name="JobExperience" autoComplete='off' placeholder='Job Experience' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Job Type</label>
                <input type="text" onChange={inputHandler} id="JobType" name="JobType" autoComplete='off' placeholder='Job Type' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Job Description</label>
                <input type="text" onChange={inputHandler} id="JobDescription" name="JobDescription" autoComplete='off' placeholder='Job Description' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Job Skills</label>
                <input type="text" onChange={inputHandler} id="JobSkills" name="JobSkills" autoComplete='off' placeholder='Job Skills' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Job Role</label>
                <input type="text" onChange={inputHandler} id="JobRole" name="JobRole" autoComplete='off' placeholder='Job Role' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Apply Link</label>
          <input
          type="text"
          onChange={inputHandler}
          id="ApplyLink"
          name="ApplyLink"
          autoComplete='off'
          placeholder='Apply Link'
        />
            </div>
            <div className="inputGroup">
                <button type="submit">ADD Job</button>
            </div>
        </form>
    </div>
  )
}

export default Add