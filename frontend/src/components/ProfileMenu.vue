<template>
    <div>
        <Navbar />
        <div class="mainborder">
            <div class="infouser">
                <p>Ваш username: <span id="username">{{ this.UserName }}</span></p>
                <p>Ваш почта: <span id="username">{{ this.Email }}</span></p>
                <p>Ваш номер телефона: <span id="username">{{ this.Phone }}</span></p>
                <p>Ваш баланс: {{ this.Balance }}$</p>
            </div>
            <button type="button" class="btn btn-primary" @click="logout">Logout</button>
            <button type="button" class="btnBalance" onclick="window.location.href='/deposit'">Fill your balance</button>
            <button type="button" class="btnMyFilms" onclick="window.location.href='/myfilms'">MyFilms</button>
        </div>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import axios from "axios";

export default {
    name: "Profile",
    components: {
        Navbar,
    },
    data() {
        return {
            isAuthenticated: false,
            user: null,
            UserName: "",
            Password: "",
            Email: "",
            Phone: "",
            Balance:"",
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
    created() {
        this.getUserById();
    },
    methods:{
        logout() {
            this.isAuthenticated = false;
            this.user = null;
            localStorage.removeItem('user');
            this.$router.push("/");
        },
        async getUserById() {
            try {
                const userString = localStorage.getItem("user");
                const user = JSON.parse(userString);
                const user_id = user.userId;
                const response = await axios.get(
                    `http://localhost:5000/user/${user_id}`
                );
                console.log(this.$route);
                console.log(this.$route.params);
                console.log(this.$route.params.id);
                this.UserName = response.data.UserName;
                this.Phone = response.data.Phone;
                this.Email = response.data.Email;
                this.Balance = response.data.Balance;
            } catch (err) {
                console.log(err);
            }
        },
    }
}
</script>

<style>
.infouser {
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
}

.infouser p {
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
}

.infouser span {
    font-weight: bold;
    color: #333;
}

.mainborder{
    margin-top:1cm;
}

.btnBalance{
    margin-left: 0.8cm;
    background-color:red;
}

.btnMyFilms{
    margin-left:0.8cm;
    background-color:darkgoldenrod;
}
</style>