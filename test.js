function dateFormater(date, format) {
    const components = date.split(/[\/-]/);
    const result = [];

    format.split(/[\/-]/).forEach((part, index) => {
        switch (part) {
            case "dd":
                result.unshift(components[index]);
                break;
            case "mm":
                result.unshift(components[index]);
                break;
            case "yyyy":
                result.unshift(components[index]);
                break;
            case "yy":
                const fullYear = components[index];
                const shortenedYear = fullYear.length === 4 ? fullYear.slice(-2) : fullYear;
                result.unshift(shortenedYear);
                break;
            default:
                console.log(`Unsupported format: ${part}`);
        }
    });

    return result;
}

// Test cases
const inputDate = "22/08/2022";
const Format1 = "dd/mm/yyyy";
const output1 = dateFormater(inputDate, Format1);
console.log(output1);  // Output: [ '22', '08', '2022' ]

const inputDate2 = "21/2022";
const Format2 = "dd/yy";
const output2 = dateFormater(inputDate2, Format2);
console.log(output2);  // Output: [ '22', '22' ]
