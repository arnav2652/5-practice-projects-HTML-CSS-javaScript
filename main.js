let isDOBOpen = false;
let dateOfBirth;
const settingCogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTxtEl = document.getElementById("afterDOBBtnTxt");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

let ageUpdateInterval; // Store interval ID

const makeTwoDigitNumber = (number) => {
    return number > 9 ? number : `0${number}`;
};

const toggleDateOfBirthSelector = () => {
    settingContentEl.classList.toggle("hide");
    isDOBOpen = !isDOBOpen;
    console.log("Toggle", isDOBOpen);
};

const updateAge = () => {
    if (!dateOfBirth) return; // Exit if dateOfBirth is not set

    const currentDate = new Date();
    let years = currentDate.getFullYear() - dateOfBirth.getFullYear();
    let months = currentDate.getMonth() - dateOfBirth.getMonth();
    let days = currentDate.getDate() - dateOfBirth.getDate();

    // Adjust for negative days
    if (days < 0) {
        months--;
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += lastMonth.getDate(); // Get the last day of the previous month
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    const hours = currentDate.getHours() - dateOfBirth.getHours();
    const minutes = currentDate.getMinutes() - dateOfBirth.getMinutes();
    const seconds = currentDate.getSeconds() - dateOfBirth.getSeconds();

    yearEl.innerHTML = makeTwoDigitNumber(years);
    monthEl.innerHTML = makeTwoDigitNumber(months);
    dayEl.innerHTML = makeTwoDigitNumber(days);
    hourEl.innerHTML = makeTwoDigitNumber(hours < 0 ? 24 + hours : hours);
    minuteEl.innerHTML = makeTwoDigitNumber(minutes < 0 ? 60 + minutes : minutes);
    secondEl.innerHTML = makeTwoDigitNumber(seconds < 0 ? 60 + seconds : seconds);
};

const localStorageGetter = () => {
    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const date = localStorage.getItem("date");
    const hour = localStorage.getItem("hour");
    const minute = localStorage.getItem("minute");
    const second = localStorage.getItem("second");

    // Check if all values are present
    if (year && month && date && hour && minute && second) {
        // Create a Date object (month is zero-based)
        const dateTime = new Date(year, parseInt(month) - 1, date, hour, minute, second);
        console.log("Date and Time:", dateTime);
        return dateTime;
    } else {
        return null; // Return null if any part is missing
    }

    updateAge();
};
const contentToggler = () => {
    if (dateOfBirth) {
        initialTextEl.classList.add("hide");
        afterDOBBtnTxtEl.classList.remove("hide");
    } else {
        afterDOBBtnTxtEl.classList.add("hide");
        initialTextEl.classList.remove("hide");
    }
};

const setDOBHandler = () => {
    const dateString = dobInputEl.value;
    dateOfBirth = dateString ? new Date(dateString) : null;

    const now = new Date();

    if (dateOfBirth && !isNaN(dateOfBirth.getTime())) { // Check if date is valid
        localStorage.setItem("year", dateOfBirth.getFullYear());
        localStorage.setItem("month", dateOfBirth.getMonth());
        localStorage.setItem("date", dateOfBirth.getDate());
        localStorage.setItem("hour", now.getHours());
        localStorage.setItem("minute", now.getMinutes());
        localStorage.setItem("second", now.getSeconds());

        if (ageUpdateInterval) {
            clearInterval(ageUpdateInterval); // Clear previous interval
        }
        ageUpdateInterval = setInterval(updateAge, 1000);
    } else {
        alert("Please enter a valid date.");
    }

    contentToggler();
};

// Initialize the application
localStorageGetter();
 contentToggler();

settingCogEl.addEventListener("click", toggleDateOfBirthSelector);
dobButtonEl.addEventListener("click", setDOBHandler);