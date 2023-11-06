document.addEventListener('DOMContentLoaded', function() {
    const proxyForm = document.getElementById('proxyForm');
    const urlInput = document.getElementById('urlInput');

    proxyForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const targetURL = urlInput.value;

        // Redirect to the proxied URL without reloading the page
        window.location.href = `/proxy?url=${encodeURIComponent(targetURL)}`;
    });
});