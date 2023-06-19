import { calculateAge } from "./calculateAge.js";
import { updateResultDisplay } from "./updateResultDisplay.js";

export const filterNonNumber = ({ target }) => {
  target.value = target.value.replaceAll(/[^0-9]/g, '');
};

const updateInputElement = (inputName, validationObj) => {
  if(validationObj.type){
    removeErrorClassOnInput(inputName);
  } else {
    addErrorClassOnInput(inputName, validationObj.description);
  }
}

const addErrorClassOnInput = (inputName, description) => {
  const container = document.getElementById(`${inputName}-container`);
  container.childNodes.forEach(child => child.classList?.add('error'));

  container.children[2].innerText = description;
};

const removeErrorClassOnInput = (inputName) => {
  const container = document.getElementById(`${inputName}-container`);
  container.childNodes.forEach(child => child.classList?.remove('error'));

  container.children[2].innerText = '.';
}

export const handleSubmit = (event) => {
  event.preventDefault();
  const target = event.target;
  const dayInput = target.elements['day-input'];
  const monthInput = target.elements['month-input'];
  const yearInput = target.elements['year-input'];

  const monthValidationObj = isMonthValid(monthInput.value);
  const yearValidationObj = isYearValid(yearInput.value);
  const dayValidationObj = isDayValid(dayInput.value, monthInput.value, yearInput.value);

  updateInputElement('day', dayValidationObj);
  updateInputElement('month', monthValidationObj);
  updateInputElement('year', yearValidationObj);

  const age = calculateAge({
    year: Number(yearInput.value),
    month: Number(monthInput.value),
    day: Number(dayInput.value),
  });

  updateResultDisplay(age);
}

const falseObject = (description) => ({ type: false, description });
const trueObject = () => ({ type: true, description: ''});
const fieldEmptyObj = () => ({ type: false, description: 'This field is required'});

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

const isDayValid = (rawDayValue, rawMonthValue, rawYearValue) => {
  if(!rawDayValue){
    return fieldEmptyObj();
  }
  const dayValue = Number(rawDayValue);
  const monthValue = Number(rawMonthValue);
  const yearValue = Number(rawYearValue);

  if(dayValue < 1 || dayValue > 31){
    return falseObject('Must be a valid day');
  }

  if(!Number.isInteger(monthValue) || 
      !Number.isInteger(yearValue)
    ){
    return trueObject('');
  }
 
  /* --------------- Logic for february -----------------------*/
  if(monthValue === 2 && yearValue % 4 === 0){//means leap year
    if(dayValue > 29){
      return falseObject('Must be a valid date');
    } else if(dayValue >= 1 || dayValue <= 29){
      return trueObject();
    }
  } else if(monthValue === 2 && yearValue % 4 !== 0){//means NOT a leap year
    if(dayValue > 28){
      return falseObject('Must be a valid date');
    } else if(dayValue >= 1 && dayValue <= 28){
      return trueObject();
    }
  }
  /* -----------------------------------------------------------*/
  /* ---------------- Logic for months that have 30 days max ----------*/
  switch(monthValue){
    case(4, 6, 9, 11):
      if(dayValue > 30){
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

  const currentYear = new Date().getFullYear();
  if(!currentYear){
    return falseObject('Error getting current year')
  }

  if(currentYear - convertedYearValue < 0){
    return falseObject('Must be in the past');
  }
  return trueObject();
}

