import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function AddFamilyForm() {
  const [redirect, setRedirect] = useState(false);
  const [missingField, setMissingField] = useState(false);
  const [familyName, setFamilyName] = useState('');
  const [familyDescription, setFamilyDescription] = useState('');
  
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
    <div>
      
      <h2 className=' font-bold flex justify-center text-xl'>Add A Group Form</h2>
      <form className=' border border-solid  pl-10 pr-10 pt-5 pb-5 m-10 mx-36' onSubmit={handleAddFamily}>
        <div>
          <label htmlFor="username">Please enter the name of your new group:</label>
          <input type='text' placeholder='Group Name' className=' text-black w-1/3 mb-4' value={familyName} onChange={handleNameChange} />
          <label htmlFor="groupDescription" className='my-16'>Please write a brief description of your group:</label>
          <input type='text' name="dietRestrictions" placeholder="Group Description" className=' text-black w-1/2 border' value={familyDescription} onChange={handleDescriptionChange} />
          {missingField && <div className="text-red-500">Missing field</div>}

          <input type="submit" className='button manageSubmit' placeholder='Add' value='Add' />
        </div>
      </form>
    </div>
  );
}
