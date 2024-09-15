import { StreamedChatResponse } from "cohere-ai/api";
import { Stream } from "cohere-ai/core";
import generateResponse, { ChatMessage } from "./genai";
import * as readline from 'readline';


async function listen() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const text = new Promise<string>((resolve) => rl.question("USER: ", resolve))
    return text
}

async function speak(stream: Stream<StreamedChatResponse>) {
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

export default async function runChat(topic: string) {
    const chatHistory: ChatMessage[] = []
    let user = "Please wake me up."

    while (true) {
        const {stream, ready} = await generateResponse(topic, user, chatHistory)
        process.stdout.write("CHATBOT: ")
        const chatbot = await speak(stream)
        chatHistory.push({role: "CHATBOT", message: chatbot})
        if (ready) {
            console.log("READY")
            break // here we also want to end 
        }

        user = await listen()
        chatHistory.push({role: "USER", message: user})

        if (user == 'q') {
            break
        }
    }
}

if (require.main === module) {
    runChat("Ask me what I want to wear for the day. I like fashion")
}