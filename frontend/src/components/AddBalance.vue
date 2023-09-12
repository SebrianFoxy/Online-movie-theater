<template>
    <div>
        <Navbar />
        <div>
            <h1 class="fillubalance">Форма пополнения баланса</h1>
            <p><label>Введите сумму для пополнения:</label></p>
            <input v-model="UpdateBalance">
            <button type="button" @click="saveBuyProduct">Пополнить счет</button>
        </div>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue"
import axios from 'axios'

export default {
    name: 'AddBalanceMenu',
    components: {
        Navbar,
    },
    data() {
        return {
            UpdateBalance: "",
        };
    },
    methods:{
        async saveBuyProduct() {
            try {
                const userString = localStorage.getItem("user");
                const user = JSON.parse(userString);
                const user_id = user.userId;
                const response = await axios.get(`http://localhost:5000/user/${user_id}`);
                const user_balance = parseFloat(response.data.Balance);
                this.UpdateBalance = parseFloat(this.UpdateBalance)
                await axios.put("http://localhost:5000/buyproduct/" + user_id, {
                    Balance: user_balance + this.UpdateBalance,
                })
                alert("Счет успешно пополнен!");
                this.$router.push("/user/profile");
            } catch (err) {
                console.log(err);
            }
        },
    }
}
</script>

<style>
.fillubalance{
    font-size: 36px;
    text-align: center;
    color:red;
    margin-top:10px;
    margin-bottom: 10px;
}
</style>