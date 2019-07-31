<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Hello Jesse</h1>
                        <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
                        <a href="#!" class="btn btn-info">Edit profile</a>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <card shadow type="secondary">
                <div slot="header" class="bg-white border-0">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h3 class="mb-0">My account</h3>
                        </div>
                        <div class="col-4 text-right">
                            <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                        </div>
                    </div>
                </div>
                <template>
                    <form @submit.prevent>

                        <!-- Address -->
                        <h6 class="heading-small text-muted mb-4">Contact information</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-md-12">
                                    <base-input alternative=""
                                                label="title"
                                                placeholder="title"
                                                input-classes="form-control-alternative"
                                                v-model="model.address"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <base-input alternative=""
                                                label="category"
                                                placeholder="category"
                                                input-classes="form-control-alternative"
                                                v-model="model.city"
                                    />
                                </div>

                            </div>
                        </div>
                        <hr class="my-4" />
                        <!-- Description -->
                        <h6 class="heading-small text-muted mb-4">content</h6>
                        <div class="pl-lg-4">
                            <div class="form-group">
                                <base-input alternative=""
                                            label="content">
                                    <textarea rows="4" class="form-control form-control-alternative" placeholder="content">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>

                                    <div id="editor">
                                        <textarea :value="input" @input="update"></textarea>
                                        <div v-html="compiledMarkdown"></div>
                                    </div>

                                </base-input>
                            </div>
                        </div>
                    </form>
                </template>
            </card>

        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    Vue({
        el: '#editor',
        data: {
            input: '# hello'
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.input, { sanitize: true })
            }
        },
        methods: {
            update: _.debounce(function (e) {
                this.input = e.target.value
            }, 300)
        }
    });

  export default {
    name: 'user-profile',
    data() {
      return {
        model: {
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          zipCode: '',
          about: '',
        }
      }
    },
  };
</script>
<style></style>
