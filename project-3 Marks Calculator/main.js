const calculateFormEl = document.getElementById("calculateForm");
const resultEl = document.getElementById("result");

const calculateMarks = (event) => {
    const maxMarks = 600; // Total maximum marks
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(calculateFormEl);
    const data = {};

    // Populate the data object with form values
    formData.forEach((value, key) => {
        data[key] = +value; // Convert input values to numbers
    });

    // Calculate total marks
    const totalMarks = data.maths + data.science + data.socialScience + data.english + data.hindi + data.sanskrit;

    // Calculate percentage
    const percentage = (totalMarks / maxMarks) * 100; // Calculate percentage

    // Display the result with two decimal places
    resultEl.innerText = `You have got ${totalMarks} marks out of ${maxMarks} and your percentage is ${percentage.toFixed(2)}%`;
};

// Attach the event listener to the form
calculateFormEl.addEventListener("submit", calculateMarks);