// Async function example
async function fetchAndProcess() {
    try {
        const data = await fetchData();
        const result = await processData(data);
        displayResult(result);
    } catch (error) {
        handleError(error);
    }
}

// importing and exporting example

// math.js
export const add = (a, b) => a + b;
export const substract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => b !== 0 ? a/b : 'Cannot divide by zero';

// app.js
import {add, substract, multiply, divide} from './math.js';

console.log('Addition:', add(2,3));
console.log("Subtraction:", subtract(5, 2));    
console.log("Multiplication:", multiply(3, 4)); 
console.log("Division:", divide(10, 2));        
console.log("Division by zero:", divide(5, 0));
