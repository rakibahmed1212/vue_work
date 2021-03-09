<template>
    <div class="container">
        <div id="login-row" class="row justify-content-center align-items-center">
            <Loading :active.sync="isLoading" loader="dots" :is-full-page="fullPage"/>
            <div id="login-column" class="col-md-6">
                <div id="login-box" class="col-md-12">
                    <form id="login-form" class="form">
                        <h3 class="text-center text-info">Login</h3>
                        <div class="form-group">
                            <label for="email" class="text-info">Email:</label><br>
                            <input type="text" name="email" id="email" class="form-control" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password" class="text-info">Password:</label><br>
                            <input type="text" name="password" id="password" class="form-control" v-model="password">
                        </div>
                        <div class="form-group">
                            <input type="button" @click="submitlogin" name="submit" class="btn btn-info btn-md" value="submit">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AppAxios from "./../helpers/AppAxios";
    import {mapActions, mapState} from 'vuex'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        name: 'Home',
        computed: {
            ...mapState('user', ['userInfo'])
        },
        components: {
            Loading
        },
        data: function () {
            return {
                email: '',
                password: '',
                fullPage: true,
                isLoading: false
            }
        }, mounted() {
            console.log(localStorage.getItem('_userToken'));
        },
        methods: {
            ...mapActions('user', ['getUserInfo']),
            submitlogin() {
                this.isLoading = true;
                AppAxios.header()
                    .post('/api/login', ({
                        'email': this.email,
                        'password': this.password
                    }))
                    .then((resp) => {
                        if(resp.data.status==200){
                            localStorage.setItem('_userToken', resp.data.access_token);
                            this.getUserInfo();
                            setTimeout(() => {
                                this.redirection();
                                this.isLoading = false;
                            }, 2000);
                        }else{
                          return  window.location = '/';
                        }
                        this.isLoading = false;
                    }).catch((error) => {
                    console.log(error)
                    this.isLoading = false;
                    return  window.location = '/';
                });
            },
            redirection() {
                console.log('here-1');
                return  window.location = '/about'
            }
        }
    }
</script>