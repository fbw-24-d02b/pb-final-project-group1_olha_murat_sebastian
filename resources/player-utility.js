// import chalk from "chalk";
// import cliProgress from 'cli-progress';
// import player from "play-sound";
// import { setTimeout } from "node:timers/promises";
// const warning = chalk.hex("#FFA500"); // Orange warning color
// const playAudio = new player();
// /**
//  * *Function takes a song and uses "play-sound" to play it
//  * @param {Object} song Song to play
//  */
// export async function playerPlay(song) {
//   playAudio.play("./." + song.path, {
//     timeout: Number(song.length),
//     function(err) {
//       if (err) {
//         console.log(warning("Playback failed!"));
//       } else {
//         console.log(chalk.green(`Now playing: ${song.title}`));
//       }
//     },
//   });
// //   let counter = 0;
// //   let progress = chalk.green("");
// //   let bar = chalk.white("                    ")
// //   while(counter <= Number(song.length)){
// //     console.clear()
// //     console.log(counter);
// //     await setTimeout(1000);
// //     counter++;
// //   }
// console.log(chalk.green(`Playing ${song.title} by ${song.interpret}:`))
// const progressBar = new cliProgress.SingleBar({
//     format: `${chalk.green('{bar}')} | {percentage}% | {value}/{total} seconds`,
//     barCompleteChar: '\u2588',
//     barIncompleteChar: '\u2591',
//     hideCursor: true,
//   });
//   const totalTime = Number(song.length);
// let currentTime = 0;

// progressBar.start(totalTime, 0);

// const interval = setInterval(() => {
//   currentTime++;import chalk from "chalk";
// import cliProgress from 'cli-progress';
// import player from "play-sound";
// import { setTimeout } from "node:timers/promises";
// const warning = chalk.hex("#FFA500"); // Orange warning color
// const playAudio = new player();
// /**
//  * *Function takes a song and uses "play-sound" to play it
//  * @param {Object} song Song to play
//  */
// export async function playerPlay(song) {
//   playAudio.play("./." + song.path, {
//     timeout: Number(song.length),
//     function(err) {
//       if (err) {
//         console.log(warning("Playback failed!"));
//       } else {
//         console.log(chalk.green(`Now playing: ${song.title}`));
//       }
//     },
//   });
// //   let counter = 0;
// //   let progress = chalk.green("");
// //   let bar = chalk.white("                    ")
// //   while(counter <= Number(song.length)){
// //     console.clear()
// //     console.log(counter);
// //     await setTimeout(1000);
// //     counter++;
// //   }
// console.log(chalk.green(`Playing ${song.title} by ${song.interpret}:`))
// const progressBar = new cliProgress.SingleBar({
//     format: `${chalk.green('{bar}')} | {percentage}% | {value}/{total} seconds`,
//     barCompleteChar: '\u2588',
//     barIncompleteChar: '\u2591',
//     hideCursor: true,
//   });
//   const totalTime = Number(song.length);
// let currentTime = 0;

// progressBar.start(totalTime, 0);

// const interval = setInterval(() => {
//   currentTime++;
//   progressBar.update(currentTime);

//   if (currentTime >= totalTime) {
//       clearInterval(interval);
//       progressBar.stop();
//       console.log(chalk.green('Song ended!'));
//   }
// }, 1000);

// }

// /**
//  * *Function pauses the current play-back
//  * *Play-Sound doesn't support pause. If option is chosen player will stop instead.
//  * @param {Object} song  Song to be paused
//  */
// export function playerPause(song) {
//   playerStop(song);
// }

// /**
//  * *Function stops the current play-back
//  * @param {Object} song  Song to be stopped
//  */
// export function playerStop(song) {
// //   const audio = player.play("foo.mp3", function (err) {
// //     if (err && !err.killed) throw err;
// //   });
//   playAudio.kill();
// }

// /**
//  * *Function skips to the next song
//  * @param {Object} song  currently playing song
//  * @param {Object[]} songList  List for the next song
//  */
// export function playerSkip(song, songList) {
//   if (songList.length > 0) {
//     let index = songList.findIndex((item) => item.title === song.title);
//     if (index + 1 >= songList.length) {
//       index = 0;
//     } else {
//       index++;
//     }
//     const newSong = songList[index];
//     playerPlay(newSong);
//   }
// }

//   progressBar.update(currentTime);

//   if (currentTime >= totalTime) {
//       clearInterval(interval);
//       progressBar.stop();
//       console.log(chalk.green('Song ended!'));
//   }
// }, 1000);

// }

// /**
//  * *Function pauses the current play-back
//  * *Play-Sound doesn't support pause. If option is chosen player will stop instead.
//  * @param {Object} song  Song to be paused
//  */
// export function playerPause(song) {
//   playerStop(song);
// }

// /**
//  * *Function stops the current play-back
//  * @param {Object} song  Song to be stopped
//  */
// export function playerStop(song) {
// //   const audio = player.play("foo.mp3", function (err) {
// //     if (err && !err.killed) throw err;
// //   });
//   playAudio.kill();
// }

// /**
//  * *Function skips to the next song
//  * @param {Object} song  currently playing song
//  * @param {Object[]} songList  List for the next song
//  */
// export function playerSkip(song, songList) {
//   if (songList.length > 0) {
//     let index = songList.findIndex((item) => item.title === song.title);
//     if (index + 1 >= songList.length) {
//       index = 0;
//     } else {
//       index++;
//     }
//     const newSong = songList[index];
//     playerPlay(newSong);
//   }
// }


import chalk from "chalk";
import cliProgress from 'cli-progress';
import player from "play-sound";

const warning = chalk.hex("#FFA500"); // Orange warning color
const playAudio = player(); // Инициализация плеера

let isPlaying = false; // Отслеживание состояния воспроизведения
let currentProcess = null; // Переменная для хранения текущего аудиопроцесса
let progressBar = null; // Переменная для хранения прогресс-бара
let interval = null; // Переменная для хранения интервала обновления прогресса

/**
 * Функция воспроизведения песни.
 * @param {Object} song - Песня для воспроизведения.
 */
export async function playerPlay(song) {
  const filePath = `./${song.path}`;

  // Останавливаем предыдущее воспроизведение и прогресс, если что-то уже играет
  if (isPlaying && currentProcess) {
    playerStop(); // Останавливаем предыдущее воспроизведение и прогресс-бар
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

  // Настройка прогресс-бара
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

  // Обновление прогресс-бара каждую секунду
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
 * Функция остановки воспроизведения.
 */
export function playerStop() {
  if (isPlaying && currentProcess) {
    currentProcess.kill(); // Останавливаем воспроизведение
    clearInterval(interval); // Останавливаем обновление прогресс-бара
    if (progressBar) {
      progressBar.stop(); // Останавливаем и скрываем прогресс-бар
    }
    console.log(chalk.red('Playback stopped.'));
    isPlaying = false;
  }
}

/**
 * Функция паузы воспроизведения.
 * @param {Object} song - Песня для паузы.
 */
export function playerPause(song) {
  playerStop(song);
}

/**
 * Функция пропуска на следующую песню.
 * @param {Object} song - Текущая песня.
 * @param {Object[]} songList - Список песен для воспроизведения.
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


