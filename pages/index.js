const calculator = document.querySelector('.calculator__group');
const result = document.querySelector('.result__calc');
const clear = document.querySelector('.item__type_ac');
const del = document.querySelector('.item__type_delete');
const sign = document.querySelector('.item__type_toggle');
const visual = document.querySelector('.result__visual');
const mode = document.querySelector('.calculator__toggle');
const theme = document.querySelector('#theme');

let firstOperand = '';
let secondOperand = '';
let operator = '';
let finish = false;

/** Переключение темы */
function changeTheme(){
  const modeTheme = theme.getAttribute('href');
  if(modeTheme === './pages/dark-mode.css'){
    theme.setAttribute('href', './pages/light-mode.css')
  }else{
    theme.setAttribute('href', './pages/dark-mode.css')
  }
};

/** очистить все значения  */
function clearAll(){
  firstOperand = '';
  secondOperand = '';
  operator = '';
  finish = false;
  result.textContent = 0;
  visual.textContent = 0;
};

/** что делать, если нажата кнопка ... */
function handleButton(event){
  const operandBtn = event.target.classList.contains('item__type_number');
  const operatorBtn = event.target.classList.contains('item__type_math');
  const equalBtn = event.target.classList.contains('item__type_equal');
  const toggleBtn = event.target.classList.contains('item__type_toggle');
  const deleteBtn = event.target.classList.contains('item__type_delete');

  if(operandBtn){
    getOperand(event.target.textContent)
  }else if(operatorBtn){
    getOperator(event.target.textContent)
  }else if(equalBtn){
    getResult()
  }else if(toggleBtn){

  }else if(deleteBtn){
    console.log(firstOperand, operator, secondOperand)

  }else{
    return
  }
}

/** получить цифру */
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

/** получить знак операции */
function getOperator(value){
  operator = value
  result.textContent = operator;
  visual.textContent = `${firstOperand} ${operator}`
};

/** получить результат операции */
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

/** слушатели */
mode.addEventListener('click', changeTheme);
clear.addEventListener('click', clearAll);
calculator.addEventListener('click', handleButton);
