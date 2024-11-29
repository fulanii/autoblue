"use strict";

const loginForm = document.querySelector("#login-form");
const loginSuccess = document.querySelector(".login-succes");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const loginFormData = new FormData(loginForm);

  fetch(loginForm.action, {
    method: loginForm.method,
    body: loginFormData,
    headers: {
      Accept: "application/json", // Expect a JSON response
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success === false) {
        loginSuccess.textContent = data.message;
        loginSuccess.style.backgroundColor = "red";
        loginSuccess.style.display = "block";
        loginForm.reset();

        setTimeout(() => {
          loginSuccess.style.display = "none";
        }, 2000);
      } else {
        window.location.href = data.redirect_url || "/dashboard/";
      }
    })
    .catch((error) => {
      // Handle network errors
      console.error("Network error:", error);
    });
});
