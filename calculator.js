"use strict"
window.onload = function () {
    var stack = [];
    var displayVal = "0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = this.innerHTML;
            if (value >= 0 && value <= 9) {
                if (displayVal == 0) {
                    var result = document.getElementById("result");
                    result.innerHTML = value;
                    displayVal = value;
                }
            }
            else if (value == ".") {
                if (displayVal.indexOf(".") == -1)
                    displayVal += ".";
            }
            else if (value == "AC") {
                var result = document.getElementById("result");
                var expression = document.getElementById("expression");
                expression.innerHTML = "";
                result.innerHTML = "";                                        

                displayVal = 0;
                stack = [];
            }
            else {
                var result = document.getElementById("result");
                var expression = document.getElementById("expression");
                if (result.innerHTML >= 0) {
                    expression.innerHTML = value;
                    result.innerHTML = 0;
                }

                if (stack[stack.length - 1] == "*" || stack[stack.length - 1] == "/" || stack[stack.length - 1] == "^") {
                    displayVal = highPriorityCalculator(stack, displayVal);
                }
                else if (value == "!") {
                    displayVal = factorial(displayVal);
                }

                if (value == "=") {
                    stack.push(parseFloat(displayVal));
                    displayVal = calculator(stack);

                    expression.innerHTML = "";
                    result.innerHTML = displayVal;                                        
                    stack = [];
                    displayVal = 0;
                }
                else {
                    stack.push(parseFloat(displayVal));
                    stack.push(value);
                    displayVal = 0;
                }

            }
        };
    }
};

function factorial (x) {
    var result = x;
    for (var i = x - 1; i != 0; i--) {
        result *= i;
    }

    return result;
}

function highPriorityCalculator(s, val) {
    var operator = s.pop();
    var operand = s.pop(); 

    var result = 0;
    if (operator == "*")
        result = operand * val;
    else if (operator == "/")
        result = operand / val;
    else if (operator == "^") {
        result = operand;
        for (var i = 1; i < val; i++)
            result *= operand;
    }

    return result;
}

function calculator(s) {
    var result = 0;
    var operator = "+";
    for (var i=0; i< s.length; i++) {
        if(s[i] == "+")
            result += s[i+1];
        else if(s[i] == "-")
            result -= s[i+1];
        else if(i == 0)
            result = s[i];
    }
    return result;
}
