<template>
    <div>
        <Navbar />
        <div>
            <h1 @click="showText1 = !showText1">Объекты базы данных</h1>
            <p v-if="showText1" class="maintext">
                Таблицы - это основные объекты базы данных MySQL.<br>
                Таблица <b>post</b>, в ней хранятся комментарии от пользователей к фильму.
                <br>Она имеет следующие столбцы: <br>
                1. idPosts<br>
                2. Date<br>
                3. TextReview<br>
                4. UserName<br>
                5. userId<br>
                6. product_id<br>
                Таблица <b>user</b>. Данная таблица хранит всю информацию о пользователях.<br> Она имеет следующие столбцы:<br>
                1. userId<br>
                2. UserName<br>
                3. Password<br>
                4. Phone<br>
                5. Email<br>
                6. Role<br>
                7. Balance<br>
                Таблица <b>Film</b>. Данная таблица хранит в себе всю информацию о фильмах. <br>Она имеет следующие столбцы:<br>
                1. product_id<br>
                2. product_name<br>
                3. url_image<br>
                4. url_video<br>
                5. Descriptions<br>
                6. Rating<br>
                7. Genre<br>
                Таблица <b>buyproduct</b>. Данная таблица хранит в себе информацию о покупках фильма. <br>Она имеет следующие столбцы:<br>
                1. idbuyproduct<br>
                2. product_price<br>
                3. product_name<br>
                4. UserName<br>
                5. userId<br>
                6. product_id<br>
            </p>
        </div>
        <div>
            <h1 @click="showText2 = !showText2">Запросы базы данных</h1>
            <p v-if="showText2" class="maintext">
                1. Когда пользователь заходит на сайт, он должен зарегистрироваться, для этого ему нужен пароль и номер телефона.<br>
                После регистрации система регистрирует нового пользователя, формируя данный запрос:<br>
                export const insertUser = (data, result) => {<br>
                  db.query("INSERT INTO user SET ?", [data], (err, results) => {<br>
                    if (err) {<br>
                      console.log(err);<br>
                      result(err, null);<br>
                    } else {<br>
                      result(null, results);<br>
                    }<br>
                  });<br>
                }<br>

                2. Пользователь может купить фильм на выбор. Для этого ему надо будет нажать на кнопку «купить» возле фильма, после чего ему предложат оплатить товар, после чего сформируется SQL запрос <br>
                export const insertBuyProduct = (data, result) => {<br>
                db.query("INSERT INTO buyproduct SET ?", [data], (err, results) => {<br>
                    if (err) {<br>
                    console.log(err);<br>
                    result(err, null);<br>
                    } else {<br>
                    result(null, results);<br>
                    }<br>
                });<br>
                };<br>

                3. Администратор сайта сможет добавлять новые фильмы для их покупки. Для этого ему придется ввести нужные данные, после чего создаться следующий SQL запрос<br> 
                export const insertProduct = (data, result) => {<br>
                db.query("INSERT INTO Film SET ?", [data], (err, results) => {<br>
                    if (err) {<br>
                    console.log(err);<br>
                    result(err, null);<br>
                    } else {<br>
                    result(null, results);<br>
                    }<br>
                });<br>
                };<br>

                4. Пользователь может оставлять отзывы к фильму. Для этого ему надо перейти на вкладу фильма где он хочет оставить отзыв, нажать на кнопку отзывы и написать свой отзыв об фильме и оставить оценку, после чего выполниться следующий SQL запрос <br>
                export const insertComment = (data, result) => {<br>
                db.query("INSERT INTO posts SET ?", [data], (err, results) => {<br>
                    if (err) {<br>
                    console.log(err);<br>
                    result(err, null);<br>
                    } else {<br>
                    result(null, results);<br>
                    }<br>
                });<br>
                };<br>

                5.Пользователь может искать по названию фильм. Для этого ему надо зайти на вкладку где находятся все фильмы, нажать на поиск и ввести название фильма, после чего создаться следующий SQL запрос<br> 
                export const searchProducts = (searchQuery, result) => {<br>
                const query = `SELECT * FROM Film WHERE product_name LIKE '%${searchQuery}%'`;<br>
                db.query(query, (err, results) => {<br>
                    if (err) {<br>
                    console.log(err);<br>
                    result(err, null);<br>
                    } else {<br>
                    result(null, results);<br>
                    }<br>
                });<br>
                };<br>

                6. Пользователь может выбирать по фильм по жанрам. Для этого ему надо зайти во вкладку где находятся все фильмы и выбрать интересующие его жанры, после чего выполниться следующий SQL запрос <br>
                export const searchByGenre = (searchQuery, result) => {<br>
                const genres = searchQuery.replace(/\s/g, '').split(',');<br>
                const queries = genres.map(genre => `Genre LIKE '%${genre}%'`);<br>
                const query = `SELECT * FROM Film WHERE ${queries.join(' AND ')}`;<br>
            
                db.query(query, (err, results) => {<br>
                    if (err) {<br>
                    console.log(err);<br>
                    result(err, null);<br>
                    } else {<br>
                    result(null, results);<br>
                    }<br>
                });<br>
                };<br>

                7. Пользователь может пополнить свой баланс в личном кабинете, после чего выполниться следующий SQL запрос<br>
                export const updateUserBalance = (data, id, result) => {<br>
                db.query(<br>
                    "UPDATE user SET Balance = ? WHERE userId = ?",<br>
                    [data.Balance, id],<br>
                    (err, results) => {<br>
                    if (err) {<br>
                        console.log(err);<br>
                        result(err, null);<br>
                    } else {<br>
                        result(null, results);<br>
                    }<br>
                    }<br>
                );<br>
                };<br>

                8. Пользователь может авторизоваться под свой аккаунт во вкладке «Login», после чего выполняется следующий SQL запрос для проверки введенных данных пользователя и последующей авторизацией в свой аккаунт <br>
                export const checkUser = (username, password, result) => {<br>
                db.query('SELECT * FROM user WHERE UserName = ? AND password = ?', [username, password], (err, results) => {<br>
                    if (err) {<br>
                    console.log(err);<br>
                    result(err, null);<br>
                    } else {<br>
                    if (results.length > 0) {<br>
                        result(null, { status: 'success', message: 'User authenticated successfully.' });<br>
                    } else {<br>
                        result(null, { status: 'error', message: 'Invalid username or password.' });<br>
                    }<br>
                    }<br>
                });<br>
                };<br>

                9. Пользователь может посмотреть свои купленные фильмы в профиле, нажав на кнопку “MyFilms”, после чего выполняется следующий SQL запрос <br>
                export const getProductById = (id, result) => {<br>
                db.query(<br>
                    "SELECT * FROM Film WHERE product_id = ?",<br>
                    [id],<br>
                    (err, results) => {<br>
                    if (err) {<br>
                        console.log(err);<br>
                        result(err, null);<br>
                    } else {<br>
                        result(null, results);<br>
                    }<br>
                    }<br>
                );<br>
                };<br>
            </p>
        </div>
        <div>
            <h1 @click="showText3 = !showText3">Главный интерфейс</h1>
            <p v-if="showText3" class="maintext">
                Главный интерфейс состоит из навигационного меню, в котором присутствует вкладка "Home" для возврата на главный интерфейс, вкладка "Films", в котором можно посмотреть все фильмы, которые присутствуют на сайте, вкладка "Login", если пользователь не авторизовался или его личный кабинет, если пользователь авторизовался.<br>
                В главном интерфейсе, также присутствуют последние 3 фильма, которые были загружены на сайт.<br>
                Рисунок представлен ниже<br>
                <img src="https://sun9-3.userapi.com/impg/gDQLu7KrwHautlI3HBakx1MolKUUuS0ixwpplg/6ix4hVDGdrE.jpg?size=1868x923&quality=96&sign=d02126939bbc0fba2029c3a6e076a2cb&type=album">
            </p>
        </div>
        <div>
            <h1 @click="showText4 = !showText4">ERR-диаграмма базы данных</h1>
            <p v-if="showText4" class="maintext">
                ERR-диаграмма базы данных онлайн кинотеатр<br>
                Рисунок представлен ниже
                <img src="https://sun9-51.userapi.com/impg/jgDFp_XPRIaahxAe_0guhFphGyNz2eOWJH7amg/B8cXW6rlCQo.jpg?size=916x738&quality=96&sign=ff90c79c055de9a376fa8d0b9f734c54&type=album">
            </p>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"

export default {
    name: "Info",
    components: {
        Navbar,
    },
    data() {
        return {
            showText1: false,
            showText2: false,
            showText3: false,
            showText4: false,
        }
    },
};
</script>

<style scoped>

h1{
    font-family:Georgia, 'Times New Roman', Times, serif;
    font-size: 36px;
    font-weight: bold;
    cursor:pointer;
    text-decoration: underline;
    color: #FF5733;
    text-align: center;
    text-shadow: 2px 2px 2px #000000;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-right:50px;
}

.maintext{
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-family:Georgia, 'Times New Roman', Times, serif;
    border: 1px solid #e6e6e6;
    color:darkorange;
    text-align: center;
    text-shadow: 2px 2px 2px #000000;
    font-size: 20px;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 20px;
}
</style>