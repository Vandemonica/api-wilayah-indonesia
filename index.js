const puppeteer = require('puppeteer');
const fetchProvinsi = require('./src/fetchProvinsi.js');
const fetchKabupaten = require('./src/fetchKabupaten.js');
const fetchKecamatan = require('./src/sub/fetchKecamatan.js');
const fetchKapanewon = require('./src/sub/fetchKapanewon.js');
const fetchDistrik = require('./src/sub/fetchDistrik.js');

const ignoredDOM = ['stylesheet', 'font', 'image'];
const uniqueRegion = {
  kapanewon: [
    'Daerah Istimewa Yogyakarta'
  ],
  distrik: [
    'Papua', 'Papua Barat', 'Papua Selatan', 'Papua Tengah',
    'Papua Pegunungan', 'Papua Barat Daya'
  ]
};


(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
    args: [
      `--no-sandbox`,
      `--disable-setuid-sandbox`,
      `--ignore-certificate-errors`
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667 });
  await page.setRequestInterception(true);

  page.setDefaultNavigationTimeout(0);
  page.on('request', (req) => {
    if(ignoredDOM.includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const provinces = await fetchProvinsi(page);

  for (let i = 0; i < provinces.data.length; i++) {
    const province = provinces.data[i];
    const regions = await fetchKabupaten(page, province);

    for (let i = 0; i < regions.data.length; i++) {
      const region = regions.data[i];

      if (uniqueRegion.kapanewon.includes(province.name)) {
        // await fetchKapanewon(page, region, regions.provinsi.id, (i + 1));
        console.log('A');
      } else if (uniqueRegion.distrik.includes(province.name)) {
        // await fetchDistrik(page, region, regions.provinsi.id, (i + 1));
        console.log('B');
      } else {
        await fetchKecamatan(page, region, regions.provinsi.id, (i + 1));
      }
    }
  }

  await browser.close();
})();
