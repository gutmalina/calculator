
let a = ''; //первое число
let b = ''; //второе число
let sign = ''; //знак математической операции
let finish = false; // итог операции
let see = ''


const result = document.querySelector('.result__calc');// поле в котором будет выводиться итог

// вернуть начальные значения всем переменным
function clearAll(){
  a = '';
  b = '';
  sign = '';
  finish = false;
  result.textContent = 0;
}

document.querySelector('.item__btn_ac').addEventListener('click', clearAll);

function getData(event){
  if(event.target.classList.contains('item__btn_number')){//выбираем только цифры
    if(b === '' && sign === ''){
      a += event.target.textContent
      result.textContent = a
    }else if(a !== "" && b !=='' && finish){
      b = event.target.textContent
      finish = false
      result.textContent = b
    }else{
      b += event.target.textContent
      result.textContent = b
    }
  }else if(event.target.classList.contains('item__btn_math')){
    sign = event.target.textContent
    result.textContent = sign
  }else if(event.target.classList.contains('item__btn_equal')){
    if(b === ''){
      b = a
    }
    switch(sign){
      case '+':
        a = (+a) + (+b)
        break;
      case '-':
        a = (+a) - (+b)
        break;
      case '*':
        a = (+a) * (+b)
        break;
      case '/':
        a = (+a) / (+b)
        break;
    }
    finish = true;
    result.textContent = a;
  }else{
    return
  }
  console.log( a, sign, b)
}

document.querySelector('.btn-group').addEventListener('click', getData)

console.log(a)
