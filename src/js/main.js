import { Calculator } from "./calculator.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const factsButton = document.querySelector('#facts button');
const factsSection = document.querySelector('#facts');
let currentFactIndex = 0;

factsButton.addEventListener('click', () => {
    fetch('./json/facts.json') // Fetch the JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON data
        })
        .then(data => {
            const facts = data.facts;

            // Create a new container for the fact
            const factContainer = document.querySelector('.fact-container');
            factContainer.textContent = facts[currentFactIndex];

            // Increment the index for the next fact
            currentFactIndex = (currentFactIndex + 1) % facts.length;

            // Append the fact container to the facts section
            factsSection.appendChild(factContainer);
        })
        .catch(error => {
            console.error('There was a problem fetching the facts:', error);
        });
});

/* hover on text effect */
const textContent = document.querySelector('.welcoming-div .text-content');

textContent.style.transition = 'transform 0.3s ease-in-out';
textContent.style.transformOrigin = 'center';

textContent.addEventListener('mouseover', () => {
    textContent.style.transform = 'scale(1.15)'; // You can adjust the scale factor as needed
});
textContent.addEventListener('mouseout', () => {
    textContent.style.transform = 'scale(1)'; // Resetting the scale on mouseout
});

/* displayCalculator result */
const calc = new Calculator();
calc.init();