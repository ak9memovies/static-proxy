const express = require('express');
const axios = require('axios');
const path = require('path');
const tough = require('tough-cookie');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const cookieJar = new tough.CookieJar();

app.get('/mathcalculator', async (req, res) => {
    const targetURL = req.query.url;

    if (!targetURL) {
        return res.status(400).send('Please provide a target URL.');
    }

    try {
        const response = await axios.get(targetURL);

        const originalTitle = response.headers['content-title'] || 'Original Title';
        const originalFavicon = response.headers['content-favicon'] || 'original-favicon-url';

        res.set('Content-Title', originalTitle);
        res.set('Content-Favicon', originalFavicon);

        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: Unable to fetch the requested URL.');
    }
});

// Handle form submissions and redirection
app.post('/submit', (req, res) => {
    const targetURL = req.body.url;

    if (!targetURL) {
        return res.status(400).send('Please provide a target URL.');
    }

    // Redirect to the /proxy route with the target URL
    res.redirect(`/mathcalculator?url=${encodeURIComponent(targetURL)}`);
});

app.get('/*', async (req, res) => {
    const targetURL = req.url.slice(1);
    
    if (!targetURL) {
        return res.status(400).send('Please provide a target URL.');
    }

    try {
        const response = await axios.get(targetURL);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error: Unable to fetch the requested URL.');
    }
});

// Example of setting a cookie in a route
app.get('/set-cookie', (req, res) => {
    // Define the cookie details
    const cookieDetails = {
        key: 'myCookie',
        value: 'example-cookie-value',
        domain: 'example.com',
        path: '/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        httpOnly: true,
    };

    // Create a Cookie object
    const cookie = new tough.Cookie(cookieDetails);

    // Set the cookie in the CookieJar
    cookieJar.setCookie(cookie, 'https://example.com', (err) => {
        if (err) {
            console.error('Error setting cookie:', err);
            res.status(500).send('Error setting the cookie.');
        } else {
            res.send('Cookie set successfully.');
        }
    });
});

// Example of getting cookies from the CookieJar
app.get('/get-cookie', (req, res) => {
    const url = 'https://example.com'; // URL where the cookie should be sent

    // Get the cookies for the specified URL
    cookieJar.getCookies(url, (err, cookies) => {
        if (err) {
            console.error('Error getting cookies:', err);
            res.status(500).send('Error getting cookies.');
        } else {
            res.json(cookies);
        }
    });
});

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});
