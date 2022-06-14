// Get Form by its id
const form = document.getElementById("google-form");

// App Script url
const googleAppScriptUrl =
  "https://script.google.com/macros/s/AKfycbx002lyv8UdRcag4p0VsrUujvMZI4uC2fp6kRKRNvZVFygVf6D2FOPoFWR8698tPjo/exec";

// Fuction to send data to google form when submit button is clicked
form.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    fetch(googleAppScriptUrl, {
      method: "POST",
      mode: "no-cors",
      body: new FormData(form),
    }).then(() => {
      // Do someting After successfull submission
      console.log("success");
    });
  } catch (error) {
    // Do something for the error case
    console.log(error);
  }
});
