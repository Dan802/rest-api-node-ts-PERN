import request from "supertest"
import server from '../../server'

describe('POST /api/products', () => {

  it('Should display validation errors', async () => {
    // The request is empty
    const res = await request(server).post("/api/products").send({})

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body.errors).toHaveLength(4)

    expect(res.status).not.toBe(404)
    expect(res.body.errors).not.toHaveLength(2)
  })
  
  it('Should validate that the price is greater than 0', async () => {
    const res = await request(server).post("/api/products").send({
      name : "mouse testing",
      price: 0
    })

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body.errors).toHaveLength(1)

    expect(res.status).not.toBe(404)
    expect(res.body.errors).not.toHaveLength(2)
  })
  
  it('Should validate that the price is a number a greater than 0', async () => {
    const res = await request(server).post("/api/products").send({
      name : "Mouse testing",
      price: "hola"
    })

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body.errors).toHaveLength(2)

    expect(res.status).not.toBe(404)
    expect(res.body.errors).not.toHaveLength(4)
  })

  it('Should create a new product', async () => {
    const res = await request(server).post("/api/products").send({
      name : "Mouse testing",
      price : 50
    })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('data')
    
    expect(res.status).not.toBe(404)
    expect(res.status).not.toBe(200)
    expect(res.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/products', () => {
  // first it will run this, and then the others 
  it('should check if api/products url exists', async () => {
    const response = await request(server).get('/api/products')
    expect(response.status).not.toBe(404)
  })

  it('GET a JSON response with products', async () => {
    const response = await request(server).get('/api/products')
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveLength(1)
    
    expect(response.status).not.toBe(404)
    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/products/:id', () => {
  it('Should return a 404 response for a non-existente product', async () => {
    const productId = 20000
    const response = await request(server).get(`/api/products/${productId}`)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('product not found')
  })

  it('should check a valid ID in the URL', async() => {
    const response = await request(server).get('/api/products/not-valid-url')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('Id not valid')
  })

  it('get a JSON response for a single product', async() => {
    const response = await request(server).get('/api/products/1')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  })
})

describe('PUT /api/products/:id', () => {
  it('should display validation error messages when updating a product', async () => {
    const response = await request(server).put('/api/products/1').send({})

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBeTruthy() // is true in a boolean context 
    expect(response.body.errors).toHaveLength(5)

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })

  it('should validate that the price is greater than 0', async () => {
    const object = {
      name: "Monitor curvo",
      availability: true,
      price: 0
    }

    const response = await request(server).put('/api/products/1').send(object)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBeTruthy() // is true in a boolean context
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('Price not valid')

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })

  it('should return a 404 response for a non-existent product', async() => {
    const object = {
      name: "Monitor curvo",
      availability: true,
      price: 12
    }

    const response = await request(server).put('/api/products/99999').send(object)

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('product not found')

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })

  it('should update an existent product with valid data', async() => {
    const object = {
      name: "Monitor curvo",
      availability: true,
      price: 12
    }

    const response = await request(server).put('/api/products/1').send(object)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('PATCH /api/products/:id', () => {

  it('should return a 404 response for a non-existing product', async () => {
    const response = await request(server).patch('/api/products/9999')

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('product not found')

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })

  it('should update/toggl availability status of a product', async () => {
    const response = await request(server).patch('/api/products/1').send({})

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data.availability).toBe(false)

    expect(response.body).not.toHaveProperty('errors')
  })
})

describe('DELETE /api/products/:id', () => {
  it('should check a valid ID', async () => {
    const response = await request(server).delete('/api/products/not-valid')

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors[0].msg).toBe('Id not valid')
  })

  it('should return a 404 response for a non-existent product', async () => {
    const response = await request(server).delete('/api/products/9999')

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Product not found')
    expect(response.status).not.toBe(200)
  })

  it('should delete a product', async () => {
    const response = await request(server).delete('/api/products/1')
    
    expect(response.status).toBe(200)
    expect(response.body.data).toBe('Product deleted')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(400)
  })
})
