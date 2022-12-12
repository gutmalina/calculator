const calculator = document.querySelector('.calculator__group');
const resultCalc = document.querySelector('.result__calc');
const visual = document.querySelector('.result__visual');
const mode = document.querySelector('.calculator__toggle');
const theme = document.querySelector('#theme');

let operand = ''
let operator = ''
let prevOperator = ''
let result = 0;

/** Переключение темы */
function changeTheme(){
  const modeTheme = theme.getAttribute('href');
  if(modeTheme === './pages/dark-mode.css'){
    theme.setAttribute('href', './pages/light-mode.css')
  }else{
    theme.setAttribute('href', './pages/dark-mode.css')
  }
};


/** что делать, если нажата кнопка ... */
function handleButton(event){
  if(event.target.classList.contains('item__type_number')){
    operand += event.target.getAttribute('data-number')
    if(!operator){
      result = parseFloat(operand)
      visual.textContent = result
    }else{
      prevOperator = operator
      visual.textContent = `${result} ${operator} ${operand}`
    }

  }else if(event.target.classList.contains('item__type_math')){
    const percent = event.target.getAttribute('data-percent')
    if(!prevOperator){
      operator = event.target.getAttribute('data-operator')
      operand = ''
      visual.textContent = `${result} ${operator}`
    }else if(percent && operator && operand){
      visual.textContent = `${result} ${operator} ${operand} ${percent}`
      const percentNumber = result / 100 * parseFloat(operand)
      operand = percentNumber
      heandleResultOperation(operator)
      resultCalc.textContent = result
      operand = ''
      operator = ''
      prevOperator = ''
    }else{
      operator = event.target.getAttribute('data-operator')
      heandleResultOperation(prevOperator)
      operand = ''
      visual.textContent = `${result} ${operator}`
      resultCalc.textContent = result
    }

  }else if(event.target.classList.contains('item__type_ac')){
    result = 0;
    operator = ''
    prevOperator = ''
    operand = ''
    visual.textContent = '0'
    resultCalc.textContent = result

  }else if(event.target.classList.contains('item__type_equal')){
    heandleResultOperation(operator)
    resultCalc.textContent = result
    operand = ''
    operator = ''
    prevOperator = ''

  }else if(event.target.classList.contains('item__type_delete')){

  }else{}
  console.log('result', result)
  console.log('operator', operator)
  console.log('operand', operand)
  console.log('prevOperator', prevOperator)
}

function heandleResultOperation(valueOperator){
  switch(valueOperator){
    case '+':
      result += parseFloat(operand)
      break;
    case '-':
      result -= parseFloat(operand)
      break;
    case '*':
      result *= parseFloat(operand)
      break;
    case '/':
      result /= parseFloat(operand)
      break;
  }
}



//   const operandBtn = event.target.classList.contains('item__type_number');
//   const operatorBtn = event.target.classList.contains('item__type_math');
//   const equalBtn = event.target.classList.contains('item__type_equal');
//   const toggleBtn = event.target.classList.contains('item__type_toggle');
//   const deleteBtn = event.target.classList.contains('item__type_delete');

//   /** передать значение нажатой кнопки */
//   if(operandBtn){
//     getOperand(event.target.textContent);
//   }else if(operatorBtn){
//     getOperator(event.target.textContent)
//   }else if(equalBtn){
//     getResult()
//   }else if(toggleBtn){

//   }else if(deleteBtn){
//     console.log(firstOperand, operator, secondOperand)

//   }else{
//     return
//   }
// }

/** пприсвоить значения операндам */
// function getOperand(value){

//   /** нет ни одного значения */
//   if(secondOperand === '' && operator === ''){
//     firstOperand += value
//     result.textContent = firstOperand
//     visual.textContent = firstOperand
//   }else if(firstOperand !== '' && secondOperand !== '' && operator !== ''){
//     console.log('yes')
//   }else if(firstOperand !== '' && secondOperand !== '' && finish){//продолжение операции после нажатия знака равно
//     secondOperand = value
//     finish = false
//     result.textContent = secondOperand
//     visual.textContent = `${firstOperand} ${operator} ${secondOperand}`
//   }else{// запись второй цифры и до нажатия знака равно
//     secondOperand += value
//     result.textContent = secondOperand
//     visual.textContent = `${firstOperand} ${operator} ${secondOperand}`
//   }
// };

// /** получить знак операции */
// function getOperator(value){
//   operator = value
//   result.textContent = operator;
//   visual.textContent = `${firstOperand} ${operator}`
// };

// /** получить результат операции */
// function getResult(){
//   if( secondOperand === ''){//если не указать вторую цифру
//     secondOperand = firstOperand
//  }
//  switch(operator){
//     case '+':
//       firstOperand = (+firstOperand) + (+secondOperand)
//       break;
//     case '-':
//       firstOperand = (+firstOperand) - (+secondOperand)
//       break;
//     case 'x':
//       firstOperand = (+firstOperand) * (+secondOperand)
//       break;
//     case '/':
//       firstOperand = (+firstOperand) / (+secondOperand)
//       break;
//     case '%':
//       firstOperand = (+firstOperand) / 100 * (+secondOperand)
//       break;
//   }
//   finish = true;
//   result.textContent = firstOperand;
//   visual.textContent = firstOperand;
// };

/** слушатели */
mode.addEventListener('click', changeTheme);
// clear.addEventListener('click', clearAll);
calculator.addEventListener('click', handleButton);

