import Post from "../Post";
import { useState } from "react";
import Header from '../Header';
import HeaderIndex from "../HeaderIndex";

export default function IndexPage() {
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

        <div style={bg} id="bkng" className="p-0 h-full  flex-col justify-center align-middle">
            <HeaderIndex />

            <div className="searchBar content-center flex items-center justify-center">
                <form onSubmit={handleUrlForm} className="w-96 mt-32 w-100 text-center">
                    <input value={url} onChange={ev => { setUrl(ev.target.value) }} type="text" className='text-white h-10 placeholder:text-white mb-3 border-white px-4 bg-transparent rounded-md' placeholder="Paste URL" />
                    <label for="file" class="flex items-center text-left w-full bg-transparent border-2 text-white py-2 px-4 h-10 rounded-md cursor-pointer">
                        Upload a file
                    </label>
                    <input id="file" name="file" type="file" class="hidden" />

                </form>
            </div>
            <div className="Buttons mt-25 pd-[20px] flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">
                <button id="uploadBtn" className=" bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md w-[125px] py-3 px-2 mt-10" >Find Recipe</button>
            </div>
        </div>
    )
}
