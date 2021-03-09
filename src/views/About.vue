<template>
    <div class="about">
        <input type="button" @click="logoutHandle" name="submit" class="btn btn-danger btn-md" value="Logout">
        <h1>This is an about page</h1>
        <router-link class="btn btn-info btn-sm" to="/new"><i class="fa fa-plus" aria-hidden="true"></i>
            New
        </router-link>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Descreption</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, index) in laravelData" v-bind:key="row.id">
                <th scope="row">{{index+1}}</th>
                <td>{{row.title}}</td>
                <td>{{row.description}}</td>
                <td>{{row.price}}</td>
                <td><img height="10%" width="20%" v-bind:src="'http://localhost:8000/'+row.image"></td>
                <td><router-link class="dropdown-item" :to="{ path: '/show/'+ row.id}">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Open
                </router-link></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import AppAxios from "./../helpers/AppAxios";

    export default {
        name: 'About',
        data: function () {
            return {
                laravelData: {},
                fullPage: true,
                isLoading: false,
            }
        },
        mounted() {
            this.getUserInfo();
            this.getResults();
        }, methods: {
            ...mapActions('user', ['getUserInfo', 'logout']),
            userName() {
                this.user_name = this.$store.state.user.userInfo.user.name;
            },
            logoutHandle() {
                this.logout();
            },
            getResults() {
                AppAxios.header().get('/api/product')
                    .then(response => {
                        console.log(response.data.products);
                        this.laravelData = response.data.products;
                        // this.isLoading = false;
                    })
            },
        }
    }

    import {mapActions} from "vuex";
</script>