import React from "react";
import {useTranscriptionUpload} from "./useTranscriptionUpload.jsx";
import {FileUploadInput} from "./FileUploadInput.jsx";
import {TranscriptionList} from "./TranscriptionList.jsx";

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