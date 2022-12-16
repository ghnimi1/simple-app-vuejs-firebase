import firebase from '../Firebase';
import { createStore } from 'vuex'

export default createStore({
  state: {
    ref: firebase.firestore().collection("products"),
    products: [],
    user: null,
    myProducts: [],
    product: {},
    messageSuccess: "",
    uid: localStorage.getItem("uidUser"),
  },
  getters: {
    getAllProducts: (state) => {
      return state.products
    },
    getSingleProduct: (state) => {
      return state.product
    },
    getMyProducts: (state) => {
      return state.myProducts
    }
  },
  mutations: {
    setProducts(state, products) {
      return state.products = products;
    },
    setSingleProduct(state, product) {
      return state.product = product
    },
    setMyProducts(state, myProducts) {
      return state.myProducts = myProducts
    },
    deleteProduct(state, key) {
      return state.ref.doc(key).delete()
    },
    addProduct(state, product) {
      return state.ref.add(product)
    },
    updateProduct(state, product) {
      state.ref
        .doc(product.key)
        .update({
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
        })
    }
  },
  actions: {
    getAllProductAction({ commit }) {
      this.state.ref.onSnapshot((query) => {
        this.state.products = [];
        query.forEach((doc) => {
          commit('setProducts',
            this.state.products = [...this.state.products, ({
              key: doc.id,
              name: doc.data().name,
              description: doc.data().description,
              price: doc.data().price,
              image: doc.data().image,
            })])
        });
      });
    },
    getSingleProductAction({ commit }, productId) {
      this.state.ref.onSnapshot((query) => {
        query.forEach((doc) => {
          if (productId == doc.data().name) {
            commit('setSingleProduct', this.state.product = doc.data())
          }
        });
      });
    },
    getMyProductsAction({ commit }) {
      this.state.ref.onSnapshot((query) => {
        this.state.myProducts = [];
        query.forEach((doc) => {
          if (localStorage.getItem("uidUser") == doc.data().uid) {
            commit('setMyProducts', this.state.myProducts = [...this.state.myProducts, {
              key: doc.id,
              name: doc.data().name,
              description: doc.data().description,
              price: doc.data().price,
              image: doc.data().image,
            }])
          }
        });
      });
    },
    deleteProductAction({ commit }, key) {
      commit('deleteProduct', key);
    },
    addProductAction({ commit }, product) {
      commit('addProduct', product)
    },
    updateProductAction({ commit }, product) {
      commit('updateProduct', product)
    }

  },
  modules: {
  },
  methods: {

  },
})
