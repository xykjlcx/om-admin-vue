<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span><b class="text">{{ courseName }}</b></span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addBtnClick">新增章节</el-button>
      </div>
      <el-row :gutter="30">
        <el-col :span="10">
          <el-card>
            <div slot="header" class="clearfix">
              <span><b>Chapter(章)</b></span>
            </div>
            <div class="horizontal-average-left">
              <el-table :data="chapterList" height="500" v-loading="loadingChapter" @row-click="charpterItemClick">
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
              <el-table :data="sectionList[currentChapter]" height="500" v-loading="loadingSection">
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


    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" style="height:100%">
      <el-row>
        <el-form label-position="top">
          <el-form-item label="类型">
            <el-select v-model="sectionForm.type" placeholder="请选择章/节" class="full-width">
              <el-option label="Chapter(章)" value="chapter"></el-option>
              <el-option label="Section(节)" value="section"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属章" v-if="sectionForm.type == 'section' ? true : false">
            <el-select class="full-width" v-model="sectionForm.belongChapter" placeholder="请选择" v-if="sectionForm.type == 'section' ? true : false">
              <el-option v-for="item in chapterList" :key="item.dbId" :label="item.sectionName" :value="item.dbId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="sectionForm.sectionName" class="full-width"></el-input>
          </el-form-item>
          <!-- 上传课程视频 -->
          <el-form-item label="课程视频" v-if="sectionForm.type == 'section' ? true : false">
            <!-- 视频上传 -->
            <el-upload action="http://139.199.212.202:8086/admin/main/upload" :on-success="uploadVideoSuccess" name="file"
              class="full-width" v-if="sectionForm.type == 'section' ? true : false">
              <video class="full-width" v-if="sectionForm.videoUrl" :src="this.sectionForm.videoUrl" width="250"></video>
              <el-button plain class="full-width">视频上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="confirmEditAndAdd">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import {
    getCourseChapterAndSection,
    addChapterAndSection,
    editChapterAndSection,
    deleteChapterAndSection
  } from '@/api/index'

  export default {
    data() {
      return {
        isEdit: false,
        currentEditDbId: -1,
        standBySectionId: -1,
        courseId: 0,
        courseName: 'CSS定位入门',
        currentChapter: 0,
        chapterList: [],
        loadingChapter: false,
        sectionList: [
          []
        ],
        loadingSection: false,
        dialogVisible: false,
        dialogTitle: '新增章/节',
        fullscreenLoading: false,
        sectionForm: {
          type: 'chapter', // 默认为章
          sectionName: '',
          belongChapter: '',
          videoUrl: ''
        }
      }
    },
    created() {
      const id = this.$route.params && this.$route.params.id
      const courseName = this.$route.query.courseName;
      this.courseId = id;
      this.courseName = courseName;
    },
    mounted() {
      this.fetchCourseChapterAndSection();
    },
    methods: {
      validateSectionName() {
        // 检查是否章节名称是否填写
        if (this.sectionForm.sectionName == '') {
          this.$message({
            message: '请填写章节名称',
            type: 'warning'
          });
          return false;
        } else {
          return true;
        }
      },
      validateVideo() {
        // 检查视频是否上传成功
        if (this.sectionForm.videoUrl == '') {
          this.$message({
            message: '请完成视频上传',
            type: 'warning'
          });
          return false;
        } else {
          return true;
        }
      },
      handlePostBeforeParent() {
        var parentId = 0;
        if (this.sectionForm.type == 'chapter') {
          // 新增为章
          parentId = 0;
          this.sectionForm.videoUrl = '该item为章，视频地址默认';
        } else {
          // 新增为节
          if (this.sectionForm.belongChapter == '') {
            this.$message({
              message: '请选择所属章',
              type: 'warning'
            });
            return -1;
          }
          parentId = this.sectionForm.belongChapter;
        }
        return parentId;
      },
      addBtnClick() {
        // 点击新增时清除数据
        this.isEdit = false;
        this.sectionForm.sectionName = '';
        this.sectionForm.type = 'chapter';
        this.sectionForm.belongChapter = '';
        this.sectionForm.videoUrl = '';
        this.dialogVisible = true
      },
      confirmEditAndAdd() {
        if (this.isEdit) {
          // 编辑
          this.postEditChapterAndSection();
        } else {
          // 新增
          this.postAddChapterAndSection();
        }
      },
      /**
       * 添加新的章节
       */
      postAddChapterAndSection() {
        if (this.validateSectionName() == false) {
          return;
        }
        var parentId = this.handlePostBeforeParent();
        if (parentId == -1) {
          return;
        }
        if (this.validateVideo() == false) {
          return;
        }
        // 包装请求参数
        var params = {
          sectionName: this.sectionForm.sectionName,
          courseId: this.courseId,
          parentId: parentId,
          videoUrl: this.sectionForm.videoUrl
        };
        this.fullscreenLoading = true;
        addChapterAndSection(params).then(resp => {
          this.fullscreenLoading = false;
          if (resp.code == 0) {
            this.dialogVisible = false;
            this.$message({
              message: resp.msg,
              type: 'success'
            });
            // 重新请求章节数据
            this.fetchCourseChapterAndSection();
          } else {
            this.$message({
              message: resp.msg,
              type: 'error'
            })
          }
        });
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
          courseId: this.courseId
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
        // alert('删除章:' + row.sectionName)
        this.standBySectionId = row.dbId;
        this.openConfirm();
      },
      /**
       * 编辑章
       */
      handleChapterEdit(row) {
        // alert('编辑章:' + row.sectionName)
        this.isEdit = true;
        this.currentEditDbId = row.dbId;
        this.sectionForm.sectionName = row.sectionName;
        this.sectionForm.type = 'chapter';
        this.dialogVisible = true;
      },
      /**
       * 删除节
       */
      handleSectionDel(row) {
        // alert('删除节:' + row.sectionName)
        this.standBySectionId = row.dbId;
        this.openConfirm();
      },
      /**
       * 编辑节
       */
      handleSectionEdit(row) {
        // alert('编辑节:' + row.sectionName)
        this.isEdit = true;
        this.currentEditDbId = row.dbId;
        this.sectionForm.sectionName = row.sectionName;
        this.sectionForm.type = 'section';
        this.sectionForm.belongChapter = row.parentId;
        this.sectionForm.videoUrl = row.videoUrl;
        this.dialogVisible = true;
      },
      /**
       * 编辑章节
       */
      postEditChapterAndSection(dbId) {
        if (this.validateSectionName() == false) {
          return;
        }
        if (this.validateSectionName() == false) {
          return;
        }
        var parentId = this.handlePostBeforeParent();
        if (parentId == -1) {
          return;
        }
        // 包装请求参数
        var params = {
          dbId: this.currentEditDbId,
          sectionName: this.sectionForm.sectionName,
          courseId: this.courseId,
          parentId: parentId,
          videoUrl: this.sectionForm.videoUrl
        };
        this.fullscreenLoading = true;
        editChapterAndSection(params).then(resp => {
          this.fullscreenLoading = false;
          if (resp.code == 0) {
            this.dialogVisible = false;
            this.$message({
              message: resp.msg,
              type: 'success'
            });
            // 重新请求章节数据
            this.fetchCourseChapterAndSection();
          } else {
            this.$message({
              message: resp.msg,
              type: 'error'
            })
          }
        });
      },
      postDeleteSection() {
        var params = {
          dbId: this.standBySectionId
        };
        deleteChapterAndSection(params).then(resp => {
          if (resp.code == 0) {
            this.$message({
              message: resp.msg,
              type: 'success'
            });
            // 删除后更新章节数据
            this.fetchCourseChapterAndSection();
          } else {
            this.$message({
              message: resp.msg,
              type: 'error'
            });
          }
        });
      },
      openConfirm() {
        this.$confirm('点击将永久删除该章节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确定删除
          this.postDeleteSection();
        }).catch(() => {
          // 取消删除
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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

  .text {
    font-size: 30px;
  }

</style>
