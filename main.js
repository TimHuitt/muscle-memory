// todo: better colors
// todo: add full log
// todo: track most misses
// todo: add timer

// number of rounds per snippet
const rounds = 10;

// object containing code snippets
// codeObj -> categories -> difficulty -> snippet
const codeObj = {
  conditions: {
    easy: `
let num = 11;
if (num > 5) {
  console.log('if');
}
    `,
    medium: `
let num = 5;
if (num > 5) {
  console.log('if');
} else {
  console.log('else');
}
    `,
    hard: `
let num = 0;
if (num < 0) {
  console.log('if');
} else if (num > 0) {
  console.log('else if');
} else {
  console.log('else');
}
    `,
  },
  functions: {
    easy: `
function sayHello(name) {
  let msg = 'Hello, ' + name + '. How are you?';
  return msg;
}
console.log(sayHello('bootcamp prep'));
    `,
    medium: `
function checkNumber(num) {
  if (num > 0) {
    return 'positive';
  } else if (num < 0) {
    return 'negative';
  } else {
    return 'zero';
  }
}
console.log(checkNumber(5));
    `,
    hard: `
function fizzBuzz1(max) {
  for (let i = 0; i < max; i += 1) {

    if (i % 3 === 0 && i % 5 !== 0) {
      console.log(i);
    } else if (i % 5 === 0 && i % 3 !== 0) {
      console.log(i);
    }
  }
}
    `,
    hardest: `
function evenCaps(sentence) {
  let newSentence = "";
  
  for (let i = 0; i < sentence.length; i++) {
    let char = sentence[i];

    if (i % 2 === 0) {
      let capitalChar = char.toUpperCase();
      newSentence += capitalChar;
    } else {
      newSentence += char;
    }
  }
  return newSentence;
}
    `,
  },
};

// game related data
const gameData = {
  currentCode: "",
  codeRemaining: "",
  codeCompleted: "",
  currentRound: 1,
  currentSnip: 1,
  roundsLeft: 0,
  continueSnip: false,
  correct: 0,
  incorrect: 0,
  misses: [],
  log: "",
};

// track accuracy / update text
function updateAcc(isCorrect) {
  isCorrect ? gameData.correct++ : gameData.incorrect++;
  const acc = Math.floor(
    (gameData.correct / (gameData.incorrect + gameData.correct)) * 100
  );
  output = gameData.incorrect ? acc : 100;
  output = gameData.correct < 1 ? 0 : acc;
  const accText = document.querySelector(".accuracy");
  accText.innerHTML = `${output}%`;
}

// reset cursor after adding indentation
function setCursor() {
  const inputBox = document.querySelector(".input");

  let range = document.createRange();
  let selection = window.getSelection();

  range.selectNodeContents(inputBox);
  range.collapse(false);

  selection.removeAllRanges();
  selection.addRange(range);
  inputBox.focus();
}

// determine shape of an object
function getShape(obj) {
  let cats = 0;
  let snips = 0;

  for (let i in obj) {
    cats++;
    for (let j in obj[i]) {
      snips++;
    }
  }
  return [cats, snips];
}

// set round display number
// increase currentRound
// reset(optional): bool
function setRound(reset) {
  const round = document.querySelector(".round");

  if (reset) {
    gameData.roundsLeft = rounds;
    round.innerHTML = `x${gameData.roundsLeft}`;
    gameData.currentRound = 1;
  } else {
    gameData.roundsLeft = rounds - gameData.currentRound;
    round.innerHTML = `x${gameData.roundsLeft + 1}`;
    gameData.currentRound++;
  }
}

// determine and set next code snippet
function nextCode() {
  let snip = 1;

  for (let i in codeObj) {
    for (let j in codeObj[i]) {
      if (gameData.currentSnip === snip && gameData.roundsLeft) {
        setCode(codeObj[i][j]);
        setRound();
        return;
      } else if (gameData.currentSnip === snip && !gameData.roundsLeft) {
        setRound(true);
        gameData.currentSnip++;
      }
      snip++;

      if (snip > totalSnips) {
        const textBox = document.querySelector(".text-container pre");
        textBox.innerHTML = `CONGRATULATIONS!\nYou'll be typing functions in your sleep!`;
        return;
      }
      const snipText = document.querySelector(".snip");
      snipText.innerHTML = `${snip} / ${totalSnips}`;
    }
  }
}

