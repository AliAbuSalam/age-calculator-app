export const updateResultDisplay = (resultObj) => {
  for(const prop in resultObj){
    const spanElement = document.getElementById(prop);
    spanElement.innerText = resultObj[prop];
  }
};

export const resetResultDisplay = () => {
  const spanElements = document.querySelectorAll('span');
  spanElements.forEach(el => el.innerText = '- -');
}