import {useState} from 'react';

export function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false); // Tracks whether a search has been performed

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        if (!query.trim()) {
            alert('Please enter a filename to search.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setHasSearched(false); // Reset the search state before starting a new search

        try {
            // Send GET request to /search endpoint
            const response = await fetch(`http://127.0.0.1:5000/search?filename=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }

            const data = await response.json();

            // Update the search results
            setResults(data.transcriptions || []);
            setHasSearched(true); // Mark that a search has been completed
        } catch (error) {
            setError('Failed to perform search. Please try again later.');
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Search Transcriptions</h1>

            {/* Search Form */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter filename"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {/* Error Message */}
            {error && <div style={{color: 'red'}}>{error}</div>}

            {/* Results Section */}
            {hasSearched && results.length > 0 && (
                <div>
                    <h2>Search Results</h2>
                    <div>
                        {results.map((result, index) => (
                            <div key={index}>
                                <hr/>
                                <strong>Filename:</strong> {result.filename}
                                <br/>
                                <strong>Transcription:</strong>{' '}
                                {result.transcription || 'No transcription available'}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* No Results Found Message */}
            {hasSearched && results.length === 0 && !isLoading && (
                <div>
                    <h2>Search Results</h2>
                    <p>No results found for the query.</p>
                </div>
            )}
        </div>
    );
}