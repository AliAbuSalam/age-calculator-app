export const filterNonNumber = ({ target }) => {
  target.value = target.value.replaceAll(/[^0-9]/g, '');
};

const updateInputElement = (dayValidationObj, monthValidationObj, yearValidationObj) => {
  if(dayValidationObj.type){
    removeErrorClassOnInput('day');
  } else {
    addErrorClassOnInput('day', dayValidationObj.description);
  }

  if(monthValidationObj.type){
    removeErrorClassOnInput('month');
  } else {
    addErrorClassOnInput('month', monthValidationObj.description);
  }

  if(yearValidationObj.type){
    removeErrorClassOnInput('year');
  } else {
    addErrorClassOnInput('year', yearValidationObj.description);
  }
}

const addErrorClassOnInput = (inputName, description) => {
  const container = document.getElementById(`${inputName}-container`);
  container.childNodes.forEach(child => child.classList.add('error'));

  container.childNodes[2].innerText = description;
};

const removeErrorClassOnInput = (inputName) => {
  const container = document.getElementById(`${inputName}-container`);
  container.childNodes.forEach(child => child.classList.remove('error'));

  container.childNodes[2].innerText = '';
}

export const handleSubmit = (event) => {
  event.preventDefault();
  const target = event.target;
  const dayInput = target.elements['day-input'];
  const monthInput = target.elements['month-input'];
  const yearInput = target.elements['year-input'];

  const monthValidationObj = isMonthValid(monthInput.value);
  console.log('monthValidationObj: ', monthValidationObj);
}

const falseObject = (description) => ({ type: false, description });
const trueObject = () => ({ type: true, description: ''});

const isMonthValid = (value) => {
  if(!value){
    return fieldEmptyObj();
  }
  const convertedValue = Number(value);
  if(convertedValue >= 1 && convertedValue <= 12){
    return trueObject();
  }
  return falseObject('Must be a valid month');
};

const isDayValid = (dayValue, monthValue, yearValue) => {
  if(!dayValue){
    return fieldEmptyObj();
  }
  const convertedDayValue = Number(dayValue);
  const convertedMonthValue = Number(monthValue);
  const convertedYearValue = Number(yearValue);
  if(!isInteger(convertedDayValue) || 
      !isInteger(convertedMonthValue) || 
      !isInteger(convertedYearValue)
    ){
    return falseObject('');
  }
  if(convertedDayValue < 1 || convertedDayValue > 31){
    return falseObject('Must be a valid day');
  }

  /* --------------- Logic for february -----------------------*/
  if(convertedMonthValue === 2 && convertedYearValue % 4 === 0){//means leap year
    if(convertedDayValue > 29){
      return falseObject('Must be a valid date');
    } else if(convertedDayValue >= 1 || convertedDayValue <= 29){
      return trueObject();
    }
  } else if(convertedMonthValue === 2 && convertedYearValue % 4 !== 0){//means NOT a leap year
    if(convertedDayValue > 28){
      return falseObject('Must be a valid date');
    } else if(convertedDayValue >= 1 && convertedDayValue <= 28){
      return trueObject();
    }
  }
  /* -----------------------------------------------------------*/
  /* ---------------- Logic for months that have 30 days max ----------*/
  switch(convertedMonthValue){
    case(4, 6, 9, 11):
      if(convertedDayValue > 30){
        return falseObject('Must be a valid date');
      }
    default: return trueObject();
  }
  /*--------------------------------------------------------------------*/
};

const isYearValid = (yearValue) => {
  if(!yearValue){
    return fieldEmptyObj();
  }
  const convertedYearValue = Number(yearValue);
  if(!convertedYearValue || convertedYearValue < 0){
    return falseObject('Must be a valid year');
  }
}

const fieldEmptyObj = () => ({ type: false, description: 'This field is required'});
