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
        database('products').insert(product)
            .then((result) => console.log(result))
            .catch(err => console.log(err))
            .finally(() => database.destroy())
    }

    findAll = () => {
        database.from('products').select('*')
            .then(data => console.log(JSON.parse(JSON.stringify(data))))
            .catch(err => console.log(err))
            .finally(() => database.destroy())
    }

    findById = (id) => {
        database.from('products').select('*').where('id', id)
            .then(data => console.log(JSON.parse(JSON.stringify(data))))
            .catch(err => console.log(err))
            .finally(() => database.destroy())
    }

    update = (id, product) => {
        database.from('products').where('id', id).update({product})
            .then(() => console.log('Product updated!'))
            .catch(err => console.log(err))
            .finally(() => database.destroy())
    }

    delete = (id) => {
        database.from('products').where('id', id).del()
            .then(() => console.log('Product deleted!'))
            .catch(err => console.log(err))
            .finally(() => database.destroy())
    }
}

module.exports = ProductManager