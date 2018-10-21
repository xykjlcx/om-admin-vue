<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span><b>{{ courseName }}</b>的课程章节</span>
        <el-button style="float: right; padding: 3px 0" type="text">新增章节</el-button>
      </div>
      <el-row :gutter="30">
        <el-col :span="10">
          <el-card>
            <div slot="header" class="clearfix">
              <span><b>Chapter(章)</b></span>
            </div>
            <div class="horizontal-average-left">
              <el-table :data="chapterList" style="width: 100%" height="100%" v-loading="loadingChapter" @row-click="charpterItemClick">
                <el-table-column prop="id" label="序号" width="100" align="center">
                </el-table-column>
                <el-table-column prop="sectionName" label="名称" min-width="150" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100" align="center">
                  <template slot-scope="scope">
                    <el-button @click="handleChapterDel(scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="handleChapterEdit(scope.row)" type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col :span="14">
          <el-card>
            <div slot="header" class="clearfix">
              <span><b>Section(节)</b></span>
            </div>
            <div class="horizontal-average-right">
              <el-table :data="sectionList[currentChapter]" style="width: 100%" height="100%" v-loading="loadingSection">
                <el-table-column prop="id" label="序号" width="100" align="center">
                </el-table-column>
                <el-table-column prop="sectionName" label="名称" min-width="150" align="center">
                </el-table-column>
                <el-table-column prop="videoUrl" label="视频" min-width="200" align="center">
                  <template slot-scope="scope">
                    <img class="radius" :src="scope.row.videoUrl + '?spm=a2c4g.11186623.2.9.3ca03c107B37w7&x-oss-process=video/snapshot,t_0000,f_jpg,w_600,h_320,m_fast'"
                      alt="" width="70%">
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleSectionDel(scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="handleSectionEdit(scope.row)" type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import {
    getCourseChapterAndSection
  } from '@/api/index'

  export default {
    data() {
      return {
        courseName: 'CSS定位入门',
        currentChapter: 0,
        chapterList: [],
        loadingChapter: false,
        sectionList: [
          []
        ],
        loadingSection: false,
      }
    },
    mounted() {
      this.fetchCourseChapterAndSection();
    },
    methods: {
      /**
       * 获取课程章节
       */
      fetchCourseChapterAndSection() {
        this.loadingChapter = true;
        this.loadingSection = true;
        var params = {
          courseId: 1
        };
        getCourseChapterAndSection(params).then(resp => {
          this.loadingChapter = false;
          this.loadingSection = false;
          this.chapterList = resp.data.chapter;
          this.sectionList = resp.data.section;
        });
      },
      /**
       * 章被点击
       */
      charpterItemClick(row, event, column) {
        // alert(event.target.nodeName)
        if (event.target.nodeName != 'SPAN') {
          this.loadingSection = true;
          setTimeout(() => {
            this.currentChapter = row.id - 1;
            this.loadingSection = false;
          }, 500)
        }
      },
      /**
       * 删除章
       */
      handleChapterDel(row) {
        alert('删除章:' + row.sectionName)
      },
      /**
       * 编辑章
       */
      handleChapterEdit(row) {
        alert('编辑章:' + row.sectionName)
      },
      /**
       * 删除节
       */
      handleSectionDel(row) {
        alert('删除节:' + row.sectionName)
      },
      /**
       * 编辑节
       */
      handleSectionEdit(row) {
        alert('编辑节:' + row.sectionName)
      }
    }
  }

</script>

<style>
  .horizontal-average-left {
    height: 500px;
  }

  .horizontal-average-right {
    height: 500px;
  }

  .radius {
    border-radius: 5px
  }

</style>
