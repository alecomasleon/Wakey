import { useState } from "react"
import runChat from '/Users/alejandro/VSCodeProjects/Wakey/src/speech_chat.ts'

const SettingsPage = () => {
    const [a, setA] = useState(0)
    const [chatBotText, setChatBotText] = useState('')
    const [userText, setUserText] = useState('')

    const setChatBot = async (stream) => {
        console.log("LOOK ITS HERE")
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

    if (a == 0) {
        return (
            <button 
                type="button"
                className="bg-white rounded-lg px-4 py-6 flex-[0.8] h-5"
                onClick={() => {
                    setA(1)
                    runChat("I like turtles", setChatBot, setUser)
                }}
            >
                PICK UP CALL
            </button>
        )
    } else {
        return (
            <>
                <button 
                    type="button"
                    className="bg-white rounded-lg px-4 py-6 flex-[0.8] h-5"
                >
                    {chatBotText}
                </button>
                <button 
                    type="button"
                    className="bg-white rounded-lg px-4 py-6 flex-[0.8] h-5"
                >
                    {userText}
                </button>
            </>
        )
    }
}

export default SettingsPage;
