const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const { generateHashedUrl } = require('./src/utils/urlHash');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// Read template
const template = fs.readFileSync('src/templates/building.hbs', 'utf-8');
const compiledTemplate = Handlebars.compile(template);

// Read building data
const { buildings, prizeLink } = require('./src/data/buildings');

// Generate URL mapping
const urlMapping = {};

// Generate building pages
buildings.forEach(building => {
    const hashedUrl = generateHashedUrl(building.id);
    urlMapping[hashedUrl] = building.id;
    
    const html = compiledTemplate({
        title: building.title,
        fact: building.fact,
        prizeLink
    });
    
    fs.writeFileSync(
        path.join('dist', `${hashedUrl}.html`),
        html
    );
});

// Save URL mapping for reference (you might want to keep this private)
fs.writeFileSync(
    'url-mapping.json',
    JSON.stringify(urlMapping, null, 2)
);

// Copy static files
fs.copyFileSync('src/static/styles.css', 'dist/styles.css');
fs.copyFileSync('src/static/script.js', 'dist/script.js');
// Ensure assets directory exists for Vue CSS
if (!fs.existsSync('dist/assets')) {
    fs.mkdirSync('dist/assets', { recursive: true });
}

// Create index page
const indexHtml = compiledTemplate({
    title: 'Minnesota State Fair Building Facts',
    fact: 'Welcome to the Minnesota State Fair Building Facts tour! Visit different buildings to learn interesting facts about each one.',
    prizeLink
});
fs.writeFileSync(path.join('dist', 'index.html'), indexHtml);

console.log('Build complete! Files generated in the dist directory.');
console.log('URL mapping has been saved to url-mapping.json'); 