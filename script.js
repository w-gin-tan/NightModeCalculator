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

const calculator = () => {
    // displayed value being tracked throughout calculator operations
    let val = "0";   
    
    // Operator logic
    const operations = document.querySelectorAll(".operations");
    let left, right, operator;
    operations.forEach((operation) => {
        operation.addEventListener("click", (e) => {
            if (left === undefined) {
                left = parseInt(val);
                operator = operation.id;
            } 
            else { // For multiple operations in one expression
                left = operate(operator, left, parseInt(val));
                operator = operation.id;
                displayValue(left);
            }
            val = "" // Reset value for numbers after operator
        });
    });

    // Equals logic
    const equals = document.getElementById("equals");
    equals.addEventListener("click", (e) => {
        if (left && operator) {
            if (val === "") { // Case for when rhs doesn't exist -> square the number
                displayValue(operate(operator, left, left));
            } else { // Default case: x (operator) y = ans
                right = parseInt(val);
                val = operate(operator, left, right).toString();

                // If the expression is 1 / 0:
                if (val === "Infinity") {
                    displayValue("Error");
                } 
                else { // Display the value as usual (whether decimal or integer):
                    displayValue(val.split(".")[1] && val.split(".")[1].length > 8 ? Number(val).toFixed(8) : val);
                }
                left = undefined;
            }
        } else { // Case for when equals sign clicked on answer -> ans (operator) rhs of previous expression
            val = operate(operator, parseInt(val), right).toString();
            displayValue(val);
        }
    });

    // Keypad number logic
    const numbers = document.querySelectorAll(".nums");
    numbers.forEach((number) => {
        number.addEventListener("click", (e) => {
            // Prevent zero dups if the value is "0"
            if (val === "0") {
                if (number.textContent !== "0") {
                    val = "";
                    right = undefined;
                    // Add on numbers until the length limit
                    val += val.length < 9 ? number.textContent : "";
                }
            } else {
                if (right) { // Resets the display value in the case the user presses a number after an equals result.  
                    val = "";
                    right = undefined;
                }    
                val += val.length < 9 ? number.textContent : "";
            }
            displayValue(val);
        });
    });


    const clear_entry = document.getElementById("clear-entry");
    // Clear button logic
    clear_entry.addEventListener("click", (e) => {
        left = undefined, right = undefined, operator = undefined;
        val = "0";
        displayValue(val);
    });


    const backspace = document.getElementById("backspace");
    // Backspace button logic
    backspace.addEventListener("click", (e) => {
        val = val.slice(0, -1);
        if (val === "") val = "0";
        displayValue(val);
    }); 
}

calculator();