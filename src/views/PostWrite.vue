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

                            <div id="image_box">
                                <input type="hidden" face="attach" name="mode" value="post_attach" disabled="">
                                <input type="hidden" face="attach" name="kind" value="flash_bg" disabled="">
                                <input type="hidden" face="attach" name="handler" value="image_box.draw" disabled="">
                                <dl>
                                    <dt id="image_box_list">

                                    </dt>
                                </dl>
                            </div>
                            <div class="help_bg" style="margin-top:5px">
                                <ul class="help_ul tip">
                                    <li><b class="tip2">3D회전형</b> 이미지 권장 크기 : <b class="tip2">400 × 285</b></li>
                                    <li><b class="tip2">2D회전형</b> 이미지 권장 크기 : <b class="tip2">500 × 320</b></li>
                                    <li>그외 이미지 모션들은 <b class="tip2">메인 비쥬얼 크기</b>에 맞춰 등록하시면 됩니다.</li>
                                </ul>
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
                    el: this.$refs.tuiEditor,
                    previewStyle: 'vertical',
                    initialEditType: 'markdown',
                    hideModeSwitch: false,
                    height: '500px',
                    hooks: {
                        addImageBlobHook: this.addImageBlobHook.bind(this)
                    },
                    minHeight: "400px",
                    language: "ko_KR",
                    exts: [
                        "table", "colorSyntax", "scrollSync"
                    ]
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
                images: [],
                imageBoxTemplate: `<div id="{:id:}" onmouseover="this.classList.add('hover');" onmouseout="this.classList.remove('hover');"><img src="{:url:}" align=""></div>`
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
            onEditorLoad() {
                // implement your code
            },
            onEditorFocus() {
                // implement your code
            },
            onEditorBlur() {
                this.imageExtract();
            },
            onEditorChange() {
                //this.imageInit();
            },
            onEditorStateChange() {
                // implement your code
               // console.log("sss");
            },
/*            binaryStringToArrayBuffer(binary) {
                let length = binary.length;
                let buf = new ArrayBuffer(length);
                let arr = new Uint8Array(buf);
                for(let i=0; i<length; i++) {
                    arr[i] = binary.charCodeAt(i);
                }
                return buf;
            },
            base64StringToBlob(base64) {
                if(!base64.match(/data:([^;]+)/)) return false;

                let type = base64.match(/data:([^;]+)/)[1];
                base64 = base64.replace(/^[^,]+,/g, '');
                let options = {};
                if (type) {
                    options.type = type;
                }
                let binaryArrayBuffer = [ this.binaryStringToArrayBuffer(window.atob(base64)) ];
                return new Blob(binaryArrayBuffer, options);
            },
            saveImage(base64Image, imageName) {

                let base64StringToBlob = this.base64StringToBlob(base64Image);
                if(!base64StringToBlob) return false;

                let createdFile = new File([base64StringToBlob], imageName, {
                    type: base64StringToBlob.type,
                });

                this.$api.saveImage(createdFile).then(response => {
                    this.model.content = this.model.content.replace(base64Image, response.data);
                    this.images.push({
                        id: response.data.substr(response.data.lastIndexOf('/') + 1),
                        url: response.data
                    });

                    this.imageBoxDraw();
                }).catch(e => {
                    console.log(e);
                })
            },

            imageInit() {
                this.model.content = this.$refs.tuiEditor.invoke('getHtml');

                let image;
                let images = [];
                let rex = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*alt=[\"']?([^>\"']+)[\"']?[^>]>/g;

                while (image = rex.exec(this.model.content)) {
                    images.push({
                        src: image[1],
                        alt: image[2]
                    });
                }

                let len = images.length;
                if(len > 0) {
                    let k = 0;
                    for (; k < len ; k++) {
                        this.saveImage(images[k].src, images[k].alt);
                    }
                }
            },*/
            addImageBlobHook: function(blob, callback) {

                this.$api.saveImage(blob).then(response => {
                    this.images.push({
                        id: response.data.substr(response.data.lastIndexOf('/') + 1),
                        url: response.data
                    });
                    this.imageBoxDraw();
                    callback(response.data, '');
                }).catch(e => {
                    console.log(e);
                })

            },
            imageExtract() {
                //this.model.content = this.$refs.tuiEditor.invoke('getHtml');

                let rex = /!\[*.*\(*\/images\/\d{0,}/gi;
                let image;
                let images = [];
                while ((image = rex.exec(this.$refs.tuiEditor.invoke('getMarkdown'))) !== null) {
                    images.push(image[0]);
                }

                console.log(images)
            },
            imageBoxDraw() {
                let len = this.images.length;
                if(len > 0) {
                    let imageBoxHtml = '';
                    let k = 0;
                    for (; k < len ; k++) {
                        let imageBoxTemplateReplace = this.imageBoxTemplate.replace("{:id:}", this.images[k].id);
                        imageBoxTemplateReplace = imageBoxTemplateReplace.replace("{:url:}", this.images[k].url);
                        imageBoxHtml += imageBoxTemplateReplace;
                    }
                    document.getElementById("image_box_list").innerHTML = imageBoxHtml;
                }
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
                let len = targetArray.length;
                for (; k < len ; k++ ) {

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
<style>
    #image_box dt {
        height: 215px;
        *height: 225px;
        text-align: left;
        overflow-y: scroll;
        border: 1px #cecece solid;
        background-color: #eee;
        padding: 4px;
        scrollbar-highlight-color: #CCCCCC;
        scrollbar-shadow-color: #CCCCCC;
        scrollbar-arrow-color: #AAAAAA;
        scrollbar-face-color: #F4F3F0;
        scrollbar-3dlight-color: #FFFFFF;
        scrollbar-darkshadow-color: #FFFFFF;
        scrollbar-track-color: #FFFFFF;
    }

    .help_bg, td.help_bg {
        border: 1px solid #eccbb1;
        background-color: #faf3ee;
        padding: 10px;
    }

    #image_box dt div {
        width: 106px;
        height: 100px;
        border: 1px #ddd dotted;
        background-color: white;
        float: left;
        margin: 3px;
        cursor: pointer;
    }

    #image_box dt div.hover {
        border: 1px #00ccff solid;
        background-color: #00ccff;
    }

    #image_box dt div img {
        width: 94px;
        height: 88px;
        border: 0;
        margin: 6px;
    }
</style>
