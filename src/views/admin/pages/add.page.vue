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
                        <div class="col-9">
                             <div class="card shadow">
                                 <div class="card-header text-start bg-primary text-white">
                                     <h2>Add Page</h2>
                                     
                                 </div>
                                 <div class="card-body">
                                     <div class="alert alert-success" v-bind:class="{'d-none':!isSuccess}">{{successMessage}}</div>
                                     <form @submit="addPage">
                                        <div class="form-group">
                                         <input class="form-control" type="text" id="pageName" placeholder="Page Name" v-model="formValues.pageName" v-on:blur="isBlurred=true" v-bind:class="{'is-invalid':!isValid && isBlurred}"/>
                                         <div v:if="!isValid && isBlurred" class="text-start">
                                            <small class="text-danger" v-bind:class="{'d-none': isValid || !isBlurred}" >Please enter Category Name</small>
                                         </div>
                                        
                                        </div>
                                        <div class="form-group">
                                            <label>Upload Header Image</label>
                                            <input type="file"  class="form-control" v-on:change="uploadHeaderImage"/>
                                            <input type="hidden" name="pageHeaderImage" v-model="formValues.pageHeaderImage" />
                                        </div>
                                        <div class="form-group text-end mt-2">
                                            <button class="btn btn-primary">Submit</button>
                                        </div>
                                     </form>
                                     
                                 </div>
                             </div>
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
        name:'AddPage',
        components:{Header,Sidebar},
        data(){
            return({
                isBlurred:false,
                formValues:{
                    pageName:'',
                    pageHeaderImage:''
                },               
                admin:JSON.parse(localStorage.getItem('admin')),
                successMessage:'',
                errorMessage:'',
                isSuccess:false,
                isError:false
            }
                
            )
        },
        computed:{
            isValid(){
                return !!this.formValues.pageName
            }
        },
        methods:{
            addPage(event){
                event.preventDefault();
                axios.post("http://52.66.202.99:8080/api/admin/page/create",this.formValues)
                .then(resp=>{
                    this.successMessage=resp.data.message
                    this.isSuccess=true
                }).catch(err=>console.log(err))
            },
            uploadHeaderImage(event){
                const formData = new FormData();
                formData.append('uploaded_file',event.target.files[0])
                //console.log()
                axios.post("http://52.66.202.99:8080/api/admin/upload",formData)
                .then(resp=>{
                    this.pageHeaderImage =resp.data.file.filename
                    //console.log(this.budgetDoc)
                })
                .catch(err=>console.log(err))
            },
        }
        
    }
</script>

<style scoped>

</style>