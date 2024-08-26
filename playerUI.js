import chalk from 'chalk';
import fs from 'fs';
import Enquirer from 'enquirer';
import player from 'play-sound';
import figlet from 'figlet';
import songList from "./data/music.json" assert {type: "json"};
import playList from "./data/playlist.json" assert {type: "json"};
import { add2playlist, removeFromPlaylist, addNewSong, saveList } from './resources/song-utility.js';

const enquirer = new Enquirer();

const mainMenu = [
    { name: "Exit", value: "exit"},
    { name: "Add Song", value: "add song"},
    { name: "Music list", value: "music list"},
    { name: "Add to playlist", value: "add to playlist"},
    { name: "Delete from playlist", value: "delete from playlist"},
    { name: "Playlist", value: "playlist"},
    { name: "Play", value: "play"},
    { name: "Pause", value: "pause"},
    { name: "Stop", value: "stop"},
    { name: "Skip", value: "skip"}
];

const musicList = songList.map(song => `${song.title}, ${song.interpret}, ${song.length}`);
const playlist = playList.map(song => `${song.title}, ${song.interpret}, ${song.length}`);


console.log(
    figlet.textSync("mp 3!", {
      font: "Ghost",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
);

while(true){
    const prompt = new Enquirer.Select({
        name: 'main menu',
        message: 'Pick a function: ',
        choices: mainMenu,
      });
      
    const decision = await prompt.run();

    switch(decision){
        case "exit":
            process.exit();
        case "add song":
            // TODO: switch case code here!!!
    }
}