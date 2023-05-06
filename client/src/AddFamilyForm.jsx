import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function AddFamilyForm() {
  const [redirect, setRedirect] = useState(false);
  const [missingField, setMissingField] = useState(false);
  const [familyName, setFamilyName] = useState('');
  const [familyDescription, setFamilyDescription] = useState('');
  const bgFam = {
      backgroundImage: 'url("src/images/pic.jpg")',

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
      <div style={bgFam} id="bkng5" className="p-0 h-full  flex-col justify-center align-middle">
      <h2 className=' font-bold flex justify-center text-xl'>Add A Group Form</h2>
      <form className=' border border-solid  p-3' onSubmit={handleAddFamily}>
        <div>
          <label htmlFor="username">Please enter the name of your new group:</label>
          <input type='text' placeholder='Group Name' className='w-1/3 mb-4' value={familyName} onChange={handleNameChange} />
          <label htmlFor="groupDescription" className='my-16'>Please write a brief description of your group:</label>
          <input type='text' name="dietRestrictions" placeholder="Group Description" className='w-full border' value={familyDescription} onChange={handleDescriptionChange} />
          {missingField && <div className="text-red-500">Missing field</div>}

          <input type="submit" className='button manageSubmit' placeholder='Add' value='Add' />
        </div>
      </form>
    </div>
    </div>
  );
}
