var fs = require('fs');
const createCredential = document.getElementById('add-credential');
const rightContainer = document.getElementById('right-container');

createCredential.addEventListener('click', function() {
    rightContainer.innerHTML =
        `<form id="credential-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br><br>
            
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br><br>
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>
            
            <input type="submit" value="Submit">
        </form>
    `;

    const form = document.getElementById('credential-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const newCredential = {
            name: name,
            username: username,
            password: password,
        };

        let credentials = [];

        if (!fs.existsSync('credentials.json'))
            fs.writeFileSync('credentials.json', '[]');

        if (fs.existsSync('credentials.json'))
            credentials = JSON.parse(fs.readFileSync('credentials.json'));
        
        credentials.push(newCredential);

        fs.writeFileSync('credentials.json', JSON.stringify(credentials, null, 2));
    });
});

function loadCredentialButtons() {
    const vaultContainer = document.getElementById('vault-container');
    if (fs.existsSync('credentials.json')) {
        const credentials = JSON.parse(fs.readFileSync('credentials.json'));
        let buttonsHTML = '';
        credentials.forEach(credential => {
            buttonsHTML += `<button class="vault-credential">${credential.name}</button>`;
        });
        vaultContainer.innerHTML = buttonsHTML;
    }
}
window.onload = loadCredentialButtons;

const vaultContainer = document.getElementById('vault-container');
vaultContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('credential')) {
        const credentialName = event.target.textContent;
        const credentials = JSON.parse(fs.readFileSync('credentials.json'));
        const credential = credentials.find(c => c.name === credentialName);
        if (credential) {
            rightContainer.innerHTML = `
                <p class="display-credential">Name: ${credential.name}</p>
                <p class="display-credential">Username: ${credential.username}</p>
                <p class="display-credential">Password: ${credential.password}</p>
            `;
        }
    }
});