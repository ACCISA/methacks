import React, { useEffect, useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { Navigate, useParams } from 'react-router-dom';
import axios from "axios"
import HeaderIndex from "./HeaderIndex";

export default function AddMemberForm({ setParent }) {
  const [showForm, setShowForm] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [missingField, setMissingField] = useState(false)
  const [member, setMember] = useState('')
  const [restr, setRestr] = useState('')
  const [recent, setRecent] = useState([])
  const [selected, setSelected] = useState([])
  const { id } = useParams();

  const bgFam = {
    backgroundImage: 'url("/src/images/middle.avif")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    color: "white",
    position: 'static',
    top: '0',
    left: '0',
    width: "100%",
    height: '100%'
}
 
  function handleRecentlyAdded(ev) {
    ev.preventDefault()
    console.log(selected)
    axios.put("/manage_multiple/" + id, { member: selected }).then(({ data }) => {
      setParent(true)
    })

  }

  function handleRadioChange(ev) {
    console.log('te')
    const { checked, id } = ev.target;
    if (checked) {
      let selectedInputs = [id]
      setSelected(selected.concat(selectedInputs))
    } else {
      let newSelected = selected
      for (let i = 0; i < selected.length; i++) {
        if (selected[i] == id) {
          newSelected.splice(i, 1)
          break
        }
      }
      setSelected(newSelected)
    }

  }

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
  console.log("sda")
  console.log(selected)
  return (
    
  <>
  
        {!redirect && (
          <div>
            <button className='manageButton mb-2 flex hover:bg-green-500' onClick={() => setShowForm(!showForm)}>

              {showForm ? <FaChevronDown /> : <FaChevronUp />}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
              &nbsp;
            </button>
            {showForm && (
              <>
              
                <form className="show borderForm" onSubmit={handleRecentlyAdded}>
                  <div>
                    <div className='text-center flex flex-col justify-items font-bold text-xl'>Recently Added</div>
                    {recent && (recent.map((member) => (
                      <div className="flex border justify-between">
                        <input id={member._id} onChange={handleRadioChange} type="checkbox" className='text-sm w-10' />
                        <div className="mx-2">Name: {member.username}</div>
                        <div className='font-sans'>Restrictions: {member.restrictions}</div>
                      </div>
                    )))}
                    <div>
                      <button type="submit" className='button manageSubmit' value='Add' ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      </button>

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
                    <button type="submit" className='button manageSubmit' value='Add' ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </button>
                  </div>
                </form>
              </>)}
          </div>
        )}
        {redirect && <Navigate to={"/manage/" + id} />}
      
      </>
      );
}


