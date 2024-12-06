"use strict";

// const changePassForm = document.querySelector("#change-pass");
// const deleteAccBtn = document.querySelector(".delete-account");
// const curPasswordInput = document.getElementById("cur-pass");
// const newPasswordInput = document.getElementById("new-pass");
// const togglePassword = document.getElementById("togglePassword");
// const addLoginBtn = document.querySelector(".add-login");
// const addedusername = document.querySelector(".added-username");
// const addedPassword = document.querySelector(".added-password");
// const updateBlueLoginBtn = document.querySelector(".update-login");
// const csrftoken = getCookie("csrftoken");

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
