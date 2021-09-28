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
                                     <h2>Edit Page Content</h2>
                                     
                                 </div>
                                 <div class="card-body">
                                     <div class="alert alert-success" v-bind:class="{'d-none':!isSuccess}">{{successMessage}}</div>
                                     <form @submit="addPageContent">
                                        <input type="hidden" name="contentId" v-model="formValues.contentId"/>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <select class="form-select" name="contentType" v-model="formValues.contentType">
                                                        <option value="">Select Content Type</option>
                                                        <option value="slider"  >Slider</option>
                                                        <option value="content_box_image">Content Box with Image</option>
                                                        <option value="content_box_without_image">Content Box without Image</option>
                                                    
                                                    </select>
                                                    
                                        
                                                </div>
                                                
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <select id="category_id" class="form-select" v-model="formValues.pageId">
                                                        <option value="">Select Page</option>
                                                        <option  v-for="(page,index) in pages" v-bind:key="index" :value="page._id">{{page.pageName}}</option>
                                                    </select>
                                                    
                                        
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <input class="form-control" type="text" id="sectionName" placeholder="Section Name " v-model="formValues.sectionName"/>
                                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <input class="form-control" type="text" id="usercontentID" placeholder="Content ID must be unique" v-model="formValues.usercontentID"/>
                                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <input class="form-control" type="text" id="contentHeading" placeholder="Content Heading" v-model="formValues.contentHeading"/>
                                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <input class="form-control" type="text" id="contentSubHeading" placeholder="Content Sub Heading" v-model="formValues.contentSubHeading" />
                                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group text-start mt-3">
                                                    <label></label>
                                                    <editor api-key="no-api-key" v-model="formValues.contentDescription" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group text-start">
                                                    <label>Upload Content Image</label>
                                                    <input type="file"  class="form-control" v-on:change="uploadImage" multiple/>
                                                    <input type="hidden" name="contentImage" v-model="formValues.contentImage" />
                                                    <div v-if="!!formValues.contentImage">
                                                        <img v-for="(pic,index) in pics" v-bind:key="index"  :src="`http://52.66.202.99:8080/${pic}`" style="width:20%"/>
                                                    </div>
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
    import Editor from '@tinymce/tinymce-vue'
    import axios from 'axios'
    export default {
        name:'AddPageContent',
        components:{Header,Sidebar,'editor': Editor},
        data(){
            return({
                isBlurred:false,
                pages:[],
                pics:[],
                formValues:{
                    contentId:'',
                    contentType:'',
                    pageId:'',
                    sectionName:'',
                    usercontentID:'',
                    contentHeading:'',
                    contentSubHeading:'',
                    contentImage:'',
                    contentDescription:'',
                   
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
            addPageContent(event){
                console.log(this.formValues)
                axios.put("http://52.66.202.99:8080/api/admin/pagecontent/update",this.formValues)
                .then(resp=>{
                    this.successMessage=resp.data.message
                    this.isSuccess=true
                }).catch(err=>console.log(err))
                event.preventDefault();
            },
            uploadImage(event){
                
                console.log(event.target.files);
                for (let i = 0; i < event.target.files.length; i++) {
                    const formData = new FormData();
                    formData.append('uploaded_file', event.target.files[i])
                    axios.post("http://52.66.202.99:8080/api/admin/upload",formData)
                    .then(resp=>{
                    console.log(resp.data.file);
                    
                    //this.pageHeaderImage =resp.data.file.filename
                    //console.log(this.budgetDoc)
                    this.formValues.contentImage+='~'+resp.data.file.filename
                    //console.log(this.contentImage)
                    
                    })
                    .catch(err=>console.log(err))

                }
                
                
                
                
            },
        },
        mounted(){

            axios.get("http://52.66.202.99:8080/api/admin/page/list")
            .then(resp=>this.pages = resp.data.pages)
            const id = this.$route.params.id;
            axios.get("http://52.66.202.99:8080/api/admin/pagecontent/getbyid/"+id)
            .then(resp=>{
                console.log(resp);
                this.formValues.contentId=resp.data.content._id
                this.formValues.contentType=resp.data.content.contentType
                this.formValues.pageId=resp.data.content.pageId
                this.formValues.sectionName=resp.data.content.sectionName
                this.formValues.usercontentID=resp.data.content.usercontentID
                this.formValues.contentHeading=resp.data.content.contentHeading
                this.formValues.contentSubHeading=resp.data.content.contentSubHeading
                this.formValues.contentDescription=resp.data.content.contentDescription
                this.formValues.contentImage=resp.data.content.contentImage
                this.pics=this.formValues.contentImage.split('~');
                this.pics = this.pics.filter(pic=>pic!=='')
            }).catch(err=>{
                console.log(err)
            })
        }
        
    }
   
</script>

<style scoped>

</style>