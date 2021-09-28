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
                        <div class="col-4">
                              <div class="card bg-primary">
                                    
                              </div>
                        </div>
                    </div>
                    
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '../../components/admin/common/Sidebar.vue'
import Header from '../../components/admin/common/Header.vue';
    export default {
  components: { Sidebar,Header },
        name:"Dashboard",
        data(){
            return({
                admin:JSON.parse(localStorage.getItem('admin'))
            })
        }
    }
</script>

<style scoped>
  h2{
    font-family: 'Oxygen', sans-serif;
  }

</style>