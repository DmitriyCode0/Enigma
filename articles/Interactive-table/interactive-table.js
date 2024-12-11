const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // Skip if the clicked tab is already active
        if (tab.classList.contains("active")) return;

        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove("active"));

        // Add active class to the clicked tab
        tab.classList.add("active");

        // Handle content switching with proper timing
        contents.forEach(content => {
            if (content.classList.contains("active")) {
                // Animate fade-out only for the active content
                content.classList.remove("active");
                content.style.animation = "fadeOut 0.4s ease";

                // Delay hiding the element to match fade-out duration
                setTimeout(() => {
                    content.style.display = "none";
                }, 400); // Match the duration of the fadeOut animation
            }
        });

        // Activate the corresponding content after the fade-out
        const target = document.getElementById(tab.dataset.target);

        setTimeout(() => {
            target.style.display = "block";
            target.style.animation = "fadeIn 0.4s ease";
            target.classList.add("active");
        }, 400); // Match the fade-out duration
    });
});
