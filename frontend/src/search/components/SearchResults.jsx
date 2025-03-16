import React from "react";

export function SearchResults({ results, hasSearched, error }) {
    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    if (hasSearched) {
        if (results.length > 0) {
            return (
                <div>
                    <h2>Search Results</h2>
                    <div>
                        {results.map((result, index) => (
                            <div key={index}>
                                <hr />
                                <strong>Filename:</strong> {result.filename}
                                <br />
                                <strong>Transcription:</strong>{" "}
                                {result.transcription || "No transcription available"}
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>Search Results</h2>
                    <p>No results found for the query.</p>
                </div>
            );
        }
    }

    return null; // Nothing to display if no search has happened yet
}