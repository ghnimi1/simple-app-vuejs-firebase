<template>
  <div id="cards_landscape_wrap-2">
    <div class="row">
      <div
        class="col-xs-12 col-sm-6 col-md-4 col-lg-4"
        v-for="product in products"
        :key="product.name"
      >
        <RouterLink :to="`/${product.name}`">
          <div class="card-flyer">
            <div class="text-box">
              <div class="image-box">
                <img :src="product.image" alt="" />
              </div>
              <div class="text-container">
                <h6>{{ product.name }}</h6>
                <p>{{ product.price }} TND</p>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "ProductsView",
  components: {},
  computed: {
    products() {
      return this.$store.getters.getAllProducts;
    },
  },
  methods: {
    ...mapActions(["getAllProductAction"]),
  },
  created() {
    this.getAllProductAction();
  },
};
</script>
<style>
#cards_landscape_wrap-2 a {
  text-decoration: none;
  outline: none;
}
#cards_landscape_wrap-2 .card-flyer {
  border-radius: 5px;
}
#cards_landscape_wrap-2 .card-flyer .image-box {
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.5);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
#cards_landscape_wrap-2 .card-flyer .image-box img {
  -webkit-transition: all 0.9s ease;
  -moz-transition: all 0.9s ease;
  -o-transition: all 0.9s ease;
  -ms-transition: all 0.9s ease;
  width: 100%;
  height: 250px;
}
#cards_landscape_wrap-2 .card-flyer:hover .image-box img {
  opacity: 0.7;
  -webkit-transform: scale(1.15);
  -moz-transform: scale(1.15);
  -ms-transform: scale(1.15);
  -o-transform: scale(1.15);
  transform: scale(1.15);
}
#cards_landscape_wrap-2 .card-flyer .text-box {
  text-align: center;
  min-height: 400px;
}
#cards_landscape_wrap-2 .card-flyer .text-box .text-container {
  padding: 20px 10px;
}
#cards_landscape_wrap-2 .card-flyer {
  background: #ffffff;
  margin-top: 50px;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.4);
}
#cards_landscape_wrap-2 .card-flyer:hover {
  background: #fff;
  box-shadow: 0px 15px 26px rgba(0, 0, 0, 0.5);
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  margin-top: 50px;
}
#cards_landscape_wrap-2 .card-flyer .text-box p {
  margin-top: 10px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #000000;
}
#cards_landscape_wrap-2 .card-flyer .text-box h6 {
  margin-top: 0px;
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Roboto Black", sans-serif;
  letter-spacing: 1px;
  color: #00acc1;
}
</style>
