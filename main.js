// TODO: add finish screen
// TODO: track score/add scoreboard
// TODO: track time/add wpm(?)
// TODO: add practice tabs
// TODO: if practice mode, display Play option
// TODO: add reset button
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

// number of rounds per snippet
const rounds = 1;

let currentCode;
let codeRemaining;
let codeCompleted = "";
let currentRound = 1;
let currentCat = 1;
let currentSnip = 1;
let roundsLeft = 0;
let cont = false;

function setCursor() {
  const inputBox = document.querySelector(".input");

  let range = document.createRange()
  let selection = window.getSelection()

  range.selectNodeContents(inputBox)
  range.collapse(false)

  selection.removeAllRanges();
  selection.addRange(range)
  inputBox.focus()
}

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
// reset rounds(optional): bool
function setRound(reset) {
  const round = document.querySelector(".round");

  if (reset) {
    roundsLeft = rounds;
    round.innerHTML = `x${roundsLeft}`;
    currentRound = 1;
  } else {
    roundsLeft = rounds - currentRound;
    round.innerHTML = `x${roundsLeft + 1}`;
    currentRound++;
  }
}

// determine and set next code snippet
function nextCode() {
  let snip = 1;

  for (let i in codeObj) {
    for (let j in codeObj[i]) {
      // if at beginning
      console.log(roundsLeft)
      if (currentSnip === snip && roundsLeft) {
        setCode(codeObj[i][j]);
        setRound();
        return;
      } else if (currentSnip === snip && !roundsLeft) {
        setRound(true);
        currentSnip++;
      }
      snip++;
      if (snip === totalSnips) {
        const textBox = document.querySelector(".text-container pre");
        textBox.innerHTML = `CONGRATULATIONS!\nYou'll be typing functions in your sleep!`

        return
      }
      const snipText = document.querySelector(".snip");
      snipText.innerHTML = `snippet: ${snip} / ${totalSnips}`;
    }
  }
}

// reset current code selection/display
// code accepts string or array
// full snippet, or [category, difficulty]
function setCode(code) {
  const textBox = document.querySelector(".text-container pre");

  if (Array.isArray(code)) {
    currentCode = codeObj[code[0]][code[1]];
  } else {
    currentCode = code.trim();
  }

  codeRemaining = currentCode;
  codeCompleted = "";
  textBox.innerHTML = currentCode;
}

function updateText(bool, e, pointer) {
  const textBox = document.querySelector(".text-container pre");
  const inputBox = document.querySelector(".input");
  let letter = codeRemaining[0];
  let dec = "";
  if (letter === undefined) {
    e.preventDefault();
    nextCode();
    inputBox.innerHTML = "";
    return;
  }

  if (pointer) {
  } else if (bool) {
  }

  if (letter === " ") {
    dec = `text-decoration: underline;`;
  }
  if (letter.charCodeAt(0) === 10) {
    dec = `text-decoration: underline;`;
    letter = "_\n";
  }

  if (bool) {
    codeCompleted += `<span style="color:white;${dec}">${letter}</span>`;
  } else {
    codeCompleted += `<span style="color:red;${dec}">${letter}</span>`;
  }

  codeRemaining = codeRemaining.substr(1);
  const newCode = codeCompleted + codeRemaining;
  textBox.innerHTML = newCode;
}

function checkIndent(e) {
  const inputBox = document.querySelector(".input");
  const body = document.querySelector('body')
  for (let i of codeRemaining) {
    if (i == " ") {
      e.preventDefault()
      updateText(true, e);
      inputBox.innerHTML = inputBox.innerHTML + `&nbsp`
      setCursor();
    } else {
      break;
    }
  }
}

function handleTab() {}

function handleEnter(e) {
  const inputBox = document.querySelector(".input");
  const letter = codeRemaining[0];
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
    e.preventDefault();
    handleTab();
  } else if (e.key === "Backspace") {
    e.preventDefault();
  } else if (e.key === "Delete") {
    e.preventDefault();
  } else if (e.key === "Shift") {
    e.preventDefault();
  } else if (e.key === "Meta") {
    e.preventDefault();
  } else {
    if (e.key === codeRemaining[0]) {
      updateText(true, e);
    } else {
      updateText(false, e);
    }
  }
}

const input = document.querySelector(".input");
input.addEventListener("keydown", function (e) {
  handleText(e);
});

const snipText = document.querySelector(".snip");
const totalSnips = getShape(codeObj)[1]
snipText.innerHTML = `snippet: 1 / ${totalSnips}`

const body = document.querySelector('body')
body.addEventListener("click", function(e) {
  input.focus();
})

input.focus();
setRound(true)
nextCode();
