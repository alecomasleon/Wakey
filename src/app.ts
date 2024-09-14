import generateResponse, { ChatMessage } from "./genai";
import * as readline from 'readline';

export default async function runChat() {
    const topic = "Ask me what i want to wear for the day. I like fashion"
    const chatHistory: ChatMessage[] = []
    let user = "Please wake me up."

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function askQuestion(query: string): Promise<string> {
        return new Promise((resolve) => rl.question(query, resolve));
    }

    while (true) {
        const {stream, ready} = await generateResponse(topic, user, chatHistory)
        let chatbot = ""
        process.stdout.write("CHATBOT: ")
        for await (const chat of stream) {
            if (chat.eventType === "text-generation") {
                process.stdout.write(chat.text)
                chatbot += chat.text
            }
        }
        process.stdout.write('\n')
        chatHistory.push({role: "CHATBOT", message: chatbot})

        if (ready) {
            console.log("READY")
            break
        }

        user = await askQuestion("USER: ")
        chatHistory.push({role: "USER", message: user})

        if (user == 'q') {
            break
        }
    }

    rl.close()
}