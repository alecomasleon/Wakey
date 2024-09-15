// mode = 0 for user talking
// mode = 1 for chatbot talking
const CallPage = ({mode, chatBotText, userText}) => {
    return (
        <>
            <button 
                type="button"
                className="bg-white rounded-lg px-4 py-6 flex-[0.8] h-5"
            >
                {mode ? 'ChatBot speaking' : 'You\'re speaking'}
            </button>
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
                {mode ? userText : 'Listening...'}
            </button>
        </>
    )
}

export default CallPage;
