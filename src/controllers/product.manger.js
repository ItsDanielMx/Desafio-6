const knex = require('knex')

class ProductManager {
    constructor(options, tableName) {
        const database = knex(options)
        this.database = database
        this.table = tableName
    }

    create = (product) => {
        try {
            this.database.insert(product).into(this.table)
                .then((result) => console.log(result))
                .catch(err => console.log(err))
                .finally(() => this.database.destroy())
                return product;
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll = async () => {
        try {
        return this.database.from(this.table).select('*')
          
        }
        catch (error) {
            console.log(error);
        }
    }

    findById = (id) => {
        try {
        this.database.from('products').select('*').where('id', id)
            .then(data => console.log(JSON.parse(JSON.stringify(data))))
            .catch(err => console.log(err))
            .finally(() => this.database.destroy())
        }
        catch (error) {
            console.log(error);
        }
    }

    update = (id, product) => {
        try {
        this.database.from('products').where('id', id).update({product})
            .then(() => console.log('Product updated!'))
            .catch(err => console.log(err))
            .finally(() => this.database.destroy())
        }
        catch (error) {
            console.log(error);
        }
    }

    delete = (id) => {
        try {
        this.database.from('products').where('id', id).del()
            .then(() => console.log('Product deleted!'))
            .catch(err => console.log(err))
            .finally(() => this.database.destroy())
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductManager