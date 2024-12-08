"use strict";

const createBtn = document.querySelector(".create-btn");
const modal = document.querySelector("#modal");
const createForm = document.querySelector("#create-post-form");
const modalContent = document.querySelector(".modal-content");
const cancelBtn = document.querySelector(".cancel-btn");
const textarea = document.querySelector("#content-input");
const wordCountDisplay = document.querySelector(".word-count");
const scheduleButton = document.querySelector(".schedule-btn");
const maxWords = 300; // Maximum allowed word count

// Close the modal if the user clicks outside the content area
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

createBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  textarea.focus();
});

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
  textarea.value = "";
});

textarea.addEventListener("input", () => {
  // Get the current content length
  const contentLength = textarea.value.length;

  // Update the word count display
  const remainingWords = maxWords - contentLength;
  wordCountDisplay.textContent = remainingWords;

  // Disable or enable the "Schedule" button
  if (remainingWords < 0) {
    scheduleButton.disabled = true; // Disable if exceeded
    wordCountDisplay.style.color = "red";
  } else {
    wordCountDisplay.style.color = "";
    scheduleButton.disabled = false; // Enable if within limits
  }
});
