<template>
    <div class="container">
   <div class="row justify-content-center mt-5">
     <div class="col-lg-4 col-md-6 col-sm-6">
       <div class="card shadow">
         <div class="card-title text-center border-bottom">
           <h2 class="p-3">Register</h2>
         </div>
         <div class="card-body">
           <form @submit.prevent="registerUser">
            <div class="mb-4">
               <input type="text" placeholder="Enter your full name" 
               class="form-control" id="fullname" v-model="user.fullName" />
             </div>
             <div class="mb-4">
               <input type="email" placeholder="Enter your email"
                class="form-control" id="email" v-model="user.email"/>
             </div>
             <div class="mb-4">
               <input type="password" placeholder="Enter your password" 
               class="form-control" id="password" v-model="user.password"/>
             </div>
             <div class="d-grid">
               <button type="submit" class="btn text-light main-bg">Register</button>
             </div>
           </form>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>
<script>
import firebase from '../Firebase'
import router from '../router'
export default {
    name:'RegisterView',
    data(){
      return {
        user:{
          fullName:'',
          email:'',
          password:'',
          uid:''
        },
      ref:firebase.firestore().collection('users')
      }
    },
    methods:{
      registerUser(){
        firebase.auth().createUserWithEmailAndPassword(this.user.email,this.user.password).then((dataUser)=>{
          this.ref.add({
            fullName:this.user.fullName,
            email:this.user.email,
            uid:dataUser.user.uid
          })
          router.push({
            name:'HomeView'
          })
        })
      }
    }
}
</script>
