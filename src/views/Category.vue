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
                                    <Tree :data="tree2data" draggable="draggable" cross-tree="cross-tree">
                                        <div @dblclick="dblclick" slot-scope="{data, store}">
                                            <template v-if="!data.isDragPlaceHolder"><b v-if="data.children &amp;&amp; data.children.length" @click="store.toggleOpen(data)">{{data.open ? '-' : '+'}}&nbsp;</b><span>{{data.text}}</span></template>
                                        </div>
                                    </Tree>
                                    <div class="mt-2">
                                        <button class="btn btn-primary" @click="add">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="regist_frame" style="position: absolute; width: 400px; background-color: white; border: 1px solid black; padding: 10px; z-index: 2; top: 50%; left: 50%; margin-top: 86.5px; margin-left: -211px;">
            <div style="float:right;width:10px;margin-top:-5px"><a onclick="">×</a></div>
            <form id="save_form" name="save_form" onsubmit="return false">
                <input type="hidden" id="no" name="no" value="">
                <input type="hidden" id="depth" name="depth" value="">
                <table width="100%" align="center" cellpadding="5" cellspacing="0" border="1" bordercolor="#dedede" class="table1" style="table-layout:fixed">
                    <colgroup>
                        <col width="134">
                        <col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td class="gray_bg"><img src=""> 카테고리 이름</td>
                            <td>
                                <input type="text" id="item" name="item" size="25" maxlength="25" class="simpleform" onkeyup="">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div style="text-align:center;margin-top:10px">
                <div class="mt-2">
                    <button class="btn btn-primary" @click="add">저장</button>
                    <button class="btn btn-primary" @click="add">창닫기</button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip'
  import {DraggableTree} from 'vue-draggable-nested-tree'
  Vue.use(VueClipboard)
  Vue.use(DraggableTree)
  export default {
    directives: {
      'b-tooltip': BTooltipDirective
    },
    data() {
        return {
            tree2data: [
                {text: 'node 1'},
                {text: 'node 2'},
                {text: 'node 3'},
                {text: 'node 4'},
            ]
        };
    },
      components: {
          Tree: DraggableTree
      },
    methods: {
        // add child to tree2
        add() {
            console.log(this.tree2data);
            this.tree2data.push({text: 'chi1123123123ld'})
        },
        dblclick(el) {
            console.log(el);
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
