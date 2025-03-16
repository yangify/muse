import React, { useRef } from "react";

export function FileUploadInput({ onUpload }) {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        onUpload(selectedFiles);

        // Reset the file input field for further uploads
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <input
            type="file"
            accept="audio/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
        />
    );
}