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


def get_all():
    """
    Retrieve all transcriptions from the 'transcriptions' table in the SQLite database.

    Returns:
        List[Dict[str, str]]: A list of dictionaries where each dictionary represents
        a transcription record with 'filename' and 'transcription' keys.
    """
    conn = sqlite3.connect('transcriptions.db')
    cur = conn.cursor()
    cur.execute('SELECT filename, transcription FROM transcriptions')
    rows = cur.fetchall()
    conn.close()
    return [{"filename": filename, "transcription": transcription} for filename, transcription in rows]
