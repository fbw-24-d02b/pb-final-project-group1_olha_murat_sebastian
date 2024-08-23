//* npm install chalk
import chalk from 'chalk';
import figlet from 'figlet';
import cliProgress from 'cli-progress';


console.log(
    figlet.textSync("mp 3!", {
      font: "Ghost",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );

  // CLI Progress Bar kur
const progressBar = new cliProgress.SingleBar({
  format: `${chalk.yellow('{bar}')} | {percentage}% | {value}/{total} seconds`,
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
});

const totalTime = 60;
let currentTime = 0;

progressBar.start(totalTime, 0);

const interval = setInterval(() => {
  currentTime++;
  progressBar.update(currentTime);

  if (currentTime >= totalTime) {
      clearInterval(interval);
      progressBar.stop();
      console.log(chalk.green('Oynatma Tamamlandı!'));
  }
}, 1000);

// const log = console.log;

// log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// log(chalk.blue.bgRed.bold('Hello world!'));

// log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// log(chalk.yellow(
// 	'I am a green line ' +
// 	chalk.blue.underline.bold('with a blue substring') +
// 	' that becomes green again!'
// ));


// const error = chalk.bold.red;
// const warning = chalk.hex('#FFA500'); // Orange color
// const success = chalk.hex('#008000'); // Green color
// const info = chalk.rgb(100, 100, 100); // Grey color

// console.log(error('Error!'));
// console.log(warning('Warning!'));
// console.log(success('Success!'));
// console.log(info('Info'));


// log(`
//     CPU: ${chalk.red('90%')}
//     RAM: ${chalk.green('40%')}
//     DISK: ${chalk.yellow('70%')}
//     `);