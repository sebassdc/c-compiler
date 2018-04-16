import tokenizer from './tokenizer.js'
import astGenerator from './astGenerator.js'

const initialCode =
`#include <stdio.h>
#include <time.h>
#include <iostream>
#include <conio.h>

using namespace std;
int main () {
  int num, c;
  srand(time(NULL));
  for(c = 1; c <= 10; c++) {
    num = 1 + rand() % (11 - 1);
    cout << num << " ";
  }
  getch();
  return 0;
  sytem("pause");
}
`

const updateView = ({lexicalView, astView, doc}) => {
  // Parsing
  const tokens = tokenizer(doc.getValue())
  const abstractSintaxTree = astGenerator(tokens)
  
  // View
  lexicalView.innerHTML = JSON.stringify(tokens, null, 2).replace(/</g, "&lt").replace(/>/g, "&gt")
  astView.innerHTML = JSON.stringify(abstractSintaxTree, null, 2)
}
// Codemirror initialization
const editor_container = document.getElementById("editor-container")
const code = CodeMirror(editor_container, {
  value: initialCode,
  mode: 'clike',
  lineNumbers: true,
  theme: "one-dark"
})



const lexicalView = document.getElementById("tokens")
const astView = document.getElementById("ast")

updateView({lexicalView, astView, doc: code})

code.on("change", doc => {
  updateView({lexicalView, astView, doc})
})