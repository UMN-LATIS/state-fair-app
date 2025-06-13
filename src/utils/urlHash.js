const crypto = require('crypto');

// This should be a random string - in production, you might want to use an environment variable
const SECRET_KEY = 'mn-state-fair-2024-secret';

function generateHashedUrl(id) {
    // Create a hash of the ID and secret key
    const hash = crypto
        .createHash('sha256')
        .update(`${id}${SECRET_KEY}`)
        .digest('hex');
    
    // Take first 8 characters of the hash for a shorter URL
    return hash.substring(0, 8);
}

module.exports = { generateHashedUrl }; 