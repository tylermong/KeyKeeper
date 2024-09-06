const fs = require('fs');
const path = require('path');

function readCredentials(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function saveCredentials(filePath, credentials) {
    fs.writeFileSync(filePath, JSON.stringify(credentials, null, 4), 'utf-8');
}

function writeCredential(filepath, name, username, password) {
    const credentials = readCredentials(filePath);
    credentials.push({
        name: name,
        username: username,
        password: password
    });
    saveCredentials(filePath, credentials)
}

const credentials = readCredentials(path.join(__dirname, 'credentials.json'));