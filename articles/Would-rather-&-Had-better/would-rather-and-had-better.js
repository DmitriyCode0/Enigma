const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and contents
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));

    // Add active class to clicked tab and its corresponding content
    tab.classList.add("active");
    const target = document.getElementById(tab.dataset.target);
    target.classList.add("active");
  });
});

// JavaScript for validating answers
document.querySelectorAll(".answer").forEach((input) => {
  input.addEventListener("change", function () {
    const userAnswer = this.value.trim().toLowerCase();
    const correctAnswer = this.dataset.correct.trim().toLowerCase();
    const feedback = this.nextElementSibling;

    if (userAnswer === correctAnswer) {
      feedback.innerHTML = "✅";
      feedback.style.color = "green";
    } else {
      feedback.innerHTML = "❌";
      feedback.style.color = "red";
    }
  });
});
