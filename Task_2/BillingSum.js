const breakfastTotal = 1000;
const lunchTotal = 2000;
const dinnerTotal = 3000;

// Number of persons
const numberOfPersons = 3;

// Check if each person ate breakfast, lunch, and dinner
const personAte = [
  { breakfast: true, lunch: true, dinner: true },  // Person 1 ate all meals
  { breakfast: true, lunch: false, dinner: true }, // Person 2 skipped lunch
  { breakfast: false, lunch: true, dinner: true }, // Person 3 skipped breakfast
];

// Calculate the total amount spent
const totalAmountSpent = breakfastTotal + lunchTotal + dinnerTotal;

// Initialize an array to store the split amount for each person
const splitAmounts = [];

// Adjust the split amount based on the meals each person ate
personAte.forEach((person, index) => {
  splitAmounts[index] = 0; // Initialize each person's split amount to 0

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
  const roundedAmount = splitAmounts[i].toFixed(0); // Round to 0 decimal places
  console.log(`Person ${i + 1} Split Amount:`, roundedAmount);
}
