const calculator = document.querySelector('.calculator__group');
const result = document.querySelector('.result__calc');
const clear = document.querySelector('.item__type_ac');


let firstOperand = '';
let secondOperand = '';
let operator = '';
let finish = false;

function clearAll(){
  firstOperand = '';
  secondOperand = '';
  operator = '';
  finish = false;
  result.textContent = 0;
}

clear.addEventListener('click', clearAll);

function getData(event){
  const operandBtn = event.target.classList.contains('item__type_number');
  const operatorBtn = event.target.classList.contains('item__type_math');
  const equalBtn = event.target.classList.contains('item__type_equal')
  if(operandBtn){//нажат знак цифры
    if(secondOperand === '' && operator === ''){//запись первой цифры
      firstOperand += event.target.textContent
      result.textContent = firstOperand
    }else if(firstOperand !== "" && secondOperand !=='' && finish){//продолжение операции после нажатия знака равно
      secondOperand = event.target.textContent
      finish = false
      result.textContent = secondOperand
    }else{// запись второй цифры и до нажатия знака равно
      secondOperand += event.target.textContent
      result.textContent = secondOperand
    }
  }else if(operatorBtn){// нажат знак математической операции
    operator = event.target.textContent
    result.textContent = operator
  }else if(equalBtn){// нажат знак равно
    if( secondOperand === ''){//если не указать вторую цифру
       secondOperand = firstOperand
    }
    switch(operator){
      case '+':
        firstOperand = (+firstOperand) + (+secondOperand)
        break;
      case '-':
        firstOperand = (+firstOperand) - (+secondOperand)
        break;
      case '*':
        firstOperand = (+firstOperand) * (+secondOperand)
        break;
      case '/':
        firstOperand = (+firstOperand) / (+secondOperand)
        break;
    }
    finish = true;
    result.textContent = firstOperand;
  }else{
    return
  }
  console.log( firstOperand, operator, secondOperand);
}

calculator.addEventListener('click', getData);
