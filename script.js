const bookingForm = document.getElementById("bookingForm");
const occasionSelect = document.getElementById("occasion");
const eventDate = document.getElementById("eventDate");
const serviceButtons = document.querySelectorAll(".service-btn");

// Set today's date as the earliest selectable event date.
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

eventDate.min = `${year}-${month}-${day}`;

// Allow customers to choose a service from its card.
serviceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        occasionSelect.value = button.dataset.service;

        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Prepare the booking details and open WhatsApp.
bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const occasion = occasionSelect.value;
    const date = eventDate.value;
    const location = document.getElementById("eventLocation").value.trim();
    const guests = document.getElementById("guestCount").value;
    const requests = document.getElementById("specialRequest").value.trim();

    if (Number(guests) < 1) {
        alert("Please enter at least one guest.");
        return;
    }

    const message =
        "BURAS K CATERING SERVICES - BOOKING REQUEST\n\n" +
        "Customer Name: " + name + "\n" +
        "Customer Phone: " + phone + "\n" +
        "Occasion: " + occasion + "\n" +
        "Event Date: " + date + "\n" +
        "Event Location: " + location + "\n" +
        "Number of Guests: " + guests + "\n" +
        "Special Requests: " + (requests || "None") + "\n\n" +
        "Please confirm availability and provide a quotation. Thank you.";

    // WhatsApp requires the country code without the leading zero.
    const whatsappNumber = "2348068841271";

    const whatsappURL =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
});