"use strict";

var result = document.getElementById("result");
var calculation = document.getElementById("calculation").innerHTML;
var buttons = document.getElementById("buttons");

var calculator = {
    
    //Number() converts these to 0
    number1: '',
    number2: '',
    ans: '',
    operator: '',
    
    //building numbers by clicking on buttons
    numberAppend: function(pressed){
        
        //if the number is result of calculation then overwrite it
        //when number button is pressed
        if(typeof this.number1 == "number" && this.operator == ''){
            this.number1 = pressed;
            return;
        }
        
        //prevent typing in numbers like 00000
        if((this.number1 == '0' && pressed == '0') || (this.number2 == '0' && pressed == '0'))
            return;
        
        //append to number1 if operator isn't yet given
        if(this.operator == '')
            this.number1 += pressed;
        else
            this.number2 += pressed;
    },
    
    dotAppend: function(){
        
        if(typeof this.number1 == "number" && this.operator == ''){
            this.number1 = '0.';
            return;
        }
        
        if(this.operator == '' && this.number1.indexOf('.') == -1)
            this.number1 += this.number1 == '' ? '0.' : '.';
        if(this.operator != '' && this.number2.indexOf('.') == -1)
            this.number2 += this.number2 == '' ? '0.' : '.';
        
    },
    
    //assign operator only if there is already a number 
    //or ans given
    assignOperator: function(operator){
        if(this.number1 != '' || this.ans != '')
            this.operator = operator;
    },
    
    calculate: function(){
        
        if(this.number1 == '' || this.number2 == '' || this.operator == '')
            return;
        
        //convert strings to numbers
        var first = Number(this.number1);
        var second = Number(this.number2);
        
        switch(this.operator){
            case '/':
                this.ans = first / second;
                break;
            case '*':
                this.ans = first * second;
                break;
            case '+':
                this.ans = first + second;
                break;
            case '-':
                this.ans = first - second;
                break;
        }
        
        this.controlResult();
        
        this.number1 = this.ans;
        this.number2 = '';
        this.operator = '';
        
    },
    
    controlResult: function(){
            
        var temp = this.ans.toString();
        
        //shorten numbers over 9 digits long
        if(temp.length > 9){
            temp = temp.slice(0,9);
            this.ans = Number(temp);
        }
        
        
    },
    
    //clears all the values
    ac: function(){
        this.number1 = '';
        this.number2 = '';
        this.ans = '';
        this.operator = '';
    },
    
    useAns: function(){
        
        //check whether ans exists
        if(typeof this.ans == 'number'){
            if(this.operator == '')
                this.number1 = this.ans;
            else
                this.number2 = this.ans;
        }
            
    },
    
    //storing values to know if any of them changed
    //compared to previous call to updateDisplay
    previousValues: ['' , '' , ''],
    
    //checking whether a property changed 
    //if so display it on the screen
    updateDisplay: function(){
        
        if(this.previousValues[1] != this.number2){
            result.innerHTML = this.number2;
            this.previousValues[1] = this.number2;
        }
        
        if(this.previousValues[2] != this.operator){
            
            //showing proper symbols for division and multiplication
            switch(this.operator){
                case '/':
                    result.innerHTML = '&divide;';
                    break;
                case '*':
                    result.innerHTML = '&times;';
                    break;
                default:
                    result.innerHTML = this.operator;
                    break;
            }
            
            this.previousValues[2] = this.operator;
        }
        
        if(this.previousValues[0] != this.number1){
            
            //when calculator is cleared
            //set display to 0 so it doesn't look weird
            if(this.number1 == ''){
                result.innerHTML = '0';
                return;
            }
            
            result.innerHTML = this.number1;
            this.previousValues[0] = this.number1;
        }
        
    }
}

//adding actions to be performed on different buttons
//each button has its basic action
//also update the display
buttons.addEventListener("click", function (event) {
    var clicked = event.target;
    
    if(clicked.classList.contains("number")) {
        calculator.numberAppend(clicked.value);
    } 
    else if(clicked.id == "dot") {
        calculator.dotAppend();
    }
    else if(clicked.classList.contains("operator")){
        calculator.assignOperator(clicked.value);
    }
    else if(clicked.id == "equals"){
        calculator.calculate();
        //console.log('number1: '+calculator.number1+' number2: '+calculator.number2+' ans: '+calculator.ans+' operator: '+calculator.operator);
    }
    else if(clicked.id == "ac"){
        calculator.ac();
    }
    else if(clicked.id == 'ans')
        calculator.useAns();
    
    calculator.updateDisplay();
});



