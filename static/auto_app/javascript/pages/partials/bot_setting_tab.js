"use strict";

const addLoginBtn = document.querySelector(".add-login");
const addedusername = document.querySelector(".added-username");
const addedPassword = document.querySelector(".added-password");
const updateBlueLoginBtn = document.querySelector(".update-login");
const csrftoken = getCookie("csrftoken");

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
