import { sum, subtract, multiply, divide } from "./calculator.js";

let output = document.querySelector("#output");

let firstNumber = 0;
let operation = null;
let resetAfterOperation = false;

document.querySelectorAll("#calculator .number").forEach((button) => {
  button.addEventListener("click", (event) => {
    let value = event.currentTarget.textContent;
    if (resetAfterOperation) {
      output.value = value;
      resetAfterOperation = false;
    } else {
      output.value += value;
    }
  });
});

document.querySelectorAll("#calculator .operation").forEach((button) => {
  button.addEventListener("click", (event) => {
    firstNumber = output.value;
    operation = event.currentTarget.dataset.action;
    resetAfterOperation = true;
  });
});

const equal = document.querySelector("#calculator .equal");
equal.addEventListener("click", () => {
  if (!operation) {
    return;
  }
  resetAfterOperation = true;
  let secondNumber = output.value;

  let result;
  switch (operation) {
    case "sum":
      result = sum(firstNumber, secondNumber);
      break;
    case "subtract":
      result = subtract(firstNumber, secondNumber);
      break;
    case "multiply":
      result = multiply(firstNumber, secondNumber);
      break;
    case "divide":
      if (secondNumber === 0) {
        result = "Error: Division by zero";
      } else {
        result = divide(firstNumber, secondNumber);
      }
      break;
    default:
      result = "Error: Unknown operation";
      break;
  }
  output.value = result;
  //reset operation
  operation = null;
});
