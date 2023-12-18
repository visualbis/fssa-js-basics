function solve(date, dateFormat) {
    const dataArray = date.split(/\D/);
    const dateFormatArray = dateFormat.split(/\W+/);
    const components = {
        year: "0",
        month: "0",
        day: "0"
    };
    for (let i = 0; i < dateFormatArray.length; i++) {
        const format = dateFormatArray[i];
        let value = dataArray[i];
        switch (format) {
            case "YYYY":
            case "YY":
            case "yyyy":
            case "yy":
                components.year = value.length === 2 ? '20' + value : value;
                const currentDate = new Date();
                if (components.year > currentDate.getFullYear()) {
                    components.year = currentDate.getFullYear().toString();
                }
                break;
            case "MM":
            case "M":
                if (value.length <= 2 && parseInt(value) >= 1 && parseInt(value) <= 12) {
                    components.month = (parseInt(value) - 1).toString().padStart(2, "0");
                } else {
                    components.month = "01";
                }
                break;
            case "DD":
            case "dd":
                components.day = value.padStart(2, "0");
                break;
            default:
                return "Invalid date format";
        }
    }
    if (!isValidDate(components.year, components.month, components.day)) {
        return "Invalid date";
    }
    let dateInvalid = isValidDate(components.year, components.month, components.day);
    if (dateInvalid === "Date incorrect") {
        components.day = "01";
    }
    return new Date(Date.UTC(components.year, components.month, components.day));
}
function isValidDate(year, month, day) {
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return false;
    }
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > daysInMonth[month]) {
        return "Date incorrect";
    }
    return true;
}
// Test cases
console.log(solve("22/3/1998", "dd/MM/yyyy")); // Output: 1998-03-22T00:00:00.000Z
console.log(solve("30/2/2122", "dd/MM/yyyy")); // Output: 2000-02-01
console.log(solve("20%22", "dd%yy")); // Output: 2022-01-20T00:00:00.000Z
console.log(solve("03-22", "dd-yy")); // Output: 2022-01-03T00:00:00.000Z
console.log(solve("03-22", "mm-yy")); // Output: 2022-03-01T00:00:00.000Z // Output: Invalid date format