import {useState} from 'react'
import './App.css'

function App() {
    const [files, setFiles] = useState([]);
    const [transcriptions, setTranscriptions] = useState({});

    // Handle file selection
    const handleFileUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const transcribeFiles = () => {
        const mockTranscriptions = {};
        files.forEach((file, index) => {
            mockTranscriptions[file.name] = `This is a mock transcription for "${file.name}"`;
        });
        setTranscriptions(mockTranscriptions);
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
                    {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            </div>

            <h2>Uploaded Files and Transcriptions</h2>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <strong>File:</strong> {file.name}
                        <br />
                        <strong>Transcription:</strong>{' '}
                        {transcriptions[file.name]
                            ? transcriptions[file.name]
                            : 'No transcription available yet.'}
                    </li>
                ))}
            </ul>

        </>
    )
}

export default App
