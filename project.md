# Project: Media Player

1. Steuerung readline-sync in Terminal erfolgen.
2. Auswahl an Liedern aus JSON-Datei
3. Erstellen von Playlists 
4. Speichern von Playlists in JSON-Datei
5. Neuanlage von Liedern

# Funktionen des Players:

## Minimal:

1. Play/Pause
2. Shuffle
3. Add Song to playlist
4. Delete song from playlist
5. View playlist
6. Save playlist (JSON)
7. Stop
8. Exit (ends player)

## Nice to have:

9. Lautstärkeregler
10. Fortschritsbalken


# Struktur des Players:

* Lieder
* Steuerung
* Songliste (gesamt)
* Playlist


# Struktur von Liedern:

`
{
    title: string
    interpret: string
    album: string
    genre: string
    length: number
    type: "mp3" | "wav" | "wmx"
    path: string
}
`