export const updateResultDisplay = (resultObj) => {
  for(const prop in resultObj){
    const spanElement = document.getElementById(prop);
    spanElement.innerText = resultObj[prop];
  }
};