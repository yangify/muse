"""
This module provides an initialization function for setting up the database used
to store transcriptions. It creates a 'transcriptions' table if it does not
already exist in the 'transcriptions.db' file.
"""

import sqlite3


def init():
    """
    Initialize the 'transcriptions.db' SQLite database.

    1. Connects to the 'transcriptions.db' database.
    2. Creates a 'transcriptions' table with columns for:
       - id            (integer primary key auto-increment)
       - filename      (text, not null)
       - transcription (text)
       - created_at    (timestamp, defaults to the current time)
    3. Commits the changes and closes the connection.

    No parameters are required and no values are returned.
    """
    conn = sqlite3.connect('transcriptions.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS transcriptions (
            filename TEXT PRIMARY KEY,
            transcription TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()
