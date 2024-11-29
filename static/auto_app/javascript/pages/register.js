"use strict";

const registerForm = document.querySelector("#register-form");
const registerSuccess = document.querySelector(".register-succes");

// registerForm.querySelectorAll("input").forEach((input) => {
//   input.addEventListener("input", (event) => {
//     console.log(event);
//   });
// });

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const registerFormData = new FormData(registerForm);

  fetch(registerForm.action, {
    method: registerForm.method,
    body: registerFormData,
    headers: {
      Accept: "application/json", // Expect a JSON response
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success === true) {
        registerSuccess.textContent = data.message;
        registerSuccess.style.backgroundColor = "#33b249";
        registerSuccess.style.display = "block";
        registerForm.reset();
      } else {
        registerSuccess.textContent = data.message;
        registerSuccess.style.backgroundColor = "red";
        registerSuccess.style.display = "block";
      }

      setTimeout(() => {
        registerSuccess.style.display = "none";
      }, 2000);
    })
    .catch((error) => {
      // Handle network errors
      console.error("Network error:", error);
    });
});
