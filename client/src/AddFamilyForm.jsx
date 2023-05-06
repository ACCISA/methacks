import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function AddFamilyForm() {
  const [redirect, setRedirect] = useState(false);

  const handleAddFamily = (event) => {
    event.preventDefault();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/manage" />;
  }

  return (
    <div>
      <h2 className=' font-bold flex justify-center text-xl'>Add Family Form</h2>
      <form className=' border border-solid  p-3' onSubmit={handleAddFamily}>
        <div>
          <label htmlFor="username">Please enter the name of your new group:</label>
          <input type='text' placeholder='username' className='w-1/3 mb-4' />
          <label htmlFor="dietRestrictions" className='my-16'>Please write a brief description of your group:</label>
          <input type='text' name="dietRestrictions" placeholder="Enter your dietary restrictions" className='w-full border'></input>
          <input type="submit" className='button manageSubmit' placeholder='Add' value='Add' />
        </div>
      </form>
    </div>
  );
}
