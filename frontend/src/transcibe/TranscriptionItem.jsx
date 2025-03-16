import React from 'react';

export function TranscriptionItem({file, transcription}) {
    return (
        <div>
            <hr/>
            <strong>File:</strong> {file.name}
            <br/>
            <strong>Transcription:</strong>{' '}
            {transcription ? transcription : 'Processing...'}
        </div>
    );
}
