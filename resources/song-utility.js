import chalk from "chalk";
import Enquirer from "enquirer";
import fs from "fs";
const warning = chalk.hex("#FFA500"); // Orange warning color


/**
 * Saves songlist to JSON
 * @param {Object[]} songList to save to file
 */
export function saveList(songList) {
  fs.writeFileSync("./data/music.json", JSON.stringify(songList, null, 2));
  console.log(chalk.green("Songlist saved successfully!"));
}

/**
 * Adds a song to the playlist
 * @param {Object} song  Song to add to playlist
 * @param {Object[]} playList   playlist that gets extended
 * @returns {Object[]} altered playlist
 */
export function add2playlist(song, playList) {
  playList.push(song);
  fs.writeFileSync(
    "./data/playlist.json",
    JSON.stringify({ playList }, null, 2)
  );
  console.log(chalk.green(`Added ${song.title} to playlist!`));
  return playList;
}

/**
 * Removes a song from the playlist
 * @param {Object} song
 * @param {Object[]} playList
 * @returns {Object[]} Altered playlist
 */
export function removeFromPlaylist(song, playList) {
  const index = playList.findIndex(
    (item) => item.title === song.title && item.album === song.album
  );
  if (index !== -1) {
    playList.splice(index, 1);
  }
  console.log(warning(`Removed ${song.title} from playlist!`));
  return playList;
}

/**
 * Adds a new song to the songList
 * @param {Object[]} songList New song gets added to this list
 * @returns {Object[]} Altered songlist
 */
export async function addNewSong(songList) {
  const enquirer = new Enquirer();
  const questions = [
    {
      type: "input",
      name: "title",
      message: "Insert song title: ",
    },
    {
      type: "input",
      name: "interpret",
      message: "Insert interpret: ",
    },
    {
      type: "input",
      name: "album",
      message: "Insert album name: ",
    },
    {
      type: "input",
      name: "genre",
      message: "Insert genre: ",
    },
    {
      type: "input",
      name: "length",
      message: "Insert song length (in seconds!): ",
    },
    {
      type: "input",
      name: "type",
      message: "Insert file type (mp3, wav, wma, ...): ",
    },
    {
      type: "input",
      name: "path",
      message: "Insert full path (incl. file name): ",
    },
  ];
  const song = await enquirer.prompt(questions);

  songList.push(song);

  saveList(songList);

  return songList;
}

/**
 * Selects a Song from the Songlist.
 * @param {Object[]} musicList
 * @returns {Object} song
 */
export async function fetchFromList(songList) {
  if (songList.length === 0) {
    console.log(warning("Liste ist leer!"));
    return null;
  }
  const musicList = songList.map((song) => {
    return {
      name: `${song.title}, ${song.interpret}, ${song.length}`,
      value: `${song.title}, ${song.interpret}, ${song.length}`,
    };
  });
  const prompt = new Enquirer.Select({
    name: "song menu",
    message: "Pick a song: ",
    choices: musicList,
  });

  const decision = await prompt.run();
  const decisionList = decision.split(", ");

  const song = songList.find(
    (item) =>
      item.title === decisionList[0] && item.interpret === decisionList[1]
  );

  if (song) {
    return song;
  } else {
    console.log(warning("Song nicht gefunden!"));
    return null;
  }
}
