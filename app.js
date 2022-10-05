const express = require( 'express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.json({
    nama: "Apriyanto",
    email: "apri@gmail.com",
    noHp: "0812312312312"
  })
})

app.get('/about', (req, res) => {
  res.send('Halaman About!')
})

app.get('/contact', (req, res) => {
  res.send('Halaman Contact!')
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

