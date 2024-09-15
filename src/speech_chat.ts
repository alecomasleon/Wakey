import { StreamedChatResponse } from "cohere-ai/api";
import { Stream } from "cohere-ai/core";
import generateResponse, { ChatMessage } from "./genai";
import { listenWrapper } from "./listen";
import generateResponseWithSchedule from "./genai_with_schedule";


async function consoleSpeak(stream: Stream<StreamedChatResponse>) {
    let chatbot = ""
    for await (const chat of stream) {
        if (chat.eventType === "text-generation") {
            process.stdout.write(chat.text)
            chatbot += chat.text
        }
    }
    process.stdout.write('\n')
    return chatbot
}

export default async function runChat(topic: string, speak: any) {
    if (!speak) {
        speak = consoleSpeak
    }
    const chatHistory: ChatMessage[] = []
    let user = "Please wake me up."

    while (true) {
        const {stream, ready} = await generateResponseWithSchedule(topic, user, chatHistory)
        process.stdout.write("CHATBOT: ")
        const chatbot = await speak(stream)
        chatHistory.push({role: "CHATBOT", message: chatbot})
        if (ready) {
            console.log("READY")
            break // here we also want to end 
        }

        process.stdout.write("USER: ")
        user = ''
        while (user == '') {
            user = await listenWrapper()
        }
        chatHistory.push({role: "USER", message: user})

        if (user == 'q') {
            break
        }
    }

    console.log("ALL DONE")
}

if (require.main === module) {
    runChat("Ask me what I want to wear for the day. I like fashion", undefined)
}