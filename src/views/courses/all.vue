<template>
  <div class="app-container">


    <el-row type="flex" justify="center">
      <el-card class="box-card" shadow="hover">

        <!-- card header -->
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="4">
              <el-row type="flex" align="middle">
                <span class="text" style="float: left;margin:3px"><b>课程列表</b></span>
              </el-row>
            </el-col>
            <el-col :span="20">
            </el-col>
          </el-row>
        </div>

        <!-- card body -->
        <div>
          <!-- 表格操作头部 -->
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="searchContent" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" @click="searchCourse">搜索</el-button>
            </el-col>
          </el-row>

          <!-- 课程列表 -->
          <el-table class="margin_top" :data="courseListData" border style="width: 100%" row-style="height:100px"
            v-loading="loading" @sort-change="sortChange" :default-sort="{prop: 'createCourseTime', order: 'descending'}">
            <el-table-column prop="id" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="courseName" label="课程名称" min-width="100px" align="center">
            </el-table-column>
            <el-table-column prop="imgUrl" label="图片" width="200" align="center">
              <template slot-scope="scope">
                <img class="radius" :src="scope.row.previewImg" alt="" width="70%">
              </template>
            </el-table-column>
            <el-table-column prop="isPutaway" label="是否上架" min-width="100" align="center">
              <template slot-scope="scope">
                <el-switch style="display: block" v-model="scope.row.putawayS" active-color="#13ce66" inactive-color="#ff4949"
                  active-text="" inactive-text="" @change="handlePutaway(scope.$index,scope.row)">
                </el-switch>
                <p></p>
              </template>
            </el-table-column>
            <el-table-column prop="isPutaway" label="推荐轮播" min-width="120" align="center">
              <template slot-scope="scope">
                <el-switch style="display: block" v-model="scope.row.homeBannerS" active-color="#13ce66" inactive-color="#ff4949"
                  active-text="" inactive-text="" @change="handleSendBanner(scope.$index,scope.row)">
                </el-switch>
                <p></p>
              </template>
            </el-table-column>
            <el-table-column prop="studyCount" label="多少人在学" min-width="100" align="center">
            </el-table-column>
            <el-table-column prop="createCourseTime" label="创建时间" min-width="120" align="center" sortable="custom">
            </el-table-column>

            <!-- todo 是否推荐至首页轮播 -->
            <!-- <el-table-column prop="isFree" label="是否推荐轮播" min-width="140" align="center">
        <template slot-scope="scope">
          <el-switch style="display: block" v-model="scope.row.isFree" active-color="#13ce66" inactive-color="#ff4949"
            active-text="" inactive-text="" @change="handleSendBanner(scope.$index,scope.row)">
          </el-switch>
          <p></p>
        </template>
      </el-table-column> -->
            <el-table-column label="操作" fixed="right" align="center" width="200" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-row type="flex" justify="center" class="margin_top">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change="pageChanage">
            </el-pagination>
          </el-row>

        </div>
      </el-card>
    </el-row>

  </div>
</template>

<script>
  import {
    getAllCourse
  } from '@/api/index'

  import {
    searchCourses
  } from '@/api/index'

  import {
    operateCourseIsBanner
  } from '@/api/index'


  export default {
    data() {
      return {
        loading: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        currentPage: 1,
        total: 20,
        size: 5,
        sort: 1,
        sortProp: 'createCourseTime',
        searchContent: '',
        courseListData: [],
      }
    },
    methods: {
      pageChanage(val) {
        this.currentPage = val;
        this.fetchCourses();
      },
      searchCourse() {
        // 点击课程搜索后
        if (this.searchContent == '') {
          this.fetchCourses();
          return;
        }
        this.loading = true;
        this.currentPage = 1;
        this.sortProp = 'createCourseTime';
        var params = {
          page: this.currentPage - 1,
          size: this.size,
          sort: this.sort,
          sortProp: this.sortProp,
          courseName: this.searchContent
        };
        searchCourses(params).then(resp => {
          this.loading = false;
          this.total = resp.data.count;
          this.courseListData = resp.data.courseList
        });
      },
      sortChange(column, prop, order) {
        // console.log("排序字段" + column.prop + "，顺序" + column.order)
        if (column.order == 'descending') {
          this.sort = 1;
        } else {
          this.sort = 0;
        }
        if (this.searchContent != '') {
          this.searchCourse();
        } else {
          this.fetchCourses();
        }
      },
      fetchCourses() {
        this.loading = true;
        // 默认以数据库id字段倒序排序
        var params = {
          page: this.currentPage - 1,
          size: 5,
          classify: 0,
          sort: this.sort,
          sortProp: this.sortProp
        }
        getAllCourse(params).then(resp => {
          this.loading = false;
          this.total = resp.data.count;
          this.courseListData = resp.data.courseList;
        })
      },
      handleEdit(index, rowData) {
        // row 点击编辑
        this.dialogFormVisible = true;
      },
      handleDelete(index, rowData) {
        // row 点击删除
        this.courseListData.splice(index, 1);
      },
      handlePutaway(index, rowData) {
        // row 点击发布
      },
      handleSendBanner(index, rowData) {
        // row 点击是否推荐至轮播
                // alert(rowData.homeBannerS)
        this.loading = true;
        var params = {
          courseId: rowData.dbId,
          isRecommend: rowData.homeBannerS
        };
        operateCourseIsBanner(params).then(resp => {
          this.loading = false;
          if(resp.code == 0){
            this.$message({
              message: resp.msg,
              type: 'success'
            });
          }else {
            rowData.homeBannerS = resp.data;
            this.$message({
              message: resp.msg,
              type: 'error'
            });
          }
        });
      }
    },
    mounted() {
      // 页面加载完成后
      this.fetchCourses()
    }
  };

</script>


<style>
  .box-card {
    width: 95%;
  }

  .text {
    font-size: 30px;
  }

  .cell {
    max-height: 120px !important;
    overflow: auto !important;
  }

  .opt_btn_margin {
    margin-top: 10px;
    padding: 0;
  }

  .margin_top {
    margin-top: 20px;
  }

  .radius {
    border-radius: 5px
  }

</style>
