import chalk from "chalk";
import cliProgress from 'cli-progress';
import player from "play-sound";

const warning = chalk.hex("#FFA500"); // Orange warning color
const playAudio = player(); // Initialising player

let isPlaying = false; // Player playback state
let currentProcess = null; // Varable to store the current player process
let progressBar = null; // Initialising progress bar
let interval = null; // Interval for view updates

/**
 * * Utility function for the player. It takes a song object and plays the song using the installed player
 * @param {Object} song - Song Object to be played
 */
export async function playerPlay(song) {
  const filePath = `./${song.path}`;

  // Stops playback if playback is in progress
  if (isPlaying && currentProcess) {
    playerStop(); // Also stops progress bar
  }

  currentProcess = playAudio.play(filePath, (err) => {
    if (err) {
      console.log(warning("Playback stopped."));
      isPlaying = false;
    } else {
      console.log(chalk.green(`Now playing: ${song.title}`));
    }
  });

  console.log(chalk.green(`Playing ${song.title} by ${song.interpret}:`));

  progressBar = new cliProgress.SingleBar({
    format: `${chalk.green('{bar}')} | {percentage}% | {value}/{total} seconds`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });

  const totalTime = Number(song.length);
  let currentTime = 0;

  progressBar.start(totalTime, 0);
  isPlaying = true;

  // Progress bar updated every second
  interval = setInterval(() => {
    currentTime++;
    progressBar.update(currentTime);

    if (currentTime >= totalTime) {
      clearInterval(interval);
      progressBar.stop();
      console.log(chalk.green('Song ended!'));
      isPlaying = false;
    }
  }, 1000);
}

/**
 * Stops currentProcess. Playback is stopped
 * Also stops the progress bar
 */
export function playerStop() {
  if (isPlaying && currentProcess) {
    currentProcess.kill(); // Here playback is stopped
    clearInterval(interval); // Update interval is cleared
    if (progressBar) {
      progressBar.stop(); // Progress bar stopped
    }
    console.log(chalk.red('Playback stopped.'));
    isPlaying = false;
  }
}

/**
 * Utility function to pause current playback
 * This player doesn't support pause.
 * playerstop() used instead.
 */
export function playerPause() {
  playerStop();
}

// /**
//  * Function skips to the next song
//  @param {Object} song  currently playing song
//  @param {Object[]} songList  List for the next song
//  /
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


