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

    sign.addEventListener("click", (e) => {
        if (display.textContent.includes("-")) {
            val = "";
            displayValue(display.textContent.slice(1));
        } else {
            /*
                if the display value transitions to the rhs of the operation,
                display a default value of -0 when neg sign is activated
            */
            val="-";
            if (display.classList.contains("right")) {
                displayValue("-0")
            } else {
                displayValue(val+display.textContent);
            }
        }
    });

    nums.forEach((num) => {
        num.addEventListener("click", (e) => {
            // if the display is at starting number 0
            if ((display.textContent === "0" || display.textContent === "-0")) {
                // don't allow zero duplicates
                if (num.textContent !== 0) {
                    val += num.textContent;
                    displayValue(val);
                }
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
            display.classList.toggle("right");
            left = parseInt(display.textContent);
            operator = operation.id;
            right = null;     
            numSetup(); // reload expression for rhs of operation
        });
    });

    equals.addEventListener("click", (e) => {
        if (!right && left) {
            display.classList.toggle("left");
            right = parseInt(display.textContent);
            result = operate(operator, left, right);
            displayValue(result);
        }
        numSetup();
    });
}

operSetup();