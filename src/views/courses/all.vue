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
    <el-table class="margin_top" :data="courseListData" border style="width: 100%" row-style="height:100px" v-loading="loading">
      <el-table-column fixed="" prop="id" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称" min-width="150px" align="center">
      </el-table-column>
      <el-table-column prop="level" label="级别" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="duration" label="时长" min-width="100" align="center">
      </el-table-column>
      <el-table-column prop="imgUrl" label="图片" width="200" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt="" width="80%">
        </template>
      </el-table-column>
      <!-- todo 是否上架 -->
      <el-table-column prop="isFree" label="是否上架" min-width="120" align="center">
        <template slot-scope="scope">
          <el-switch style="display: block" v-model="scope.row.isPublish" active-color="#13ce66" inactive-color="#ff4949"
            active-text="" inactive-text="" @change="handlePublish(scope.$index,scope.row)">
          </el-switch>
          <p></p>
        </template>
      </el-table-column>
      <!-- todo 是否推荐至首页轮播 -->
      <el-table-column prop="isFree" label="是否推荐轮播" min-width="140" align="center">
        <template slot-scope="scope">
          <el-switch style="display: block" v-model="scope.row.isBanner" active-color="#13ce66" inactive-color="#ff4949"
            active-text="" inactive-text="" @change="handleSendBanner(scope.$index,scope.row)">
          </el-switch>
          <p></p>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row type="flex" justify="center" class="margin_top">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change="abc">
      </el-pagination>
    </el-row>

    <!-- dialog -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" modal="true">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" justify="center" :span="1" offset="1">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getCourses
  } from '@/api/courses'
  
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
        total: 20,
        size: 5,
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
            "isPublish": true,
            "isBanner": false,
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
            "isPublish": false,
            "isBanner": false,
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
            "isPublish": true,
            "isBanner": true,
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
      fetchCourses() {
        alert('开始请求');
        this.loading = false;
        getCourses().then(resp => {
          alert(resp.data)
          this.loading = false;
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
      handlePublish(index, rowData) {
        // row 点击发布
      },
      handleSendBanner(index, rowData) {
        // row 点击推荐至轮播
      }
    },
    mounted() {
      // 页面加载完成后
      this.fetchCourses()
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

  .margin_top {
    margin-top: 20px;
  }

</style>
