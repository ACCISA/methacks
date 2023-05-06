import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

export default function AddMemberForm() {
  const [showForm, setShowForm] = useState(false);
  const [redirect, setRedirect] = useState(false);

  function handleAddMember(ev) {
    ev.preventDefault();
    setRedirect(true);
  }

  return (
    <>
      {!redirect && (
        <div>
          <button className='manageButton w-full h-full' onClick={() => setShowForm(!showForm)}>
            Add Member {showForm ? <FaChevronDown /> : <FaChevronUp />}
            &nbsp;
          </button>
          {showForm && (
            <form className="show borderForm" onSubmit={handleAddMember}>
              <div>
                <label htmlFor="username">Please enter the username of the new member:</label>
                <input type='text' placeholder='username' className='w-1/3 mb-4' />
                <label htmlFor="dietRestrictions" className='my-16'>Please enter all your dietary restrictions separated by a comma:</label>
                <input type='text' name="dietRestrictions" placeholder="Enter your dietary restrictions" className='w-full border'></input>
                <input type="submit" className='button manageSubmit' placeholder='Add' value='Add' />
              </div>
            </form>
          )}
        </div>
      )}
      {redirect && <Navigate to="/manage" />}
    </>
  );
}


