let result = document.querySelector("#result");
let calculation = document.querySelector("#calculation");
let resetAfterOperation = true;
let pressedOperatorLast = false;
//let isNumber = false;
let hasDot = false;
let countBreckets = 0;

//Function that checks brecket amounts
function checkBrackets(symbol) {
  if (symbol === " (") {
    countBreckets++;
  } else if (symbol === ") ") {
    if (countBreckets <= 0) return true;
    countBreckets--;
  }
  return false;
}

//Function that checks operators that can't be used back to back
function isOperator(symbol) {
  return (
    symbol === " % " ||
    symbol === " / " ||
    symbol === " * " ||
    symbol === " - " ||
    symbol === " + " ||
    symbol === "."
  );
}

//Function that checks if opeators are used back to back
function checkValidity(symbol) {
  let validity = false;
  if (checkBrackets(symbol)) {
    validity = true;
  } else {
    let pressedOperator = isOperator(symbol);
    validity = pressedOperatorLast && pressedOperator;
    pressedOperatorLast = pressedOperator;
  }

  if (validity) {
    result.value = "Invalid input";
  } else {
    result.value = "";
  }

  return validity;
}

//Numbers logic
document.querySelectorAll("#calculator .number").forEach((button) => {
  button.addEventListener("click", (event) => {
    let value = event.currentTarget.textContent;
    if (value === ".") {
      if (hasDot) {
        result.value = "Invalid input";
        return;
      }
      hasDot = true;
    }
    if (checkValidity(value)) return;
    if (resetAfterOperation) {
      calculation.value = value;
      resetAfterOperation = false;
    } else {
      calculation.value += value;
    }
  });
});

// Operaions logic
document.querySelectorAll("#calculator .operation").forEach((button) => {
  button.addEventListener("click", (event) => {
    let symbol = event.currentTarget.dataset.action;

    if (resetAfterOperation) {
      if (symbol === " (") {
        calculation.value = symbol;
        resetAfterOperation = false;
        checkValidity(symbol);
      } else {
        calculation.value = "";
        result.value = "Invalid input";
      }
    } else {
      if (checkValidity(symbol)) return;
      calculation.value += symbol;
      hasDot = false;
    }
  });
});

//Clear (C) logic
document.querySelectorAll("#calculator .clear").forEach((button) => {
  button.addEventListener("click", (event) => {
    calculation.value = "";
    result.value = "";
    countBreckets = 0;
    pressedOperatorLast = false;
    hasDot = false;
  });
});

// Undo button logic
document.querySelectorAll("#calculator_head .undo").forEach((button) => {
  button.addEventListener("click", (event) => {
    let lastOne = calculation.value.slice(-1);
    let lastTwo = calculation.value.slice(-2);

    if (lastTwo === ") ") {
      calculation.value = calculation.value.slice(0, -2);
      countBreckets++;
    } else if (lastTwo === " (") {
      calculation.value = calculation.value.slice(0, -2);
      countBreckets--;
    } else if (lastOne === " ") {
      calculation.value = calculation.value.slice(0, -3);
    } else if (lastOne === ".") {
      calculation.value = calculation.value.slice(0, -1);
      hasDot = false;
    } else {
      calculation.value = calculation.value.slice(0, -1);
    }

    pressedOperatorLast = false;
    result.value = "";
  });
});

//Calculation part with catching errors
const equal = document.querySelector("#calculator .equal");
equal.addEventListener("click", () => {
  if (calculation.value === "") {
    result.value = "Empty input";
    return;
  }

  try {
    let val = eval(calculation.value);
    if (!isFinite(val)) {
      result.value = "You can't divide by 0";
    } else {
      result.value = val;
      resetAfterOperation = true;
      hasDot = false;
    }
  } catch (error) {
    result.value = error.message;
  }
});
