//import functions from Product model
import {
  getProducts,
  getProductById,
  insertProduct,
  updateProductById,
  deleteProductById,
  insertUser,
  checkUser,
  getUsers,
  updateUserById,
  getUserById,
  getCommentsByProduct,
  insertComment,
  getCommentsById,
  deleteCommentary,
  getInfoForBuy,
  insertBuyProduct,
  getAllBuyProduct,
  updateUserBalance,
  CheckProductOnBuy,
  searchProducts,
  searchByGenre
} from "../models/productModel.js";

//get all products
export const showProducts = (req, res) => {
  getProducts((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const searchGenre = (req, res) => {
  const keyword = req.query.q;
  searchByGenre(keyword, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const searchProduct = (req, res) => {
  const keyword = req.query.q;
  searchProducts(keyword, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};


export const showAllBuyProduct = (req, res) => {
  getAllBuyProduct((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const Commentary = (req, res) =>{
  getCommentsByProduct((err, results) => {
    if (err){
      res.send(err);
    }
    else{
      res.json(results)
    }
  })
};


export const showUsers = (req, res) => {
  getUsers((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//get single product
export const CheckOnBuy = (req, res) => {
  CheckProductOnBuy(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const showCommentsById = (req, res) => {
  getCommentsById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const GetInfoForBuyProduct = (req, res) => {
  getInfoForBuy(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const showProductById = (req, res) => {
  getProductById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const showUser = (req, res) => {
  getUserById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//create new product
export const createProduct = (req, res) => {
  const data = req.body;
  insertProduct(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const createBuyProduct = (req, res) => {
  const data = req.body;
  insertBuyProduct(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const createComment = (req, res) => {
  const data = req.body;
  insertComment(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Update Product
export const updateProduct = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateProductById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const updateBalance = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateUserBalance(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const updateUser = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateUserById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results); 
    }
  });
};

// Delete Product
export const deleteProduct = (req, res) => {
  const id = req.params.id;
  deleteProductById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const deleteComment = (req, res) => {
  const id = req.params.id;
  deleteCommentary(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Create User
export const createUser = (req, res) => {
  const data = req.body;
  insertUser(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Check User Credentials
export const checkUserCredentials = (req, res) => {
  const data = req.body;
  checkUser(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

