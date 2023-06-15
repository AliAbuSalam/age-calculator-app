export const filterNonNumber = ({ target }) => {
  target.value = target.value.replace(/[^0-9]/, '');
};

export const handleSubmit = (event) => {
  event.preventDefault();
  const target = event.target;
  const dayInput = target.elements['day-input'];
  const monthInput = target.elements['month-input'];
  const yearInput = target.elements['year-input'];

  console.log('dayInput: ', dayInput);
  console.log('monthInput: ', monthInput);
  console.log('yearInput: ', yearInput);
}

const falseObject = (description) => ({ type: false, description });
const trueObject = () => ({ type: true, description: ''});

const isMonthValid = (value) => {
  const convertedValue = Number(value);
  if(convertedValue >= 1 && convertedValue <= 12){
    return trueObject();
  }
  return falseObject('Must be a valid month');
};

const isDayValid = (dayValue, monthValue, yearValue) => {
  if(dayValue < 1 || dayValue > 31){
    return falseObject('Must be a valid day');
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
  const convertedYearValue = Number(yearValue);
  if(!convertedYearValue || convertedYearValue < 0){
    return falseObject('Must be a valid year');
  }
}