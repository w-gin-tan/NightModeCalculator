const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

const operate = (operator, a, b) => {
    let operation = "0";
    switch (operator) {
        case "add": operation = add(a, b); break;
        case "subtract": operation = subtract(a, b); break;
        case "multiply": operation = multiply(a, b); break;
        case "divide": operation = divide(a, b); break;
    }
    return operation;
}

const displayValue = (val) => {
    const display = document.getElementById("ans");
    display.textContent = val;
}

const numSetup = () => {
    let val = "";
    const nums = document.querySelectorAll(".nums");

    nums.forEach((num) => {
        num.addEventListener("click", (e) => {
            val += num.textContent;
            displayValue(val);
        })
    });
}

const operSetup = () => {
    let left, right, operator;

    // operation and equals sign keys
    const operations = document.querySelectorAll(".operations");
    const equals = document.querySelector("#equals");

    // calculator display
    const display = document.getElementById("ans");
    display.textContent = "0";

    numSetup();

    operations.forEach((operation) => {
        operation.addEventListener("click", (e) => {
            left = parseInt(display.textContent);
            operator = operation.id;     
            numSetup(); // reload expression for rhs of operation
        });
    });

    equals.addEventListener("click", (e) => {
        right = parseInt(display.textContent);
        display.textContent = operate(operator, left, right);
        numSetup();
    });
}

operSetup();