import { useState } from "react";

export function useTranscriptionUpload() {
    const [files, setFiles] = useState([]);
    const [transcriptions, setTranscriptions] = useState({});
    const [error, setError] = useState(null);

    const transcribe = async (selectedFiles) => {
        const formData = new FormData();
        selectedFiles.forEach((file) => formData.append("files", file));

        try {
            const response = await fetch("http://localhost:8000/transcribe", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to process transcriptions");
            }

            const body = await response.json();
            const updatedTranscriptions = selectedFiles.reduce((acc, file, index) => {
                acc[file.name] = body.transcriptions[index]?.transcription || "No transcription available";
                return acc;
            }, {});

            setTranscriptions(updatedTranscriptions);
        } catch (err) {
            console.error("Transcription error:", err);
            setError("An error occurred while uploading files or processing transcriptions. Please try again.");
            setFiles([]);
            setTranscriptions({});
        }
    };

    const handleFilesUpload = (selectedFiles) => {
        setFiles(selectedFiles);
        setTranscriptions({});
        setError(null);
        transcribe(selectedFiles);
    };

    return { files, transcriptions, error, handleFilesUpload };
}