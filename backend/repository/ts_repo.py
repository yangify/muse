"""
This module provides a function for interacting with the transcriptions table
"""

import sqlite3


def save(filename, transcription):
    """
    Insert a given transcription into the 'transcriptions' table of an SQLite database.

    Args:
        filename (str): The name of the file associated with the transcription.
        transcription (str): The text content of the transcription.

    Returns:
        None
    """
    conn = sqlite3.connect('transcriptions.db')
    cur = conn.cursor()
    cur.execute('''
        INSERT INTO transcriptions (
            filename, 
            transcription
        ) VALUES (?, ?)''', (filename, transcription))
    conn.commit()
    conn.close()
