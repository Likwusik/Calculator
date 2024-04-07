let result = document.querySelector("#result");
let calculation = document.querySelector("#calculation");
let resetAfterOperation = false;


//Numbers logic
document.querySelectorAll("#calculator .number").forEach((button) => {
  button.addEventListener("click", (event) => {
    let value = event.currentTarget.textContent;
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
    calculation.value += symbol;
  });
});

//Clear (C) logic
document.querySelectorAll("#calculator .clear").forEach((button) => {
  button.addEventListener("click", (event) => {
    calculation.value = "";
    result.value = "";
  });
});


// Undo button logic
document.querySelectorAll("#calculator .undo").forEach((button) => {
  button.addEventListener("click", (event) => {
    let lastOne = calculation.value.slice(-1);
    let lastTwo = calculation.value.slice(-2);

    if (lastTwo === ") " || lastTwo === " (") {
      calculation.value = calculation.value.slice(0, -2);
    } else if (lastOne === " ") {
      calculation.value = calculation.value.slice(0, -3);
    } else {
      calculation.value = calculation.value.slice(0, -1);
    }
  });
});


//Calculation part with catching errors
const equal = document.querySelector("#calculator .equal");
equal.addEventListener("click", () => {
  resetAfterOperation = true;

  try {
    let val = eval(calculation.value);
    if (!isFinite(val)) {
      result.value = "You can't divide by 0";
    } else {
      result.value = val;
    }
  } catch (error) {
    result.value = error.message;
  }
});
