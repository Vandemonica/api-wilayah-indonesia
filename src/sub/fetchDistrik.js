/*
  # ================================================= #
  #                  Cool Header                      #
  # ================================================= #
*/

const fs = require('fs');


async function fetchDistrik(page, region, provinceId, index) {
  const url = 'https://id.wikipedia.org/wiki/Daftar_distrik_dan_kampung_di_' +  region.name.replace(' ', '_');
  const selector = 'table.wikitable > tbody > tr';

  const dir = `./api/provinsi/${provinceId}/${index}`;
  const filename = dir + `/kecamatan.json`;

  await page.goto(url);
  await page.waitForSelector(selector);

  const district = await page.evaluate(selector => {
    return [...document.querySelectorAll(selector)].filter(
      i => i
    ).map((item, index) => {
      return {
        id: (index + 1),
        name: item.querySelector('td:nth-of-type(2)')?.innerText || ''
      };
    }).filter(i => i);
  }, selector);

  const result = {
    source: url,
    scraped_at: new Date(),
    kabupaten: {
      id: region.id,
      name: region.name,
      emblem: region.emblem
    },
    data: {
      kecamatan: district
    }
  };

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }

  fs.writeFile(filename, JSON.stringify(result, null, "\t"), function() {
    console.log(`Saved ${region.name}!`);
  });

  return result;
}


module.exports = fetchDistrik;