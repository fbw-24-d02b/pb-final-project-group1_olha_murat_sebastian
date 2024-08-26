import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import player from 'play-sound';
import figlet from 'figlet';

console.log(
    figlet.textSync("mp 3!", {
      font: "Ghost",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
);

let songs = JSON.parse(fs.readFileSync('music.json', 'utf8'));
let playlists = JSON.parse(fs.readFileSync('playlists.json', 'utf8')).playlists;
let currentSong = null;
let isPlaying = false;
let currentPlaylist = null;

function playSong(song) {
    if (isPlaying && currentSong) {
        stopSong();
    }
    console.log(chalk.green(`Playing: ${song.title} by ${song.interpret}`));
    currentSong = player().play(song.path, function(err) {
        if (err) {
            console.log(chalk.red('Error playing song: '), err);
            return;
        }
        isPlaying = false;
        currentSong = null;
    });
    isPlaying = true;
}

function stopSong() {
    if (currentSong) {
        currentSong.kill();
        console.log(chalk.yellow('Stopped the song.'));
        isPlaying = false;
        currentSong = null;
    }
}

function pauseSong() {
    if (currentSong) {
        // Pause functionality might require different implementation
        console.log(chalk.yellow('Paused the song.'));
    }
}

function shufflePlaylist() {
    if (currentPlaylist) {
        currentPlaylist.songs = currentPlaylist.songs.sort(() => Math.random() - 0.5);
        console.log(chalk.blue('Playlist shuffled.'));
    }
}

function viewPlaylist() {
    if (currentPlaylist) {
        console.log(chalk.cyan(`Viewing playlist: ${currentPlaylist.name}`));
        currentPlaylist.songs.forEach((song, index) => {
            console.log(`${index + 1}. ${song.title} - ${song.interpret}`);
        });
    } else {
        console.log(chalk.red('No playlist selected.'));
    }
}

function savePlaylists() {
    fs.writeFileSync('playlists.json', JSON.stringify({ playlists }, null, 2));
    console.log(chalk.green('Playlists saved.'));
}

async function addSongToPlaylist(songTitle) {
    const song = songs.find(s => s.title === songTitle);
    if (song && currentPlaylist) {
        currentPlaylist.songs.push(song);
        console.log(chalk.green(`Added "${songTitle}" to the playlist "${currentPlaylist.name}".`));
    } else {
        console.log(chalk.red('Song not found or no playlist selected.'));
    }
}

async function deleteSongFromPlaylist(songTitle) {
    if (currentPlaylist) {
        const songIndex = currentPlaylist.songs.findIndex(s => s.title === songTitle);
        if (songIndex > -1) {
            currentPlaylist.songs.splice(songIndex, 1);
            console.log(chalk.green(`Deleted "${songTitle}" from the playlist "${currentPlaylist.name}".`));
        } else {
            console.log(chalk.red('Song not found in the playlist.'));
        }
    } else {
        console.log(chalk.red('No playlist selected.'));
    }
}

async function createPlaylist() {
    const { name } = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the new playlist:'
    });

    const newPlaylist = { name, songs: [] };
    playlists.push(newPlaylist);
    currentPlaylist = newPlaylist;
    console.log(chalk.green(`Created and selected new playlist "${name}".`));
}

async function selectPlaylist() {
    const { playlistName } = await inquirer.prompt({
        name: 'playlistName',
        type: 'list',
        message: 'Select a playlist:',
        choices: playlists.map(pl => pl.name)
    });

    currentPlaylist = playlists.find(pl => pl.name === playlistName);
    console.log(chalk.green(`Selected playlist "${currentPlaylist.name}".`));
}

async function addNewSong() {
    const newSong = await inquirer.prompt([
        { name: 'title', type: 'input', message: 'Enter song title:' },
        { name: 'interpret', type: 'input', message: 'Enter artist name:' },
        { name: 'album', type: 'input', message: 'Enter album name:' },
        { name: 'genre', type: 'input', message: 'Enter genre:' },
        { name: 'length', type: 'number', message: 'Enter song length (seconds):' },
        { name: 'type', type: 'list', message: 'Select file type:', choices: ['mp3', 'wav', 'wmx'] },
        { name: 'path', type: 'input', message: 'Enter file path:' }
    ]);

    songs.push(newSong);
    fs.writeFileSync('music.json', JSON.stringify(songs, null, 2));
    console.log(chalk.green(`Added new song "${newSong.title}".`));
}

async function mainMenu() {
    const choices = [
        { name: 'Play/Pause', value: 'playPause' },
        { name: 'Stop', value: 'stop' },
        { name: 'Shuffle Playlist', value: 'shuffle' },
        { name: 'Add Song to Playlist', value: 'addSong' },
        { name: 'Delete Song from Playlist', value: 'deleteSong' },
        { name: 'View Playlist', value: 'viewPlaylist' },
        { name: 'Save Playlist', value: 'savePlaylist' },
        { name: 'Create Playlist', value: 'createPlaylist' },
        { name: 'Select Playlist', value: 'selectPlaylist' },
        { name: 'Add New Song', value: 'addNewSong' },
        { name: 'Exit', value: 'exit' }
    ];

    const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Choose an action:',
        choices
    });

    switch (action) {
        case 'playPause':
            if (isPlaying) pauseSong();
            else {
                const { songTitle } = await inquirer.prompt({
                    name: 'songTitle',
                    type: 'list',
                    message: 'Select a song to play:',
                    choices: currentPlaylist ? currentPlaylist.songs.map(s => s.title) : songs.map(s => s.title)
                });
                const song = songs.find(s => s.title === songTitle);
                playSong(song);
            }
            break;
        case 'stop':
            stopSong();
            break;
        case 'shuffle':
            shufflePlaylist();
            break;
        case 'addSong':
            const { addSongTitle } = await inquirer.prompt({
                name: 'addSongTitle',
                type: 'list',
                message: 'Select a song to add to the playlist:',
                choices: songs.map(s => s.title)
            });
            addSongToPlaylist(addSongTitle);
            break;
        case 'deleteSong':
            const { deleteSongTitle } = await inquirer.prompt({
                name: 'deleteSongTitle',
                type: 'list',
                message: 'Select a song to delete from the playlist:',
                choices: currentPlaylist ? currentPlaylist.songs.map(s => s.title) : []
            });
            deleteSongFromPlaylist(deleteSongTitle);
            break;
        case 'viewPlaylist':
            viewPlaylist();
            break;
        case 'savePlaylist':
            savePlaylists();
            break;
        case 'createPlaylist':
            createPlaylist();
            break;
        case 'selectPlaylist':
            selectPlaylist();
            break;
        case 'addNewSong':
            addNewSong();
            break;
        case 'exit':
            stopSong();
            savePlaylists();
            console.log(chalk.green('Goodbye!'));
            process.exit(0);
    }

    mainMenu();
}

mainMenu();
