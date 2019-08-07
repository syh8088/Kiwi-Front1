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


                        <h6 class="heading-small text-muted mb-4">Contact information</h6>
                        <div class="pl-lg-4">

                            <div class="row">
                                <div class="col-lg-4">
                                    <base-dropdown
                                            class="nav-item"
                                            position="left"
                                            label="category"
                                            placeholder="category"
                                            v-model="model.category"
                                    >
                                        <div class="media align-items-center" slot="title">
                                            <div class="media-body ml-2 d-none d-lg-block">
                                                <span class="mb-0 text-sm  font-weight-bold">category 선택</span>
                                            </div>
                                        </div>
                                        <a class="dropdown-item" v-for="(category) in subCategoriesData" @click.prevent="toggleDropDown(category)">{{category.name}}</a>
                                    </base-dropdown>


                                </div>

                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <base-input alternative=""
                                                label="title"
                                                placeholder="title"
                                                input-classes="form-control-alternative"
                                                v-model="model.title"
                                    />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                         <!--           <base-input alternative=""
                                                label="tag"
                                                placeholder="tag"
                                                input-classes="form-control-alternative"
                                                v-model="model.tag"
                                    />-->
                                    <vue-tags-input
                                            :autocomplete-items="filteredTags"
                                            v-model="tag"
                                            :tags="model.tags"
                                            @tags-changed="update"
                                    />
                                </div>
                            </div>
                        </div>
                        <hr class="my-4" />
                        <!-- Description -->
                        <h6 class="heading-small text-muted mb-4">content</h6>
                        <div class="pl-lg-4">
                            <div class="form-group">
                                <base-input alternative="" label="content">
                                    <editor
                                            previewStyle="vertical"
                                            v-model="model.content"
                                            :options="editorOptions"
                                            @load="onEditorLoad"
                                            @focus="onEditorFocus"
                                            @blur="onEditorBlur"
                                            @change="onEditorChange"
                                            @stateChange="onEditorStateChange"
                                            ref="tuiEditor"
                                    />
                                </base-input>
                            </div>
                        </div>

                        <div class="mt-2">
                            <button class="btn btn-primary" @click="savePost">저장</button>
                        </div>
                    </form>
                </template>
            </card>

        </div>
    </div>
