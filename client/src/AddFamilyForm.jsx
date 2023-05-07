import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import HeaderIndex from "./HeaderIndex";

export default function AddFamilyForm() {
  const [redirect, setRedirect] = useState(false);
  const [missingField, setMissingField] = useState(false);
  const [familyName, setFamilyName] = useState('');
  const [familyDescription, setFamilyDescription] = useState('');
  const bgForm = {
    backgroundImage: 'url("/src/images/manage.jpeg")',

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    color: "white",
    position: 'absolute',
    top: '0',
    left: '0',
    width: "100%",
    height: '100%'
  }
  const handleAddFamily = (event) => {
    if (!familyName.trim() || !familyDescription.trim()) {
      setMissingField(true);
      event.preventDefault();

    } else {
      event.preventDefault();
      setRedirect(true);
      axios.post("/addgroup", {
        name: familyName,
        description: familyDescription
      })
    }
  };

  const handleNameChange = (event) => {
    setFamilyName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setFamilyDescription(event.target.value);
  };


  if (redirect) {
    return <Navigate to="/manage" />;
  }

  return (
    <>
      <div style={bgForm} id="bkng" className="p-0 h-full  flex-col justify-center align-middle">
      <HeaderIndex />
        <h2 className=' mt-20 font-bold ml-60 text-xl'>Add A Group Form</h2>
      </div>
      <div className=" mt-24 flex flex-row left-0">
        <form className='w-90 absolute left-0 backdrop-blur-md rounded-md border border-solid  pl-10 pr-10 pt-5 pb-5 mx-40 mt-4' onSubmit={handleAddFamily}>
          <label htmlFor="username">Please enter the name of your new group:</label>
          <input type='text' placeholder='Group Name' className=' text-black w-full mb-4' value={familyName} onChange={handleNameChange} />
          <label htmlFor="groupDescription" className='my-16'>Please write a brief description of your group:</label>
          <input type='text' name="dietRestrictions" placeholder="Group Description" className=' text-black w-full border' value={familyDescription} onChange={handleDescriptionChange} />
          {missingField && <div className="text-red-500">Missing field</div>}

          <div className="flex flex-row justify-between">
            <button type="submit" className='align-items ml-8 button manageSubmit' value='Add' ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </button>
            <button className="button manageSubmit mr-8 justify-between hover:bg-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 1 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
            </button>
          </div>
        </form>
        <div className="w-full left-0 absolute"></div>
      </div>

    </>
  );
}
