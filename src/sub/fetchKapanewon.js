/*
  # ================================================= #
  #                  Cool Header                      #
  # ================================================= #
*/

const fs = require('fs');


async function fetchKapanewon(page, region, provinceId, index) {
  const url = 'https://id.wikipedia.org/wiki/Daftar_kapanewon,_kemantren,_kalurahan,_dan_kelurahan_di_Daerah_Istimewa_Yogyakarta';
  const selector = `table.wikitable:nth-of-type(${index + 1}) tbody tr`;

  const dir = `./api/kabupaten/${provinceId}/kecamatan/${index}`;
  const filename = dir + `/index.json`;

  await page.goto(url);
  await page.waitForSelector(selector);

  const district = await page.evaluate(selector => {
    return [...document.querySelectorAll(selector)].filter(
      i => i.innerText
    ).map((item, index) => {
      const col = item.querySelector('td:nth-of-type(2)') ?? '';

      return {
        id: (index + 1),
        hanacaraka: col.innerHTML
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


module.exports = fetchKapanewon;