const express = require('express')
const { Server } = require('socket.io')
const handlebars = require('express-handlebars')
const productRouter = require('./routes/product.router')
const chatRouter = require('./routes/chat.router')
let products = require('./models/product.model')
const options = require('./config/mysql.config')
const knex = require('knex')

const ProductManager = require('./controllers/product.manger')
const productManager = new ProductManager(options, 'products')

const ChatManager = require('./controllers/chat.manager')
const chatManager = new ChatManager()

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))
const io = new Server(server)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/content', express.static('./src/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('create-product')
})

app.use('/products', productRouter)
app.use('/chat', chatRouter)

io.on('connection', async socket => {
    console.log(`Client ${socket.id} connected...`)
    socket.emit('history', await productManager.findAll())

    chatManager.findAll().then(result => socket.emit('chatHistory', result))

    socket.on('products', async data => {
        await productManager.create(data)
        io.sockets.emit('history', await productManager.findAll())
    })
    socket.on('newProduct', async product => {
        await productManager.create(product)
        const productos = await productManager.findAll()
        io.sockets.emit('products', productos)
    })

    socket.on('chat', data => {
        io.emit('chatHistory', data)
    })
})