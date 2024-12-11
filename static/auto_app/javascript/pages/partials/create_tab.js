"use strict";

const createBtn = document.querySelector(".create-btn");
const modal = document.querySelector("#modal");
const createForm = document.querySelector("#create-post-form");
const modalContent = document.querySelector(".modal-content");
const cancelBtn = document.querySelector(".cancel-btn");
const textarea = document.querySelector("#content-input");
const wordCountDisplay = document.querySelector(".word-count");
const scheduleButton = document.querySelector(".schedule-btn");
const postForm = document.getElementById("post-form");

const maxWords = 300; // Maximum allowed word count

// Close the modal if the user clicks outside the content area
// window.onclick = function (event) {
//   if (event.target === modal) {
//     modal.style.display = "none";
//   }
// };

createBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  textarea.focus();
});

cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const userResponse = confirm("Are you sure you'd like to discard? ");
  if (userResponse) {
    modal.style.display = "none";
    textarea.value = "";
    wordCountDisplay.textContent = "300";
    wordCountDisplay.style.color = "";
  }
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

scheduleButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Check if required fields are filled
  const postText = document
    .querySelector("textarea[name='post_text']")
    .value.trim();
  const postDateTime = document
    .querySelector("input[name='date_time']")
    .value.trim();

  if (!postText || !postDateTime) {
    alert("Please fill in all required fields before scheduling.");
    return;
  }

  // Proceed with submission if validation passes
  const postFormData = new FormData(postForm);

  fetch(postForm.action, {
    method: postForm.method,
    body: postFormData,
    headers: {
      Accept: "application/json", // Expect a JSON response
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        alert(data.message);
        // close form
        modal.style.display = "none";
        textarea.value = "";
        wordCountDisplay.textContent = "300";
        wordCountDisplay.style.color = "";

        location.reload();
        postForm.reset();
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to schedule the post. Please try again later.");
    });
});
