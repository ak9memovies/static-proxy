const express = require('express');
const axios = require('axios');
const path = require('path');
const tough = require('tough-cookie');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Create a Cookie Jar for managing cookies
const cookieJar = new tough.CookieJar();

app.get('/mathproblem', async (req, res) => {
    const targetURL = req.query.url;

    if (!targetURL) {
        return res.status(400).send('Please provide a target URL.');
    }

    const customUserAgent = 'MyCustomUserAgent/1.0'; // Replace with your custom User-Agent

    try {
        const response = await axios.get(targetURL, {
            headers: {
                'User-Agent': customUserAgent,
            },
        });
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
    res.redirect(`/mathproblem?url=${encodeURIComponent(targetURL)}`);
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

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});
