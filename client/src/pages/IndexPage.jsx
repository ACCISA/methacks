import Post from "../Post";
import { useState, useRef } from "react";
import Header from '../Header';
import HeaderIndex from "../HeaderIndex";
import axios from 'axios';

export default function IndexPage() {

    const input = useRef(null);

    const [url, setUrl] = useState("");
    const [file, setFile] = useState("");


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

    function handleUrlForm(event) {
        event.preventDefault(); // prevent default form submission behavior

        console.log(input.current.files, "hello");

        if (url && file) {
            console.log("You cannot input both a URL and a file. Please choose one.");
            return;
        }

        if (url) {
            console.log("User inputted a URL:", url);
            // Perform actions with URL input
        } else if (input.current.files[0]) {
            console.log("User uploaded a file:", input.current.files[0].name);
            // Perform actions with uploaded file
        } else {
            console.log("Please input either a URL or a file.");
            return;
        }

        // Clear the form inputs after submission
        setUrl("");
        setFile(null);
    }

    function handleFile(event) {
        // console.log(event.target.files[0]);
        console.log(event);
        console.log(event.target.files[0]);
        setFile(event.target.files[0].name);
    }

    const sendStringToPython = (url) => {
        axios.post('/api/send_string', { URL: url })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }

      const upload = () => {

      }

    return (

        <div style={bg} id="bkng" className="p-0 h-full  flex-col justify-center align-middle">
            <HeaderIndex />

            <div className="searchBar content-center flex items-center justify-center">
                <form onSubmit={ev => handleUrlForm(ev)} className="w-96 mt-32 w-100 text-center">
                {/* <form onSubmit={ev => handleSubmit(ev)} className="w-96 mt-32 w-100 text-center"> */}

                    <label>
                        <input id="url" value={url} onChange={ev => { setUrl(ev.target.value) }} type="text" className='text-white h-10 placeholder:text-white mb-3 border-white px-4 bg-transparent rounded-md' placeholder="Paste URL" />
                    </label>


                    <label htmlFor={file} onClick={upload} className="flex items-center text-left w-full bg-transparent border-2 text-white py-2 px-4 h-10 rounded-md cursor-pointer">
                        Upload a file
                        <input accept="image/*" ref={input} id="file" name="file" type="file" className="opacity-0 absolute" />

                    </label>

                    <div className="Buttons mt-25 pd-[20px] flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">
                        <button id="uploadBtn" className=" bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-md w-[125px] py-3 px-2 mt-10" >Find Recipe</button>
                    </div>
                </form>
            </div>
        </div>
    )

}
