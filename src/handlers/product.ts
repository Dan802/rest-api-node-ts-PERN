import {Request, Response} from 'express'
import Product from "../models/Product.model"

export const getProducts = async (req : Request, res : Response) => {
  try {
    const products = await Product.findAll({
      order:[
        ['id', 'ASC']
      ], 
      limit: 50,
      attributes: {exclude: ['createdAt', 'updatedAt']}
    });
    res.json({data: products})
  } catch (error) {
    console.log(error)
  }
}

export const getProductById = async (req : Request, res : Response) => {
  try {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product) {
      return res.status(404).json({
        error : "product not found"
      })
    }

    res.json({data: product})
  } catch (error) {
    console.log(error)
  }
}

export const createProduct = async (req : Request, res : Response) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({data: product})
  } catch (error) {
    console.log(error)
  }
}

export const updateProduct = async (req : Request, res: Response) => {
  try {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product) {
      return res.status(404).json({
        error : "product not found"
      })
    }

    // Put: replace the full object
    product.name = req.body.name
    product.price = req.body.price
    product.availability = req.body.availability
    await product.save()
    
    res.json({data: product})

  } catch (error) {
    console.log(error)
  }
}

export const updateAvailability = async (req : Request, res: Response) => {
  try {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product) {
      return res.status(404).json({
        error : "product not found"
      })
    }

    // Patch: Only update the field that is sent in the request
    // (we aren't sending availability through request) 
    product.availability = !product.dataValues.availability
    await product.save()
    
    res.json({data: product})

  } catch (error) {
    console.log(error)
  }
}

export const deleteProduct = async (req : Request, res: Response) => {
  try {
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product) {
      return res.status(404).json({
        error : "Product not found"
      })
    }

    await product.destroy()
    res.json({data: 'Product deleted'})

  } catch (error) {
    console.log(error)
  }
}