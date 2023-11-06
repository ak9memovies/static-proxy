document.addEventListener('DOMContentLoaded', function() {
    const proxyForm = document.getElementById('proxyForm');
    const urlInput = document.getElementById('urlInput');
    const proxyButton = document.getElementById('proxyButton');

    proxyButton.addEventListener('click', function() {
         // Get the user-provided URL
        const targetURL = urlInput.value;
                
        // Redirect to the proxied URL without appending query parameters
        window.location.href = '/mathcalculator?url=' + encodeURIComponent(targetURL);
    });
});