// change snippet currently displayed
// update code tracking
// code: "string" or [array]
function setCode(code) {
  const textBox = document.querySelector(".text-container pre");

  if (Array.isArray(code)) {
    gameData.currentCode = codeObj[code[0]][code[1]];
  } else {
    gameData.currentCode = code.trim();
  }

  gameData.codeRemaining = gameData.currentCode;
  gameData.codeCompleted = "";
  textBox.innerHTML = gameData.currentCode;
}

// track typing accuracy
// determine text formatting
// update displayed text
function updateText(bool, e, pointer) {
  const textBox = document.querySelector(".text-container pre");
  const inputBox = document.querySelector(".input");
  let letter = gameData.codeRemaining[0];
  let dec = "";
  if (letter === undefined) {
    e.preventDefault();
    nextCode();
    inputBox.innerHTML = "";
    return;
  }

  if (pointer) {
  }

  if (letter === " ") {
    dec = `text-decoration: underline;`;
  }
  if (letter.charCodeAt(0) === 10) {
    dec = `text-decoration: underline;`;
    letter = "_\n";
  }

  if (bool) {
    gameData.codeCompleted += `<span style="color:white;${dec}">${letter}</span>`;
  } else {
    gameData.codeCompleted += `<span style="color:red;${dec}">${letter}</span>`;
  }

  updateAcc(bool);
  gameData.codeRemaining = gameData.codeRemaining.substr(1);
  const newCode = gameData.codeCompleted + gameData.codeRemaining;
  textBox.innerHTML = newCode;
}

// auto indent
function checkIndent(e) {
  const inputBox = document.querySelector(".input");
  const body = document.querySelector("body");
  for (let i of gameData.codeRemaining) {
    if (i == " ") {
      e.preventDefault();
      updateText(true, e);
      inputBox.innerHTML = inputBox.innerHTML + `&nbsp`;
      setCursor();
    } else {
      return;
    }
  }
}

function handleTab(e) {
  e.preventDefault();
  const letter = gameData.codeRemaining[0];

  if (letter == " ") {
    updateText(true, e);
    // inputBox.innerHTML = "";
    checkIndent(e);
  } else {
    updateText(false, e);
  }
}

function handleEnter(e) {
  // e.preventDefault()
  const inputBox = document.querySelector(".input");
  const letter = gameData.codeRemaining[0];
  if (letter !== undefined && letter.charCodeAt(0) === 10) {
    updateText(true, e);
    // inputBox.innerHTML = "";
    checkIndent(e);
  } else {
    updateText(false, e);
  }
}

function handleText(e) {
  if (e.key === "Enter") {
    // e.preventDefault();
    handleEnter(e);
  } else if (e.key === "Tab") {
    handleTab(e);
  } else if (e.key === "Backspace") {
    e.preventDefault();
  } else if (e.key === "Delete") {
    e.preventDefault();
  } else if (e.key === "Shift") {
    e.preventDefault();
  } else if (e.key === "Meta") {
    e.preventDefault();
  } else {
    if (e.key === gameData.codeRemaining[0]) {
      updateText(true, e);
    } else {
      updateText(false, e);
    }
  }
}

function resetGame() {
  const input = document.querySelector(".input");
  input.innerHTML = "";

  gameData.currentCode = "";
  gameData.codeRemaining = "";
  gameData.codeCompleted = "";

  gameData.currentRound = 1;
  gameData.currentSnip = 1;
  gameData.roundsLeft = 0;
  gameData.continueSnip = false;

  gameData.correct = 0;
  gameData.incorrect = 0;

  const accText = document.querySelector(".accuracy");
  accText.innerHTML = `100%`;

  const snipText = document.querySelector(".snip");
  snipText.innerHTML = `1 / ${totalSnips}`;

  setRound(true);
  nextCode();
}

const input = document.querySelector(".input");
input.addEventListener("keydown", function (e) {
  handleText(e);
});

const snipText = document.querySelector(".snip");
const totalSnips = getShape(codeObj)[1];
snipText.innerHTML = `1 / ${totalSnips}`;

const body = document.querySelector("body");
body.addEventListener("click", function (e) {
  const rulesContainer = document.querySelector(".rules-container");
  rulesContainer.classList.remove("show");
  input.focus();
});

const rules = document.querySelector(".rules-button");
rules.addEventListener("click", function (e) {
  const rulesContainer = document.querySelector(".rules-container");
  rulesContainer.classList.toggle("show");
  e.stopPropagation();
});

rules.addEventListener("m", function (e) {
  const rulesBtn = document.querySelector(".rules-button");
  rulesBtn.classList.toggle("over");
});

const reset = document.querySelector(".reset-button");
reset.addEventListener("click", resetGame);

input.focus();
setRound(true);
nextCode();
