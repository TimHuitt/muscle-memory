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


let currentCode;
let codeRemaining;
let codeCompleted = "";
let currentRound = 1;
const rounds = 2;



function setRound() {
  const round = document.querySelector('.round')
  const roundsLeft = (rounds + 1) - currentRound
  round.innerHTML = `x${roundsLeft}`

  currentRound++
}

function nextCode() {
  const round = document.querySelector('.round')
  const roundsLeft = (rounds) - currentRound
  
  const textContainer = document.querySelector(".text-container");
  let current = false;

  for (let i in codeObj) {
    for (let j in codeObj[i]) {
      if (currentCode === undefined) {
        resetCode(codeObj[i][j]);
        current = false
        setRound()

        if (roundsLeft) {
          currentCode = undefined
        }
        
        return;
      }

      if (current) {
        currentRound = 1;
        current = false;
        setRound();
        resetCode(codeObj[i][j]);
        return;
      }
      
      if (currentCode && codeObj[i][j].trim() === currentCode.trim()) {
        current = true;
      }
    }
  }
}

function resetCode(code) {
  const textBox = document.querySelector(".text-container pre");
  currentCode = code.trim();
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

function checkIndent() {
  const inputBox = document.querySelector(".input");

  for (let i of codeRemaining) {
    if (i === " ") {
      updateText(true);
    } else {
      return;
    }
  }
}

function handleTab() {}

function handleEnter(e) {
  const inputBox = document.querySelector(".input");
  const letter = codeRemaining[0];
  if (letter !== undefined && letter.charCodeAt(0) === 10) {
    updateText(true, e);
    inputBox.innerHTML = "";
    checkIndent();
  } else {
    updateText(false, e);
  }
}

function handleText(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    handleEnter(e);
  } else if (e.key === "Tab") {
    e.preventDefault();
    handleTab();
  } else if (e.key === "Backspace") {
    e.preventDefault();
  } else if (e.key === "Shift") {
    // ignore
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

input.focus();
nextCode();
