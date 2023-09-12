<template>
    <div>
        <Navbar />
        <div>
            <div v-if='this.isAuthenticated'>
                <div v-if="!this.BuyProduct" class="BuyProduct">
                    <h2 class="product-text">Вы хотите купить продукт: <span class="colorProduct">{{ this.productName }}</span></h2>
                    <h2 class="product-text1">Ее цена: <span class="colorProduct">{{ this.productPrice }}$</span></h2>
                    <button @click="saveBuyProduct" class="btnbuyproduct">Подтвердить покупку продукта</button>
                </div>
                <div v-else>
                    <h2 class="youbuyproduct"><b class="youbuyproduct">Товар вами уже приобретен</b></h2>
                </div>
            </div>
            <div v-else>
                <h2 class="youbuyproduct"><b class="youbuyproduct">Вам надо авторизоваться для покупки товара</b></h2>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue"
import axios from 'axios'


export default {
    name: 'BuyProductMenu',
    components: {
        Navbar,
    },
    data() {
        return {
            productName:'',
            productPrice:'',
            userId:'',
            productId: '',
            UserName:'',
            NewBalance:'',
            BuyProduct: false,
            isAuthenticated:false,
            items: [],
        };
    },
    mounted() {
        // Check if user is already authenticated
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            this.isAuthenticated = true;
            this.user = JSON.parse(storedUser);
        }
    },
    created: function () {
        this.getProductsId();
        this.CheckOnBuy();
    },
    methods: {
        //get all products
        async getProductsId() {
            try {
                const id = this.$route.params.id
                const response = await axios.get("http://localhost:5000/buyproduct/" + id);
                this.items = response.data
                this.productName = response.data.product_name;
                this.productPrice = response.data.product_price;
                this.UserName = response.data.UserName;
            } catch (err) {
                console.log(err);
            }
        },
        async saveBuyProduct() {
            try {
                const userString = localStorage.getItem("user");
                const user = JSON.parse(userString);
                const user_id = user.userId;
                const user_name = user.UserName;
                const id = this.$route.params.id;
                const response = await axios.get(`http://localhost:5000/user/${user_id}`);
                const user_balance = parseFloat(response.data.Balance);
                if (user_balance < this.productPrice) {
                    alert("У вас недостаточно средств для покупки этого продукта!");
                    this.$router.push("/user/profile");
                } else {
                    this.NewBalance = user_balance - this.productPrice
                    console.log(this.NewBalance.toFixed(2))
                    await axios.post("http://localhost:5000/buyproduct", {
                        product_name: this.productName,
                        product_price: this.productPrice,
                        userId: user_id,
                        product_id: id,
                        UserName: user_name,
                    });
                    await axios.put("http://localhost:5000/buyproduct/" + user_id, {
                        Balance: this.NewBalance
                    })
                    alert("Продукт успешно куплен!");
                    this.$router.push("/");
                }
            } catch (err) {
                console.log(err);
            }
        },
        async CheckOnBuy(){
            try{
                const userString = localStorage.getItem("user");
                const user = JSON.parse(userString);
                const user_id = user.userId;
                const response = await axios.get(`http://localhost:5000/checkproduct/${user_id}`);
                const id = this.$route.params.id;
                const productIds = response.data.map((purchase) => purchase.product_id);
                const isBought = productIds.includes(Number(id));
                this.BuyProduct = isBought;
                console.log(this.BuyProduct, isBought)
            } catch (err) {
                console.log(err);
            }
        }
    },
}
</script>

<style>
/* Стиль для всего блока */

/* Стиль для заголовка h2 */
.product-text {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top:4cm;
    color:white;
    font-family: Georgia, 'Times New Roman', Times, serif;
}
.product-text1{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color:white;
    font-family: Georgia, 'Times New Roman', Times, serif;
}
.BuyProduct {
    text-align: center;
}
/* Стиль для текста продукта */
.colorProduct {
    color: red;
    font-weight: bold;
}

/* Стиль для кнопки */
.btnbuyproduct {
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    cursor: pointer;
}

/* Стиль при наведении на кнопку */
.btnbuyproduct:hover {
    background-color: #2980b9;
}

.youbuyproduct{
    font-size:50px;
    margin-top:5cm;
    color:blue;
    font-family: Georgia, 'Times New Roman', Times, serif;
}

</style>