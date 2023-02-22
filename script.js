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