"""
This module provides functions for inserting and retrieving transcription
records in an SQLite database. The main functionalities include:

    - Saving a single transcription
    - Bulk saving multiple transcriptions
    - Retrieving all transcriptions
    - Searching transcriptions by partial filename
"""

import sqlite3


def save(filename, transcription):
    """
    Insert a transcription record into the 'transcriptions' table of an SQLite database.

    Args:
        filename (str): The name of the file associated with the transcription.
        transcription (str): The text content of the transcription.

    Example:
        save("audio_001.mp3", "Transcribed text goes here...")

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


def save_all(transcriptions):
    """
    Insert multiple transcription records into the 'transcriptions' table.

    Args:
        transcriptions (List[Tuple[str, str]]): A list of (filename, transcription) tuples.

    Example:
        save_all([
            ("audio_001.mp3", "First transcription text..."),
            ("audio_002.mp3", "Second transcription text...")
        ])

    Returns:
        None
    """
    for transcription in transcriptions:
        save(transcription['filename'], transcription['transcription'])


def get_all():
    """
    Retrieve all transcriptions from the 'transcriptions' table in the SQLite database.

    Returns:
        List[Dict[str, str]]: A list of dictionaries where each dictionary represents
        a transcription record with 'filename' and 'transcription' keys.
    """
    conn = sqlite3.connect('transcriptions.db')
    cur = conn.cursor()
    cur.execute('SELECT * FROM transcriptions')
    rows = cur.fetchall()
    conn.close()
    return unpack_transcription_rows(rows)


def search_by_filename(filename):
    """
    Perform a partial match search on the 'transcriptions' table based on the filename.

    Args:
        filename (str): The partial filename to search for.

    Returns:
        List[Dict[str, str]]: A list of dictionaries where each dictionary represents
        a transcription record that matches the filename.
    """
    conn = sqlite3.connect('transcriptions.db')
    cur = conn.cursor()
    cur.execute('''
        SELECT * FROM transcriptions
        WHERE filename LIKE ?''', ('%' + filename + '%',))
    rows = cur.fetchall()
    conn.close()
    return unpack_transcription_rows(rows)


def unpack_transcription_rows(rows):
    return [{"id": id, "filename": filename, "transcription": transcription, "createdTimestamp": created_at} for
            id, filename, transcription, created_at in rows]
