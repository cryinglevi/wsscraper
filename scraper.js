const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeImages(query) {
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

    return images;
}

module.exports = scrapeImages;
