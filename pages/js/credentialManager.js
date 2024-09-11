var fs = require('fs');
const createCredential = document.getElementById('add-credential');
const rightContainer = document.getElementById('right-container');

createCredential.addEventListener('click', function() {
    rightContainer.innerHTML =
        `<h1>Add Credential</h1>

        <div class="credential-container">
            <h2>Credential Details</h2>
            <form id="credential-form">
                <input type="text" id="name" name="name" placeholder="Name" required><br><br>
                <input type="text" id="username" name="username" placeholder="Username"required><br><br>
                <input type="password" id="password" name="password" placeholder="Password" required><br><br>
                
                <input type="submit" id="save" value="Save">
            </form>
        </div
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
    if (event.target.classList.contains('vault-credential')) {
        const credentialName = event.target.textContent;
        const credentials = JSON.parse(fs.readFileSync('credentials.json'));
        const credential = credentials.find(c => c.name === credentialName);
        if (credential) {
            rightContainer.innerHTML = `
                <p class="display-credential">Name: ${credential.name}</p>
                <p class="display-credential">Username: ${credential.username}</p>
                <p class="display-credential">Password: ${credential.password}</p>
                <div class="credential-buttons">
                    <button id="edit-credential">Edit</button>
                    <button id="delete-credential">Delete</button>
                </div>
            `;
        }
    }
});