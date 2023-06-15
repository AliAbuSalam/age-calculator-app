import { filterNonNumber } from "./form.js";

const inputs = document.querySelectorAll('input');

inputs.forEach(input => input.addEventListener('input', filterNonNumber));

