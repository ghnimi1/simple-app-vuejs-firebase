<template lang="">
  <div class="p-2">
    <router-link to="/">
      <button class="btn btn-outline-dark flex-shrink-0" type="button">
        <i class="bi-cart-fill me-1"></i>
        Back
      </button>
    </router-link>
    <h1 class="text-center">Product Details</h1>
  </div>
  <section class="container py-2">
    <div class="container px-4 px-lg-5 my-5">
      <div class="row gx-4 gx-lg-5 align-items-center">
        <div class="col-md-6">
          <img
            class="card-img-top mb-5 mb-md-0"
            :src="product.image"
            alt="..."
          />
        </div>
        <div class="col-md-6">
          <h1 class="display-5 fw-bolder">{{ product.name }}</h1>
          <div class="fs-5 mb-5">
            <span>{{ product.price }} TND</span>
          </div>
          <p class="lead">
            {{ product.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "ProductDetails",
  data: function () {
    return {
      productId: this.$route.params.name,
    };
  },
  computed: {
    product() {
      return this.$store.getters.getSingleProduct;
    },
  },
  methods: {
    ...mapActions(["getSingleProductAction"]),
  },
  created() {
    this.getSingleProductAction(this.productId);
  },
};
</script>
<style lang=""></style>
