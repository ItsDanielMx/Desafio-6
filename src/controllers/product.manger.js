const knex = require('knex')

class ProductManager {
    constructor(options, tableName) {
        const database = knex(options)
        if (!database.schema.hasTable(tableName)) {
            database.schema.createTable(tableName, table => {
                table.increments('id')
                table.string('title', 20)
                table.integer('price')
                table.string('thumbnail', 200)
            })
                .then(() => console.log('Table created!'))
                .catch(err => console.log(err))
        }
        this.database = database
        this.table = tableName
    }

    create = (product) => {
        return []
    }

    findAll = () => {
        return []
    }

    findById = (id) => {
        return {}
    }

    update = (id, product) => {
        return {}
    }

    delete = (id) => {
        return []
    }
}

module.exports = ProductManager