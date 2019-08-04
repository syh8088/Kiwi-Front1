<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="postResponses">
        <template slot="columns">
          <th>No.</th>
          <th>title</th>
          <th>category</th>
          <th>tag</th>
          <th>create</th>
          <th>update</th>
          <th>sate</th>
        </template>

        <template slot-scope="{row}">

          <th class="budget">
            {{row.postNo}}
          </th>

          <td scope="row">
            <div class="media align-items-center">
<!--              <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.img">
              </a>-->
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
          </td>

          <td scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.category.name}}</span>
              </div>
            </div>
          </td>

          <td>
            <div class="avatar-group">
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Ryan Tompson">
                <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg">
              </a>
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Romina Hadid">
                <img alt="Image placeholder" src="img/theme/team-2-800x800.jpg">
              </a>
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Alexander Smith">
                <img alt="Image placeholder" src="img/theme/team-3-800x800.jpg">
              </a>
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Jessica Doe">
                <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg">
              </a>
            </div>
          </td>

          <td scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.createdAt}}</span>
              </div>
            </div>
          </td>

          <td scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.updatedAt}}</span>
              </div>
            </div>
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown" position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v">{{row.useYn}}</i>
              </a>

              <template>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end" :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total="totalSize"></base-pagination>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'posts-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        totalSize: 0,
        postResponses: [
          {
            img: 'img/theme/bootstrap.jpg',
            title: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
          {
            img: 'img/theme/angular.jpg',
            title: 'Angular Now UI Kit PRO',
            budget: '$1800 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'img/theme/sketch.jpg',
            title: 'Black Dashboard',
            budget: '$3150 USD',
            status: 'delayed',
            statusType: 'danger',
            completion: 72
          },
          {
            img: 'img/theme/react.jpg',
            title: 'React Material Dashboard',
            budget: '$4400 USD',
            status: 'on schedule',
            statusType: 'info',
            completion: 90
          },
          {
            img: 'img/theme/vue.jpg',
            title: 'Vue Paper UI Kit PRO',
            budget: '$2200 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          }
        ]
      }
    },
    created() {

      let data = {
        sort: "DESC",
        order: "categoryNo",
        offset: 1,
        limit: 10
      };

      this.$api.getPosts(data).then(response => {
        if(response.status === 200 || response.status === 204) {
          this.postResponses = response.data.postResponses;
          this.totalSize = response.data.size;
          console.log(response.data);
        }

      }).catch(e => {
        console.log(e);
      });

    },
  }
</script>
<style>
</style>
