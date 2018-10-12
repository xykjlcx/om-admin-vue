<template>
  <div class="app-container">
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
    <el-table class="table_top" :data="courseListData" border style="width: 100%" row-style="height:100px" v-loading="loading">
      <el-table-column fixed="" prop="id" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称" min-width="150px" align="center">
      </el-table-column>
      <el-table-column prop="level" label="级别" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="duration" label="时长" min-width="100" align="center">
      </el-table-column>
      <!-- todo 是否上架 -->
      <el-table-column prop="isFree" label="是否上架" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isFree === 0 ? 'primary' : 'success'" disable-transitions>
            {{ scope.row.isFree == 0 ? '免费' : '收费' }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- todo 是否推荐至首页轮播 -->
      <el-table-column prop="isFree" label="是否推荐轮播" min-width="140" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isFree === 0 ? 'primary' : 'success'" disable-transitions>
            {{ scope.row.isFree == 0 ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="imgUrl" label="图片" width="200" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt="" width="80%">
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="240" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-row>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </el-row>
          <el-row class="opt_btn_margin">
            <el-button size="mini" type="primary" @click="handlePublish(scope.$index, scope.row)">发布</el-button>
            <el-button size="mini" type="success" @click="handleSendBanner(scope.$index, scope.row)">推荐轮播</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <el-pagination background layout="prev, pager, next" :total="100" page-size="20" @current-change="abc">
      </el-pagination>
    </el-row>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchContent: '',
        courseListData: [{
            "id": 12,
            "courseName": "ReactNative基础与入门",
            "courseDesc": "本教程会让你认识什么是ReactNative，如何在Mac、Windows下搭建ReactNative应用开发环境，如何构建官方example项目，让你先敲React Native的大门，然后在基础篇教你认识什么是ReactNative组件以及组件的生命周期，然后让你学会导入导出项目，props，status,ref,类等的使用，接着让你明白ES6与ES5的不同以及学会ReactNative应用UI界面布局的必备知识。最后是进阶篇，教你React Native按钮使用技巧、图片加载技巧以及React Native调试技巧，这些内容学完后，专门为大家准备了真正的实战项目，让大家全面掌握React Native技术。实战课程《ReactNative开发跨平台GitHub App》http://coding.imooc.com/learn/list/89.html",
            "classifyId": 15,
            "duration": "28：43",
            "level": "中级",
            "imgUrl": "https://img2.sycdn.imooc.com/szimg/5b5835a60001907e05400300.jpg",
            "videoUrl": "http://pevcw8o7e.bkt.clouddn.com//ziwojieshao/ziwo.mp4",
            "isFree": 0,
            "price": 23,
            "count": 1
          },
          {
            "id": 6,
            "courseName": "PhpStorm的基本应用",
            "courseDesc": "PhpStorm是PHP集成开发工具，能提高我们的开发效率，提供智能代码补全，快速导航以及即时错误检查。",
            "classifyId": 11,
            "duration": "60：00",
            "level": "初级",
            "imgUrl": "https://img3.mukewang.com/5b69142c0001d10705400300-240-135.jpg",
            "videoUrl": "http://pevcw8o7e.bkt.clouddn.com//video/Jass/testV.mp4",
            "isFree": 1,
            "price": 36,
            "count": 1
          },
          {
            "id": 3,
            "courseName": "vue2.5入门",
            "courseDesc": "对于很多刚接触Vue的同学，最难做到的就是编程思路的切换，这门课程，我们将通过形象的例子给大家讲解Vue的基础语法及编程思路，带大家快速的上手Vue的基础开发，这门课也包含了关于组件话和vue-cli等内容的基础讲解。",
            "classifyId": 8,
            "duration": "19:36",
            "level": "中级",
            "imgUrl": "https://img2.mukewang.com/5b62867d0001d91106000338-240-135.jpg",
            "videoUrl": "http://pevcw8o7e.bkt.clouddn.com//video/Jass/testV.mp4",
            "isFree": 0,
            "price": 43,
            "count": 1
          }
        ]
      }
    },
    methods: {
      searchCourse() {
        // 点击课程搜索后
      },
      handleEdit(index,rowData) {
        // row 点击编辑
      },
      handleDelete(index,rowData) {
        // row 点击删除
      },
      handlePublish(index,rowData) {
        // row 点击发布
      },
      handleSendBanner(index,rowData) {
        // row 点击推荐至轮播
      }
    }
  };

</script>


<style>
  .cell {
    max-height: 120px !important;
    overflow: auto !important;
  }

  .opt_btn_margin {
    margin-top: 10px;
    padding: 0;
  }

  .table_top {
    margin-top: 20px;
  }

</style>
