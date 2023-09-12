<template>
  <div>
    <Navbar />
    <div v-if="Role=='admin'">
      <h1 class='addnewfilm'>Форма для добавления фильма</h1>
      <form>
        <p><label>Product name:</label></p>
        <input v-model="productName">
        <p><label>Product price:</label></p>
        <input v-model="productPrice">
        <p><label>Url_Image:</label></p>
        <input v-model="Url_Image">
        <p><label>Url_Video:</label></p>
        <input v-model="Url_Video">
        <p><label>Descriptions:</label></p>
        <input v-model="Descriptions">
        <p><label>Rating:</label></p>
        <input v-model="Rating">
        <p><label>Genre:</label></p>
        <input v-model="Genre">
        <button type="button" @click="saveProduct()">Save</button>
      </form>
    </div>
    <div v-else>
      <p class="NoAdmin">У тебя нет админки, дружище</p>
    </div>
    <router-view/>
  </div>
</template>

<script>
//import axios
import axios from "axios";
import Navbar from "./Navbar.vue"

export default {
  name: 'NavigationMenu',
  components: {
    Navbar,
  },
  data() {
    return {
      productName: "",
      productPrice: "",
      Url_Image:"",
      Url_Video:"",
      Descriptions:"",
      Rating:"",
      Genre:"",
      Role:"",
    };
  },
  created() {
    this.getUserById();
  },
  methods: {
    async getUserById() {
      try {
        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);
        const user_id = user.userId;
        const responsed = await axios.get(
          `http://localhost:5000/user/${user_id}`
        );
        this.Role = responsed.data.Role;
        console.log(responsed.data.Role)
      } catch (err) {
        console.log(err);
      }
    },
    //create new product
    async saveProduct() {
      try {
        await axios.post("http://localhost:5000/products", {
          product_name: this.productName,
          product_price: this.productPrice,
          url_image: this.Url_Image,
          url_video: this.Url_Video,
          Descriptions: this.Descriptions,
          Rating: this.Rating,
          Genre: this.Genre,
        });
        (this.productname = ""), 
        (this.productPrice = ""), 
        (this.Url_Image = ""), 
        (this.Url_Video = ""), 
        (this.Descriptions = ""), 
        (this.Rating = ""), 
        (this.Genre = "")
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.NoAdmin{
  font-size:25px;
}
body{
  overflow: scroll;
}
form p {
  margin: 10px 0;
  color:peachpuff;
}

label {
  display: block;
  font-size: 1.2em;
  margin-bottom: 5px;
  font-family:Georgia, 'Times New Roman', Times, serif;
}

input {
  height: 30px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1.2em;
  width: 100%;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.2em;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #3e8e41;
}

.addnewfilm{
  font-size: 36px;
  text-align: center;
  color:red;
  margin-top:10px;
  margin-bottom: 10px;
}
</style>
