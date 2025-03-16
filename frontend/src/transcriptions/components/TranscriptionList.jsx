import React from "react";

export function TranscriptionList({ transcriptions }) {
    if (!transcriptions || transcriptions.length === 0) {
        return <div>No transcriptions available</div>;
    }

    return (
        <div>
            {transcriptions.map((item, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                    <hr />
                    <p>
                        <strong>Filename:</strong> {item.filename}
                    </p>
                    <p>
                        <strong>Transcription:</strong> {item.transcription}
                    </p>
                    <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(item.createdTimestamp).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
}