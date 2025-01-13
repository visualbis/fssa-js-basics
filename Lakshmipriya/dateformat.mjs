function dateFormat(inputString, inputFormat) {
    // Split the input string and format based on slashes or hyphens
    const inputParts = inputString.split(/[\/-]/);
    const formatParts = inputFormat.split(/[\/-]/);

    // Array to store the transformed date components
    const transformedDate = [];

    
    formatParts.forEach((formatPart, index) => {
       
        const inputValue = inputParts[index];

        switch (formatPart.toLowerCase()) {
            case "dd":
               
                if (isValidDay(inputValue)) {
                    transformedDate.unshift(inputValue);
                } else {
                    console.log("Invalid day value: " + inputValue);
                }
                break;
            case "mm":
                // Ensure month is between 1 and 12
                const paddedMonth = padMonth(inputValue);
                if (isValidMonth(paddedMonth)) {
                    transformedDate.unshift(paddedMonth);
                } else {
                    console.log("Invalid month value: " + inputValue);
                }
                break;
            case "yyyy":
                
                const adjustedYear = adjustYear(inputValue);
                transformedDate.unshift(adjustedYear);
                break;
            case "yy":
                transformedDate.unshift(inputValue);
                break;
            default:
                console.log(`Unsupported format: ${formatPart}`);
        }
    });

    return transformedDate;
}


function padMonth(month) {
    return month.padStart(2, '0');
}


function adjustYear(year) {
    return year.length === 2 ? "20" + year : year;
}


function isValidDay(day) {
    return day >= 1 && day <= 31;
}

function isValidMonth(month) {
    return month >= 1 && month <= 12;
}

// Test cases
const inputDate1 = "32/08/2022";
const inputFormat1 = "dd/mm/yyyy";
console.log(transformDateComponents(inputDate1, inputFormat1)); // Output: Invalid day value: 32, [ '2022', '08' ]

const inputDate2 = "22/13/2022";
const inputFormat2 = "dd/mm/yyyy";
console.log(dateFormat(inputDate2, inputFormat2)); // Output: Invalid month value: 13, [ '2022', '22' ]

const inputDate3 = "22/12/2022";
const inputFormat3 = "dd/mm/yy";
console.log(dateFormat(inputDate3, inputFormat3)); // Output: [ '22', '12', '22' ]

const inputDate4 = "22/3/2022";
const inputFormat4 = "DD-MM-YYYY";
console.log(dateFormat(inputDate4, inputFormat4)); // Output: [ '2022', '03', '22' ]

const inputDate5 = "22/03/2022";
const inputFormat5 = "DD-MM-YY";
console.log(dateFormat(inputDate5, inputFormat5)); // Output: [ '2022', '03', '22' ]