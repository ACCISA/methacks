import React, { useState, useRef, useEffect } from "react"
import { Progress, Button } from "flowbite-react"

export default function Flowbite() {

    const [progress, setProgress] = useState(0)
    const progressBar = useRef()
    function handleProgress(ev) {
        setProgress(15 + progress)
        if (15 + progress > 40) {
            progressBar.current.style.backgroundColor = "red";
        }
        // progressBar.current.className = "bg-blue-600 h-2.5 rounded-full"
        progressBar.current.style.width = progress + "px"

    }

    useEffect(() => {

    }, [progressBar])

    return (

        <>

            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div ref={progressBar} className="bg-blue-600 h-2.5 rounded-full w-0" ></div>
            </div>

            {/* <Progress progress={progress} ref={progressBar} /> */}
            <Button onClick={handleProgress}>
                Default
            </Button></>


    )
}