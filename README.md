# API Wilayah Indonesia

![](https://forthebadge.com/images/badges/made-with-javascript.svg)


## **About**
Web scraper daftar nama wilayah administratif 38 provinsi beserta kabupaten dan kecamatan yang ada di Indonesia. Data bersumber dari halaman wikipedia

Bebas untuk fork dan hosting sebagai github pages pribadi.

* * *

## **Installation**
```bash
git clone https://github.com/Vandemonica/api-wilayah-indonesia.git
```

```bash
npm install
```

```bash
npm run start
```



## **Endpoint**
### **Provinsi**

`
[site_url]/api
`

**Example:**

https://vandemonica.github.io/api-wilayah-indonesia/api


### **Kabupaten**

`
[site_url]/api/kabupaten/[provinsi_id]
`

**Example:**

https://vandemonica.github.io/api-wilayah-indonesia/api/kabupaten/11



### **Kecamatan**

`
[site_url]/[provinsi_id]/kecamatan/[kabupaten_id]
`

**Example:**

https://vandemonica.github.io/api-wilayah-indonesia/api/kabupaten/11/kecamatan/38/



## **License**
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

**[About MIT license](http://opensource.org/licenses/mit-license.php)**
