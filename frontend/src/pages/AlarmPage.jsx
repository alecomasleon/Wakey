import { FaBell } from "react-icons/fa";


const AlarmPage = ({}) => {

    return (
        <div
            className="
                backdrop-blur-md pointer-events-none
                h-dvh z-50 w-dvw bg-white bg-opacity-5
                fixed top-0 left-0
                flex flex-col justify-between items-center
                py-12 px-2
            "
        >
            <h1
                className="text-8xl text-white font-thin"
            >
                CALL MF
            </h1>
            <FaBell className="bell text-9xl" />
            <button
                className="
                    text-3xl
                    bg-white px-16 py-4
                    shadow-2xl
                    rounded-full
                "
            >
                Pick Up
            </button>
        </div>
    )
}

export default AlarmPage;