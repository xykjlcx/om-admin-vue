<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span><b>{{ courseName }}</b>的课程章节</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible = true">新增章节</el-button>
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


    <el-dialog title="添加新的章/节" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" style="height:100%">
      <el-row>
        <el-form :label-position="top">
          <el-form-item label="类型">
            <el-select v-model="sectionForm.type" placeholder="请选择章/节" class="full-width">
              <el-option label="Chapter(章)" value="chapter"></el-option>
              <el-option label="Section(节)" value="section"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属章" v-if="sectionForm.type == 'section' ? true : false">
            <el-select class="full-width" v-model="sectionForm.belongChapter" placeholder="请选择" v-if="sectionForm.type == 'section' ? true : false">
              <el-option v-for="item in chapterList" :key="item.id" :label="item.sectionName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="sectionForm.name" class="full-width"></el-input>
          </el-form-item>
          <!-- 上传课程视频 -->
          <el-form-item label="课程视频">
            <!-- 视频上传 -->
            <el-upload action="http://127.0.0.1:8086/admin/main/upload" :on-success="uploadVideoSuccess" name="file"
              class="full-width">
              <video class="full-width" v-if="sectionForm.videoUrl" :src="this.sectionForm.videoUrl" width="250"></video>
              <el-button plain class="full-width">视频上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addChapterAndSection">确 定</el-button>
      </span>
    </el-dialog>


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
        dialogVisible: false,
        sectionForm: {
          type: 'chapter', // 默认为章
          name: '',
          parentId: 0,
          belongChapter: '',
          videoUrl: ''
        }
      }
    },
    mounted() {
      this.fetchCourseChapterAndSection();
    },
    methods: {
      /**
       * 添加新的章节
       */
      addChapterAndSection() {
        this.dialogVisible = false;
      },
      /**
       * 上传章节视频
       */
      uploadVideoSuccess(resp) {
        if (resp.code == 0) {
          this.sectionForm.videoUrl = resp.data;
          this.$message({
            message: '视频上传成功',
            type: 'success'
          });
        } else {
          this.$message.error('视频上传失败');
        }
      },
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

  .full-width {
    width: 100%;
  }

</style>
