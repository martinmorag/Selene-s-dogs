import { displayBreeds, getLocalStorage, setLocalStorage } from "./utils.mjs";


function BreedsSection(breedData) {
    const breed = `<div class='dog_info'>
      <img src='${breedData.image.url}' alt='${breedData.name}' class='dog_image'>
      <div class='info'>
        <h3>${breedData.name}</h3>
        <p>Bred for: ${breedData.bred_for}</p>
        <p>Temperament: ${breedData.temperament}</p>
      </div>
    </div>`; // Renamed variable to breedElement
    return breed;
}

function displayHistory(item) {
  const history = `<div class="history-item">
                      <span id="directory">${item}</span>
                      <button class="delete-btn" data-item="${item}">X</button>
                   </div>`
  return history;
}

export default class Breeds {
    constructor(path, key) {
      this.key = key;
      this.path = path;
      this.selection = '';
      this.listOfNames = {};
    }
    async init() {
      this.getSelection();
      this.getBreed();
      this.sendHistory();
    }
    async displayResults(selection) {
      const response = await displayBreeds();
      this.listOfNames = response
              .filter(breed => breed.temperament && breed.temperament.toLowerCase().includes(this.selection.toLowerCase()))
              .map(breed => breed);
    
      // Display filtered breeds
      if (this.listOfNames.length === 0) {
        console.log("No breeds found with temperament '" + selection + "'.");
      } else {
          this.insertData(); // Call insertData after fetching and filtering breeds
      }
    }
    getBreed() {
      // Using arrow function to maintain the correct context of `this`
      document.getElementById('myForm').addEventListener('submit', (event) => {
        event.preventDefault(); 
    
        let selectedValue = document.getElementById('breed-list').value;
        this.selection = selectedValue;
      });
    }
    insertData() {
      const whereTo = document.querySelector(this.path);
        whereTo.innerHTML = this.listOfNames.map(breed => BreedsSection(breed)).join('');
    }
    sendHistory() {
      let existingItems = getLocalStorage(this.key); // Retrieve items from localStorage
      const span = document.querySelector('.display-history');
      const uniqueItems = new Set(); // Use a Set to keep track of unique items
    
      if (existingItems) {
        existingItems.forEach(item => {
          uniqueItems.add(item); // Add each item to the Set
        });
    
        // Clear the current history display
        span.innerHTML = '';
    
        // Append unique history items to the history display
        uniqueItems.forEach(item => {
          span.innerHTML += displayHistory(item);
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
          button.addEventListener('click', () => {
            const itemToDelete = button.dataset.item;
            // Remove the item from localStorage
            existingItems = existingItems.filter(item => item !== itemToDelete);
            setLocalStorage(this.key, existingItems);
            // Update the history display
            this.sendHistory();
          });
        });
      }
    }
    getSelection() {
      let self = this;
      
      document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
    
        const selectedBreed = document.getElementById('breed-list').value;
        document.getElementById('intro').innerText = `Let's see a little bit about dogs that are ${selectedBreed}!`;

        self.selection = selectedBreed;
        
        // displayResults are called after setting the selection
        self.displayResults(self.selection);

        let existingItems = [];
        existingItems = getLocalStorage(self.key); // Use 'self' instead of 'this'
        if (!existingItems) {
          existingItems = [];
        }
        existingItems.push(self.selection); // Use 'self' instead of 'this'
        setLocalStorage(self.key, existingItems); // Use 'self' instead of 'this'

        // update history
        self.sendHistory();
      });
    }
    
}