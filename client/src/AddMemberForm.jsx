import React, { useEffect, useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { Navigate, useParams } from 'react-router-dom';
import axios from "axios"
export default function AddMemberForm({ setParent }) {
  const [showForm, setShowForm] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [missingField, setMissingField] = useState(false)
  const [member, setMember] = useState('')
  const [restr, setRestr] = useState('')
  const [recent, setRecent] = useState([])
  const { id } = useParams();
  function handleAddMember(ev) {
    ev.preventDefault();
    if (member.length == 0 || restr.length == 0) {
      setMissingField(true)
      return;
    }
    let dataRestr = restr.split(",")
    axios.put("/manage/" + id, {
      member, restrictionsPut: dataRestr
    })
    setParent(true)
    // setRedirect(true);
  }

  function handleMemberChange(ev) {
    setMember(ev.target.value)
    setMissingField(false)
  }

  function handleRestrChange(ev) {
    setRestr(ev.target.value)
    setMissingField(false)
  }

  useEffect(() => {
    axios.get('/recent').then(({ data }) => {
      setRecent(data)
    })
  }, [])

  return (
    <>
      {!redirect && (
        <div>
          <button className='manageButton w-full h-full' onClick={() => setShowForm(!showForm)}>
            Add Member {showForm ? <FaChevronDown /> : <FaChevronUp />}
            &nbsp;
          </button>
          {showForm && (
            <>
              <form className="show borderForm">
                <div>
                  <div className='text-center flex flex-col justify-items font-bold text-xl'>Recently Added</div>
                  {recent && (recent.map((member) => (
                    <div className="flex border justify-between">
                      <input type="checkbox" className='text-sm w-10' />
                      <div className="mx-2">Name: {member.username}</div>
                      <div>Restrictions: {member.restrictions}</div>
                    </div>
                  )))}
                  <div>
                    <button value={member.member} type="submit" className="bg-[#333] text-white w-10 items-center align-items hover:bg-red-500">Add</button>
                  </div>
                </div>
              </form>
              <form className="show borderForm" onSubmit={handleAddMember}>

                <div>
                  <label htmlFor="username">Please enter the username of the new member:</label>
                  <input value={member} onChange={handleMemberChange} type='text' placeholder='username' className='w-1/3 mb-4' />
                  <label htmlFor="dietRestrictions" className='my-16'>Please enter all your dietary restrictions separated by a comma:</label>
                  <input value={restr} onChange={handleRestrChange} type='text' name="dietRestrictions" placeholder="Enter your dietary restrictions" className='w-full border'></input>
                  {missingField && (<div className='text-red-500'>Missing Field</div>)}
                  <button type="submit" className='button manageSubmit' placeholder='Add' value='Add'>Add</button>
                </div>
              </form>
            </>)}
        </div>
      )}
      {redirect && <Navigate to={"/manage/" + id} />}
    </>
  );
}


