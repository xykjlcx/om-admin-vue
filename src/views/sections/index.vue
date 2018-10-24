<template>
  <div class="app-container">
    <el-row type="flex" justify="center">
      <el-card class="box-card" shadow="hover">
        <!-- card header -->
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">
              <el-row type="flex" align="middle">
                <!-- <span class="text" style="float: left;margin:3px"><b>章节管理</b></span> -->
                <span> ( 点击课程列表项，进入<b>章节编辑</b>,😘 ) </span>
              </el-row>
            </el-col>
            <el-col :span="4">
            </el-col>
          </el-row>
        </div>

        <!-- 内容 -->
        <div>
          <course-list></course-list>
        </div>

      </el-card>
    </el-row>
  </div>
</template>


<script>
  import CourseList from './CourseList/index.vue'

  export default {
    name: 'Section',
    components: {
      CourseList
    }
  }

</script>

<style>
  .box-card {
    width: 95%;
  }

  .cell {
    max-height: 120px !important;
    overflow: auto !important;
  }

  .text {
    font-size: 30px;
  }

</style>
