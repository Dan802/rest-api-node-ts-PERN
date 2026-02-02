import { Router } from "express";
import { getProducts, createProduct, getProductById, updateProduct, updateAvailability, deleteProduct } from "../handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const router = Router();

router.get('/', getProducts)

router.get('/:id', 
  param("id")
    .isInt()
    .withMessage("Id not valid"),
  handleInputErrors,
  getProductById)

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

router.patch('/:id', 
  param("id")
    .isInt()
    .withMessage("Id not valid"),
  handleInputErrors,
  updateAvailability)

router.delete('/:id',
  param("id")
    .isInt()
    .withMessage("Id not valid"),
  handleInputErrors,
  deleteProduct)

export default router;