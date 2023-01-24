/*
  # ================================================= #
  #                  Cool Header                      #
  # ================================================= #
*/

const fs = require('fs');


async function fetchProvinsi(page) {
  const url = 'https://id.wikipedia.org/wiki/Provinsi_di_Indonesia';
  const selector = 'table:nth-of-type(2) tbody tr';

  await page.goto(url);
  await page.waitForSelector(selector);

  const provinces = await page.evaluate(selector => {
    return [...document.querySelectorAll(selector)].map((rows, index) => {
      return {
        id: (index + 1),
        code: rows.querySelector('td:nth-of-type(1)')?.innerText || '',
        name: rows.querySelector('th:nth-of-type(2)')?.innerText || '',
        image_url: rows.querySelector('th > a > img')?.src.replace('thumb/', '').split('/').slice(0, -1).join('/') || '',
        capital: rows.querySelector('td:nth-of-type(5):not([data-sort-value="-"])')?.innerText || ''
      };
    });
  }, selector);

  const result = {
    source: url,
    scraped_at: new Date(),
    data: {
      provinsi: provinces
    }
  };

  fs.writeFile('./api/all_provinsi.json', JSON.stringify(result, null, "\t"), function() {
    console.log('Saved Provinces');
  });

  return result;
}


module.exports = fetchProvinsi;