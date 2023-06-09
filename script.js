var dateInput = document.querySelector("#date-input")
var showBtn = document.querySelector("#show-button")
var output = document.querySelector("#output-div")





function reverseString(str) {

    return str.split("").reverse().join("");

}
  
function isPalindrome(str) {
    var reverse = reverseString(str);
    return str === reverse;
}

function convertDateToStr(date) {
    var dateStr = {day: "", month: "", year: ""};

    if (date.day < 10){
        dateStr.day = "0" + date.day;
    }else {
        dateStr.day = date.day.toString(); 
    }

    if (date.month < 10){
        dateStr.month = "0" + date.month;
    }else {
        dateStr.month = date.month.toString(); 
    }

    dateStr.year = date.year.toString();

    return dateStr;
}


function getAllDateFormats (date) {

    var dateStr = convertDateToStr(date);

    var DDMMYYYY = dateStr.day + dateStr.month + dateStr.year;
    var MMDDYYYY = dateStr.month + dateStr.day + dateStr.year;
    var YYYYMMDD = dateStr.year + dateStr.month + dateStr.day;
    var DDMMYY = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var MMDDYY = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var YYMMDD = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD];
}

function checkPalindromeForALlDateFormats(date) {
    var listOfPalindrome = getAllDateFormats(date);

    var flag = false

    for(var i=0; i < listOfPalindrome.length; i++){
        if (isPalindrome(listOfPalindrome[i])){
            flag = true;
            break;
        }
    }

    return flag;
}

function isLeapYear(year) {
    if(year % 400 === 0) {
        return true
    }
    if(year % 100 ===0) {
        return false
    }
    if(year % 4 === 0){
        return true 
    }
    return false
}




function getNextDate(date) {
    var day = date.day + 1
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++
            }
        }
        else {
            if(day > 28) {
                day = 1;
                month++
            }
        }
    }
    else {
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }

    if(month > 12) {
        month = 1;
        year++
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date) {
    var count = 0;
    var nextDate = getNextDate(date); 

    while(1) {
        count++;
        var isPalindrome = checkPalindromeForALlDateFormats(nextDate);

        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate)
    }

    return [count, nextDate]
}

function clickHandler() {
    var dateStr = dateInput.value;
  
    if (dateStr !== "") {
      var listOfDate = dateStr.split("-");
  
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0]),
      };
  
      var isPalindrome = checkPalindromeForALlDateFormats(date);
  
      
  
        if (isPalindrome) {
          output.innerText = "Yayyy!!! Your Birthday is Palindrome 🤩🤩🤩";
        } else {
          var [count, nextDate] = getNextPalindromeDate(date);
          output.innerText = `The Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days.😯😯😯`;
        }
    }
  }

showBtn.addEventListener("click", clickHandler);