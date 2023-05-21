 // Arithmetic functions
function calc(firstValue,operator, secondValue){

  let result;
  if(operator==="add"){
    result = firstValue +secondValue;
  }else if(operator==='subtract'){
    result= firstValue-secondValue;
  }else if( operator==="multiply"){
    result = firstValue * secondValue;
  }else if( operator==="divide"){
    result = firstValue/secondValue;
  }
  return result
}


// retrieve calculator html elements
let calculator = document.getElementById("calculator")
let keys = document.getElementById("calculatorKeys")

// listen to calculator keys
keys.addEventListener("click",
function(event){
    // if button is clicked
  if (event.target.matches('button')){

  // initialise variables
  let display =  document.getElementById("calculatorDisplay") // to display numbers
  let key = event.target  // store the clicked calculator key in variable
  let action = key.dataset.action  // retrieve data-action value from clicked key and store in variable
  let keyContent = key.textContent // retrieve text from clicked key and store in variable
  let displayedNum = display.textContent  //store displayed number in variable
  let previousKeyType = calculator.dataset.previousKeyType  //store previous-key-type value in variable 

// remove  the .is-depressed state from all keys before new button is clicked
Array.from(key.parentNode.children).
forEach(k => k.classList.remove('is-depressed'));

// When a number is clicked 
if (!action) {
  // if current number is the default 0, or the previous key was an operator , display the clicked number
  if (
  displayedNum === '0' ||
  previousKeyType === 'operator' )
  {
    display.textContent = keyContent; 
  }
  else if( previousKeyType==="calculate"){ // else if previous key  was an equal sign reset first value
    display.textContent = keyContent; 
    calculator.dataset.firstValue= "";

  } //else  concatenate clicked number with displayed number
  else {
    display.textContent = displayedNum + keyContent; 
  }
  calculator.dataset.previousKeyType = 'number';  // sets previous-key-type value to 'number' because a number was clicked
}

//When a decimal point is clicked 

if (action ==="decimal"){
  //if the displayed number does not contain a decimal point, concatenate decimal point to displayed number
  if(!displayedNum.includes('.')){
    display.textContent = displayedNum + '.'
  }
  // else if the previous key was an operator or the equals key, display'0.'
  else if(
    previousKeyType==="operator"||
    previousKeyType==="calculate"){
      display.textContent = '0.'
  }
  calculator.dataset.previousKeyType = 'decimal'     // sets previous-key-type value to decimal because decimal button was clicked
}

//When an operator is clicked 
if(action==='add' ||
   action==='subtract' ||
   action==='multiply' ||
   action==='divide'){

    const firstValue = Number(calculator.dataset.firstValue);

  //  if firstValue is null let the currently displayed value be our first value
    if(calculator.dataset.firstValue==null || 
      calculator.dataset.previousKeyType=="calculate" ||
      calculator.dataset.firstValue== ""){
        calculator.dataset.firstValue =display.textContent;
    }
    else{
      // else  calculation involves more than 2 values, calculate the first two values and assign the result to firstValue
     let secondValue = Number(display.textContent); // second value is currently displayed value
     let operator =  calculator.dataset.operator 

  //perform calculations
  let calculatedValue = calc(firstValue,operator,secondValue);
  
  //display result
  display.textContent=calculatedValue;
  calculator.dataset.firstValue=Number(calculatedValue); // set result as firstValue

    }
  
   key.classList.add('is-depressed'); // highlights operator key to show that it is actve
   calculator.dataset.operator = action; //sets operator value to clicked oprator
   calculator.dataset.previousKeyType = 'operator'; // sets previous-key-type value to operator because an operator was clicked
   }

//When the equal sign is clicked 
if(action==="calculate"){

  if(calculator.dataset.firstValue==null){
    calculator.dataset.firstValue =display.textContent;
  }else{

  //let the currently displayed value be our second value
  secondValue = Number(display.textContent);
  firstValue =  Number(calculator.dataset.firstValue)
  operator =  calculator.dataset.operator 

  //perform calculations
   calculatedValue = calc(firstValue,operator,secondValue);
  
  //display result
  display.textContent=calculatedValue;
  }
  calculator.dataset.previousKeyType = 'calculate'; // sets previus-key-type value to operator because the equals key was clicked
}

// refresh page

if (action==="reset") {
    // remove  the .is-depressed state
   Array.from(key.parentNode.children).
   forEach(k => k.classList.remove('is-depressed'));
  calculator.dataset.operator = "";
  calculator.dataset.firstValue="";
  calculator.dataset.previousKeyType ="";
  display.textContent =0;
}

}
}
) 

