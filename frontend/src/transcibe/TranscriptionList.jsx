import React from 'react';
import {TranscriptionItem} from "./TranscriptionItem.jsx";

export function TranscriptionList({files, transcriptions}) {
    return (
        <div>
            {files.length > 0 && (
                <div>
                    <h2>Uploaded Files and Transcriptions</h2>
                    <div>
                        {files.map((file, index) => (
                            <TranscriptionItem
                                key={index}
                                file={file}
                                transcription={transcriptions[file.name]}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}