function transformDateComponents(inputString, inputFormat) {
    const parts = inputString.split(/[\/-]/);
    const output = [];

    inputFormat.split(/[\/-]/).forEach((part, index) => {
        switch (part.toLowerCase()) {
            case "dd":
                const day = parts[index];
                if (day >= 1 && day <= 31) {
                    output.unshift(day);
                } else {
                    console.log("Date is not between 1 and 31.");
                }
                break;
            case "mm":
                const month = parts[index].padStart(2, '0'); // Ensure two digits
                if (month >= 1 && month <= 12) {
                    output.unshift(month);
                } else {
                    console.log("Month is not between 1 and 12.");
                }
                break;
            case "yyyy":
                const year = parts[index].length === 2 ? "20" + parts[index] : parts[index];
                output.unshift(year);
                break;
            case "yy":
                output.unshift(parts[index]);
                break;
            default:
                console.log(`Unsupported format: ${part}`);
        }
    });

    return output;
}
// Test cases
const inputDate1 = "32/08/2022";
const inputFormat1 = "dd/mm/yyyy";
console.log(transformDateComponents(inputDate1, inputFormat1)); // Output: Date is not between 1 and 31. ([ '2022', '08' ])

const inputDate2 = "22/13/2022";
const inputFormat2 = "dd/mm/yyyy";
console.log(transformDateComponents(inputDate2, inputFormat2)); // Output: Month is not between 1 and 12. ([ '2022', '22' ])

const inputDate3 = "22/12/2022";
const inputFormat3 = "dd/mm/yy";
console.log(transformDateComponents(inputDate3, inputFormat3)); // Output: ["22", "12", "22"]

const inputDate4 = "22/3/2022";
const inputFormat4 = "DD-MM-YYYY";
console.log(transformDateComponents(inputDate4, inputFormat4)); // Output: ["2022", "03", "22"]

const inputDate5 = "22/03/2022";
const inputFormat5 = "DD-MM-YY";
console.log(transformDateComponents(inputDate5, inputFormat5)); // Output: ["2022", "03", "22"]
