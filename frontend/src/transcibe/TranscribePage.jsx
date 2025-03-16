// TranscribeHandlers.js
import {useRef} from 'react';

// Function to handle file upload
export const useFileUploadHandler = (setTranscriptions, setFiles) => {
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Replace the current file list with the newly uploaded files
        setFiles(selectedFiles);
        setTranscriptions({}); // Clear existing transcriptions

        // Post files to the /transcribe endpoint
        postFileToTranscribe(selectedFiles, setTranscriptions, setFiles);

        // Clear the input field to refresh it
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input value
        }
    };

    return {handleFileUpload, fileInputRef};
};

// Function to post files for transcription
export const postFileToTranscribe = (files, setTranscriptions, setFiles) => {
    const formData = new FormData();
    files.map((file) => formData.append('files', file));

    fetch('http://127.0.0.1:5000/api/transcribe', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to transcribe files');
            }
            return response.json();
        })
        .then((body) => {
            // Update transcriptions
            const updatedTranscriptions = {};
            files.forEach((file, index) => {
                updatedTranscriptions[file.name] =
                    body.transcriptions[index]?.transcription || 'No transcription available';
            });
            setTranscriptions(updatedTranscriptions);
        })
        .catch(() => {
            alert('There was an error uploading files or processing transcriptions.');
            setFiles([]);
            setTranscriptions({});
        });
};

// Transcribe Page Component
export const TranscribePage = ({files, setFiles, transcriptions, setTranscriptions}) => {
    const {handleFileUpload, fileInputRef} = useFileUploadHandler(setTranscriptions, setFiles);

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
            {files.length > 0 && (
                <div>
                    <h2>Uploaded Files and Transcriptions</h2>
                    <div>
                        {files.map((file, index) => (
                            <div key={index}>
                                <strong>File:</strong> {file.name}
                                <br/>
                                <strong>Transcription:</strong>{' '}
                                {transcriptions[file.name] ? transcriptions[file.name] : 'Processing...'}
                                <br/>
                                <br/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};