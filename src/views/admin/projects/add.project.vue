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
                                     <h2>Add Project</h2>
                                     
                                 </div>
                                 <div class="card-body text-center">
                                     <div class="alert alert-success" v-bind:class="{'d-none':!isSuccess}">{{successMessage}}</div>
                                     <form @submit="addProjects">
                                        <div class="form-group text-start">
                                         <label class="">Project Name</label>
                                         <input class="form-control" type="text" id="projectName" placeholder="Project Name" v-model="formValues.projectName" v-on:blur="isBlurred=true" v-bind:class="{'is-invalid':!isValid && isBlurred}"/>
                                         <div v:if="!isValid && isBlurred" class="text-start">
                                            <small class="text-danger" v-bind:class="{'d-none': isValid || !isBlurred}" >Please enter Project Name</small>
                                         </div>
                                        
                                        </div>
                                        <div class="form-group mt-3">
                                            <div class="row">
                                                <div class="col-6 text-start">
                                                    <label>Category Name</label>
                                                    <select id="category_id" class="form-select" v-model="formValues.categoryId">
                                                        <option value="">Select Category</option>
                                                        <option  v-for="(category,index) in categories" v-bind:key="index" :value="category._id">{{category.categoryName}}</option>
                                                    </select>
                                                </div>
                                                <div class="col-6 text-start">
                                                    <label>Authorization Number</label>
                                                    <input type="text" id="authorization_number" placeholder="authorization_number" class="form-control" v-model="formValues.authNumber" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group text-start mt-3">
                                            <label></label>
                                            <editor api-key="no-api-key" v-model="formValues.projectDesc" />
                                        </div>
                                        <div class="form-group text-start mt-3">
                                            <div class="row">
                                                <div class="col-6 text-start">
                                                    <label>Date Started</label>
                                                    <input type="date"  class="form-control" v-model="formValues.dateStarted"/>
                                                </div>
                                                <div class="col-6 text-start">
                                                    <label>Expected Date of Delivery</label>
                                                    <input type="date"  class="form-control" v-model="formValues.expectedDeliveryDate"/>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        <div class="form-group mt-3">
                                            <div class="row">
                                                <div class="col-6 text-start">
                                                    <label>Project Lead</label>
                                                    <input type="text" placeholder="Project Lead"  class="form-control" v-model="formValues.projectLead"/>
                                                </div>
                                                <div class="col-6 text-start">
                                                    <label>Committee Name</label>
                                                    <input type="text"  class="form-control" v-model="formValues.committeName"/>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        <div class="form-group mt-3">
                                            <div class="row">
                                                <div class="col-6 text-start">
                                                    <label>Location of the Project</label>
                                                    <input type="text" placeholder="Location"  class="form-control" v-model="formValues.projectLocation"/>
                                                </div>
                                                <div class="col-6 text-start">
                                                    <label>Address</label>
                                                    <input type="text"  class="form-control" v-model="formValues.address"/>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        <div class="form-group mt-3">
                                            <div class="row">
                                                <div class="col-6 text-start">
                                                    <label>Local Contact Person</label>
                                                    <input type="text" placeholder="Local Contact Person"  class="form-control" v-model="formValues.localContactPerson"/>
                                                </div>
                                                <div class="col-6 text-start">
                                                    <label>Local Contact Person Phone</label>
                                                    <input type="text"  class="form-control" v-model="formValues.localContactPhone"/>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        <div class="form-group mt-3">
                                            <div class="row">
                                                <div class="col-6 text-start">
                                                    <label>Local Contact Email</label>
                                                    <input type="text" placeholder="Local Contact Person"  class="form-control" v-model="formValues.localContactEmail" />
                                                </div>
                                                <div class="col-6 text-start">
                                                    <label>Upload Budget Document</label>
                                                    <input type="file"  class="form-control" v-on:change="uploadBudgetFile"/>
                                                    <input type="hidden" name="budgetPlan" v-model="formValues.budgetPlan" />
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        <div class="form-group mt-3">
                                            <div class="row">
                                                <div class="col-6 text-start">
                                                    <label>Upload Project Plan</label>
                                                    <input type="file"  class="form-control"/>
                                                    <input type="hidden" name="projectPlan" v-model="formValues.projectPlan" v-on:change="uploadProjectFile"/>
                                                </div>
                                                <div class="col-6 text-start">
                                                    <label>Upload Other Documents</label>
                                                    <input type="file"  class="form-control" />
                                                    <input type="hidden" name="otherDocs" v-model="formValues.otherDocs" v-on:change="uploadOtherFile"/>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        <div class="form-group mt-3">
                                            <div class="row">
                                                <div class="col-12">
                                                    <label>Upload Project Images</label>
                                                    <input type="file"  class="form-control" v-on:change="uploadImage" multiple/>
                                                    <input type="hidden" name="projectImages" v-model="formValues.projectImages" />
                                                </div>
                                            </div>
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
    import Editor from '@tinymce/tinymce-vue'
    
    export default {
        name:'AddProjects',
        components:{Header,Sidebar, 'editor': Editor},
        data(){
            return({
                isBlurred:false,
                formValues:{
                    projectName:'',
                    categoryId:'',
                    projectDesc:'',
                    authNumber:'',
                    dateStarted:'',
                    expectedDeliveryDate:'',
                    projectLead:'',
                    committeName:'',
                    projectLocation:'',
                    address:'',
                    localContactPerson:'',
                    localContactPhone:'',
                    localContactEmail:'',
                    budgetDoc:'',
                    projectPlan:'',
                    otherDocs:'',
                    projectImages:''
                },               
                admin:JSON.parse(localStorage.getItem('admin')),
                successMessage:'',
                errorMessage:'',
                isSuccess:false,
                isError:false,
                categories:[]
            }
                
            )
        },
        computed:{
            isValid(){
                return !!this.formValues.projectName
            }
        },
        mounted(){

            axios.get("http://52.66.202.99:8080/api/admin/category/list")
            .then(resp=>this.categories = resp.data.categories)
        },
        methods:{
            uploadImage(event){
                
                console.log(event.target.files);
                for (let i = 0; i < event.target.files.length; i++) {
                    const formData = new FormData();
                    formData.append('uploaded_file', event.target.files[i])
                    axios.post("http://52.66.202.99:8080/api/admin/upload",formData)
                    .then(resp=>{
                    console.log(resp.data.file);
                    
                    this.formValues.projectImages+='~'+resp.data.file.filename
                   
                    
                    })
                    .catch(err=>console.log(err))

                }
            },
            uploadBudgetFile(event){
                const formData = new FormData();
                formData.append('uploaded_file',event.target.files[0])
                //console.log()
                axios.post("http://52.66.202.99:8080/api/admin/upload",formData)
                .then(resp=>{
                    this.budgetDoc =resp.data.file.filename
                    //console.log(this.budgetDoc)
                })
                .catch(err=>console.log(err))
            },
            uploadProjectFile(event){
                const formData = new FormData();
                formData.append('uploaded_file',event.target.files[0])
                //console.log()
                axios.post("http://52.66.202.99:8080/api/admin/upload",formData)
                .then(resp=>{
                    this.projectPlan =resp.data.file.filename
                    //console.log(this.budgetDoc)
                })
                .catch(err=>console.log(err))
            },
            uploadOtherFile(event){
                const formData = new FormData();
                formData.append('uploaded_file',event.target.files[0])
                //console.log()
                axios.post("http://52.66.202.99:8080/api/admin/upload",formData)
                .then(resp=>{
                    this.otherDocs =resp.data.file.filename
                    //console.log(this.budgetDoc)
                })
                .catch(err=>console.log(err))
            },
            addProjects(event){
                event.preventDefault();
                axios.post("http://52.66.202.99:8080/api/admin/projects/create",this.formValues)
                .then(resp=>{
                    this.successMessage=resp.data.message
                    this.isSuccess=true
                }).catch(err=>console.log(err))
            }
        }
        
    }
</script>

<style scoped>

</style>