/*
  # ================================================= #
  #                  Cool Header                      #
  # ================================================= #
*/

const fs = require('fs');


async function fetchKapanewon(page, region, provinceId, index) {
  const url = 'https://id.wikipedia.org/wiki/Daftar_kapanewon_dan_kalurahan_di_' +  region.name.replace(' ', '_');
  const selector = '';

  const dir = `./api/kabupaten_${provinceId}/kecamatan`;
  const filename = dir + `/kecamatan_${index}.json`;



  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFile(filename, JSON.stringify(result, null, "\t"), function() {
    console.log(`Saved ${region.name}!`);
  });

  return result;
}


module.exports = fetchKapanewon;