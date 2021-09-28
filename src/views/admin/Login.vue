<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-6 mx-auto login-box">
                    <div class="card mt-3 shadow card-sharp">
                        <div class="card-header bg-dark text-white ">
                            <h2>IDI Admin Login</h2>
                            
                        </div>
                        <div class="card-body bg-box-light">
                            <div>
                            <div class="alert alert-danger" v-bind:class="{'d-none':!isError}">{{errMsg.message}}</div>
                            </div>
                            <form @submit="submitForm">
                                <div class="form-group mt-3">

                                    <input  type="text" name="email" id="email" v-model="formValues.email" v-bind:class="{'form-control':true,'is-invalid' : !emailValid && emailBlured}" v-on:blur=" emailBlured=true " />
                                    <div v:if="!emailValid && emailBlured" class="text-start">
                                        <small v:if="!emailValid && emailBlured" v-bind:class="{'d-none':emailValid || !emailBlured,'text-danger':true}">Please enter email</small>
                                    </div>
                                    
                                    
                                </div>
                                <div class="form-group mt-3">
                                    <input class="form-control" type="password" name="password" id="password" v-model="formValues.password"  v-bind:class="{'form-control':true,'is-invalid':!passwordValid && passwordBlured}" v-on:blur="passwordBlured=true"/>
                                    <div v:if="!passwordValid && passwordBlured" class="text-start">
                                        <small v-bind:class="{'d-none':passwordValid || !passwordBlured,'text-danger':true}">Please enter Password</small>
                                    </div>
                                    
                                </div>
                                <div class="form-group mt-3 text-end">
                                    <button class="btn btn-primary-new text-bold" :disabled="isDisabled">Login Now</button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
   
    //import config from '../../config/config.json'
    export default {
        name: 'Login',
        data(){
            return{
                valid:true,
                emailBlured:false,
                passwordBlured:false,
                formValues:{
                    email:'',
                    password:''
                },
                isError:false,
                errMsg:''
            }
        },
        computed:{
            emailValid() {
                return !!this.formValues.email
            },
            passwordValid(){
               return !!this.formValues.password 
            },
            isDisabled(){
                return !this.formValues.email && !this.formValues.password
            }
            
        },
        methods:{
            submitForm(event){
                event.preventDefault();
                
                axios.post("http://52.66.202.99:8080/api/auth/login",this.formValues)
                .then(response=>{
                    console.log(response)
                    localStorage.setItem('token',response.data.token);
                    localStorage.setItem('admin',JSON.stringify(response.data.admin));
                    
                    this.$router.push({ path: 'dashboard' })
                    
                })
                .catch(err=>{
                    this.isError = true
                    this.errMsg = err.response.data
                });

                //console.log('Form values',this.formValues);
            },
           
        }

    }
</script>

<style scoped>
    .login-box{
        margin-top:20%;
    }
    .bg-dark{
        background:#0d036825;
    }
    .bg-box-light{
        background: #d8d8d825;
    }
    .card-sharp{
        border-radius: 0!important;
    }
    .btn-primary-new{
        background:#19181d25!important; 
        border:1px solid #19181d25!important
    }
</style>