</template>
<script>
    import 'tui-editor/dist/tui-editor.css'
    import 'tui-editor/dist/tui-editor-contents.css'
    import 'codemirror/lib/codemirror.css'
    import { Editor } from '@toast-ui/vue-editor'
    import VueTagsInput from '@johmun/vue-tags-input'

    export default {
        components: {
            'editor': Editor,
            VueTagsInput
        },
        name: 'post-write',
        data() {
            return {
                editorOptions: {
                    hideModeSwitch: true
                },
                model: {
                    postNo: 0,
                    title: '',
                    tags: [],
                    categoryNo: 0,
                    content: ''
                },
                categoriesData: [],
                subCategoriesData: [],
                tag: '',
                tags: [],
                autocompleteItems: [],
                debounce: null,
            }
        },
        watch: {
            'tag': 'initTags'
        },
        computed: {
            filteredTags() {
                return this.autocompleteItems.filter(i => {
                    return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
                });
            },
        },
        created() {
            this.model.postNo = Number(this.$route.query.postNo) || 0;

            if(this.model.postNo) {
                this.getPost();
            }

            this.$api.getCategories().then(response => {
                if(response.status === 200 || response.status === 204) {
                    this.categoriesData = response.data.categoryResponses;

                    this.categoriesDataSort(this.categoriesData);
                    this.setCategoriesOneArray(this.categoriesData, true);
                    console.log(this.subCategoriesData);
                }

            }).catch(e => {
                console.log(e);
            });

        },
        methods: {
            scroll() {
                this.$refs.tuiEditor.invoke('scrollTop', 10);

            },
            moveTop() {
                this.$refs.tuiEditor.invoke('moveCursorToStart');
            },
            getHtml() {
                let html = this.$refs.tuiEditor.invoke('getHtml');

                let m;
                let urls = [];
                let rex = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g;

                while ( m = rex.exec( html ) ) {
                    urls.push( m[1] );
                }

             //   console.log( html.match(/(src.*)(?=\salt)/g));
                console.log( urls );


            },
            onEditorLoad() {
                // implement your code

            },
            onEditorFocus() {
                // implement your code
            },
            onEditorBlur() {
                // implement your code

            },
            onEditorChange(el) {
                // implement your code
                console.log(el);
                this.getHtml();
            },
            onEditorStateChange() {
                // implement your code

            },
            binaryStringToArrayBuffer(binary) {
                let length = binary.length;
                let buf = new ArrayBuffer(length);
                let arr = new Uint8Array(buf);
                for(let i=0; i<length; i++) {
                    arr[i] = binary.charCodeAt(i);
                }
                return buf;
            },
            base64StringToBlob(base64) {
                let type = base64.match(/data:([^;]+)/)[1];
                base64 = base64.replace(/^[^,]+,/g, '');
                let options = {};
                if (type) {
                    options.type = type;
                }
                let binaryArrayBuffer = [ this.binaryStringToArrayBuffer(window.atob(base64)) ];
                return new Blob(binaryArrayBuffer, options);
            },
            getPost() {
                this.$api.getPost(this.model.postNo).then(response => {
                    if(response.status === 200 || response.status === 204) {

                        this.model.title = response.data.title;
                        //this.model.tags = response.data.tags;
                        this.model.categoryNo = response.data.category.categoryNo;
                        this.model.content = response.data.content;

                        this.model.tags = response.data.tags.map(a => {
                            return { text: a.name };
                        });

                        console.log(response.data);
                    }

                }).catch(e => {
                    console.log(e);
                });
            },
            savePost() {
                console.log(this.model.title);
                console.log(this.model.categoryNo);
                console.log(this.model.postNo);
                console.log(this.model.content);
                console.log(this.model.tags);

                if(!this.model.title || !this.model.content || this.model.categoryNo === 0 || this.model.tags.length <= 0) {
                    alert("유효성 검사 ERROR");
                    return false;
                }

                this.model.tags = this.model.tags.map(a => {
                    return { name: a.text };
                });

                let data = {
                    "postNo": this.model.postNo,
                    "title": this.model.title,
                    "content": this.model.content,
                    "categoryNo": this.model.categoryNo,
                    "tags": this.model.tags
                };

                this.$api.savePost(data).then(response => {
                    if(response.status === 200 || response.status === 204) {
                        alert("성공적으로 저장되었습니다.");
                    }

                }).catch(e => {
                    console.log(e);
                });

            },
            update(newTags) {
                this.autocompleteItems = [];
                this.model.tags = newTags;
            },
            initTags() {

                if (this.tag.length < 2) return;

                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {

                    this.$api.getTags().then(response => {
                        if(response.status === 200 || response.status === 204) {
                            this.autocompleteItems = response.data.tagResponses.map(a => {
                                return { text: a.name };
                            });
                        }
                    }).catch(() => console.warn('Oh. Something went wrong'));

                }, 600);
            },
            getTags() {
                this.$api.getTags().then(response => {
                    if(response.status === 200 || response.status === 204) {
                        this.tagResponses = response.data.tagResponses;
                    }

                }).catch(e => {
                    console.log(e);
                });
            },
            toggleDropDown(category) {
              this.model.categoryNo = category.categoryNo;
            },
            setCategoriesOneArray(targetArray, rootParent, rootCount) {

                rootCount = rootCount + 1 || 1;

                let k = 0;
                for (; k < targetArray.length ; k++ ) {

                    this.subCategoriesData.push(targetArray[k]);
                    if(!rootParent) {
                        let subCategoriesCount = this.subCategoriesData.length;
                        this.subCategoriesData[subCategoriesCount - 1].name = this.categoryChildrenLabel(rootCount) + targetArray[k].name
                    }

                    if(targetArray[k].children !== undefined && targetArray[k].children.length > 0) this.setCategoriesOneArray(targetArray[k].children, false, rootCount)
                }

            },
            categoryChildrenLabel(rootCount) {

                let categoryChildrenLabel = "";

                let k = 0;
                for (; k < rootCount - 1 ; k++ ) {
                    categoryChildrenLabel = categoryChildrenLabel + "- "
                }

                return categoryChildrenLabel;
            },
            categoriesDataSort(targetArray) {
                this.categoriesDataSortByDisplayOrder(targetArray);
                targetArray.forEach((category, index) => {
                    if(targetArray[index].children !== undefined && targetArray[index].children.length > 0) this.categoriesDataSort(targetArray[index].children);
                });
            },
            categoriesDataSortByDisplayOrder(targetArray) {

                if (targetArray === null || targetArray === undefined) {
                    return false;
                }

                targetArray.sort(function (a, b) {
                    return a.displayOrder < b.displayOrder ? -1 : a.displayOrder > b.displayOrder ? 1 : 0;
                });
            },
        }


    };

</script>
<style></style>
