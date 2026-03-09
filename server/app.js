require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/weather', async (req, res) => {
    const location = req.query.q;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(3000);