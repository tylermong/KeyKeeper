document.addEventListener('DOMContentLoaded', function() {
    // Select all buttons within the vault-container
    const buttons = document.querySelectorAll('.center-container button');

    // Add event listeners to each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const rightContainer = document.getElementsByClassName('right-container')[0];
            if (this.id === 'add-credential') {
                rightContainer.innerHTML = `
                    <form class="credential-field">
                        <label for="website">Name:</label>
                        <input type="text" id="name" name="name"><br><br>
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username"><br><br>
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password"><br><br>
                        <input type="submit" value="Submit">
                    </form>
                `;
            } else {
                rightContainer.innerHTML = `<h1>${this.id}</h1>`;
            }
        });
    });
});