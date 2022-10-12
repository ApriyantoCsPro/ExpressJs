const express = require( 'express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require('./utils/contacts')
const {body,validationResult, check} = require('express-validator')


const app = express()
const port = 3000

//Gunakan EJS
app.set('view engine', 'ejs')
app.use(expressLayouts)  //ini middleware Third-party layouts

//Application level middleware
// app.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })

//Build-in middleware
app.use(express.static('public')) //middleware untuk unlock file public
app.use(express.urlencoded({extended: true}))

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
  const contacts = loadContact()
  res.render('contact', {
    title: 'Halaman Contact',
    layout: 'layouts/main-layout',
    contacts
  })
  // res.sendFile('./contact.html', {root: __dirname})
})

//Halaman add contact #1
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Halaman Tambah Contact',
    layout: 'layouts/main-layout',
  })
})

//proses data contact #2
app.post('/contact', [
  body('nama').custom((value) => {
    const duplikat = cekDuplikat(value)
    if(duplikat) {
      throw new Error('Nama sudah digunakan!')
    }
    return true
  }),
  check('email', 'Email tidak valid!').isEmail(),
  check('noHp', 'Nomor tidak valid').isMobilePhone('id-ID')
  ], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // return res.status(400).json({errors: errors.array()})
    res.render('add-contact', {
      title: 'Halaman Tambah Contact',
      layout: 'layouts/main-layout',
      errors: errors.array()
    })
  } else {
    addContact(req.body)
    res.redirect('/contact')
  }
})

//proses delete contact
app.get('/contact/delete/:nama', (req, res) => {
  const contact = findContact(req.params.nama)

  if (!contact) {
    res.status(404)
    res.send('<h1>404</h1>')
  } else {
    deleteContact(req.params.nama)
    res.redirect('/contact')
  }
})

// halaman ubah contact #1
app.get('/contact/edit/:nama', (req, res) => {
  const contact = findContact(req.params.nama)
  res.render('edit-contact', {
    title: 'Halaman Ubah Contact',
    layout: 'layouts/main-layout',
    contact
  })
})

//Proses ubah contact #2
app.post('/contact/update', [
  body('nama').custom((value, { req }) => {
    const duplikat = cekDuplikat(value)
    if(value !== req.body.oldNama && duplikat) {
      throw new Error('Nama sudah digunakan!')
    }
    return true
  }),
  check('email', 'Email tidak valid!').isEmail(),
  check('noHp', 'Nomor tidak valid').isMobilePhone('id-ID')
  ], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // return res.status(400).json({errors: errors.array()})
    res.render('edit-contact', {
      title: 'Halaman Ubah Contact',
      layout: 'layouts/main-layout',
      errors: errors.array(),
      contact: req.body
    })
  } else {
    updateContacts(req.body)
    res.redirect('/contact')
  }
})

//Halaman detail contact
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama)
  res.render('detail', {
    title: 'Halaman Detail Contact',
    layout: 'layouts/main-layout',
    contact
  })
})


app.get('/product/:id', (req, res) => {
  res.send(`Product ID : ${req.params.id} <br> Product Category : ${req.query.category}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send("<h1>404</h1>")
})


app.listen(port, () => {
  console. log(`Example app listening at http://localhost: ${port}`)
})

