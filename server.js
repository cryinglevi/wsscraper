const express = require('express');
const scrapeImages = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }

    try {
        const images = await scrapeImages(query);
        res.json(images);
    } catch (error) {
        res.status(500).send('Error scraping images');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
