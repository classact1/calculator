"use strict";

var result = document.getElementById("result");
var buttons = document.getElementById("buttons");


    //Number() converts these to 0
    var number1 = '';
    var number2 = '';
    var ans = '';
    var operator = '';
    var process = [];
    
    //building up numbers by clicking on buttons
    function numberAppend(pressed){
        
        //if the number is result of calculation then overwrite it
        //when number button is pressed
        if(typeof number1 == "number" && operator == ''){
            number1 = pressed;
            return;
        }
        
        //prevent typing in numbers like 00000
        if((number1 == '0' && pressed == '0') || (number2 == '0' && pressed == '0'))
            return;
        
        //append to number1 if operator isn't yet given
        //prevent typing in to large numbers
        if(operator == ''){
            if(number1.length <9)
                number1 += pressed;
        }
        else{
            if(number2.length <9)
                number2 += pressed;
        }
    }
    
    function dotAppend(){
        
        if(typeof number1 == "number" && operator == ''){
            number1 = '0.';
            return;
        }
        
        if(operator == '' && number1.indexOf('.') == -1)
            number1 += number1 == '' ? '0.' : '.';
        if(operator != '' && number2.indexOf('.') == -1)
            number2 += number2 == '' ? '0.' : '.';
        
    }
    
    //assign operator only if there is already a number 
    //or ans given
    function assignOperator(pressed){
        if(number1 != '' || ans != '')
            operator = pressed;
    }
    
    function calculate(){
        
        if(number1 == '' || number2 == '' || operator == '')
            return;
        
        //convert strings to numbers
        var first = Number(number1);
        var second = Number(number2);
        
        switch(operator){
            case '/':
                ans = first / second;
                break;
            case '*':
                ans = first * second;
                break;
            case '+':
                ans = first + second;
                break;
            case '-':
                ans = first - second;
                break;
        }
        
        controlResult();
        
        number1 = ans;
        number2 = '';
        operator = '';
        
    }
    
    function controlResult(){
            
        var temp = ans.toString();
        
        //shorten numbers over 9 digits long
        if(temp.length > 9){
            temp = temp.slice(0,9);
            ans = Number(temp);
        }
        
    }
    
    //clears all the values
    function ac(){
        number1 = '';
        number2 = '';
        ans = '';
        operator = '';
    }
    
    function useAns(){
        
        //check whether ans exists
        if(typeof ans == 'number'){
            if(operator == '')
                number1 = ans;
            else
                number2 = ans;
        }
            
    }
    
    //storing values to know if any of them changed
    //compared to previous call to updateDisplay
    var previousValues = [number1 , operator , number2]
    
    //checking whether a property changed 
    //if so display it on the screen
    function updateDisplay(){
        
        if(previousValues[1] != operator){
            result.innerHTML = displayOperator();
            previousValues[1] = operator;
        }
        
        if(previousValues[2] != number2){
            
            result.innerHTML = number2;
            
            previousValues[2] = number2;
        }
        
        if(previousValues[0] != number1){
            
            //when calculator is cleared
            //set display to 0 so it doesn't look weird
            if(number1 == ''){
                result.innerHTML = '0';
                return;
            }
            
            result.innerHTML = number1;
            previousValues[0] = number1;
        }
        
        //updateHistory();
    
    }

    function displayOperator(){
        
        var display;
        
        //showing proper symbols for division and multiplication
        switch(operator){
            case '/':
                display = '&divide;';
                break;
            case '*':
                display = '&times;';
                break;
            default:
                display = operator;
                break;
            }
        
        return display;
    }

//adding actions to be performed on different buttons
//each button has its basic action
//also update the display
buttons.addEventListener("click", function (event) {
    var clicked = event.target;
    
    if(clicked.classList.contains("number")) {
        numberAppend(clicked.value);
    } 
    else if(clicked.id == "dot") {
        dotAppend();
    }
    else if(clicked.classList.contains("operator")){
        assignOperator(clicked.value);
    }
    else if(clicked.id == "equals"){
        calculate();
    }
    else if(clicked.id == "ac"){
        ac();
    }
    else if(clicked.id == 'ce')
        ce();
    else if(clicked.id == 'ans')
        useAns();
    
    updateDisplay();
});



