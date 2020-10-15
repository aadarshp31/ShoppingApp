import express from 'express'
const app = express()
import products from './data/products.js'
import dotenv from 'dotenv'
dotenv.config()

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

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
  console.log(`Server is running in ${process.env.NODE_ENV} mode at port: ${PORT}`);
})