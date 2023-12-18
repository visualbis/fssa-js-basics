function extractDateComponents(dateString, format) {
    const components = dateString.split(/[\/-]/); // Removing / in the date => 22 09 1998
    const result = []; // Adding the new array for result

    format.split(/[\/-]/).forEach((part, index) => { // Removing / in the format => dd mm yyyy
        switch (part) {
            case "dd":
                result.unshift(components[index]); // Pushing the first value
                break;
            case "mm":
                result.unshift(components[index]); // Pushing the second value
                break;
            case "yyyy":
                result.unshift(components[index]); // Pushing the third value
                break;
            default:
                console.log(`Unsupported format: ${part}`);
        }
    });

    return result;
}

// Input and output
// TestCase1:
const inputDate = "22/08/2022";
const inputFormat = "dd/mm/yyyy";

//TestCase2:
const inputDate2 = "22/2022";
const inputFormat2 = "dd/yyyy";
const output = extractDateComponents(inputDate, inputFormat);
console.log(output);
