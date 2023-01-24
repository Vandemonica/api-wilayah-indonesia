/*
  # ================================================= #
  #                  Cool Header                      #
  # ================================================= #
*/

const fs = require('fs');


async function fetchKecamatan(page, region, provinceId, index) {
  const url = 'https://id.wikipedia.org/wiki/Kategori:Kecamatan_di_' +  region.name.replace(' ', '_');
  const selector = '.CategoryTreeItem';

  const dir = `./api/kabupaten/${provinceId}/kecamatan/${index}`;
  const filename = dir + `/index.json`;

  await page.goto(url);
  await page.waitForSelector(selector);

  const district = await page.evaluate(selector => {
    return [...document.querySelectorAll(selector)].filter(
      i => i.innerText
    ).map((item, index) => {
      let slices = item.innerText.split(',');
      slices.pop();

      return {
        id: (index + 1),
        name: slices.join(',')
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
    data: district
  };

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }

  fs.writeFile(filename, JSON.stringify(result, null, "\t"), function() {
    console.log(`Saved ${region.name}!`);
  });

  return result;
}


module.exports = fetchKecamatan;