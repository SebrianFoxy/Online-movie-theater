<template>
    <div>
        <Navbar />
        <div class="text">
            <selection>
                <h1></h1>
            </selection>
        </div>
        <div class="border">
            <h1>Приветствуем вас в онлайн кинотеатре "OSIRIS"</h1>
            <h1>У нас вы сможете посмотреть лучшие фильмы киноиндустрии по дешевой цене</h1>
            <hr>
        </div>
        <div class="NewFilms">
            <h1>Новинки, которые вы можете посмотреть!</h1>
                <div class="tablepanel">
                    <div v-for="(item, index) in items.slice(-3)" :key="item.product_id" class="item">
                        <a :href="'/film/' + item.product_id">
                            <div class="image" :style="{ 'animation-delay': (100 * (index + 1)) + 'ms' }">
                                <img :src="item.url_image" />
                                <div class="productPrice">
                                    <b class="colorProductPrice">{{ item.product_price }}$</b>
                                </div>
                            </div>
                        </a>
                        <div class="FilmName" :style="{ 'animation-delay': (100 * (index + 1)) + 'ms' }">
                            {{ item.product_name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>


<script>
import Navbar from "./Navbar.vue"
import axios from 'axios'

export default {
    name: 'HomeMenu',
    components: {
        Navbar,
    },
    data() {
        return {
            items: [],
        };
    },
    created() {
        this.getProducts();
    },
    mounted(){
        
    },
    methods:{
        async getProducts() {
            try {
                const response = await axios.get("http://localhost:5000/products");
                this.items = response.data;
            } catch (err) {
                console.log(err);
            }
        },
    },
}
</script>

<style scoped>
body,
html {
    height: 100%;
    overflow: auto;
}

.border {
    border: 3px solid none;
    position: center;
    height: 9cm;
}

.border h1{
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
.border hr{
    margin: 10px auto;
    width: 90%;
    height: 2px;
    text-align: center;
    border: 0;
    background: -webkit-linear-gradient(left, rgba(173, 12, 14, 0.16) 0%,rgba(101, 95, 95, 0.59) 50%,rgba(189, 15, 18, 0.04) 100%);
    background: linear-gradient(to right, rgba(156, 149, 149, 0.08) 0%,rgba(49, 48, 48, 0.6) 50%,rgba(158, 153, 153, 0.07) 100%);
    box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.3);
}

.NewFilms h1{
    font-family:Georgia, 'Times New Roman', Times, serif;
    font-size: 24px;
    font-weight: bold;
    color: #FF5733;
    text-align: center;
    text-shadow: 2px 2px 2px #000000;
    margin-top: 30px;
    margin-bottom: 10px;
    margin-right:50px;
}

.tablepanel{
    margin-bottom:30px;
}
</style>
