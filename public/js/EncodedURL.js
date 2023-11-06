document.addEventListener('DOMContentLoaded', function() {
  const proxyForm = document.getElementById('proxyForm');
  const urlInput = document.getElementById('urlInput');
  const proxyButton = document.getElementById('proxyButton');
  

  proxyButton.addEventListener('click', function() {
    const targetURL = urlInput.value;
    window.location.href = '/mathcalculator?url=' + encodeURIComponent(targetURL);
    });
});
