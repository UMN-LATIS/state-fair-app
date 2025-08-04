// Global variables
let buildingsData = null;
let visitedBuildings = [];

// Function to get the current building ID from URL
function getCurrentBuildingId() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    
    // If we're on the index page, return null
    if (filename === 'index' || filename === '') {
        return null;
    }
    
    // Load buildings data if not already loaded
    if (!buildingsData) {
        loadBuildingsData();
        return null;
    }
    
    // Find the building ID from the URL mapping
    return buildingsData.urlMapping[filename] || null;
}

// Function to load buildings data
async function loadBuildingsData() {
    try {
        const response = await fetch('./buildings-data.json');
        buildingsData = await response.json();
        initializeApp();
    } catch (error) {
        console.error('Error loading buildings data:', error);
    }
}

// Function to track visits by building ID
function trackVisit() {
    const currentBuildingId = getCurrentBuildingId();
    
    if (!currentBuildingId) {
        return; // Not on a building page
    }
    
    // Load visited buildings from localStorage
    visitedBuildings = JSON.parse(localStorage.getItem('visitedBuildings') || '[]');
    
    // Add current building if not already visited
    if (!visitedBuildings.includes(currentBuildingId)) {
        visitedBuildings.push(currentBuildingId);
        localStorage.setItem('visitedBuildings', JSON.stringify(visitedBuildings));
    }
    
    // Update progress display
    updateProgressDisplay();
    
    // Check if user has visited 5 or more unique buildings
    if (visitedBuildings.length >= 5) {
        const prizeMessage = document.getElementById('prize-message');
        if (prizeMessage) {
            prizeMessage.classList.remove('hidden');
        }
    }
}

// Function to update progress display
function updateProgressDisplay() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (!progressFill || !progressText) {
        return;
    }
    
    const totalBuildings = buildingsData.buildings.length;
    const visitedCount = visitedBuildings.length;
    const percentage = (visitedCount / totalBuildings) * 100;
    
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${visitedCount}/${totalBuildings} buildings visited`;
}

// Function to populate building list
function populateBuildingList() {
    const buildingList = document.getElementById('building-list');
    if (!buildingList || !buildingsData) {
        return;
    }
    
    buildingList.innerHTML = '';
    
    buildingsData.buildings.forEach(building => {
        const isVisited = visitedBuildings.includes(building.id);
        const buildingItem = document.createElement('div');
        buildingItem.className = `building-item ${isVisited ? 'visited' : ''}`;
        
        // Find the URL hash for this building
        const urlHash = Object.keys(buildingsData.urlMapping).find(
            key => buildingsData.urlMapping[key] === building.id
        );
        
        buildingItem.innerHTML = `
            <h3>${building.title}</h3>
            <p>${building.address}</p>
            ${isVisited ? '<div class="visit-status">✓ Visited</div>' : ''}
        `;
        
        buildingItem.addEventListener('click', () => {
            if (urlHash) {
                window.location.href = `./${urlHash}.html`;
            }
        });
        
        buildingList.appendChild(buildingItem);
    });
}

// Function to show building list modal
function showBuildingList() {
    const modal = document.getElementById('building-list-modal');
    if (modal) {
        modal.style.display = 'block';
        populateBuildingList();
    }
}

// Function to hide building list modal
function hideBuildingList() {
    const modal = document.getElementById('building-list-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Function to show about passport modal
function showAboutPassport() {
    const modal = document.getElementById('about-passport-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Function to hide about passport modal
function hideAboutPassport() {
    const modal = document.getElementById('about-passport-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Function to initialize the app
function initializeApp() {
    // Load visited buildings from localStorage
    visitedBuildings = JSON.parse(localStorage.getItem('visitedBuildings') || '[]');
    
    // Track visit if on a building page
    trackVisit();
    
    // Update progress display
    updateProgressDisplay();
    
    // Set up event listeners
    const buildingListButton = document.getElementById('building-list-button');
    const closeModalButton = document.getElementById('close-modal');
    const modal = document.getElementById('building-list-modal');
    
    const aboutPassportLink = document.getElementById('about-passport-link');
    const closeAboutModalButton = document.getElementById('close-about-modal');
    const aboutModal = document.getElementById('about-passport-modal');
    
    if (buildingListButton) {
        buildingListButton.addEventListener('click', showBuildingList);
    }
    
    if (closeModalButton) {
        closeModalButton.addEventListener('click', hideBuildingList);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideBuildingList();
            }
        });
    }
    
    if (aboutPassportLink) {
        aboutPassportLink.addEventListener('click', showAboutPassport);
    }
    
    if (closeAboutModalButton) {
        closeAboutModalButton.addEventListener('click', hideAboutPassport);
    }
    
    if (aboutModal) {
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                hideAboutPassport();
            }
        });
    }
    
    // Close modals on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideBuildingList();
            hideAboutPassport();
        }
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadBuildingsData();
}); 