//import express
import express from "express";

//import functions from controller
import {
  showProducts,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createUser,
  checkUserCredentials,
  showUsers,
  updateUser,
  showUser,
  Commentary,
  createComment,
  showCommentsById,
  deleteComment,
  GetInfoForBuyProduct,
  createBuyProduct,
  showAllBuyProduct,
  updateBalance,
  CheckOnBuy,
  searchProduct,
  searchGenre,
} from "../controllers/product.js";


//init express router
const router = express.Router();

//get all product
router.get("/products", showProducts);

//get single product
router.get("/products/:id", showProductById);

// Create New Product
router.post("/products", createProduct);

// Update Product
router.put("/products/:id", updateProduct);

// Delete Product
router.delete("/products/:id", deleteProduct);

router.post("/user", createUser);

router.get("/user", showUsers);

router.post('/user', checkUserCredentials);

router.put("/user/:id", updateUser);

router.get("/user/:id", showUser);

router.get("/commentary", Commentary);

router.post("/commentary", createComment);

router.get("/commentary/:id", showCommentsById);

router.delete("/commentary/:id", deleteComment); 

router.get("/buyproduct/:id", GetInfoForBuyProduct);

router.post("/buyproduct", createBuyProduct);

router.get("/buyproduct", showAllBuyProduct);

router.put("/buyproduct/:id", updateBalance);

router.get("/checkproduct/:id", CheckOnBuy);

router.get("/search", searchProduct);

router.get('/genre', searchGenre)



//export default router
export default router;
