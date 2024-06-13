const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }

    try {
        const url = `https://www.whitestuff.com/search?query=${query}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const images = [];

        // Select images within the plp-product-grid div
        $('div[data-testid="plp-product-grid"] img').each((index, element) => {
            const src = $(element).attr('src');
            if (src) {
                images.push(src);
            }
        });

        res.status(200).json(images);
    } catch (error) {
        res.status(500).send('Error scraping images');
    }
};
