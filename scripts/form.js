import { calculateAge } from "./calculateAge.js";
import { updateResultDisplay, resetResultDisplay } from "./updateResultDisplay.js";

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
  const today = new Date();

  let monthValidity = isMonthValid(monthInput.value);
  let yearValidity = isYearValid(yearInput.value, today);
  let dayValidity = isDayValid(dayInput.value, monthInput.value, yearInput.value);


  const generateResultSum = (monthValidity, yearValidity, dayValidity) => [monthValidity, yearValidity, dayValidity].map(obj => obj.type); 
  let validationObjResultSum = generateResultSum(monthValidity, yearValidity, dayValidity);

  const validationObjHasError = validationObjResultSum.includes(false);

  if(!validationObjHasError){
    const {
      monthValidationObj,
      yearValidationObj,
      dayValidationObj,
    } = checkWhetherDateIsInThePast(yearValidity, monthValidity, dayValidity, today);

    monthValidity = monthValidationObj;
    yearValidity = yearValidationObj;
    dayValidity = dayValidationObj;

    validationObjResultSum = validationObjResultSum = generateResultSum(monthValidity, yearValidity, dayValidity);
  }


  updateInputElement('day',  dayValidity);
  updateInputElement('month', monthValidity);
  updateInputElement('year', yearValidity);


  if(validationObjResultSum.includes(false)){
    resetResultDisplay();
    return;
  }

  const age = calculateAge({
    year: Number(yearInput.value),
    month: Number(monthInput.value),
    day: Number(dayInput.value),
    today,
  });

  updateResultDisplay(age);
}

const checkWhetherDateIsInThePast = (yearObj, monthObj, dayObj, today) => {
  
  const generateFalseReturnObj = () => generateReturnObj(falseObject(''), falseObject(''), falseObject('Must be in the past'));
  const generateReturnObj = (yearReturnObj, monthReturnObj, dayReturnObj) => ({ 
    yearValidationObj: yearReturnObj,
    monthValidationObj: monthReturnObj,
    dayValidationObj: dayReturnObj
  });

  if(yearObj.value < today.getFullYear()){
    return generateReturnObj(yearObj, monthObj, dayObj)
  }

  if(yearObj.value === today.getFullYear()){
    if(monthObj.value > today.getMonth()+1){
      return generateFalseReturnObj();
    }
    if(monthObj.value === today.getMonth()+1){
      if(dayObj.value > today.getDate()){
        return generateFalseReturnObj();
      }
    }
  }

  return generateReturnObj(yearObj, monthObj, dayObj);
}

const falseObject = (description) => ({ type: false, description });
const trueObject = (value) => ({ type: true, description: '', value});
const fieldEmptyObj = () => ({ type: false, description: 'This field is required'});

const isMonthValid = (value) => {
  if(!value){
    return fieldEmptyObj();
  }
  const convertedValue = Number(value);
  if(convertedValue >= 1 && convertedValue <= 12){
    return trueObject(convertedValue);
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
    return trueObject(dayValue);
  }
 
  /* --------------- Logic for february -----------------------*/
  if(monthValue === 2 && yearValue % 4 === 0){//means leap year
    if(dayValue > 29){
      return falseObject('Must be a valid date');
    } else if(dayValue >= 1 || dayValue <= 29){
      return trueObject(dayValue);
    }
  } else if(monthValue === 2 && yearValue % 4 !== 0){//means NOT a leap year
    if(dayValue > 28){
      return falseObject('Must be a valid date');
    } else if(dayValue >= 1 && dayValue <= 28){
      return trueObject(dayValue);
    }
  }
  /* -----------------------------------------------------------*/
  /* ---------------- Logic for months that have 30 days max ----------*/
  switch(monthValue){
    case(4, 6, 9, 11):
      if(dayValue > 30){
        return falseObject('Must be a valid date');
      }
    default: return trueObject(dayValue);
  }
  /*--------------------------------------------------------------------*/
};

const isYearValid = (yearValue, today) => {
  if(!yearValue){
    return fieldEmptyObj();
  }
  const convertedYearValue = Number(yearValue);
  if(!convertedYearValue || convertedYearValue < 0){
    return falseObject('Must be a valid year');
  }

  const currentYear = today.getFullYear();
  if(!currentYear){
    return falseObject('Error getting current year')
  }

  if(currentYear - convertedYearValue < 0){
    return falseObject('Must be in the past');
  }
  return trueObject(convertedYearValue);
}

