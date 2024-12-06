"use strict";

const changePassForm = document.querySelector("#change-pass");
const deleteAccBtn = document.querySelector(".delete-account");
const curPasswordInput = document.getElementById("cur-pass");
const newPasswordInput = document.getElementById("new-pass");
const togglePassword = document.getElementById("togglePassword");

//  password update
changePassForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const changePassFormData = new FormData(changePassForm);

  fetch(changePassForm.action, {
    method: changePassForm.method,
    body: changePassFormData,
    headers: {
      Accept: "application/json", // Expect a JSON response
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success === true) {
        // change later to something better looking
        alert(data.message);
        changePassForm.reset();
      } else {
        // change later to something better looking
        alert(data.message);
        changePassForm.reset();
      }
    });
});

// account deletion
deleteAccBtn.addEventListener("click", () => {
  const userConfirmed = confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );

  if (userConfirmed) {
    fetch("/delete_account/", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          window.location.href = data.redirect; // Redirects to home
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  }
});

// toggle passowrd
togglePassword.addEventListener("click", () => {
  const curType =
    curPasswordInput.getAttribute("type") === "password" ? "text" : "password";
  const newType =
    curPasswordInput.getAttribute("type") === "password" ? "text" : "password";

  curPasswordInput.setAttribute("type", curType);
  newPasswordInput.setAttribute("type", newType);

  togglePassword.textContent = curType === "password" ? "Show" : "Hide";
});

// toggle bot username & password
function toggleVisibility(inputId) {
  const inputField = document.getElementById(inputId);
  inputField.type = inputField.type === "password" ? "text" : "password";
}
