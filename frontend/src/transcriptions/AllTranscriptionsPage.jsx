import React from "react";
import {useTranscriptions} from "./hooks/useTranscriptions.jsx";
import {TranscriptionList} from "./components/TranscriptionList.jsx";

export function AllTranscriptionsPage() {
    const {transcriptions, loading, error} = useTranscriptions();

    if (loading) {
        return <div>Loading transcriptions...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>All Transcriptions</h1>
            <TranscriptionList transcriptions={transcriptions}/>
        </div>
    );
}