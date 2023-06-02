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
    const sign = document.querySelector("#sign"); 
    const decimal = document.querySelector("#decimal");
    const display = document.getElementById("ans");

    /*
    sign.addEventListener("click", (e) => {
        // remove 0 at some point when switching to negative number
        val = val.includes("-") ? val.slice(1) : "-" + val;
        displayValue(val);  
    });
    */

    nums.forEach((num) => {
        num.addEventListener("click", (e) => {
            if (display.textContent === "0" && num.textContent === "0") {
                displayValue(0); // no duplicates of zero to add if the result is zero
            } else {
                val += num.textContent;
                displayValue(val);
            }
        });
    });
}

const operSetup = () => {
    let left, right, operator, result;

    // operation and equals sign keys
    const operations = document.querySelectorAll(".operations");
    const equals = document.querySelector("#equals");

    // calculator display
    const display = document.getElementById("ans");

    numSetup();

    operations.forEach((operation) => {
        operation.addEventListener("click", (e) => {
            left = parseInt(display.textContent);
            operator = operation.id;
            right = null;     
            numSetup(); // reload expression for rhs of operation
        });
    });

    equals.addEventListener("click", (e) => {
        if (!right && left) {
            right = parseInt(display.textContent);
            result = operate(operator, left, right);
            displayValue(result);
        }
        numSetup();
    });
}

operSetup();