<template>
  <div>
      <Navbar />
      <div v-if="Role == 'admin'">
        <h1 class="formaedit">Форма для удаления/редактирования фильма</h1>
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
          <button type="button" @click="updateProduct()">Update</button>
          <button type="button" class="delbutton" @click = "deleteProduct()">Delete</button>
          <div class="TimeMessage" v-show="showMessage">{{ message }}</div>
        </form>
      </div>
      <div v-else>
        <p>У тебя нет прав админа, дружище</p>
      </div>
      <router-view/>
    </div>
</template>

<script>
//import axios
import axios from "axios";
import Navbar from "./Navbar.vue";


export default {
  name: 'NavigationMenu',
  components: {
    Navbar,
  },
  data() {
    return {
      productName: "",
      productPrice: "",
      Url_Image: "",
      Url_Video: "",
      Descriptions: "",
      Rating: "",
      Genre: "",
      showMessage: false,
      message: "Обновлено!",
      Role:'',
    };
  },
  created: function () {
    this.getProductById();
    this.getUserById();
  },
  methods: {
    //get product by id
    async getProductById() {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${this.$route.params.id}`
        );
        this.productName = response.data.map((purchase) => purchase.product_name);
        this.productPrice = response.data.map((purchase) => purchase.product_price);
        this.Url_Image = response.data.map((purchase) => purchase.url_image);
        this.Url_Video = response.data.map((purchase) => purchase.url_video);
        this.Descriptions = response.data.map((purchase) => purchase.Descriptions);
        this.Rating = response.data.map((purchase) => purchase.Rating);
        this.Genre = response.data.map((purchase) => purchase.Genre);
      } catch (err) {
        console.log(err);
      }
    },

    //update product
    async updateProduct() {
      try {
        await axios.put(
          `http://localhost:5000/products/${this.$route.params.id}`,
          {
            product_name: this.productName,
            product_price: this.productPrice,
            url_image: this.Url_Image,
            url_video: this.Url_Video,
            Descriptions: this.Descriptions,
            Rating: this.Rating,
            Genre: this.Genre,
          }
        );
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
        this.getProductById();
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    async deleteProduct() {
      try {
        await axios.delete(`http://localhost:5000/products/${this.$route.params.id}`);
        this.getProductById();
        this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
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
  },
};
</script>

<style>
.TimeMessage{
  color:white;
}
.delbutton{
  background: red;
  margin-left:5%;
}

.formaedit{
  font-size: 36px;
  text-align: center;
  color:red;
  margin-top:10px;
  margin-bottom: 10px;
}
</style>
