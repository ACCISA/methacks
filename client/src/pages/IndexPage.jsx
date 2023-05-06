import { UserContext } from "../UserContext";
import React, { useContext, useState, useEffect } from 'react';
import Header from '../Header';
import HeaderIndex from "../HeaderIndex";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios"

export default function IndexPage() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [documents, setDocuments] = useState(null);
  const { username, setUsername } = useContext(UserContext)


  const bg = {
    backgroundImage: 'url("src/images/background.jpg")',
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

  const hd = {
    position: 'absolute',
    top: '0'
  }


  useEffect(() => {
    axios.get("/data").then(response => {
      setDocuments(response.data);
    });
  }, []);




  function handleUrlForm(ev) {
    ev.preventDefault()
    // axios.get('/recipe')
  }

  function handleFileUpload(ev) {
    if (ev.target.files.length > 0) {
      setFile(ev.target.files[0])
    }
  }

  return (
    <div style={bg} id="bkng" className="p-0 h-full  flex-col justify-center align-middle">
      <HeaderIndex />
      <div className="font-sans backdrop-blur-md content-center text-center rounded-md border text-lg">
        Welcome to NutriScan, where allergies don't limit your taste buds! 
        <br></br>Discover delicious recipes that cater to your dietary needs with our innovative platform. <br/> Input your allergies, and we'll filter out any potentially harmful ingredients, so you can enjoy your meals safely. <br /> Join our community of recipe enthusiasts today and embark on a culinary journey filled with tantalizing flavors and vibrant connections. <br/>
      </div>
      <div className="searchBar w-full content-center items-center justify-center">
        
        </div>
        <form onSubmit={handleUrlForm} className="mt-24 w-10 text-center">
          <input value={url} onChange={ev => { setUrl(ev.target.value) }} type="text" className='text-white h-10 placeholder:text-white mb-3 border-white px-4 bg-transparent rounded-md ' placeholder="Paste URL" />
          <label htmlFor="file" className="flex items-center text-left border-solid md:border-dotted w-full bg-transparent border-2 text-white py-2 px-4 h-10 rounded-md cursor-pointer border-white">
            {file ? <FaCheckCircle className="mr-2" /> : null}
            Upload a file {file ? `- ${file.name}` : ''}
          </label>
          <input id="file" name="file" type="file" className="hidden" onChange={handleFileUpload} />
        </form>
      
      <div className="Buttons mt-25 pd-[20px] flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">
        <button id="uploadBtn" className="bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-md w-[125px] py-3 px-2 mt-10" >Find Recipe</button>

      </div>
      <div className="flex justify-center pt-10">




        <form>
          {username && <div><h1 className="mb-4">List of Groups:</h1></div>}
          {username && documents && documents.map(data => (
            <div key={data.name} className="flex items-center mb-1">
              <input type="radio" id={data.name} name="groupName" value={data.name} />
              <label htmlFor={data.name} className="ml-2 mb-0">{data.name}</label>
            </div>
          ))}
        </form>







      </div>

    </div>
  )
}
