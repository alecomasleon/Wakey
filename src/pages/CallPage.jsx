const CallPage = ({isChatSpeaking, chatBotText, userText}) => {
    return (
        <>
            <button 
                type="button"
                className="bg-white rounded-lg px-4 py-6 flex-[0.8] h-5"
            >
                {isChatSpeaking ? 'ChatBot speaking' : 'You\'re speaking'}
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
                {isChatSpeaking ? userText : 'Listening...'}
            </button>
        </>
    )
}

export default CallPage;
