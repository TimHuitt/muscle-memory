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

function resetCode(selection) {
  const textBox = document.querySelector(".text-container pre");
  currentCode = codeObj.functions[selection].trim();
  codeRemaining = currentCode;
  codeCompleted = "";
  textBox.innerHTML = currentCode;
}

function updateText(bool) {
  const textBox = document.querySelector(".text-container pre");
  const letter = codeRemaining[0];
  let dec = ''
  if (letter === " ") {
    dec = `text-decoration: underline;`
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
  const textBox = document.querySelector(".input");
  let numSpaces = 0
  for (let i of codeRemaining) {
    if (i === " ") {
      numSpaces += 1
      updateText(true)
    } else {
      return
    }
  }
  const spaces = '\u00A0'.repeat(numSpaces);
  const textNode = document.createTextNode(spaces);
  textBox.insertBefore(textNode, textBox.firstChild);
}

function handleTab() {

}

function handleEnter() {
  const textBox = document.querySelector(".input");
  updateText(true)
  textBox.innerHTML = "";
  checkIndent()
}

function handleText(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    handleEnter()
  } else if (e.key === "Tab") {
    e.preventDefault();
    handleTab()
  } else if (e.key === "Backspace") {
    
  } else if (e.key === "Shift") {
    // ignore
  } else {
    if (e.key === codeRemaining[0]) {
      updateText(true);
    } else {
      updateText(false);
    }
  }
}

const input = document.querySelector(".input")
input.addEventListener("keydown", function (e) {
  handleText(e);
});
input.focus()
resetCode("easy");


  
