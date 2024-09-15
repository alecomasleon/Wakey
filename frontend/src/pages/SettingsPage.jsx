import { useState } from "react"
import runChat from '/Users/alejandro/VSCodeProjects/Wakey/src/speech_chat.ts'

const SettingsPage = () => {
    const [a, setA] = useState(0)
    const [text, setText] = useState('')

    const speak = async (stream) => {
        let chatbot = ""
        for await (const chat of stream) {
            if (chat.eventType === "text-generation") {
                chatbot += chat.text
            }
        }
        setText(chatbot)
        return chatbot
    }

    if (a == 0) {
        return (
            <button 
                type="button"
                className="bg-white rounded-lg px-4 py-6 flex-[0.8] h-5"
                onClick={() => {
                    setA(1)
                    runChat(speak)
                }}
            >
                PICK UP CALL
            </button>
        )
    } else {
        return (<div>{text}</div>)
    }
}

export default SettingsPage;