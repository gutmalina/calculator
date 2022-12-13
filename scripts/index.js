const calculator = document.querySelector('.calculator__group');
const resultCalc = document.querySelector('.result__calc');
const visual = document.querySelector('.result__visual');
const mode = document.querySelector('.calculator__toggle');
const theme = document.querySelector('#theme');

let operand = ''
let operator = ''
let prevOperator = ''
let result = 0;

/** слушатели */
mode.addEventListener('click', changeTheme);
calculator.addEventListener('click', handleButton);

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
  const dataBtn = event.target.dataset
  if(dataBtn.number){
    operand += dataBtn.number
    if(!operator){
      result = parseFloat(operand)
      visual.textContent = result
    }else{
      prevOperator = operator
      visual.textContent = `${result} ${operator} ${operand}`
    }

  }else if(dataBtn.operator){
    const percent = dataBtn.percent
    if(!prevOperator){
      operator = dataBtn.operator
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
      operator = dataBtn.operator
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
    if(result && operator && operand.length >0){
      operand = operand.slice(0, -1)
      visual.textContent = `${result} ${operator} ${operand}`
    }else if(result && operator && !operand.length){
      operator = ''
      operand = 0
      visual.textContent = result
    }else if(result && !operator && !operand.length){
      result = parseFloat(result.toString().slice(0, -1))
      visual.textContent = result || 0
      resultCalc.textContent = result || 0
    }else{
      operand = operand.slice(0, -1)
      result = parseFloat(operand) || 0
      visual.textContent = result
    }

  }else if(event.target.classList.contains('item__type_toggle')){

  }else{}

}

function heandleResultOperation(valueOperator){
  switch(valueOperator){
    case '+':
      result = ((result*100) + (parseFloat(operand)*100))/100
      break;
    case '-':
      result = ((result*100) - (parseFloat(operand)*100))/100
      break;
    case '*':
      result = parseFloat((result * parseFloat(operand)).toPrecision(3))
      break;
    case '/':
      result = parseFloat((result / parseFloat(operand)).toPrecision(3))
      break;
  }
}



