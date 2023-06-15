import { filterNonNumber, handleSubmit } from "./form.js";


const inputs = document.querySelectorAll('input');

inputs.forEach(input => input.addEventListener('input', filterNonNumber));

const form = document.querySelector('form');

form.addEventListener('submit', handleSubmit);