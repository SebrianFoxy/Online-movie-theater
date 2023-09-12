<template>
  <div class="AddFilm">
    <AddProduct />
  </div>
</template>

<script>
// @ is an alias to /src
import AddProduct from "@/components/AddProduct.vue";

export default {
  name: "AddFilm",
  components: {
    AddProduct,
  },
};
</script>
