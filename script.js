// script.js

// Function to display the correct section
function showSection(sectionId) {
    const sections = document.querySelectorAll('main > section');
    const links = document.querySelectorAll('nav ul li a');

    // Hide all sections
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Remove active class from all links
    links.forEach(link => link.classList.remove('active'));

    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';

        // Add active class to the corresponding link
        const activeLink = document.querySelector(`nav ul li a[data-target="${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
    }
}

// Save the selected page to localStorage
function saveCurrentPage(sectionId) {
    localStorage.setItem('currentPage', sectionId);
}

// Event listener for navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Get the target section from the clicked link
        const sectionId = link.getAttribute('data-target');

        // Show the target section and save the current page
        showSection(sectionId);
        saveCurrentPage(sectionId);
    });
});

// Load the correct section on page reload
document.addEventListener('DOMContentLoaded', () => {
    // Check if a current page is saved in localStorage
    const savedPage = localStorage.getItem('currentPage');
    const defaultPage = 'resources'; // Set the default page

    // Show the saved page or the default page
    showSection(savedPage || defaultPage);
});

// Expand/Collapse Dropdowns (With Animation)
const tiles = document.querySelectorAll('.tile');
tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        const level = tile.dataset.level;
        const dropdown = document.getElementById(level);

        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show'); // Collapse
        } else {
            // Collapse any other open dropdowns
            document.querySelectorAll('.dropdown.show').forEach(openDropdown => {
                openDropdown.classList.remove('show');
            });

            dropdown.classList.add('show'); // Expand
        }
    });
});
