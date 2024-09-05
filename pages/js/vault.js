document.addEventListener('DOMContentLoaded', function() {
    // Select all buttons within the vault-container
    const buttons = document.querySelectorAll('.credential button');

    // Add event listeners to each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const rightContainer = document.getElementsByClassName('right-container')[0];
            rightContainer.innerHTML = `<h1>${this.id}</h1>`;
        });
    });
});