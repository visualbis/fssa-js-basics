// Extract date format: Input: Formatted Date: 12/12/2012, Formatted Date: dd/mm/yyyy. Output: ["2012", "12", "12"];

function extractDateComponents(dateString, format) {
    const components = dateString.split(/[\/-]/);
    const result = [];

    format.split(/[\/-]/).forEach((part, index) => {
        switch (part.toLowerCase()) {
            case "dd":
                const day = components[index];
                if (day >= 1 && day <= 31) {
                    result.unshift(day);
                } else {
                    console.log("Date is not between 1 and 31.");
                }
                break;
            case "mm":
                const month = components[index];
                if (month >= 1 && month <= 12) {
                    result.unshift(month);
                } else {
                    console.log("Month is not between 1 and 12.");
                }
                break;
            case "yyyy":
                const year = components[index].length === 2 ? "20" + components[index] : components[index];
                result.unshift(year);
                break;
            case "yy":
                result.unshift(components[index]);
                break;
            default:
                console.log(`Unsupported format: ${part}`);
        }
    });

    return result;
}

// Test cases
const inputDate1 = "32/08/2022";
const inputFormat1 = "dd/mm/yyyy";
console.log(extractDateComponents(inputDate1, inputFormat1)); // Output: Date is not between 1 and 31. ([ '2022', '08' ])

const inputDate2 = "22/13/2022";
const inputFormat2 = "dd/mm/yyyy";
console.log(extractDateComponents(inputDate2, inputFormat2)); // Output: Month is not between 1 and 12. ([ '2022', '22' ])

const inputDate3 = "22/12/2022";
const inputFormat3 = "dd/mm/yy";
console.log(extractDateComponents(inputDate3, inputFormat3)); // Output: ["22", "12", "22"]

const inputDate4 = "22/3/2022";
const inputFormat4 = "DD-MM-YYYY";
console.log(extractDateComponents(inputDate4, inputFormat4)); // Output: ["2022", "3", "22"]

const inputDate5 = "22/03/2022";
const inputFormat5 = "DD-MM-YY";
console.log(extractDateComponents(inputDate5, inputFormat5)); // Output: ["2022", "03", "22"]