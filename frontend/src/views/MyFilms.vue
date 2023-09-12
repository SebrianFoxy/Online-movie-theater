<template>
    <div class="MyFilmsMenu">
        <MyFilmsMenu />
    </div>
</template>

<script>
// @ is an alias to /src
import MyFilmsMenu from "@/components/MyFilmsMenu.vue";

export default {
    name: "MyFilms",
    components: {
        MyFilmsMenu,
    },
};
</script>
