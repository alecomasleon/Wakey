import { useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import CallPage from "./CallPage";
import { useState } from "react"
import runChat from '../speech_chat.ts'


const AlarmPage = ({alarmActive, setAlarmActive}) => {
    const [isRinging, setIsRinging] = useState(true)
    const ring = new Audio('../../public/ring.mp3');
    ring.play();

    useEffect(() => {
        if(alarmActive === false) {
            ring.pause();
        }
    }, [alarmActive])

    useEffect(() => {
        setInterval(() => {
            ring.play();
        }, 300000);
    }, []);


    const [chatBotText, setChatBotText] = useState('')
    const [userText, setUserText] = useState('')
    const [isChatSpeaking, setIsChatSpeaking] = useState(true)

    const setChatBot = async (stream) => {
        let chatbot = ""
        for await (const chat of stream) {
            if (chat.eventType === "text-generation") {
                chatbot += chat.text
                setChatBotText(chatbot)
            }
        }
        setChatBotText(chatbot)
        return chatbot
    }

    const setUser = async (text) => {
        setUserText(text)
        return text
    }

    const end = () => {
        setAlarmActive(false)
    }

    return (
        <div
            className="
                backdrop-blur-md
                h-dvh z-50 w-dvw bg-white bg-opacity-5
                fixed top-0 left-0
                flex flex-col justify-between items-center
                py-12 px-2
            "
        >
            {
                isRinging ?
                <>
                    <h1
                        className="text-8xl text-white font-thin"
                    >
                        CALL MF
                    </h1>
                    <FaBell className="bell text-9xl" />
                    <button
                        onClick={() => {
                            setIsRinging(false)
                            runChat("I like turtles" /*WE NEED A WAY TO DYNAMICALLY SET THE TOPIC*/, setChatBot, setUser, end, setIsChatSpeaking)
                            console.log('do the cohere thing')
                        }}
                        className="
                            text-6xl
                            bg-green-500 text-white p-8
                            shadow-2xl
                            rounded-full aspect-square
                        "
                    >
                        <FaPhone/>
                    </button>
                </>
                :
                <CallPage isChatSpeaking={isChatSpeaking} chatBotText={chatBotText} userText={userText} />
            }
        </div>
    )
}

export default AlarmPage;