function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function operate(operator, a, b) {
    console.log("operator: " + operator);
    console.log("a: " + a);
    console.log("b: " + b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            alert("Invalid");
            return "Invalid";
    }
}

const textBox = document.querySelector("#textBox");
let number1 = null;
let number2 = null;
let operator = null;
let shouldResetDisplay = false;

function populateDisplay(digit) {
    if (textBox.value.length === 1 && textBox.value == "0") {
        textBox.value = digit.toString();
    } else {
        textBox.value += digit.toString();
    }
}

function clearButton() {
    textBox.value = "0";
    number1 = null;
    number2 = null;
    operator = null;
}

const body = document.querySelector("body");

body.addEventListener("click", (event) => {
    if (event.target.className === "digit") {
        if (shouldResetDisplay) {
            textBox.value = "";
            shouldResetDisplay = false;
        }

        populateDisplay(event.target.id);
    } else if (event.target.className === "operator") {
        // if memory is already stored, store in num2 & calculate
        if (operator !== null || number1 !== null) {
            number2 = parseInt(textBox.value);  // store in num2
            const result = operate(operator, number1, number2);  // calculate
            textBox.value = result;  // display
        }

        // store current value into num1 and operator
        number1 = parseInt(textBox.value);  // store in num1
        operator = event.target.textContent;  // store operator

        shouldResetDisplay = true;
    } else if (event.target.id === "equals") {
        if (number2 == null) number2 = parseInt(textBox.value);

        // calculate result
        const result = operate(operator, number1, number2);
        // display result
        textBox.value = result;
        // store result in number1
        number1 = parseInt(textBox.value);

        shouldResetDisplay = true;
    } else if (event.target.id === "clear") {
        clearButton();
    }
});