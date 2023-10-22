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

let currentCode

function setCode(selection) {
  currentCode = codeObj.functions[selection].trim();
  document.querySelector(".text-container pre").textContent = currentCode;
}

function updateText(bool, pos) {
  if (bool) {
    console.log(true, pos)
  } else {
    console.log(false, pos)
  }
}

function handleText(e) {
  textBox = document.querySelector(".input");
  if (e.key === "Enter") {
    e.preventDefault();
    textBox.textContent = "";
  } else {
    let codeObj = currentCode      
    const pos = currentCode.length - codeObj.length
    codeObj.pop
    if (e.key === codeObj[0]) {
      updateText(true, pos)
    } else {
      updateText(false, pos)
    }
  }
}

document.querySelector(".input").addEventListener("keydown", function (e) {
  handleText(e)
});

setCode("easy");
