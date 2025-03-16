import React from "react";
import {useTranscriptionUpload} from "./hooks/useTranscriptionUpload.jsx";
import {FileUploadInput} from "./Components/FileUploadInput.jsx";
import {TranscriptionList} from "./Components/TranscriptionList.jsx";

export function TranscribePage() {
    const {files, transcriptions, error, handleFilesUpload} = useTranscriptionUpload();

    return (
        <div>
            <h1>Audio File Transcription</h1>
            <FileUploadInput onUpload={handleFilesUpload}/>
            {error && <div style={{color: "red"}}>{error}</div>}
            {files.length > 0 && (
                <TranscriptionList files={files} transcriptions={transcriptions}/>
            )}
        </div>
    );
}