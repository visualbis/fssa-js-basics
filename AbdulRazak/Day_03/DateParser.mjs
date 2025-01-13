function solve(date, dateFormat) {
    const dataArray = date.split(/\D/);
    const dateFormatArray = dateFormat.split("-").map(format => format.toLowerCase());
  
    const components = {
        year: "0",
        month: "0",
        day: "0"
    };
  
    for (let i = 0; i < dateFormatArray.length; i++) {
        const format = dateFormatArray[i];
        let value = dataArray[i];
  
        if (format === "yyyy" || format === "yy") {
            if (value.length >= 2) {
                components.year = value;
            }
        } else if (format === "mm" || format === "m") {
            if (value.length <= 2 && parseInt(value) >= 1 && parseInt(value) <= 12) {
                components.month = value.padStart(2, "0");
            }
        } else if (format === "dd" || format === "d") {
            if (value.length <= 2 && parseInt(value) >= 1 && parseInt(value) <= 31) {
                components.day = value.padStart(2, "0");
            }
        }
    }

    return [components.year, components.month, components.day];
}

console.log(solve("22/3/1998", "dd-MM-yyyy")); // Output: ['1998', '03', '22']
console.log(solve("20-2122", "dd-yyyy")); // Output: [ '2122', '0', '20']
console.log(solve("03-22", "dd-yy")); // Output: ['22', '0', '03']
