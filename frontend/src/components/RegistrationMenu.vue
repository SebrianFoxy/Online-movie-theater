<template>
    <div class="Registration">
        <Navbar />
        <div class="container mt-4" id="container1">
            <form>
                <p class="textRegistration">Форма регистрации</p>
                <input v-model="UserName" type="text" class="form-control" id="exampleInputUserName1"
                    placeholder="UserName">
                <input v-model="Email" type="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Enter email">
                <input v-model="Phone" type="phone" class="form-control" id="exampleInputPhone1" placeholder="Phone">
                <input v-model="Password" type="password" class="form-control" id="exampleInputPassword11"
                    placeholder="Password">
                <button type="button" class="btn btn-primary" @click="createUser()">Register</button>
            </form>
        </div>
        <router-view />
    </div>
</template>

<script>
import Navbar from "./Navbar.vue"
import axios from "axios";

export default {
    name: 'Registration',
    components: {
        Navbar,
    },
    data() {
        return {
            UserName: "",
            Password: "",
            Phone: "",
            Email: "",
            Balance: 0.00,
            Role:"",
        };
    },
    methods: {
        validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },
        validatePhone(phone) {
            const regex = /^\+?[0-9]{8,}$/;
            return regex.test(phone);
        },
        async createUser() {
            try {
                if (!this.validateEmail(this.Email)) {
                    alert("Please enter a valid email address.");
                    return;
                }
                if (!this.validatePhone(this.Phone)) {
                    alert("Please enter a valid phone number.");
                    return;
                }
                await axios.post("http://localhost:5000/user", {
                    UserName: this.UserName,
                    Password: this.Password,
                    Phone: this.Phone,
                    Email: this.Email,
                    Balance: 0.00,
                    Role: 'user',
                });
                (this.UserName = ""),
                    (this.Password = ""),
                    (this.Phone = ""),
                    (this.Email = "");
                this.$router.push("/user/login");
            } catch (err) {
                console.log(err);
                alert("Failed to create user. Please try again.");
            }
        },
    },
}
</script>

<style>
.textRegistration {
    font-size: 36px;
    text-align: center;
}

#exampleInputUserName1,
#exampleInputEmail1,
#exampleInputPhone1 {
    margin-bottom: 10px;
}</style>