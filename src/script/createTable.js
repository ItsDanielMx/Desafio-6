const options = require('../config/mysql.config')
const knex = require('knex')

    const database = knex(options)
        database.schema.createTable('products', table => {
            table.increments('id')
            table.string('title', 20)
            table.integer('price')
            table.string('thumbnail', 200)
        })
            .then(() => console.log('Table created!'))
            .catch(err => console.log(err))
