// Data curenta
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");
const currdate = document.querySelector(".calendar-current-date");
const navigation_buttons = document.querySelectorAll(".calendar-navigation span");

calendarCells = [...document.querySelectorAll(".calendar-dates li")];
selected_date_location = date.getDate() + new Date(year, month, 1).getDay() - 1;
selected_date = new Date();
calendarCells[selected_date_location].classList.add("active");

calendarCells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if(cell.classList.contains("inactive")){
            return;
        }
        calendarCells[selected_date_location].classList.remove("active");
        selected_date_location = calendarCells.indexOf(cell);
        selected_date = new Date(year, month, selected_date_location - new Date(year, month, 1).getDay() + 1);
        cell.classList.add("active");
    });
});

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];


// Update calendar
const renderMonth = () => {

	let dayone = new Date(year, month, 1).getDay();
	let lastdate = new Date(year, month + 1, 0).getDate();
	let dayend = new Date(year, month, lastdate).getDay();
	let monthlastdate = new Date(year, month, 0).getDate();

    console.log(dayone, lastdate, dayend, monthlastdate);

    for(i = dayone; i < lastdate+dayone; i++){
        calendarCells[i].classList.remove("inactive");
        calendarCells[i].innerText = i - dayone + 1;
    }
    for(i = dayone - 1; i >= 0; i--){
        calendarCells[i].innerText = monthlastdate - (dayone - i) + 1;
        calendarCells[i].classList.add("inactive");
    }
    for(i = lastdate + dayone; i < 42; i++){
        calendarCells[i].innerText = i - (lastdate + dayone) + 1;
        calendarCells[i].classList.add("inactive");
    }


	currdate.innerText = `${months[month]} ${year}`;

}
renderMonth();

// Attach a click event listener to each icon
navigation_buttons.forEach(icon => {

	// When an icon is clicked
	icon.addEventListener("click", () => {

		// Check if the icon is "calendar-prev"
		// or "calendar-next"
		month = icon.id === "calendar-prev" ? month - 1 : month + 1;

		// Check if the month is out of range
		if (month < 0 || month > 11) {

			// Set the date to the first day of the 
			// month with the new year
			date = new Date(year, month, new Date().getDate());

			// Set the year to the new year
			year = date.getFullYear();

			// Set the month to the new month
			month = date.getMonth();
		}

		else {

			// Set the date to the current date
			date = new Date();
		}

        if(year == selected_date.getFullYear() && month == selected_date.getMonth()){
            calendarCells[selected_date_location].classList.add("active");
        }
        else {
            calendarCells[selected_date_location].classList.remove("active");
        }

		renderMonth();
	});
});
