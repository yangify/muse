import { useState, useEffect } from "react";

export function AllTranscriptionsPage() {
    const [transcriptions, setTranscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch transcriptions from API
        fetch("http://127.0.0.1:5000/api/transcriptions")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch transcriptions");
                }
                return response.json();
            })
            .then((data) => {
                setTranscriptions(data.transcriptions || []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading transcriptions...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>All Transcriptions</h1>
            {transcriptions.length === 0 ? (
                <div>No transcriptions available</div>
            ) : (
                <div>
                    {transcriptions.map((item, index) => (
                        <div key={index} style={{ marginBottom: "1rem" }}>
                            <hr/>
                            <p><strong>Filename:</strong> {item.filename}</p>
                            <p><strong>Transcription:</strong> {item.transcription}</p>
                            <p>
                                <strong>Created At:</strong>{" "}
                                {new Date(item.createdTimestamp).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}