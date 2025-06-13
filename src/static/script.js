// Function to get the current page name
function getCurrentPage() {
    const path = window.location.pathname;
    // Get the filename without .html extension
    return path.split('/').pop().replace('.html', '') || 'index';
}

// Function to track visits
function trackVisit() {
    const currentPage = getCurrentPage();
    const visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '[]');
    
    if (!visitedPages.includes(currentPage)) {
        visitedPages.push(currentPage);
        localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
    }
    
    // Check if user has visited 5 or more unique pages
    if (visitedPages.length >= 5) {
        document.getElementById('prize-message').classList.remove('hidden');
    }
}

// Run the tracking when the page loads
document.addEventListener('DOMContentLoaded', trackVisit); 