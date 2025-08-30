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

    console.log("op: " + operator);
    console.log("a: "+a);
    console.log("b: "+b);

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
let lastPressedEquals = false;

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
    shouldResetDisplay = false;
    lastPressedEquals = false;
}

const body = document.querySelector("body");

body.addEventListener("click", (event) => {
    if (event.target.className === "digit") {
        if (shouldResetDisplay) {
            textBox.value = "";
            shouldResetDisplay = false;
        }

        if (lastPressedEquals) { 
            operator = null;
            number2 = null;
        }
        // populate display
        populateDisplay(event.target.id);

        lastPressedEquals = false;
    } else if (event.target.className === "operator") {
        // IF LAST PRESSED WAS EQUALS
        // JUST SET OPERATOR
        // DONT DO ANYTHING
        if (lastPressedEquals) {
            operator = event.target.textContent;
            lastPressedEquals = false;
            return;
        }
        
        if (operator !== null) {  // this is giving false positive
            //eval + display
            number2 = parseInt(textBox.value);
            const result = operate(operator, number1, number2);
            textBox.value = result;
        } 

        number1 = parseInt(textBox.value);
        operator = event.target.textContent;

        lastPressedEquals = false;
        shouldResetDisplay = true;
    } else if (event.target.id === "equals") {
        if (number2 === null || !lastPressedEquals) number2 = parseInt(textBox.value);

        // CALCULATE AND DISPLAY
        const result = operate(operator, number1, number2);
        textBox.value = result;

        number1 = parseInt(result);

        shouldResetDisplay = true;
        lastPressedEquals = true;
    } else if (event.target.id === "clear") {
        clearButton();
        lastPressedEquals = false;
    }
});