const express = require( 'express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000


//Gunakan EJS
app.set('view engine', 'ejs')
app.use(expressLayouts)

app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: "Apri",
      no: "08123213"
    },
    {
      nama: "Yanto",
      no: "08123213"
    },
    {
      nama: "Karim",
      no: "08123213"
    }
  
  ]
  res.render('index', {
    title: 'Halaman Index',
    layout: 'layouts/main-layout',
    mahasiswa,
    nama: 'Index'
  })
  // res.sendFile('./index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Halaman About',
    layout: 'layouts/main-layout'
  })
  // res.sendFile('./about.html', {root: __dirname})
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Halaman Contact',
    layout: 'layouts/main-layout'
  })
  // res.sendFile('./contact.html', {root: __dirname})
})

app.get('/product/:id', (req, res) => {
  res.send(`Product ID : ${req.params.id} <br> Product Category : ${req.query.category}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send("<h4>404</h4>")
})


app.listen(port, () => {
  console. log(`Example app listening at http://localhost: ${port}`)
})

