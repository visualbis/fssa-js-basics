let date = "02/1999";
let dateformat = "mm/yyyy";

function indexfinder(array, letter, ans_array, date_array) {

    letter.toLowerCase();

    let letter_index = 0;
    let flag = true;

    for (let i = 0; i < array.length; i++) {
        if (array[i][0] == letter) {
            letter_index += i;
            flag = true;
            break;
        }
        else {
            flag = false;
        }
    }

    if(flag) {
        ans_array.push(date_array[letter_index]);
    }
    else{
        ans_array.push("0");
    }
}


function dateFormatter(date, dateformat) {


    dateformat.toLowerCase();

    let ans_array = [];

    let date1 = date.replaceAll("-", " ").replaceAll("/", " ")

    let dateformat1 = dateformat.replaceAll("-", " ").replaceAll("/", " ")

    let datear = date1.split(" ");
    let dateformatarr = dateformat1.split(" ");

    

    indexfinder(dateformatarr, "y", ans_array, datear);

    indexfinder(dateformatarr, "m", ans_array, datear);

    indexfinder(dateformatarr, "d", ans_array, datear);

    console.log(ans_array);
}

dateFormatter(date, dateformat);
