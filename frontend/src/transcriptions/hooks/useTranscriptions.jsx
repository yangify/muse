import { useState, useEffect } from "react";

export function useTranscriptions() {
    const [transcriptions, setTranscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch transcriptions from API
        fetch("http://localhost:8000/transcriptions")
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

    return { transcriptions, loading, error };
}