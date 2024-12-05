"use strict";

const changePassForm = document.querySelector("#change-pass");
const deleteAccBtn = document.querySelector(".delete-account");
const curPasswordInput = document.getElementById("cur-pass");
const newPasswordInput = document.getElementById("new-pass");
const togglePassword = document.getElementById("togglePassword");
const addLoginBtn = document.querySelector(".add-login");
const addedusername = document.querySelector(".added-username");
const addedPassword = document.querySelector(".added-password");
const updateBlueLoginBtn = document.querySelector(".update-login");
const csrftoken = getCookie("csrftoken");

// tabs
document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-button")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((content) => (content.style.display = "none"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).style.display = "flex";
  });
});

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

// add login info
function getCookie(name) {
  // Get CSRF token from the cookie
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

if (addLoginBtn) {
  addLoginBtn.addEventListener("click", () => {
    const username = prompt("Enter your username");
    const password = prompt("Enter your password");

    fetch("/add_blue_login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          location.reload(); // Reloads the current page
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error(error));
  });
}

// update bluesky login
updateBlueLoginBtn.addEventListener("click", () => {
  const newUsername = prompt("Enter your new username");
  const newPassword = prompt("Enter your new password");

  if (newUsername && newPassword) {
    fetch("/update_blue_login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ newUsername, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          location.reload(); // Reload the page to reflect the changes
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    alert("Both fields are required.");
  }
});
