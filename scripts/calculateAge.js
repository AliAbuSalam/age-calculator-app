export const calculateAge = ({ day, month, year }) => {
  if(!day || !month || !year){
    return;
  }
  const today = new Date();

  const todayDate = {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear()
  };

  const difference = {
    day: todayDate.day - day,
    month: todayDate.month - month,
    year: todayDate.year - year
  };

  if(difference.day < 0){
    difference.day = difference.day + convertMonthToDays(todayDate.month);
    --difference.month
  }

  if(difference.month < 0){
    difference.month = difference.month + 12;
    --difference.year;
  }

  return difference;
}

const convertMonthToDays = (monthValue, yearValue) => {
  if(monthValue === 2 && yearValue % 4 === 0){
    return 29;
  } else if (monthValue === 2){
    return 28;
  }

  switch(monthValue){
    case 1: return 31;
    case 3: return 31;
    case 4: return 30;
    case 5: return 31;
    case 6: return 30;
    case 7: return 31;
    case 8: return 31;
    case 9: return 30;
    case 10: return 31;
    case 11: return 30;
    case 12: return 31;
  }
}