import React from "react";

export function SearchForm({ query, setQuery, onSearch, isLoading }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter filename"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Searching..." : "Search"}
            </button>
        </form>
    );
}