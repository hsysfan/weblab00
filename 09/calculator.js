"use strict"
window.onload = function () {
    var stack = [];
    var displayVal = "0";
    var exp = "0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = this.innerHTML;
            
            if(value == "AC"){
                displayVal = "0";
            }
            else if(isNaN(value)){
                stack.push(displayVal);
                displayVal = value;
                stack.push(displayVal);
            }
            else{
                if(displayVal == "0" || isNaN(displayVal)){
                    displayVal = "";
                    stack.push(value);
                }
                displayVal += value;
            }
            document.getElementById('expression').innerHTML = exp;
            document.getElementById('result').innerHTML = displayVal;
        };
    }
};
function factorial (x) {

}
function highPriorityCalculator(s, val) {

}
function calculator(s) {
    var result = 0;
    var operator = "+";
    for (var i=0; i< s.length; i++) {
        
    }
    return result;
}
