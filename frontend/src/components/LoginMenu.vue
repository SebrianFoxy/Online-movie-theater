<template>
    <div class="Login">
        <Navbar />
        <div class="container mt-4" id="container1" v-if="!isAuthenticated">
            <form>
                <p class="TextLoginUser">Форма авторизации</p>
                <input v-model="UserName" type="text" class="form-control" id="exampleInputUserName1" placeholder="UserName">
                <input v-model="Password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </form>
            <div class="container-buttons">
                <button type="button" class="btn btn-primary" id="SubmitBut" @click="checkUserCredentials()">Login</button>
                <p1 class="textAccount">No account? -></p1>
                <button onclick="window.location.href = '/user/registration'" class="ButReg">Registration</button>
            </div>
        </div>
        <div v-else>
            <div>
                <p>Вы уже авторизованы, {{ user.UserName }}</p>
            </div>
            <button type="button" class="btn btn-primary" @click="logout">Logout</button>
        </div>
        <router-view/>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import axios from "axios";

export default {
    name: "Login",
    components: {
        Navbar,
    },
    data() {
        return {
            isAuthenticated: false,
            user: null,
            UserName: "",
            Password: "",
            Email:"",
            Phone:"",
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
    methods: {
        checkUserCredentials() {
            axios
                .get("http://localhost:5000/user")
                .then((response) => {
                    const foundUser = response.data.find(
                        (user) =>
                            user.UserName === this.UserName && user.Password === this.Password
                    );
                    if (foundUser) {
                        this.isAuthenticated = true;
                        this.user = foundUser;
                        localStorage.setItem("user", JSON.stringify(foundUser));
                        this.$router.push("/");
                    } else {
                        alert("Неправильный логин или пароль!");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Ошибка авторизации!");
                });
        },
        logout() {
            this.isAuthenticated = false;
            this.user = null;
            localStorage.removeItem('user');
            this.$router.push("/");
        },
        
    },
};
</script>


<style>
.textAccount{
    padding-left:15cm;
    padding-top:10px;
}
.container-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#container1{
    padding-top:1cm;
}
#exampleInputPassword1{
    margin-top:0.5cm;
}
.TextLoginUser{
    color:salmon;
    font-size:36px;
    text-align: center;
}

.ButReg {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #4CAF50;
    border-radius: 30px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    text-decoration: none;
    text-align: center;
    transition: background-color 0.3s ease-in-out;
}

.ButReg:hover {
    background-color: #3e8e41;
    cursor: pointer;
}
</style>