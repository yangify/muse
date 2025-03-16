import React from "react";
import {useSearch} from "./hooks/useSearch.jsx";
import {SearchForm} from "./components/SearchForm.jsx";
import {SearchResults} from "./components/SearchResults.jsx";


export function SearchPage() {
    const {query, setQuery, results, isLoading, error, hasSearched, search} = useSearch();

    return (
        <div>
            <h1>Search Transcriptions</h1>
            <SearchForm
                query={query}
                setQuery={setQuery}
                onSearch={search}
                isLoading={isLoading}
            />
            <SearchResults results={results} hasSearched={hasSearched} error={error}/>
        </div>
    );
}