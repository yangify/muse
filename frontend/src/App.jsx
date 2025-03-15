import {useState} from 'react'
import './App.css'

function App() {
    const [files, setFiles] = useState([]);
    const [transcriptions, setTranscriptions] = useState({});

    // Handle file selection and transcription immediately
    const handleFileUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Replace the current files and reset transcriptions
        setFiles(selectedFiles);

        // Clear current transcriptions and process new files
        const newTranscriptions = {};
        selectedFiles.forEach((file) => {
            transcribeFile(file, newTranscriptions);
        });

        // Set new transcriptions
        setTranscriptions(newTranscriptions);
    };

    // Mock function to transcribe a file
    const transcribeFile = (file, newTranscriptions) => {
        // Simulated transcription (e.g., replace with real API logic)
        const mockTranscription = `This is a mock transcription for "${file.name}"`;
        
        // Add to newTranscriptions object
        newTranscriptions[file.name] = mockTranscription;
    };

    return (
        <>
            <h1>Audio File Transcription</h1>
            <div className="upload-section">
                <input
                    type="file"
                    accept="audio/*"
                    multiple
                    onChange={handleFileUpload}
                />
                <h2>Uploaded Files</h2>
                <ul>
                    {files.map((file, index) => (<li key={index}>{file.name}</li>))}
                </ul>
            </div>

            <h2>Uploaded Files and Transcriptions</h2>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <strong>File:</strong> {file.name}
                        <br/>
                        <strong>Transcription:</strong>{' '}
                        {transcriptions[file.name]
                            ? transcriptions[file.name]
                            : 'Processing...'}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App
