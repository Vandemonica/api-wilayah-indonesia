/*
  # ================================================= #
  #                  Cool Header                      #
  # ================================================= #
*/

const fs = require('fs');


async function fetchKabupaten(page, province) {
  const selector = 'table.wikitable:nth-of-type(1) tbody tr';
  const url = 'https://id.wikipedia.org/wiki/Daftar_kabupaten_dan_kota_di_' +  province.name.replace(' ', '_');
  const dir = `./api/kabupaten/${province.id}`;

  await page.goto(url);
  await page.waitForSelector(selector);

  const regions = await page.evaluate(selector => {
    return [...document.querySelectorAll(selector)].filter(
      i => i.querySelector('td:nth-of-type(2)')
    ).map((rows, index) => {
      return {
        id: (index + 1),
        name: rows.querySelector('td:nth-of-type(2)')?.innerText || '',
        emblem: rows.querySelector('td a > img')?.src.replace('thumb/', '').split('/').slice(0, -1).join('/') || '',
        capital: rows.querySelector('td:nth-of-type(3):not([data-sort-value="-"])')?.innerText || ''
      };
    }).filter(i => i.name);
  }, selector);

  const result = {
    source: url,
    scraped_at: new Date(),
    provinsi: {
      id: province.id,
      code: province.code,
      name: province.name,
      emblem: province.emblem
    },
    data: regions
  };

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }

  fs.writeFile(dir + '/index.json', JSON.stringify(result, null, "\t"), function() {
    console.log(`Saved ${province.name}!`);
  });

  return result;
}


module.exports = fetchKabupaten;