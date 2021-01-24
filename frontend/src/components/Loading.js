import './Loading.css'
function Loading() {
    return (
        <svg width="200" height="250" viewBox="0 0 50 50">
            <polygon stroke-width="1" stroke="#171717" fill="none"
                points="20,1 40,40 1,40"></polygon>
            <text fill="#171717" x="10" y="52">Loading</text>
        </svg>
    )
}

export default Loading
