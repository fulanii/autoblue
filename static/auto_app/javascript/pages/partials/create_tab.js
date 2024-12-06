"use strict";

const createBtn = document.querySelector(".create-btn");
const modal = document.querySelector("#modal");
const createForm = document.querySelector("#create-post-form");
const modalContent = document.querySelector(".modal-content")

createBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Close the modal if the user clicks outside the content area
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

