//import connection
import db from "../config/database.js";

//get all products
export const getProducts = (result) => {
  db.query("SELECT * FROM Film", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

//get single product
export const getProductById = (id, result) => {
  db.query(
    "SELECT * FROM Film WHERE product_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const searchProducts = (searchQuery, result) => {
  const query = `SELECT * FROM Film WHERE product_name LIKE '%${searchQuery}%'`;
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const searchByGenre = (searchQuery, result) => {
  const genres = searchQuery.replace(/\s/g, '').split(',');
  const queries = genres.map(genre => `Genre LIKE '%${genre}%'`);
  const query = `SELECT * FROM Film WHERE ${queries.join(' OR ')}`;
  
  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getAllBuyProduct = (result) => {
  db.query("SELECT * FROM buyproduct", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}; 

export const getCommentsByProduct = (result) => {
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getCommentsById = (id, result) => {
  db.query(
    "SELECT * FROM posts WHERE product_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const getInfoForBuy = (id, result) => {
  db.query(
    "SELECT * FROM Film WHERE product_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

export const CheckProductOnBuy = (id, result) => {
  db.query(
    "SELECT product_id FROM buyproduct WHERE userId = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const insertComment = (data, result) => {
  db.query("INSERT INTO posts SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};


//insert product to databased
export const insertProduct = (data, result) => {
  db.query("INSERT INTO Film SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const insertBuyProduct = (data, result) => {
  db.query("INSERT INTO buyproduct SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// Update Product to Database
export const updateProductById = (data, id, result) => {
  db.query(
    "UPDATE Film SET product_name = ?, product_price = ?, url_image = ?, url_video = ?, Descriptions = ?, Rating = ?, Genre = ? WHERE product_id = ?",
    [data.product_name, data.product_price, data.url_image, data.url_video, data.Descriptions, data.Rating, data.Genre, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const updateUserBalance = (data, id, result) => {
  db.query(
    "UPDATE user SET Balance = ? WHERE userId = ?",
    [data.Balance, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// Delete Product to Database
export const deleteProductById = (id, result) => {
  db.query("DELETE FROM Film WHERE product_id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const deleteCommentary = (id, result) => {
  db.query("DELETE FROM posts WHERE idposts = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const checkUser = (username, password, result) => {
  db.query('SELECT * FROM user WHERE UserName = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      if (results.length > 0) {
        result(null, { status: 'success', message: 'User authenticated successfully.' });
      } else {
        result(null, { status: 'error', message: 'Invalid username or password.' });
    }
    }
  });
};

export const insertUser = (data, result) => {
  db.query("INSERT INTO user SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getUsers = (result) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const updateUserById = (id, data, result) => {
  db.query(
    "UPDATE user SET UserName = ?, Password = ?, Phone = ?, Email = ?, Balance = ? WHERE userId = ?",
    [data.UserName, data.Password, data.Phone, data.Email, data.Balance, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const getUserById = (id, result) => {
  db.query(
    "SELECT * FROM User WHERE userId = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

