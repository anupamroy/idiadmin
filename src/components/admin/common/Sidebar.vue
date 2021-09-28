<template>
    <div>
        <div class="position-sticky pt-md-5">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active text-start" aria-current="page" href="#">
                    <i class="fas fa-chart-line"></i> &nbsp;
                    <span class="ml-2">Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-start" :to="{name:'List Category'}">
                    <i class="fas fa-stream"></i>&nbsp;
                    <span class="ml-2">Categories</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-start" :to="{name:'List Members'}">
                    <i class="fas fa-users"></i>&nbsp;
                    <span class="ml-2">Members</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-start" :to="{name:'List Projects'}">
                    <i class="fas fa-place-of-worship"></i>&nbsp;
                    <span class="ml-2">Projects</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-start" :to="{name:'List Page'}">
                    <i class="far fa-file-alt"></i>&nbsp;
                    <span class="ml-2">Pages</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-start" :to="{name:'List Page Content'}">
                    <i class="fas fa-newspaper"></i>&nbsp;
                    <span class="ml-2">Contents</span>
                    </router-link>
                </li>
                
                <li class="nav-item">
                    <router-link class="nav-link text-start" :to="{name:'List Collection'}">
                    <i class="fas fa-dollar-sign"></i>&nbsp;
                    <span class="ml-2">Collections</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-start" href="#">
                    <i class="fas fa-user"></i>&nbsp;
                    <span class="ml-2">Users</span>
                    </a>
                </li>
                </ul>
            </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>