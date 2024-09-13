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
                <div class = "password-container">
                    <input type="password" id="password" name="password" placeholder="Password" required><br><br>
                    <img src="../../images/eye-closed.png" id="eye" onclick="showPassword()">
                </div>
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

function showPassword() {
    const passwordInput = document.getElementById('password');
    const eyeClosed = document.getElementById('eye');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeClosed.src = '../../images/eye-open.png';
    } else {
        passwordInput.type = 'password';
        eyeClosed.src = '../../images/eye-closed.png';
    }
}

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

rightContainer.addEventListener('click', function(event) {
    if (event.target.id === 'edit-credential') {
        const credentialName = document.querySelector('.display-credential').textContent.split(': ')[1];
        const credentials = JSON.parse(fs.readFileSync('credentials.json'));
        const credential = credentials.find(c => c.name === credentialName);
        if (credential) {
            rightContainer.innerHTML = `
                <h1>Edit Credential</h1>
                <div class="credential-container">
                    <h2>Credential Details</h2>
                    <form id="edit-credential-form">
                        <input type="text" id="edit-name" name="name" value="${credential.name}" required><br><br>
                        <input type="text" id="edit-username" name="username" value="${credential.username}" required><br><br>
                        <input type="password" id="edit-password" name="password" value="${credential.password}" required><br><br>
                        <input type="submit" id="save-edit" value="Save">
                    </form>
                </div>
            `;
            const editForm = document.getElementById('edit-credential-form');
            editForm.addEventListener('submit', function(event) {
                event.preventDefault();
                credential.name = document.getElementById('edit-name').value;
                credential.username = document.getElementById('edit-username').value;
                credential.password = document.getElementById('edit-password').value;

                fs.writeFileSync('credentials.json', JSON.stringify(credentials, null, 2));
                loadCredentialButtons();
                loadCredentialDetails(credential.name);
            });
        }
    } else if (event.target.id === 'delete-credential') {
        const credentialName = document.querySelector('.display-credential').textContent.split(': ')[1];
        let credentials = JSON.parse(fs.readFileSync('credentials.json'));
        credentials = credentials.filter(c => c.name !== credentialName);
        fs.writeFileSync('credentials.json', JSON.stringify(credentials, null, 2));
        loadCredentialButtons();
        rightContainer.innerHTML = '';
    }
});