import { Router } from "express";
import { getProducts, createProduct, getProductById, updateProduct, updateAvailability, deleteProduct } from "../handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const router = Router();

// DOCUMENTATION
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The Product ID
 *          exampe: 1
 *        name:
 *          type: string
 *          description: The Product name
 *          exampe: gaming mouse
 *        price:
 *          type: number
 *          description: The Product price
 *          example: 40
 *        availability:
 *          type: boolean
 *          description: The Product availability
 *          example: true
 */

// tags comes froms swagger.ts

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags: 
 *      - Products
 *    description: Return a list of products
 *    responses:
 *      200: 
 *        description: Successful response
 *        content: 
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Return a porduct based on its unique ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema: 
 *          type: integer
 *    responses:
 *      200:
 *        description: Successful Response 
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad request
 */
router.get('/:id', 
  param("id")
    .isInt()
    .withMessage("Id not valid"),
  handleInputErrors,
  getProductById)

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties: 
 *              name: 
 *                type: string
 *                example: "mouse gamming"
 *              price: 
 *                type: number
 *                example: 40
 *    responses:
 *      201:
 *        description: Products created successfully
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - invalid input data
 */
router.post('/',
  body("name")
    .notEmpty()
    .withMessage("The name can be empty"),
  body("price")
    .isNumeric()
    .withMessage("Price not valid")
    .notEmpty()
    .withMessage("The price can be empty")
    .custom((value) => value > 0)
    .withMessage("Price not valid"),
  handleInputErrors,
  createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags: 
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema: 
 *          type: integer 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties: 
 *              name: 
 *                type: string
 *                example: "mouse gamming"
 *              price: 
 *                type: number
 *                example: 40
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Successful response
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad Request - invalid id or invalid input data
 */
router.put('/:id', 
  param("id")
    .isInt()
    .withMessage("Id not valid"),
  body("name")
    .notEmpty()
    .withMessage("The name can be empty"),
  body("price")
    .isNumeric()
    .withMessage("Price not valid")
    .notEmpty()
    .withMessage("The price cant be empty")
    .custom((value) => value > 0)
    .withMessage("Price not valid"),
  body("availability")
    .isBoolean()
    .withMessage("Availability's value not valid"),
  handleInputErrors,
  updateProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update product availability
 *    tags:
 *      - Products
 *    description: Returns the updated availability
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema: 
 *          type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad Request - invalid id
 */
router.patch('/:id', 
  param("id")
    .isInt()
    .withMessage("Id not valid"),
  handleInputErrors,
  updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Deletes a product by a given ID
 *    tags:
 *      - Products
 *    description: Returns a confirmation message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to delete
 *        required: true
 *        schema: 
 *          type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: "Product deleted"
 *              example: "Product deleted"
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad Request - invalid id
 */
router.delete('/:id',
  param("id")
    .isInt()
    .withMessage("Id not valid"),
  handleInputErrors,
  deleteProduct)

export default router;