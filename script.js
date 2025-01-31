let display = document.getElementById("display");
let buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let firstOperand = null;
let operator = null;

buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    let value = e.target.innerText;

    if (value === "C") {
      currentInput = "0";
      firstOperand = null;
      operator = null;
    } else if (value === "=") {
      if (operator !== null && firstOperand !== null) {
        currentInput = calculate(firstOperand, parseFloat(currentInput), operator).toString();
        operator = null;
        firstOperand = null;
      }
    } else if (["/", "*", "-", "+"].includes(value)) {
      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
      } else if (operator) {
        currentInput = calculate(firstOperand, parseFloat(currentInput), operator).toString();
        firstOperand = parseFloat(currentInput);
      }
      operator = value;
      currentInput = "0";
    } else if (value === ".") {
      if (!currentInput.includes(".")) {
        currentInput += value;
      }
    } else {
      if (currentInput === "0") {
        currentInput = value;
      } else {
        currentInput += value;
      }
    }

    display.innerText = currentInput;
  });
});

function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}
