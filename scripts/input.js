export const filterNonNumber = ({ target }) => {
  target.value = target.value.replace(/[^0-9]/, '');
};