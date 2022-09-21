const express = require('express')
const router = express.Router()

const Manager = require('../controllers/product.manger')
const manager = new Manager()

router.get('/', (req, res) => {
    let result = manager.findById(req.params.id)
    if (!result) return res.send({error: 'Product was not found'})
    res.send(result)
})

router.get('/:id', (req, res) => {
    let result = manager.findById(req.params.id)
    if (!result) return res.send({error: 'Product was nor found'})
    res.send(result)
})

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.price || !req.body.thumbnail) return res.send({error: 'Data is required'})
    let result = manager.create(req.body)
    res.send(result)
})

router.put('/', (req, res) => {
    if (!req.body.title || !req.body.price || !req.body.thumbnail) return res.send({error: 'Data is required'})
    let result = manager.update(req.params.id, req.body)
    if (!result)  return res.send({error: 'Product was not found'})
    res.send(result)
    
})

router.delete('/:id', (req, res) => {
    let result = manager.delete(req.params.id)
    res.send(result)
})

module.exports = router