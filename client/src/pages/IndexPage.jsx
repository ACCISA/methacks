import { UserContext } from "../UserContext";
import React, { useContext, useState, useEffect, useRef } from 'react';
import Header from '../Header';
import HeaderIndex from "../HeaderIndex";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios"
import Post from "../Post";

export default function IndexPage() {


  const input = useRef(null);

  const [url, setUrl] = useState("");
  const [file, setFile] = useState("");
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

  function handleUrlForm(event) {
    event.preventDefault(); // prevent default form submission behavior

    if (url && file) {
      console.log("You cannot input both a URL and a file. Please choose one.");
      return;
    }

    if (url) {
      console.log("User inputted a URL:", url);
      sendURLToPython(url);
    } else if (input.current.files[0]) {
      console.log("User uploaded a file:", input.current.files[0].name);
      sendImageToPython(input.current.files[0]);
    } else {
      console.log("Please input either a URL or a file.");
      return;
    }

    // Clear the form inputs after submission
    setUrl("");
    setFile(null);
  }

  const sendImageToPython = (image) => {
    let headers = new Headers();
    headers.append("Content-Type", 'application/json')
    headers.append('GET', 'POST')
    headers.append("Access-Control-Allow-Origin", "*")
    var formdata = new FormData();
    formdata.append("snap", image);

    fetch("http://127.0.0.1:4040/image", {
      mode: 'cors',
      method: 'POST',
      headers: headers,
      body: formdata
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          console.log("Success")
          console.log()
          return response.json()
        } else {
          console.log("Not Successful")
        }

      })
      .then((data) => {
        console.log(data)
        console.log(data.status)
      })
  }

  const sendURLToPython = (url) => {
    let headers = new Headers();
    headers.append("Content-Type", 'application/json')
    headers.append("Access-Control-Allow-Origin", "*")
    var formdata = new FormData();
    formdata.append("snap", url);

    fetch("http://127.0.0.1:4040/url", {
      mode: 'cors',
      method: 'POST',
      headers: headers,
      body: formdata
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          console.log("Success")
          console.log()
          return response.json()
        } else {
          console.log("Not Successful")
        }

      })
      .then((data) => {
        console.log(data)
        console.log(data.status)
      })
  }


  return (
    <div style={bg} id="bkng" className="p-0 h-full  flex-col justify-center align-middle">
      <HeaderIndex />
      <div className="searchBar content-center flex items-center justify-center">
        <div className=" p-3 backdrop-blur-md mt-8 w-1/2 text-center rounded-md border text-lg">Welcome to NutriScan, where allergies don't limit your taste buds! Discover delicious recipes that cater to your dietary needs with our innovative platform. Input your allergies, and we'll filter out any potentially harmful ingredients, so you can enjoy your meals safely. Join our community of recipe enthusiasts today and embark on a culinary journey filled with tantalizing flavors and vibrant connections. <br />

        </div>

      </div>
      <div className="Buttons mt-25 pd-[20px] flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">


        <div className="flex justify-center pt-10">


          <div className="searchBar content-center flex items-center justify-center">
            <form onSubmit={ev => handleUrlForm(ev)} className="w-96 mt-32 w-100 text-center">
              {/* <form onSubmit={ev => handleSubmit(ev)} className="w-96 mt-32 w-100 text-center"> */}

              <label>
                <input id="url" value={url} onChange={ev => { setUrl(ev.target.value) }} type="text" className='text-white h-10 placeholder:text-white mb-3 border-white px-4 bg-transparent rounded-md' placeholder="Paste URL" />
              </label>


              <label htmlFor={file} className="flex items-center text-left w-full bg-transparent border-2 text-white py-2 px-4 h-10 rounded-md cursor-pointer">
                Upload a file
                <input accept="image/*" ref={input} id="file" name="file" type="file" className="opacity-0 absolute" />

              </label>

              <div className="Buttons mt-25 pd-[20px] flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">
                <button id="uploadBtn" className=" bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-md w-[125px] py-3 px-2 mt-10" >Find Recipe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 