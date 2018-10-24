<template>
  <div>

    <!-- 表格操作头部 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input v-model="searchContent" placeholder="请输入内容" @keyup.enter.native="searchCourse"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="searchCourse">搜索</el-button>
      </el-col>
      <el-col :span="8">

      </el-col>
    </el-row>

    <!-- 表格体 -->
    <!-- 课程列表 -->
    <el-table class="margin_top" :data="courseData" style="width: 100%" row-style="height:100px" v-loading="tableLoading"
      @sort-change="sortChange" :default-sort="{prop: 'createCourseTime', order: 'descending'}"
      @row-click="courseItemClick">
      <el-table-column prop="id" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="imgUrl" label="图片" width="200" align="center">
        <template slot-scope="scope">
          <img class="radius" :src="scope.row.previewImg" alt="" width="70%">
        </template>
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称" min-width="100px" align="center">
      </el-table-column>
      <el-table-column prop="courseDesc" label="课程简介" min-width="100px" align="center">
      </el-table-column>
      <el-table-column prop="level" label="课程级别" min-width="100px" align="center">
      </el-table-column>
      <el-table-column prop="studyCount" label="学习人数" min-width="100px" align="center">
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row type="flex" justify="center" class="margin_top">
      <el-pagination background layout="prev, pager, next" :total="pagination.total" :page-size="pagination.size"
        @current-change="pageChanage">
      </el-pagination>
    </el-row>

  </div>
</template>

<script>
  import {
    getAllCourse,
    searchCourses
  } from '@/api/index'

  export default {
    name: 'CourseList',
    /**
     * 生命周期 created
     */
    created() {},
    /**
     * 生命周期 mounted
     */
    mounted() {
      this.fetchAllCourseData();
    },
    data() {
      return {
        bottomText: '章节管理',
        tableLoading: false,
        pagination: {
          currentPage: 1,
          total: 20,
          size: 5
        },
        sort: {
          // 0正序 1倒序
          type: 0,
          Prop: 'none',
        },
        searchContent: '',
        courseData: [],
      }
    },
    methods: {
      /**
       * 获取所有课程
       */
      fetchAllCourseData() {
        this.tableLoading = true;
        // 定义参数
        var params = {
          page: this.pagination.currentPage - 1,
          size: this.pagination.size,
          classify: 0,
          sort: this.sort.type,
          sortProp: this.sort.Prop
        }
        getAllCourse(params).then(resp => {
          this.tableLoading = false;
          this.courseData = resp.data.courseList
        });
      },
      /**
       * 点击分页回调
       */
      pageChanage(val) {
        this.pagination.currentPage = val;
        this.fetchAllCourseData();
      },
      /**
       * 搜索课程
       */
      searchCourse() {
        // 点击课程搜索后
        if (this.searchContent == '') {
          this.fetchAllCourseData()
          return;
        }
        this.pagination.currentPage = 1
        this.sort.type = 0
        this.sort.Prop = 'none'
        var params = {
          page: this.pagination.currentPage - 1,
          size: this.pagination.size,
          sort: this.sort.type,
          sortProp: this.sort.Prop,
          courseName: this.searchContent
        };
        this.tableLoading = true
        searchCourses(params).then(resp => {
          this.tableLoading = false;
          if (resp.code == 0) {
            this.pagination.total = resp.data.count;
            this.courseData = resp.data.courseList
          } else {
            this.$message({
              message: resp.msg,
              type: 'error'
            })
          }
        });
      },
      /**
       * 课程列表item被点击
       */
      courseItemClick(row, event, column) {
        // 这里暂定直接跳转章节编辑页面
        // 后期如果作为公用组件，抽象为跳转目标页面
        this.$router.push({
          path: '/sections/main/' + row.dbId + '?courseName=' + row.courseName
        })
      }
    }
  }

</script>

<style>
  .margin_top {
    margin-top: 20px;
  }

  .radius {
    border-radius: 5px
  }

  .bottomTips {
    padding: 30px;
  }

  .test {
    height: 40px;
    vertical-align: middle;
  }

</style>
