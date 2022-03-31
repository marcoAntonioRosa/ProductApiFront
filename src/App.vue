<template>
  <div class="container d-grid gap-4">
    <div class="card mt-4">
      <div class="card-body">
        <form class="row g-3" @submit.prevent="saveOrUpdate">
          <div class="col-12">
            <label for="inputName" class="form-label">Name</label>
            <input type="text" class="form-control" id="inputName" v-model="productForm.name">
          </div>
          <div class="col-12">
            <label for="inputDescription" class="form-label">Description</label>
            <input type="text" class="form-control" id="inputDescription" v-model="productForm.description">
          </div>
          <div class="col-md-6">
            <label for="inputSourceSku" class="form-label">Source Sku</label>
            <input type="text" class="form-control" id="inputSourceSku" v-model="productForm.sourceSku">
          </div>
          <div class="col-md-6">
            <label for="inputDestionationSku" class="form-label">Destination Sku</label>
            <input type="text" class="form-control" id="inputDestionationSku" v-model="productForm.destinationSku">
          </div>
          <div class="col-md-6">
            <label for="inputStock" class="form-label">Stock</label>
            <input type="text" class="form-control" id="inputStock" v-model="productForm.stock">
          </div>
          <div class="col-md-6">
            <label for="inputPrice" class="form-label">Price</label>
            <input type="text" class="form-control" id="inputPrice" v-model="productForm.price">
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Source</th>
              <th scope="col">Destination</th>
              <th scope="col">Stock</th>
              <th scope="col">Price</th>
              <th class="text-center" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody v-for="product of productsArray" :key="product.id">
            <tr>
              <th scope="row">{{ product.id }}</th>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.sourceSku }}</td>
              <td>{{ product.destinationSku }}</td>
              <td>{{ product.stock }}</td>
              <td>{{ product.price }}</td>
              <td class="d-grid gap-2 d-md-flex justify-content-md-center">
                <button @click="editItem(product)" class="btn btn-primary btn-sm" type="button"><i class="bi bi-pencil"></i></button>
                <button @click="deleteItem(product.id)" class="btn btn-danger btn-sm me-md-2" type="button"><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
</template>

<script>

  import Product from './services/products'

  export default {

    data() {
      return {
        productForm: {
          id: '',
          name: '',
          description: '',
          sourceSku: '',
          destinationSku: '',
          stock: '',
          price: '',
        },

        productsArray: []
      }
    },

    mounted() {
      this.productForm = {}
      this.list()
    },

    methods: {

      list() {
          Product.list().then(res => {
          this.productsArray = res.data;
        })
      },

      saveOrUpdate() {
        console.log('id', this.productForm.id)
        if (!this.productForm.id)
          this.save()
        else
          this.update()
      },

      save() {
        Product.save(this.productForm).then(res => {
          this.productForm = {}
          this.productsArray.push(res.data);
        })
      },

      update() {
        Product.update(this.productForm).then(
          this.productForm = {}
        )
      },

      editItem(product) {
        this.productForm = product
      },

      deleteItem(productId) {
        Product.delete(productId).then(
          this.productsArray.splice(this.productsArray.indexOf(productId), 1)
        )
      }
      
    }

  }

</script>

<style>

</style>
