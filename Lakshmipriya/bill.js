
const breakfastTotal = 300;
const lunchTotal = 200;
const dinnerTotal = 100;

// Number of persons
const numberOfPersons = 3;

// Check if each person ate breakfast, lunch, and dinner
const personAte = [
  { breakfast: true, lunch: true, dinner: true }, 
  { breakfast: true, lunch: false, dinner: true },
  { breakfast: false, lunch: true, dinner: true }, 
];


const totalAmountSpent = breakfastTotal + lunchTotal + dinnerTotal;


const splitAmounts = [];


personAte.forEach((person, index) => {
  splitAmounts[index] = 0; 
  if (person.breakfast) {
    splitAmounts[index] += breakfastTotal / numberOfPersons;
  }
  if (person.lunch) {
    splitAmounts[index] += lunchTotal / numberOfPersons;
  }
  if (person.dinner) {
    splitAmounts[index] += dinnerTotal / numberOfPersons;
  }
});

console.log("The total amount of the bill is " + totalAmountSpent);
for (let i = 0; i < numberOfPersons; i++) {
  const roundedAmount = splitAmounts[i].toFixed(0); 
  console.log(`Person ${i + 1} Split Amount:`, roundedAmount);
}

