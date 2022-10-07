const options = require('../options/mysql.config')
const knex = require('knex')

const database = knex(options)
let products = [
  {
    id: 1,
    title: "ARRI ALEXA LF or MINI LF",
    price: 2500,
    thumbnail:
      "https://res.cloudinary.com/itsdanielmx/image/upload/v1653433855/img/ALEXA-Mini-LF-SP-47-MVF-2-left-front-white_a6zfrt.jpg",
  },
  {
    id: 2,
    title: "PANASONIC VARICAM LT",
    price: 450,
    thumbnail:
      "https://res.cloudinary.com/itsdanielmx/image/upload/v1653433873/img/Panasonic-Varicam_qhixdc.jpg",
  },
  {
    id: 3,
    title: "ARRI ALEXA MINI CAMERA",
    price: 875,
    thumbnail:
      "https://res.cloudinary.com/itsdanielmx/image/upload/v1653433863/img/Arri-Alexa-Mini-PL-1_y1dzww.jpg",
  },
];

module.exports = products