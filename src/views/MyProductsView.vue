<template>
  <div class="container">
    <button
      type="button"
      class="btn btn-primary btn-nueva btn-lg float-right mt-2"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      <b>+</b> Add Product
    </button>
    <!-- Modal Add -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel">Add Product</h4>
            <button
              type="button"
              class="btn btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body bg-white">
            <form @submit.prevent="addProduct">
              <div class="form-group">
                <input
                  class="form-control my-1"
                  type="text"
                  placeholder="name"
                  aria-label="default input example"
                  v-model="product.name"
                />
                <input
                  class="form-control my-1"
                  type="number"
                  placeholder="Price"
                  aria-label="default input example"
                  v-model="product.price"
                />
                <input
                  class="form-control my-1"
                  type="file"
                  placeholder="Image"
                  accept=".jpg,.png"
                  @change="previewImage"
                  aria-label="default input example"
                />

                <textarea
                  class="form-control my-1"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Description"
                  v-model="product.description"
                ></textarea>

                <div class="alert alert-success" v-if="messageSuccess">
                  {{ messageSuccess }}
                </div>
                <button type="submit" class="btn btn-success">Add</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-borderless grocery-crud-table table-hover">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th style="min-width: 200px">Actions</th>
        </tr>
      </thead>
      <tbody v-for="item in myProducts" :key="item.name">
        <tr>
          <td><img :src="item.image" width="40" height="40" alt="" /></td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }} TND</td>
          <td>{{ item.description }}</td>
          <td>
            <a
              class="btn btn-default btn-outline-dark mx-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalU"
              href=""
              v-on:click="
                getData(
                  item.name,
                  item.price,
                  item.description,
                  item.image,
                  item.key
                )
              "
              >Update</a
            >
            <span
              class="btn btn-default btn-outline-danger"
              v-on:click="deleteProductAction(item.key)"
              >Delete</span
            >
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal Update -->
    <div
      class="modal fade"
      id="exampleModalU"
      tabindex="-1"
      aria-labelledby="exampleModalLabelU"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabelU">Update Product</h4>
            <button
              type="button"
              class="btn btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body bg-white">
            <form @submit.prevent="update">
              <div class="form-group">
                <input
                  class="form-control my-1"
                  type="text"
                  placeholder="name"
                  aria-label="default input example"
                  v-model="product.name"
                />
                <input
                  class="form-control my-1"
                  type="number"
                  placeholder="Price"
                  aria-label="default input example"
                  v-model="product.price"
                />
                <input
                  class="form-control my-1"
                  type="file"
                  placeholder="Image"
                  accept=".jpg,.png"
                  @change="previewImage"
                  aria-label="default input example"
                />

                <textarea
                  class="form-control my-1"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Description"
                  v-model="product.description"
                ></textarea>

                <div class="alert alert-success" v-if="messageUpdate">
                  {{ messageUpdate }}
                </div>
                <button type="submit" class="btn btn-success">Update</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import firebase from "../Firebase";
export default {
  name: "MyProductsView",
  data() {
    return {
      components: {},
      product: {
        name: "",
        price: 0,
        image: "",
        description: "",
        uid: localStorage.getItem("uidUser"),
      },
      messageSuccess: "",
      uploadValue: 0,
      picture: null,
      imageData: null,
      imageName: "",
      messageUpdate: "",
      ref: firebase.firestore().collection("products"),
      uid: localStorage.getItem("uidUser"),
    };
  },
  computed: {
    myProducts() {
      return this.$store.getters.getMyProducts;
    },
  },

  created() {
    this.getMyProductsAction();
  },
  methods: {
    ...mapActions([
      "getMyProductsAction",
      "deleteProductAction",
      "addProductAction",
      "updateProductAction",
    ]),

    addProduct() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`images/${this.imageName}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.product.image = url;
            this.addProductAction(this.product)
              .then(() => {
                this.messageSuccess = "Added";
              })
              .then(() => {
                this.product.name = "";
                this.product.price = "";
                this.product.image = "";
                this.product.description = "";
              });
          });
        }
      );
    },
    getData(name, price, description, image, key) {
      this.product.name = name;
      this.product.price = price;
      this.product.description = description;
      this.product.image = image;
      this.product.key = key;
    },
    update() {
      this.updateProductAction(this.product).then(() => {
        this.messageUpdate = "Updated";
        this.product.name = "";
        this.product.price = "";
        this.product.image = "";
        this.product.description = "";
      });
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
      this.imageName = event.target.files[0].name;
    },
  },
};
</script>
<style>
.title-box {
  padding: 3rem 1.5rem 2rem;
  text-align: center;
}

.btn-nueva {
  margin: 2px 0 14px 0;
}
</style>
