import {useRef, useState} from 'react';
import {TranscriptionList} from "./TranscriptionList.jsx";

export function TranscribePage() {
    const [files, setFiles] = useState([]);
    const [transcriptions, setTranscriptions] = useState({});
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Replace the current file list with the newly uploaded files
        setFiles(selectedFiles);
        setTranscriptions({}); // Clear existing transcriptions

        // Post files to the /transcribe endpoint
        transcribe(selectedFiles);

        // Clear the input field to refresh it
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input value
        }
    };

    const transcribe = async (files) => {
        const formData = new FormData();
        files.map((file) => formData.append('files', file));

        const response = await fetch('http://127.0.0.1:5000/transcribe', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            console.error('Error during transcription:', error);
            alert('An error occurred while uploading files or processing transcriptions. Please try again.');
            setFiles([]);
            setTranscriptions({});
            return;
        }

        const body = await response.json();
        const updatedTranscriptions = files.reduce((acc, file, index) => {
            acc[file.name] = body.transcriptions[index]?.transcription || 'No transcription available';
            return acc;
        }, {});

        setTranscriptions(updatedTranscriptions);
    };

    return (
        <div>
            <h1>Audio File Transcription</h1>
            <input
                type="file"
                accept="audio/*"
                multiple
                ref={fileInputRef} // Attach the ref to the input element
                onChange={handleFileUpload}
            />

            {files.length > 0 &&
                <TranscriptionList files={files} transcriptions={transcriptions}/>
            }
        </div>
    );
}