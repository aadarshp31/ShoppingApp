const express = require('express')
const app = express()
const products = require('./data/products')

app.get('/', (req, res) => {
  res.send('API is running!')
})
app.get('/api/products', (req, res) => {
  res.json(products)
})
app.get('/api/products/:id', (req, res) => {
  const product = products.find(item => item._id === req.params.id)
  res.json(product)
})

const PORT = 5000
app.listen(PORT, () =>{
  console.log(`Server is running at port: ${PORT}`);
})