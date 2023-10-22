const codeObj = {
  functions: {
    easy: `
function sayHello(name) {
  let msg = 'Hello, ' + name + '. How are you?';
  return msg;
}
console.log(sayHello('bootcamp prep')); 
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

function setCode(selection) {
  const textBox = document.querySelector(".text-container pre");
  currentCode = codeObj.functions[selection].trim();
  codeRemaining = currentCode;
  codeCompleted = "";
  textBox.innerHTML = currentCode;
}

function updateText(bool, pos) {
  const textBox = document.querySelector(".text-container pre");
  const letter = codeRemaining[0];

  if (bool) {
    codeCompleted += `<span style="color:white;">${letter}</span>`;
  } else {
    codeCompleted += `<span style="color:red;">${letter}</span>`;
  }
  codeRemaining = codeRemaining.substr(1);
  const newCode = codeCompleted + codeRemaining;
  textBox.innerHTML = newCode;
}

function handleText(e) {
  textBox = document.querySelector(".input");
  if (e.key === "Enter") {
    e.preventDefault();
    textBox.innerHTML = "";
  } else {
    const pos = currentCode.length - codeRemaining.length;

    if (e.key === codeRemaining[0]) {
      updateText(true, pos);
    } else {
      updateText(false, pos);
    }
  }
}

document.querySelector(".input").addEventListener("keydown", function (e) {
  handleText(e);
});

setCode("easy");
