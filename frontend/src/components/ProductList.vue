<template>
  <div>
    <Navbar />
    <div class="container">
      <h1 class="TextFilm">Фильмы онлайн кинотеатра</h1>
      <hr>
      <div class="search-form">
        <input type="text" v-model="searchQuery" placeholder="Введите название фильма">
        <button @click="searchMovies">Поиск</button>
      </div>
      <hr>
      <h1 class="TextGenre">Выбор жанра</h1>
      <div class="select-genre">
        <label>
          <input type="checkbox" name="genre" value="комедия" @change="onGenreChange">
          <p>Комедия</p>
        </label>
        <label>
          <input type="checkbox" name="genre" value="фантастика" @change="onGenreChange">
          <p>Фантастика</p>
        </label>
        <label>
          <input type="checkbox" name="genre" value="боевик" @change="onGenreChange">
          <p>Боевик</p>
        </label>
        <label>
          <input type="checkbox" name="genre" value="фэнтези" @change="onGenreChange">
          <p>Фэнтези</p>
        </label>
        <label>
          <input type="checkbox" name="genre" value="драма" @change="onGenreChange">
          <p>Драма</p>
        </label>
        <label>
          <input type="checkbox" name="genre" value="приключения" @change="onGenreChange">
          <p>Приключения</p>
        </label>
      </div>
      <hr>
      <div class="tablepanel">
        <div v-for="(item, index) in items" :key="item.product_id" class="item">
          <a :href="'/film/' + item.product_id">
              <div class="image" :style="{ 'animation-delay': (100 * (index + 1)) + 'ms' }">
                <img :src="item.url_image" />
                <a v-if="Role == 'admin'" :href="'/edit/' + item.product_id">
                  <div class="gear-icon">
                    <font-awesome-icon icon="fa-solid fa-cog" />
                  </div>
                </a>
                <div class="productPrice">
                  <b class="colorProductPrice">{{ item.product_price }}$</b>
                  <a :href="'/buyproduct/' + item.product_id">
                    <div class="iconshoppingcart">
                      <font-awesome-icon icon="fa-solid fa-shopping-cart" />
                    </div>
                  </a>
                </div>
              </div>
            </a>
          <div class="FilmName" :style="{ 'animation-delay': (100 * (index + 1)) + 'ms' }">
            {{ item.product_name }}
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue"
//import axios
import axios from "axios";

export default {
  name: 'NavigationMenu',
  components:{
    Navbar,
  },
  data() {
    return {
      items: [],
      Role:'',
      searchQuery:'',
    };
  },
  created() {
    this.getProducts();
    this.getUserById();
  },
  methods: {
    async searchMovies() {
      try {
        this.items = []
        const response = await axios.get(`http://localhost:5000/search?q=${this.searchQuery}`);
        this.items = response.data;
        console.log(this.items)
        console.log(this.searchQuery)
      } catch (err) {
        console.log(err);
      }
    },
    onGenreChange(event) {
      const selectedGenres = Array.from(
        event.target.closest('.select-genre').querySelectorAll('input[type="checkbox"]:checked')
      ).map(input => input.value);

      this.genre = selectedGenres.join(', ');
      this.getByGenre();
    },
    async getProducts() {
      try {
        const response = await axios.get("http://localhost:5000/products");
        this.items = response.data;
        console.log(this.items);
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
    async getByGenre(){
      try{
        this.items = []
        const response = await axios.get(`http://localhost:5000/genre?q=${this.genre}`)
        this.items = response.data
        console.log(this.items)
        console.log(this.genre);
      } catch (err){
        console.log(err)
      }
    }
  }
};
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  background-color: #0c0e4a; /* замените на ваш цвет фона */
  overflow: auto;
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

/* Стили для контейнера */
.select-genre {
  display: grid;
  flex-direction: column;
  align-items:baseline;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

/* Стили для label */
.select-genre label {
  display: block;
  text-align: center;
  margin-bottom: -8px;
  font-size: 15px;
  font-weight: bold;
}

/* Стили для checkbox */
.select-genre input[type="checkbox"] {
  margin-right: 5px;
  transform: scale(1);
}

/* Стили для checked checkbox */
.select-genre input[type="checkbox"]:checked + label {
  color: #007bff;
  font-weight: bold;
}

.select-genre p{
  margin-top:-3px;
  color:orange;
}
.iconshoppingcart{
  position: relative;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 30px;
  margin: 5px;
  margin-top:3.6cm;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
}
.iconshoppingcart:hover {
  cursor: pointer;
}
.gear-icon:hover {
  cursor: pointer;
}
.gear-icon {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  width: 30px;
  height: 30px;
  margin: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
}
.productPrice{
  position: absolute;
  top: 0;
  right: 10px;
  display: none;
  width: 30px;
  height: 30px;
  margin: 5px;
  text-align: center;
  color:purple;
}
.colorProductPrice{
  color:black;
  background-color:wheat;
}
.item:hover .productPrice {
  display: block;
}
.gear-icon i {
  color: #333;
}

.item:hover .gear-icon {
  display: block;
}
.container {
  max-width: 900px;
  margin: 0 auto;
}

.tablepanel {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.item {
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 250px;
  margin-top:10%;
  transition: transform 0.3s ease-in-out;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.item.loaded {
  opacity: 1;
}

.image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  text-align: center;
}

.item:hover .image{
  transform: scale(1.1);
}

.TextFilm {
font-family:Georgia, 'Times New Roman', Times, serif;
font-size: 36px;
font-weight: bold;
color: #FF5733;
text-align: center;
text-shadow: 2px 2px 2px #000000;
margin-top: 30px;
margin-bottom: 30px;
margin-right:50px;
}
.TextGenre{
  font-family:Georgia, 'Times New Roman', Times, serif;
  font-size: 24px;
  font-weight: bold;
  color: #FF5733;
  text-align: center;
  text-shadow: 2px 2px 2px #000000;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right:50px;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.FilmName {
  margin-top: 10px;
  text-align: center;
  color:white;
  font-family:'Courier New', Courier, monospace;
  opacity: 0;
  animation-name: slide-up;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.search-form{
  margin-top:20px;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
