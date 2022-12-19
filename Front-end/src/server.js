const express = require('express')
const path = require('path')
const app = express()
const sslRedirect= require('heroku-ssl-redirect').default

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../dist')))
app.use(sslRedirect())

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})


app.listen(PORT, () => {
  console.log('Server started at port:' + PORT);
})
