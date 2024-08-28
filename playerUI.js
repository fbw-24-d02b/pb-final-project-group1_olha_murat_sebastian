import chalk from "chalk";
import Enquirer from "enquirer";
import figlet from "figlet";
import songList from "./data/music.json" assert { type: "json" };
import playList from "./data/playlist.json" assert { type: "json" };
import {
  add2playlist,
  removeFromPlaylist,
  addNewSong,
  saveList,
  fetchFromList,
} from "./resources/song-utility.js";
import {
  playerPlay,
  playerPause,
  playerSkip,
  playerStop,
} from "./resources/player-utility.js";
const warning = chalk.hex('#FFA500');  // Orange warning color
const enquirer = new Enquirer();


// Array representing the player main menu
const mainMenu = [
  { name: "Exit", value: "exit" },
  { name: "Add Song", value: "add song" },
  { name: "Music list", value: "music list" },
  { name: "Add to playlist", value: "add to playlist" },
  { name: "Delete from playlist", value: "delete from playlist" },
  { name: "Playlist", value: "playlist" },
  { name: "Play", value: "play" },
  { name: "Pause", value: "pause" },
  { name: "Stop", value: "stop" },
  { name: "Skip", value: "skip" },
];

console.log(
  figlet.textSync("mp 3!", {
    font: "Ghost",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  })
);

let currentSong = null;
while (true) {
  const prompt = new Enquirer.Select({
    name: "main menu",
    message: "Pick a function: ",
    choices: mainMenu,
  });

  const decision = await prompt.run();

  switch (decision) {
    case "Exit":
      playerStop();
      process.exit();
    case "Add Song":
      await addNewSong(songList);
      break;
    case "Music list":
      currentSong = await fetchFromList(songList);
      break;
    case "Add to playlist":
      if (currentSong) {
        add2playlist(currentSong, playList);
      } else {
        console.log(warning("Kein Song ausgewählt!"));
      }
      break;
    case "Delete from playlist":
      if (currentSong) {
        removeFromPlaylist(currentSong, playList);
      } else {
        console.log(warning("Kein Song ausgewählt!"));
      }
      break;
    case "Playlist":
      currentSong = await fetchFromList(playList);
      break;
    case "Play":
      await playerPlay(currentSong);
      break;
    case "Pause":
      playerPause();
      break;
    case "Stop":
      playerStop();
      break;
    case "Skip":
      playerSkip(currentSong, playList);
      break;
  }
}
