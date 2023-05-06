import Post from "../Post";
import { useState } from "react";
import Header from '../Header';
import HeaderIndex from "../HeaderIndex";

export default function IndexPage(){
    const [url, setUrl] = useState('')


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

    function handleUrlForm(ev) {
        ev.preventDefault()
        // axios.get('/recipe')
    }

    return (

        <div style={bg} id= "bkng" className="p-0 h-full  flex-col justify-center align-middle">
            <HeaderIndex/>
            <div className="backdrop-blur-sm  content-center flex items-center justify-center h-32 mr-64 ml-64 mt-14 w-96">
                <p className="text-2xl">Recipes made according to your taste!</p>
            </div>
            <div className=" searchBar content-center mt-[48px] flex items-center justify-center">
                <form onSubmit={handleUrlForm} className="w-96 mt-10 w-100 text-center">
                    <input value={url} onChange={ev => {setUrl(ev.target.value)}} type="text" className='text-black bg-color bg-gray-700' placeholder="Paste URL" />
                    <input  className="bg-gray-700" type="file" />
                </form>
            </div>
            <div className="Buttons mt-25 pd-[20px] flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">
                <button id="folderBtn" className=" bg-green-600 rounded-full w-28 mt-10">Upload Image</button>
                <button id="uploadBtn" className=" bg-green-600 rounded-full w-28 mt-10" >Find Recipe</button>

            </div>
        </div>
    )
}
