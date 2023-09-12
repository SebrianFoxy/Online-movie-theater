<template>
    <div>
        <ul id="navbar">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/films">Films</router-link></li>
            <li class="addFilm" v-if="this.Role == 'admin'"><router-link to="/AddFilm">Add film</router-link></li>
            <li class="Login" v-if="!isAuthenticated"><router-link to="/user/login">Login</router-link></li>
            <li class="Profile" v-if="isAuthenticated"><router-link to="/user/profile">Л.Кабинет</router-link></li>
            <li><router-link to="/info">Справка</router-link></li>
        </ul>
        <router-view />
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            isAuthenticated: false,
            Role:'',
        };
    },
    computed: {
        username() {
            const user = JSON.parse(localStorage.getItem("user"));
            return user && user.UserName ? user.UserName : "Login";
        },
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
                this.Role = response.data.Role;
            } catch (err) {
                console.log(err);
            }
        },
    }
};
</script>

<style>
#navbar ul{
    display: none;
    background-color: #f90;
    position: absolute;
    top: 100%;
}
#navbar li:hover ul { display: block; }
#navbar, #navbar ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
}
#navbar {
    height: 30px;
    background-color: #0c0e4a;
    padding-left: 25%;
    min-width: 470px;
}
#navbar li {
    float: left;
    position: relative;
    height: 100%;
    font-family:Georgia, 'Times New Roman', Times, serif ;
    font-size:18px;
}
#navbar li a {
    display: block;
    padding: 1px;
    width: 100px;
    color: white;
    text-decoration: none;
    text-align: center;
}
#navbar ul li { float: none; }
#navbar li:hover { background-color: #f90; }
#navbar ul li:hover { background-color: #0c0e4a; }
</style>