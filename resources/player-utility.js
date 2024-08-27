import chalk from "chalk";
import Enquirer from "enquirer";
import player from "play-sound";
const warning = chalk.hex("#FFA500"); // Orange warning color
const playAudio = new player();
/**
 * *Function takes a song and uses "play-sound" to play it
 * @param {Object} song Song to play
 */
export function playerPlay(song) {
  playAudio.play("./." + song.path, {
    timeout: Number(song.length),
    function(err) {
      if (err) {
        console.log(warning("Playback failed!"));
      } else {
        console.log(chalk.green(`Now playing: ${song.title}`));
      }
    },
  });
}

/**
 * *Function pauses the current play-back
 * *Play-Sound doesn't support pause. If option is chosen player will stop instead.
 * @param {Object} song  Song to be paused
 */
export function playerPause(song) {
  playerStop(song);
}

/**
 * *Function stops the current play-back
 * @param {Object} song  Song to be stopped
 */
export function playerStop(song) {
  const audio = player.play("foo.mp3", function (err) {
    if (err && !err.killed) throw err;
  });
  audio.kill();
}

/**
 * *Function skips to the next song
 * @param {Object} song  currently playing song
 * @param {Object[]} songList  List for the next song
 */
export function playerSkip(song, songList) {
  if (songList.length > 0) {
    let index = songList.findIndex((item) => item.title === song.title);
    if (index + 1 >= songList.length) {
      index = 0;
    } else {
      index++;
    }
    const newSong = songList[index];
    playerPlay(newSong);
  }
}
