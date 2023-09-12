<template>
  <div class="about">
    <Navbar />
    <div v-for="item in items" :key="item.product_id" class="item">
      <div class="NameFilm">
          {{ item.product_name }}
      </div>
      <div class="videoUrl" v-if="BuyProduct">
        <iframe width="560" height="315" 
        :src = "item.url_video"
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <div class="Genre">
          <p>Rating: {{ item.Rating }}</p>
          <p>Genre: {{ item.Genre }}</p>
        </div>
      </div>
      <div v-else>
          <div class="Genre1">
            <h1>
              Фильм недоступен, так как вы не купили его!
              Хотите <a class="urlbuyproduct" :href="'/buyproduct/' + item.product_id">
                купить?
              </a>
            </h1>
          </div>
          
      </div>
      <div class="container">
        <div class="img">
          <img :src="item.url_image" />
          <div class="Descriptions">
            <p class="Descriptions1">Descriptions:</p>
            {{ item.Descriptions }}
          </div>
        </div>
      </div>
    </div>
    <div class="commentary">
      <p class="textCommentary">Комментарии</p>
      <form>
        <textarea v-model="newComment" class="newCommentHolder" placeholder="Оставьте комментарий"></textarea>
        <button @click="addComment">Add Comment</button>
      </form>
      <div v-for="comment in comments" :key="comment.id" class="naloncustomev">
        <ul>
          <h2 class="infocommentary">UserName: <b>{{ comment.UserName }}</b> &nbsp; &nbsp; Date: <b>{{ comment.Date }}</b></h2>
          <hr>
          <p class="textReview">{{ comment.TextReview }} <button class="deletebtn" v-if="Role=='admin'" @click="deleteCommentary(comment.idposts)">Delete</button></p>
          <hr>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import axios from "axios";

export default {
  name:'NavigationMenu',
  components:{
    Navbar,
  },
  data() {
    return {
      items: [],
      comments: [],
      newComment: "",
      Role:'',
      BuyProduct:false,
    };
  },
  created() {
    this.getProducts();
    this.getComments();
    this.getUserById();
    this.CheckOnBuy();
  },
  methods: {
    async getProducts() {
      try {
        const id = this.$route.params.id
        const response = await axios.get("http://localhost:5000/products/" + id);
        this.items = response.data;
        console.log(this.items);
      } catch (err) {
        console.log(err);
      }
    },
    async getComments() {
      try {
        const id = this.$route.params.id
        const response = await axios.get("http://localhost:5000/commentary/" + id);
        this.comments = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async addComment() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userName = user.UserName;
        const userId = user.userId;
        const response = await axios.post("http://localhost:5000/commentary", {
          Date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          UserName: userName,
          TextReview: this.newComment,
          userId: userId,
          product_id: this.$route.params.id,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteCommentary(comment) {
      try {
        await axios.delete("http://localhost:5000/commentary/" + comment);
        this.getComments();
        console.log(comment)
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
    async CheckOnBuy() {
      try {
        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);
        const user_id = user.userId;
        const response = await axios.get(`http://localhost:5000/checkproduct/${user_id}`);
        const id = this.$route.params.id;
        const productIds = response.data.map((purchase) => purchase.product_id);
        const isBought = productIds.includes(Number(id));
        this.BuyProduct = isBought;
      } catch (err) {
        console.log(err);
      }
    }
  },
}
</script>

<style>
body{
  overflow-y: auto;
  overflow-x: hidden;
}
b{
  color:orangered;
}

.NotFound{
  margin-top:3cm;
}
.newCommentHolder{
  width:100%;
  resize: vertical;
  padding:15px;
  border-radius:15px;
  border:0;
  box-shadow:4px 4px 10px rgba(0,0,0,0.06);
  height:150px;
}
.infocommentary{
  font-size:18px;
  padding-left:1cm;
  padding-top:15px;
  font-family:Georgia, 'Times New Roman', Times, serif;
  color:darkgoldenrod;
}
.textCommentary{
  font-size:25px;
  color:azure;
}
.textReview{
  margin-left:50px;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 18px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color:white;
}
.commentary{
  display: flex;
  flex-direction: column;
  padding-top:18%;
}
.deletebtn{
  background:red;
}
.NameFilm{
  color:aliceblue;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 30px;
  position: absolute;
}
.img img{
  position:relative;
  width:100%;
  margin-top:-340px;
  margin-left:15cm;
}
.videoUrl{
  position: relative;
  z-index:9999;
  margin-top:60px;
  left:-5cm;
  width:14.8cm;
}
.Descriptions{
  position: relative;
  background-color: rgba(0,0,0,0.7);
  color: white;
  margin-left:100%;
  width:100%;
  box-sizing:border-box;
  font-size: 16px;
  font-family: 'Courier New', Courier, monospace;
  
}
.Descriptions1{
  margin-left:36%;
  font-weight:bold;
  font-size:23px;
}
.Genre{
  background-color: rgba(0,0,0,0.7);
  color: white;
  width:100%;
  box-sizing:border-box;
  font-size: 16px;
  font-family: 'Courier New', Courier, monospace;
}
.Genre1{
  background-color: rgba(0,0,0,0.7);
  color: white;
  width:400px;
  margin-right:1cm;
  box-sizing:border-box;
  font-size: 32px;
  font-family: 'Courier New', Courier, monospace;
  margin-top:3cm;
}
hr {
  margin: 10px auto;
  width: 90%;
  height: 2px;
  text-align: center;
  border: 0;
  background: -webkit-linear-gradient(left, rgba(173, 12, 14, 0.16) 0%,rgba(101, 95, 95, 0.59) 50%,rgba(189, 15, 18, 0.04) 100%);
  background: linear-gradient(to right, rgba(156, 149, 149, 0.08) 0%,rgba(49, 48, 48, 0.6) 50%,rgba(158, 153, 153, 0.07) 100%);
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.3);
}

</style>