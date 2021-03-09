<template>
    <div class="about">
        <input type="button" @click="logoutHandle" name="submit" class="btn btn-danger btn-md" value="Logout">
        <h1>New Product</h1>
        <div class="card-body">
            <Loading :active.sync="isLoading" loader="dots" :is-full-page="fullPage"/>
            <form @submit.prevent="saveForm()">
                <div class="card mb-4">
                    <div class="card-header py-2 d-flex flex-row align-items-center justify-content-between"
                         style="background: #DBF5D1;">
                        <h6 class="m-0 text-dark">Form Submission</h6>
                        <router-link class="btn btn-secondary btn-sm" to="/about">
                            Back To List
                        </router-link>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label for="Title" class="col-sm-4">Title:</label>
                                    <div class="col-sm-8">
                                        <input type="text" name="Title" class="form-control"
                                               id="Title"
                                               v-model="laravelData.title">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group row">
                                    <label for="Title" class="col-sm-4">Price:</label>
                                    <div class="col-sm-8">
                                        <input type="text" name="price" class="form-control"
                                               id="price"
                                               v-model="laravelData.price">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group row">
                                    <label for="description" class="col-sm-3">Description:</label>
                                    <div class="col-sm-7">
                                        <textarea name="description" class="form-control"
                                                  id="description"
                                                  v-model="laravelData.description"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card mb-4">
                                    <div class="card-header py-1" style="background: #DBF5D1;">
                                        <h6 class="text-dark">Image</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="form-group row">
                                            <div class="col-md-6 col-sm-12">
                                                <div class="image-upload-wrap container">
                                                    <input class="file-upload-input" type='file'
                                                           ref="file"
                                                           accept="image/jpeg,image/jpg,image/png" laravelData.image>
                                                    <div class="drag-text">
                                                        <span>Add Image</span>
                                                        <br>
                                                        <img src="/pictures.png">
                                                        <br>
                                                        <span style="font-size: 16px;color:red">
                                                                          Image (*.jpeg,*.jpg,*.png)
                                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-sm-12">
                                                <img height="50%" width="40%"
                                                     v-bind:src="'http://localhost:8000/'+laravelData.image">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mt-5">
                                <button type="button" class="btn btn-sm float-left" id="closeBtn"
                                        @click="$router.go(-1)">
                                    close
                                </button>
                                <button type="button" class="btn btn-sm float-left" id="submit" @click="saveForm">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import AppAxios from "./../helpers/AppAxios";
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        name: 'Edit',
        data: function () {
            return {
                laravelData: {},
                file_path: '',
                fullPage: true,
                isLoading: false,
                actionUrl: '/api/product/'+this.$route.params.id
            }
        },
        components: {
            Loading
        },
        mounted() {
            this.getUserInfo();
           this.getResultsData()
        }, methods: {
            ...mapActions('user', ['getUserInfo', 'logout']),
            userName() {
                this.user_name = this.$store.state.user.userInfo.user.name;
            },
            logoutHandle() {
                this.logout();
            },
            saveForm() {
                // if(this.$route.params.id){
                //     this.actionUrl='/api/product/'+this.$route.params.id;
                // }else{
                this.file = this.$refs.file.files[0];console.log(this.laravelData.title);
                let formData = new FormData();
                formData.append('title', this.laravelData.title);
                if (this.file) {console.log(this.file);
                    formData.append('image', this.file);
                }
                formData.append('description', this.laravelData.description);
                formData.append('price', this.laravelData.price);
                AppAxios.header( {'Content-Type': 'application/x-www-form-urlencoded'}).put(this.actionUrl, formData)
                    .then(response => {
                        console.log(response.data.product);
                        this.laravelData = response.data.product;
                        // this.isLoading = false;
                    })
            },
            getResultsData() {
                AppAxios.header().get(this.actionUrl)
                    .then(response => {
                        console.log(response.data.product);
                        this.laravelData = response.data.product;
                        // this.isLoading = false;
                    })
            }
        },
        watch: {
            'laravelData.price': function () {
                // this.laravelData.price = this.laravelData.price.replace(/[^0-9.]/g, '');
            },
        },
    }

    import {mapActions} from "vuex";
</script>
<style>
    .image-upload-wrap {
        border: 2px dashed #DDDDDD;
        position: relative;
    }

    .image-upload-wrap:hover {
        background-color: #f1f1f1;
        border: 2px dashed #ccc;
    }

    .file-upload-input {
        position: absolute;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        outline: none;
        opacity: 0;
        cursor: pointer;
    }

    .drag-text {
        text-align: center;
    }
</style>