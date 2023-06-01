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
    switch (operator) {
        case "add": add(a, b); break;
        case "subtract": subtract(a, b); break;
        case "multiply": multiply(a, b); break;
        case "divide": divide(a, b); break;
    }
}

const displayValue = (val) => {
    const display = document.getElementById("ans");

    // if the calculator just started, remove the starting 0 after pressing a number
    if (display.classList.contains("init")) {
        display.classList.remove("init");
        display.textContent = "";
    }
    display.textContent += val;
}

const numpad = () => {
    const nums = document.querySelectorAll(".nums");

    nums.forEach((num) => {
        num.addEventListener("click", (e) => {
            displayValue(num.textContent);
        })
    })
}

numpad();