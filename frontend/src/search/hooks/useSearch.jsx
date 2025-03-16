import { useState } from "react";

export function useSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const search = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setError("Please enter a valid search query.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setHasSearched(false);

        try {
            const response = await fetch(`http://localhost:8000/search?filename=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }

            const data = await response.json();
            setResults(data.transcriptions || []);
            setHasSearched(true);
        } catch (err) {
            console.error("Search error:", err);
            setError("Failed to perform search. Please try again later.");
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    return { query, setQuery, results, isLoading, error, hasSearched, search };
}