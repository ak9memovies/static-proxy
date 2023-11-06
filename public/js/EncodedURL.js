document.addEventListener('DOMContentLoaded', function() {
    const proxyForm = document.getElementById('proxyForm');
    const urlInput = document.getElementById('urlInput');

    proxyForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const targetURL = urlInput.value;

        // Fetch the proxied content, including the headers
        const response = await fetch(`/mathcalculator?url=${encodeURIComponent(targetURL)}`);

        // Handle the rest of your proxy logic and rendering
    });
});
