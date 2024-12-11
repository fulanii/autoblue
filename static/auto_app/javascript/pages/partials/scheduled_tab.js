"use script";

// Tab Switching
const tabButtons = document.querySelectorAll(".scheduled_tab-button");
const tabPanels = document.querySelectorAll(".scheduled-tab-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    tabPanels.forEach((panel) => panel.classList.remove("active"));
    const target = document.getElementById(button.getAttribute("data-target"));
    target.classList.add("active");
  });
});

// Cancel post function
function cancelPost(postId) {
  // Add logic to cancel Celery task using the post ID
  console.log(`Cancelling post with ID: ${postId}`);
  fetch("/cancel_post/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({ postId }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      location.reload()
    });
}
