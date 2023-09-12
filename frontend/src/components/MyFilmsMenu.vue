<template>
    <div>
        <Navbar />
        <div>
            <h1 class="FilmText">Ваши купленные фильмы</h1>
            <hr>
            <div class="tablepanel">
                <div class="Films">
                    <div v-for="(item, index) in items" :key="item.product_id" class="item">
                        <a :href="'/film/' + item.product_id">
                            <div class="image" :style="{ 'animation-delay': (100 * (index + 1)) + 'ms' }">
                                <img :src="item.url_image" />
                            </div>
                        </a>
                        <div class="FilmName" :style="{ 'animation-delay': (100 * (index + 1)) + 'ms' }">
                            {{ item.product_name }}
                        </div>
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
    name:'MyFilmsMenu',
    components:{
        Navbar,
    },
    data() {
        return {
            items: [],
            productIds:'',
        };
    },
    created() {
        this.CheckOnBuy();
    },
    methods:{
        async CheckOnBuy() {
            try {
                const userString = localStorage.getItem("user");
                const user = JSON.parse(userString);
                const user_id = user.userId;
                const response = await axios.get(`http://localhost:5000/checkproduct/${user_id}`);
                const id = this.$route.params.id;
                this.productIds = response.data.map((purchase) => purchase.product_id);
                this.getProductsById();
            } catch (err) {
                console.log(err);
            }
        },
        async getProductsById(){
            try{
                const response = await axios.get(`http://localhost:5000/products`)
                const products = response.data;
                products.forEach((product) => {
                    if (this.productIds.includes(product.product_id)) {
                        this.items.push(product);
                    }
                });
                console.log(this.items);
            } catch (err) {
                console.log(err);
            }
        }
    }

}
</script>

<style scoped>

.Films {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.item {
    width: 100%;
    margin-bottom: 20px;
}
.image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    text-align: center;
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

.item:hover .image{
    transform: scale(1.1);
}

.FilmText{
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
</style>