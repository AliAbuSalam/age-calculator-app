import { filterNonNumber } from "./input.js";

const inputs = document.querySelectorAll('input');

inputs.forEach(input => input.addEventListener('input', filterNonNumber));

