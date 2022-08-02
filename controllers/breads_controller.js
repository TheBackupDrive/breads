const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

//NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

//INDEX
breads.get('/', (req, res) => {
    Bread.find()
      .then(foundBreads => {
        res.render('Index', {
          breads: foundBreads,
          title: 'Index Page'
      })
    })
})

//EDIT
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id)
    .then(foundBread => {
      res.render('edit', {
        bread: foundBread
      })
    })
})


//SHOW
breads.get('/:id', (req, res) => {
  Bread.findById (req.params.id)
    .then(foundBread => {
      res.render('show', {
        bread: foundBread
      })
    })
    .catch (err => {
      res.send('404')
    })
})

//CREATE
breads.post('/', (req, res) => {
  console.log(req.body)
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

//DELETE
breads.delete('/:indexArray', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
  .then(deletedBread => {
    res.status(303).redirect('/breads')
  })
})

//UPDATE
breads.put ('/:arrayIndex', (req, res) => {
  console.log('Put method')
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedBread => {
      console.log(udpatedBread)
      res.redirect(`/breads/${req.params.id}`)
    })
})

module.exports = breads