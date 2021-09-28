<template>
    <div>
        <Header v-bind:title="admin.admin.name"/>
        <div class="container-fluid">
            
            <div class="row">
                <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <Sidebar/>
                </nav>
                <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">
                    <div class="row">
                        <div class="col-3"></div>
                        <div class="col-9 text-end">
                            <router-link class="btn btn-primary" :to="{name:'Add Category'}">Add Category</router-link>
                        </div>
                    </div>
                    <div class="row" v-if="!responseAvailable">
                        <div class="col-3"></div>
                        <div class="col-9 text-center">
                            <div class="loader" >Loading...</div>
                        </div>
                    </div>
                    
                    <div class="row" v-if="responseAvailable">
                        <div class="col-3"></div>
                        <div class="col-9">
                             <table class="table">
                                 <thead>
                                     <tr>
                                         <th>#</th>
                                         <th>Category Name</th>
                                         <th>Action</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     <tr v-for="(category,index) in categories" v-bind:key="index">
                                         <td>{{index+1}}</td>
                                         <td>{{category.categoryName}}</td>
                                         <td>
                                            <router-link :to="{name:'Edit Category',params:{id:category._id}}" ><i class="fas fa-edit"></i></router-link> &nbsp;
                                            <a href="" v-on:click="DeleteCategory(category._id,index)"><i class="fas fa-trash-alt"></i></a>
                                         </td>
                                     </tr>
                                 </tbody>
                             </table>
                        </div>
                    </div>
                    
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../../../components/admin/common/Header.vue'
    import Sidebar from '../../../components/admin/common/Sidebar.vue'
    import axios from 'axios'
    export default {
        name:'ListCategory',
        components:{ Header, Sidebar},
        data(){
            return({
                categories:[],
                responseAvailable:false,
                deleteMessage:'',
                admin:JSON.parse(localStorage.getItem('admin'))
            })
            
        },
       methods:{
        DeleteCategory(id,index) {

                if(confirm("Do you really want to delete?")){

                            axios.delete('http://52.66.202.99:8080/api/admin/category/delete/'+id)
                            .then(resp => {
                                this.deleteMessage = resp.data.message
                                this.categories.data.splice(index, 1);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                            alert('aa');
                }
            },
       },
        mounted(){
            axios.get("http://52.66.202.99:8080/api/admin/category/list")
                .then(response=>{
                    
                    this.categories = response.data.categories
                    this.responseAvailable=true;
                })
                .catch(err=>{
                    console.log(err)
                })
                    
                
        }
    }
</script>

<style scoped>
  
</style>