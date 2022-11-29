const calculator = document.querySelector('.calculator__group');
const result = document.querySelector('.result__calc');
const clear = document.querySelector('.item__type_ac');
const del = document.querySelector('.item__type_delete');
const sign = document.querySelector('.item__type_toggle');
const visual = document.querySelector('.result__visual');

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
  visual.textContent = 0;
};

clear.addEventListener('click', clearAll);

function deleteLastNumber(){//доделать - тип данных не подходит
  if(secondOperand === '' && operator === ''){
    firstOperand = firstOperand.slice(0, firstOperand.length-1);
    result.textContent = firstOperand;
  }else if(firstOperand !== "" && secondOperand !=='' && finish){


  }else{
    secondOperand = secondOperand.slice(0, secondOperand.length-1);
    result.textContent = secondOperand
  }

};

del.addEventListener('click', deleteLastNumber);

function toggleSignOperator(){//доделать - тип данных не подходит
  if(secondOperand === '' && operator === ''){
    console.log(typeof firstOperand)
    firstOperand = Math.abc(firstOperand);
    result.textContent = firstOperand;
  }else if(firstOperand !== '' && secondOperand !== '' && finish){


  }else{
    secondOperand = secondOperand.slice(0, secondOperand.length-1);
    result.textContent = secondOperand
  }
}

sign.addEventListener('click', toggleSignOperator);

function getOperand(value){
  if(secondOperand === '' && operator === ''){//запись первой цифры
    firstOperand += value
    result.textContent = firstOperand
    visual.textContent = firstOperand
  }else if(firstOperand !== '' && secondOperand !== '' && finish){//продолжение операции после нажатия знака равно
    secondOperand = value
    finish = false
    result.textContent = secondOperand
    visual.textContent = `${firstOperand} ${operator} ${secondOperand}`
  }else{// запись второй цифры и до нажатия знака равно
    secondOperand += value
    result.textContent = secondOperand
    visual.textContent = `${firstOperand} ${operator} ${secondOperand}`
  }
};

function getOperator(value){
  operator = value
  result.textContent = operator;
  visual.textContent = `${firstOperand} ${operator}`
};

function getResult(){
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
    case 'x':
      firstOperand = (+firstOperand) * (+secondOperand)
      break;
    case '/':
      firstOperand = (+firstOperand) / (+secondOperand)
      break;
    case '%':
      firstOperand = (+firstOperand) / 100 * (+secondOperand)
      break;
  }
  finish = true;
  result.textContent = firstOperand;
  visual.textContent = firstOperand;
};

function getData(event){
  const operandBtn = event.target.classList.contains('item__type_number');
  const operatorBtn = event.target.classList.contains('item__type_math');
  const equalBtn = event.target.classList.contains('item__type_equal');

  if(operandBtn){//нажат знак цифры
    getOperand(event.target.textContent)
  }else if(operatorBtn){// нажат знак математической операции
    getOperator(event.target.textContent)
  }else if(equalBtn){// нажат знак равно
    getResult()
  }else{
    return
  }
}

calculator.addEventListener('click', getData);
