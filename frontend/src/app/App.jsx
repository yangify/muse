import {useState} from 'react'
import './App.css'
import {TranscribePage} from "../transcibe/TranscribePage.jsx";

function App() {
    const [currentPage, setCurrentPage] = useState("transcribe");

    return (<>
        {/* Navigation Buttons */}
        <div>
            <button onClick={() => setCurrentPage("transcribe")}>Transcribe</button>
            <button onClick={() => setCurrentPage("all")}>All Transcriptions</button>
            <button onClick={() => setCurrentPage("search")}>Search Transcriptions</button>
        </div>
        <div>
            {currentPage === 'transcribe' && <TranscribePage />}
        </div>
    </>)
}

export default App
