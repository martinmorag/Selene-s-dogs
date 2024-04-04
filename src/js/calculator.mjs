export class Calculator {
    constructor() {
        this.size = '';
        this.humanYears = 0;
    }
    init() {
      this.displayAge();
    }
    calculateAge() {
        let dogAge;

        switch (this.size.toLowerCase()) {
            case 'small':
                if (this.humanYears <= 3) {
                    dogAge = [15, 23, 28][this.humanYears - 1];
                } else if (this.humanYears > 3) {
                    dogAge = 28 + (this.humanYears - 3) * 4;
                } else {
                    dogAge = 'Please insert a different age';
                }
                break;
            case 'medium':
                if (this.humanYears <= 5) {
                    dogAge = [15, 24, 29, 34, 37][this.humanYears - 1];
                } else if (this.humanYears % 2 === 0) {
                    dogAge = 37 + (this.humanYears - 5) / 2 * (5 + 4);
                } else if(this.humanYears % 2 !== 0) {
                    dogAge = 37 + Math.floor((this.humanYears - 5) / 2) * (5 + 4) + 5;
                } else {
                    dogAge = 'Please insert a different age';
                }
                break;
            case 'large':
                if (this.humanYears <= 8) {
                    dogAge = [14, 22, 29, 34, 40, 45, 50, 55][this.humanYears - 1];
                } else if (this.humanYears % 2 === 0) {
                    dogAge = 55 + (this.humanYears - 8) / 2 * (5 + 6);
                } else if (this.humanYears % 2 !== 0) {
                    dogAge = 55 + Math.floor((this.humanYears - 8) / 2) * (5 + 6) + 5;
                } else {
                    dogAge = 'Please insert a different age';
                }
                break;
            case 'giant':
                if (this.humanYears <= 16) {
                    dogAge = [14, 20, 28, 35, 42, 49, 56, 64, 71, 78, 86, 93, 101, 108, 115, 123][this.humanYears - 1];
                } else {
                  dogAge = 'Please insert a different age';
                }
                break;
            default:
                dogAge = null; // Set to null for unknown size
        }

        return dogAge;
    }
    displayAge() {
        let calcForm = document.getElementById("calcForm");
        let submitBtn = calcForm.querySelector(".submitAge");
        
        submitBtn.addEventListener("click", (event) => {
            event.preventDefault(); 
            
            this.size = calcForm.querySelector('input[name="dog_size"]:checked').value;
            this.humanYears = parseInt(calcForm.querySelector('input[name="human_age"]').value);
        
            if (this.size && this.humanYears) {
                let ageResult = this.calculateAge();
                document.querySelector('.ageResult').textContent = "Your dog's age in dog years is: " + ageResult;
            } else {
                document.querySelector('.ageResult').textContent = "Please select the dog size and enter the age.";
            }
        });
    }
}