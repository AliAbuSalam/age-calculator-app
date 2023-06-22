import { filterNonNumber, handleSubmit } from "./form.js";
import { handleResize } from "./calculateFooterLocation.js";
import { handleLoad } from "./calculateFooterLocation.js";

const inputs = document.querySelectorAll('input');

inputs.forEach(input => input.addEventListener('input', filterNonNumber));

const form = document.querySelector('form');

form.addEventListener('submit', handleSubmit);

window.addEventListener('load', handleLoad);

window.addEventListener('resize', handleResize);
