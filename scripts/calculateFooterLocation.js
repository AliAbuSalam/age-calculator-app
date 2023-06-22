export const handleResize = () => {
  const body = document.querySelector('body');
  if(body.scrollHeight > window.innerHeight){
    moveFooterToOriginalPosition();
  } else {
    moveFooterToBottomPage();
  }
}

export const handleLoad = () => {
  makeFooterVisible();
  handleResize();
}

const makeFooterVisible = () => {
  const footer = document.querySelector('.attribution');
  footer.classList.remove('hidden');
}

const moveFooterToBottomPage = () => {
  const footer = document.querySelector('.attribution');
  footer.classList.add('absolutePosition');
}

const moveFooterToOriginalPosition = () => {
  const footer = document.querySelector('.attribution');
  footer.classList.remove('absolutePosition');
}