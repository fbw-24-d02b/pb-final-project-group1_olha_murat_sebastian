# Chalk
# Installation:
##### Um Chalk zu verwenden, musst du es zunächst in deinem Node.js-Projekt installieren. Verwende dafür den folgenden Befehl: 

`npm install chalk`

# Importieren 
##### Um Chalk in deinem Projekt zu verwenden, binde es mit "import - from" ein:


`import chalk from 'chalk';`
###### console.log(chalk.blue('Hello world!'));

1. > Kombinieren Sie gestylte und normale Zeichenketten
- log(chalk.blue('Hello') + ' World' + chalk.red('!'));

2. > Zusammenstellen mehrerer Stile mit Hilfe der verkettbaren API
- log(chalk.blue.bgRed.bold('Hello world!'));

3. > Mehrere Argumente eingeben
- log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

4. > Nest-Stile
- log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

5. > Verschachtelung von Stilen desselben Typs (Farbe, Unterstreichung, Hintergrund)
- log(chalk.yellow(
	'I am a green line ' +
	chalk.blue.underline.bold('with a blue substring') +
	' that becomes green again!'
));
## Extra
##### Definieren Sie ganz einfach Ihre eigenen Themen:

const error = chalk.bold.red;
const warning = chalk.hex('#FFA500'); // Orange color

console.log(error('Error!'));
console.log(warning('Warning!'));

### Styles
#### Modifiers
reset - Reset the current style.
bold - Make the text bold.
dim - Make the text have lower opacity.
italic - Make the text italic. (Not widely supported)
underline - Put a horizontal line below the text. (Not widely supported)
overline - Put a horizontal line above the text. (Not widely supported)
inverse- Invert background and foreground colors.
hidden - Print the text but make it invisible.
strikethrough - Puts a horizontal line through the center of the text. (Not widely supported)
visible- Print the text only when Chalk has a color level above zero. Can be useful for things that are purely cosmetic.

#### Colors
black
red
green
yellow
blue
magenta
cyan
white
blackBright (alias: gray, grey)
redBright
greenBright
yellowBright
blueBright
magentaBright
cyanBright
whiteBright


#### Background colors
bgBlack
bgRed
bgGreen
bgYellow
bgBlue
bgMagenta
bgCyan
bgWhite
bgBlackBright (alias: bgGray, bgGrey)
bgRedBright
bgGreenBright
bgYellowBright
bgBlueBright
bgMagentaBright
bgCyanBright
bgWhiteBright

[for more information](https://www.npmjs.com/package/chalk)



# Figlet Chalk

`npm install figlet`
`import figlet from 'figlet';`


##### Einfache Anwendung

> console.log(
    figlet.textSync("MP 3!", {
      font: "Ghost",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
- Font:
Standard
Slant
Big
Block
Bubble
Colossal
Doom
Ghost
Lean
Mini
Script
Small
Thin
Univers

  [for more information](https://www.npmjs.com/package/figlet)
