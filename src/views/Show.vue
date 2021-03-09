<template>
    <div class="about">
        <input type="button" @click="logoutHandle" name="submit" class="btn btn-danger btn-md" value="Logout">
        <h1>{{laravelData.title}}</h1>
        <div class="card mb-4">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                       Details: {{laravelData.description}}
                    </div>
                    <div class="col-md-6">
                        Price: {{laravelData.price}}
                    </div>
                    <div class="col-md-12">
                        <img height="50%" width="40%" v-bind:src="'http://localhost:8000/'+laravelData.image">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mt-5">
                <button type="button" class="btn btn-sm float-left" id="closeBtn" @click="$router.go(-1)">
                    close
                </button>
                <router-link
                             :to="{ path: '/edit/'+laravelData.id}"
                             class="btn btn-sm btn-info float-right">
                    <i class="fa fa-edit"></i> Edit
                </router-link>
            </div>
        </div>

    </div>
</template>

<script>
    import AppAxios from "./../helpers/AppAxios";

    export default {
        name: 'Show',
        data: function () {
            return {
                laravelData: {},
                fullPage: true,
                isLoading: false
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
                AppAxios.header().get('/api/product/'+this.$route.params.id)
                    .then(response => {
                        console.log(response.data.product);
                        this.laravelData = response.data.product;
                        // this.isLoading = false;
                    })
            },
        }
    }

    import {mapActions} from "vuex";
</script>