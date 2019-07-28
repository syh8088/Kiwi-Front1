<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-red"
                                sub-title="350,897"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-orange"
                                sub-title="2,356"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Sales"
                                type="gradient-green"
                                sub-title="924"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Performance"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">Category</h3>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-3">
                                    <Tree :data="categoriesData" draggable="draggable" cross-tree="cross-tree">
                                        <div :data-_id="data._id" :data-no="data.categoryNo" :data-name="data.name" :data-hierarchicalOrder="data.hierarchicalOrder" @click="click" @dblclick="dblclick" slot-scope="{data, store}">
                                            <template v-if="!data.isDragPlaceHolder">
                                                <b v-if="data.children &amp;&amp; data.children.length" @click="store.toggleOpen(data)">
                                                    {{data.open ? '-' : '+'}}&nbsp;
                                                </b>
                                                <span>{{data.name}}</span>
                                            </template>
                                        </div>
                                    </Tree>
                                    <div class="mt-2">
                                        <button class="btn btn-primary" @click="add">Add</button>
                                        <button class="btn btn-primary" @click="remove">Remove</button>
                                        <button class="btn btn-primary" @click="save">저장</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="resist-frame" style="display: none; position: absolute; width: 400px; background-color: white; border: 1px solid black; padding: 10px; z-index: 2; top: 50%; left: 50%; margin-top: 86.5px; margin-left: -211px;">
            <!--<div style="float:right;width:10px;margin-top:-5px"><a onclick="">×</a></div>-->
            <form id="save_form" name="save_form" onsubmit="return false">
                <input type="hidden" id="_id" name="_id" value="">
                <input type="hidden" id="categoryNo" name="categoryNo" value="">
                <input type="hidden" id="hierarchicalOrder" name="hierarchicalOrder" value="">
                <table width="100%" align="center" cellpadding="5" cellspacing="0" border="1" bordercolor="#dedede" class="table1" style="table-layout:fixed">
                    <colgroup>
                        <col width="134">
                        <col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td class="gray_bg"><img src=""> 카테고리 이름</td>
                            <td>
                                <input type="text" id="name" name="name" size="25" maxlength="25" class="simpleform" onkeyup="">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div style="text-align:center;margin-top:10px">
                <div class="mt-2">
                    <button class="btn btn-primary" @click="nameModify">저장</button>
                    <button class="btn btn-primary" @click="close">창닫기</button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import Vue from 'vue'
    import {DraggableTree} from 'vue-draggable-nested-tree'
    Vue.use(DraggableTree);

    export default {
        directives: {
    },
    data() {
        return {
            totalCount: 0,
            seletedId: null,
            saveCategoryRequests: [],
            categoriesData: [
    /*                {categoryNo: 1, name: 'node 1', displayOrder: 1, hierarchicalOrder: 1},
                {categoryNo: 2, name: 'node 2', displayOrder: 2, hierarchicalOrder: 1},
                {categoryNo: 3, name: 'node 3', displayOrder: 3, hierarchicalOrder: 1},
                {categoryNo: 4, name: 'node 4', displayOrder: 4, hierarchicalOrder: 2},
                {categoryNo: 5, name: 'node 5', displayOrder: 5, hierarchicalOrder: 2},
                {categoryNo: 6, name: 'node 6', displayOrder: 6, hierarchicalOrder: 2},
                {categoryNo: 7, name: 'node 7', displayOrder: 7, hierarchicalOrder: 2},
                {categoryNo: 8, name: 'node 8', displayOrder: 8, hierarchicalOrder: 2},*/


         /*       {categoryNo: 3, name: 'node 3', displayOrder: 3, hierarchicalOrder: 1},
                {categoryNo: 2, name: 'node 2', displayOrder: 2, hierarchicalOrder: 1, children: [
                        {categoryNo: 9, name: 'node 2_2', displayOrder: 2},
                        {categoryNo: 10, name: 'node 2_1', displayOrder: 1, children: [
                                {categoryNo: 11, name: 'node 2_1_2', displayOrder: 2},
                                {categoryNo: 12, name: 'node 2_1_1', displayOrder: 1},
                                {categoryNo: 13, name: 'node 2_1_3', displayOrder: 3},
                                {categoryNo: 14, name: 'node 2_1_4', displayOrder: 4},
                            ]},
                    ]},
                {categoryNo: 1, name: 'node 1', displayOrder: 1, hierarchicalOrder: 1},
                {categoryNo: 8, name: 'node 8', displayOrder: 8, hierarchicalOrder: 2},
                {categoryNo: 5, name: 'node 5', displayOrder: 5, hierarchicalOrder: 2},
                {categoryNo: 4, name: 'node 4', displayOrder: 4, hierarchicalOrder: 2},
                {categoryNo: 7, name: 'node 7', displayOrder: 7, hierarchicalOrder: 2},
                {categoryNo: 6, name: 'node 6', displayOrder: 6, hierarchicalOrder: 2},*/
            ]
        };
    },
    components: {
      Tree: DraggableTree
    },
    mounted() {

    },
    created() {

        this.$api.getCategories().then(response => {
            console.log(response);
            if(response.status === 200 || response.status === 204) {
                this.categoriesData = response.data.categoryResponses;
            }

        }).catch(e => {
            console.log(e);
        });

        this.categoriesDataSort(this.categoriesData);
    },
    methods: {
        add() {
            this.setTotalCount(this.categoriesData);
            this.categoriesData.push({categoryNo: 0, name: '새로운 카테고리_' + parseInt(this.totalCount + 1)  + "번째"});

        },
        remove() {
            if(!this.seletedId) alert("카테고리를 선택해주세요.");
            this.removeCategory(this.categoriesData);
            this.seletedId = null;
            console.log(this.categoriesData);
        },
        removeCategory(categoriesData) {
            let k = 0;
            for (; k < categoriesData.length ; k++ ) {

                if(categoriesData[k]._id === this.seletedId) {
                    categoriesData.splice(k, 1);
                    return true;
                }

                if(categoriesData[k].children !== undefined && categoriesData[k].children.length > 0) this.removeCategory(categoriesData[k].children);

            }
        },
        setDisplayOrder(categoriesData) {

            let k = 0;
            for (; k < categoriesData.length ; k++ ) {
                categoriesData[k].displayOrder = parseInt(k + 1);
                if(categoriesData[k].children !== undefined && categoriesData[k].children.length > 0) this.setDisplayOrder(categoriesData[k].children);
            }
        },
        setTotalCount(categoriesData, rootCategory = true) {

            if(rootCategory) this.totalCount = 0;

            let k = 0;
            for (; k < categoriesData.length ; k++ ) {
                this.totalCount ++;
                if(categoriesData[k].children !== undefined && categoriesData[k].children.length > 0) this.setTotalCount(categoriesData[k].children, false);
            }

        },
        click(el) {
            if(this.seletedId) {
                document.querySelector("#" + this.seletedId).firstElementChild.style.background= ""
            }

            this.seletedId = el.currentTarget.getAttribute("data-_id");
            document.querySelector("#" + this.seletedId).firstElementChild.style.background= "#d6e3f1"
        },
        dblclick(el) {
            this.$common.blind().draw();

            let _id = el.currentTarget.getAttribute("data-_id");
            let categoryNo = el.currentTarget.getAttribute("data-no");
            let categoryName = el.currentTarget.getAttribute("data-name");
            let hierarchicalOrder = el.currentTarget.getAttribute("data-hierarchicalOrder");

            document.getElementById("_id").value = _id;
            document.getElementById("categoryNo").value = categoryNo;
            document.getElementById("name").value = categoryName;
            document.getElementById("hierarchicalOrder").value = hierarchicalOrder;

            document.getElementById("resist-frame").style.display = 'block';

        },
        nameModify() {
            let _id = document.getElementById("_id").value;
            let categoryNo = document.getElementById("categoryNo").value;
            let categoryName = document.getElementById("name").value;
            let hierarchicalOrder = document.getElementById("hierarchicalOrder").value;

            this.changeCategoryName(this.categoriesData, _id, categoryNo, categoryName);
            this.close();
        },
        changeCategoryName(targetArray, target_id, targetCategoryNo, targetCategoryName) {
            targetArray.forEach((category, index) => {
                if(category._id === target_id) {
                    targetArray[index].name = targetCategoryName;
                    return true;
                }
                if(targetArray[index].children !== undefined && targetArray[index].children.length > 0) this.changeCategoryName(targetArray[index].children, target_id, targetCategoryNo, targetCategoryName);
            });
        },
        close() {
            this.$common.blind().remove();
            document.getElementById("resist-frame").style.display = 'none';
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
        createSaveCategoryRequests(categoriesData, saveCategoryRequests) {

            let k = 0;
            for (; k < categoriesData.length ; k++ ) {

                saveCategoryRequests[k] = {
                    categoryNo: categoriesData[k].categoryNo,
                    name: categoriesData[k].name,
                    displayOrder: categoriesData[k].displayOrder
                };

                if(categoriesData[k].children !== undefined && categoriesData[k].children.length > 0) {
                    saveCategoryRequests[k].children = [];
                    this.createSaveCategoryRequests(categoriesData[k].children, saveCategoryRequests[k].children);
                }
            }

        },
        save() {

            this.saveCategoryRequests = [];

            this.setDisplayOrder(this.categoriesData);
            this.createSaveCategoryRequests(this.categoriesData, this.saveCategoryRequests);
            console.log(this.saveCategoryRequests);

            let data = {
                'categoryRequests': this.saveCategoryRequests
            };

            this.$api.saveCategories(data).then(response => {
                console.log(response);
                if(response.status === 200 || response.status === 204) {

                }

            }).catch(e => {
                console.log(e);
            });
/*            {
                "categoryRequests": [
                    {
                        "categoryNo": 0,
                        "name": "string",
                        "displayOrder": 0,
                        "childrenCategoryRequests": [
                            null
                        ]
                    }
                ],
                    "removedCategoryNos": [
                    0
                ],
                    "moveCategoryNos": [
                    {
                        "destinationCategoryNo": 0,
                        "previousCategoryNo": 0
                    }
                ]
            }*/
        }
    }
  };
</script>
<style>
    .he-tree{
        border: 1px solid #ccc;
        padding: 20px;
    }
    .tree-node{
    }
    .tree-node-inner{
        padding: 5px;
        border: 1px solid #ccc;
        cursor: pointer;
    }
    .draggable-placeholder{
    }
    .draggable-placeholder-inner{
        border: 1px dashed #0088F8;
        box-sizing: border-box;
        background: rgba(0, 136, 249, 0.09);
        color: #0088f9;
        text-align: center;
        padding: 0;
        display: flex;
        align-items: center;
    }
</style>
