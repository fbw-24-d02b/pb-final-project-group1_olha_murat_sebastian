# Music Player

Die Idee war einen Musikplayer für das Terminal zu programmieren, der diverse Funktionen neben dem eigentlichen Playback hat.
Der Player sollte es ermöglichen, neue Lieder der Bibliothek hinzu zu fügen, er sollte das Anlegen einer Playlist und deren Speicherung in einer JSON-Datei unterstützen und auch Songs aus dieser Playlist entferenen können.
Ferner sollte er bekannte Musikplayer-Funktionen unterstützen wie z.B.: Play/Pause, Stop, Skip.


## Minimalanforderungen

1. Steuerung über `Enquirer` im Terminal.
2. Musikbibliothek in JSON-Datei ausgelagert.
3. Erstellen von Playlists 
4. Speichern von Playlists in JSON-Datei
5. Neuanlage von Liedern
6. Löschen von Lieder in der Playlist.


## Mögliche Ausbaustufen für die Zukunft.

7. Erstellen einer grafischen Benutzeroberfläche (electron)
8. Realisieren mit besserem Player (auch für Linux)
    * Jetziger Player unterstützt z.B. nicht die Pause-Funktion


## Vorgehensweise

1. Aufteilen npm Packages während der Orientierungs- und Einarbeitungsphase.
    * Olha: Player -> `play-sound`
    * Murat: `Chalk`, `Figlet` und `CLI` (Chalk-Doku siehe `chalk.md`)
    * Sebastian: `Enquirer`

2. Vorstellung der erarbeiteten Pakete im Team.

3. Mob-Programming für den eigentlichen Code.
    * Aufteilen der Aufgaben des Players in 3 einzelne Dateien: 
        * `playerUI` Als Main-Funktion und Zusammenführung der Utility-Funktionen.
        * `song-utility` Als Zusammenstellung aller Funktionen, welche für Listenmanagement, Listenauswahl, Song-Neuanlage zuständig sind.
        * `player-utility` Als Zusammenstellung aller Hilf-Funktionen, welche für das eigentliche Playback die verbindung zum verwendeten Player herstellen.

4. JSDOC und Code Polishing

5. Erstellen dieser README.md


## Schwierigkeiten

1. Player Dokumentation auf NPM praktisch nicht vorhanden und 2 Jahre alt. (für andere player sogar noch älter - bis zu 6 Jahre).
2. Arbeiten mit asynchronen Funktionen (kommt im Unterricht erst in einigen Wochen dran.)
3. Git Konflikte bei der parallelen Arbeit am Projekt -> umstellen auf Mob-programming.


## Verwendete NPM-Pakages

1. Enquirer
2. Chalk
3. Figlet
4. CLI
5. Play-Sound

6. FS als node Standardpaket