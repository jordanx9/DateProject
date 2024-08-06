// Immediate function to check authorization
(function() {
    if (window.location.pathname.includes('invitation.html')) {
        // Check if user came from the auth page
        if (!document.referrer.includes('index.html')) {
            window.location.href = 'index.html';
        }
    }
})();

// Set the minimum date for the date picker to tomorrow
function setMinDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    document.getElementById('dateInput').min = minDate;
}

// Show the date options section
function showDateOptions() {
    document.getElementById('invitation').style.display = 'none';
    document.getElementById('dateOptions').style.display = 'block';
}

// Show the "get to know" section
function showGetToKnow() {
    document.getElementById('invitation').style.display = 'none';
    document.getElementById('getToKnow').style.display = 'block';
}

// Show the date picker when a date type is selected
function showDatePicker() {
    const dateType = document.getElementById('dateType').value;
    if (dateType) {
        document.getElementById('datePicker').style.display = 'block';
        setMinDate();
    } else {
        document.getElementById('datePicker').style.display = 'none';
    }
}

// Enable the time select dropdown after a date is chosen
function enableTimeSelect() {
    document.getElementById('timeSelect').disabled = false;
}

// Show the phone number input section after date and time are selected
function showPhoneNumberInput() {
    const dateType = document.getElementById('dateType').value;
    const date = document.getElementById('dateInput').value;
    const time = document.getElementById('timeSelect').value;
    if (dateType && date && time) {
        document.getElementById('dateOptions').style.display = 'none';
        document.getElementById('phoneNumber').style.display = 'block';
        localStorage.setItem('selectedDate', date);
        localStorage.setItem('selectedTime', time);
        localStorage.setItem('selectedDateType', dateType);
    }
}

// Submit the phone number and date details
function submitPhoneNumber() {
    const phoneNumber = document.getElementById('phone').value;
    const selectedDate = localStorage.getItem('selectedDate');
    const selectedTime = localStorage.getItem('selectedTime');
    const selectedDateType = localStorage.getItem('selectedDateType');
    if (phoneNumber) {
        fetch("https://formspree.io/f/xanwjwww", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                selectedDate: selectedDate,
                selectedTime: selectedTime,
                selectedDateType: selectedDateType
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert(`Wonderful! I'm looking forward to our ${selectedDateType} date on ${selectedDate} at ${getTimeString(selectedTime)}. I'll text you at ${phoneNumber} with more details soon!`);
            } else {
                alert('There was an error submitting your information. Please try again.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error submitting your information. Please try again.');
        });
    } else {
        alert('Please enter a valid phone number.');
    }
}

// Submit the phone number for the "get to know" option
function submitGetToKnow() {
    const phoneNumber = document.getElementById('getToKnowPhone').value;
    if (phoneNumber) {
        fetch("https://formspree.io/f/xanwjwww", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                type: 'get_to_know'
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert(`Great! I'm excited to chat and get to know you better. I'll reach out to you at ${phoneNumber} soon to set up a time to talk.`);
            } else {
                alert('There was an error submitting your information. Please try again.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error submitting your information. Please try again.');
        });
    } else {
        alert('Please enter a valid phone number.');
    }
}

// Helper function to get the string representation of the selected time
function getTimeString(timeValue) {
    switch(timeValue) {
        case 'lunch':
            return '12:00 PM';
        case 'afternoon':
            return '3:00 PM';
        case 'dinner':
            return '7:00 PM';
        default:
            return '';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setMinDate();
});