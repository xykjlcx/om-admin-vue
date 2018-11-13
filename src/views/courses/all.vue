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
            <el-col :span="6">
              <el-input v-model="searchContent" placeholder="请输入内容" @keyup.enter.native="searchCourse"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="searchCourse">搜索</el-button>
            </el-col>
            <el-col :span="16">
              <el-select v-model="currentOne" placeholder="请选择一级分类" class="full" @change="selectOne">
                <el-option v-for="item in classifyOne" :key="item.id" :label="item.classifyName" :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="currentTwo" placeholder="请选择二级分类" class="full" @change="selectTwo">
                <el-option v-for="item in classifyTwoEcType[currentOne-1]" :key="item.id" :label="item.classifyName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <!-- 课程列表 -->
          <el-table class="margin_top" :data="courseListData" border style="width: 100%" row-style="height:100px"
            v-loading="loading" @sort-change="sortChange" :default-sort="{prop: 'createCourseTime', order: 'descending'}">
            <el-table-column prop="id" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="courseName" label="课程名称" min-width="100px" align="center">
              <template slot-scope="scope">
                <p><a><b @click="rowClick(scope.$index,scope.row)">{{ scope.row.courseName}}</b></a></p>
                <!-- <p class="tips_text">点击课程名称播放视频</p> -->
              </template>
            </el-table-column>
            <el-table-column prop="imgUrl" label="图片" width="200" align="center">
              <template slot-scope="scope">
                <img class="radius" :src="scope.row.previewImg + '?x-oss-process=style/jiancai'" alt="" width="70%">
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
              <template slot-scope="scope">
                <el-tag :key="scope.row.studyCount">{{scope.row.studyCount}}</el-tag>
              </template>
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



    <el-dialog :title="this.dialogTitle" :visible.sync="dialogVisible" @closed="handleCloseForVideo">
      <el-row>
        <el-col :span="12" :offset="4">
          <video ref="myVideo" class="radius" :src="this.dialogVidelUrl" controls="controls" width="400">
          </video>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getAllCourse,
    searchCourses,
    operateCourseIsBanner,
    operateCourseIsPutAway,
    deleteCourseItem,
    getAllClassify
  } from '@/api/index'


  export default {
    data() {
      return {
        // 测试，明日整合
        dialogVisible: false,
        dialogTitle: '',
        dialogVidelUrl: '',
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
        classifyOne: [],
        currentOne: '',
        classifyTwo: [
          []
        ],
        classifyTwoEcType: [
          []
        ],
        currentTwo: '',
        selectClassifyDbId: 0,
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
      /**
       * 获取所有课程
       */
      fetchCourses() {
        this.loading = true;
        // 默认以数据库id字段倒序排序
        var params = {
          page: this.currentPage - 1,
          size: 5,
          classify: this.selectClassifyDbId,
          sort: this.sort,
          sortProp: this.sortProp
        }
        getAllCourse(params).then(resp => {
          this.loading = false;
          if (resp.code == 0) {
            this.total = resp.data.count;
            this.courseListData = resp.data.courseList;
          } else {
            this.$message({
              type: 'error',
              message: '没有该分类下的课程'
            });
          }
        })
      },
      handleEdit(index, rowData) {
        // row 点击编辑
        // this.dialogFormVisible = true;
        // this.$router.push({
        //   name: 'edit',
        //   params: {
        //     id: rowData.dbId
        //   }
        // })
        // 由以上方法改为此方法，原方法由于to、from都一样，只是参数不同，导致组件复用时/edit/:id的参数id不更新
        this.$router.push({
          path: '/courses/edit/' + rowData.dbId
        })
      },
      handleDelete(index, rowData) {
        // row 点击删除
        var params = {
          courseId: rowData.dbId
        };
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          deleteCourseItem(params).then(resp => {
            this.fetchCourses();
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handlePutaway(index, rowData) {
        // row 点击发布
        this.loading = true;
        var params = {
          courseId: rowData.dbId,
          isPutAway: rowData.putawayS
        };
        operateCourseIsPutAway(params).then(resp => {
          this.loading = false;
          if (resp.code == 0) {
            this.$message({
              message: resp.msg,
              type: 'success'
            });
          } else {
            rowData.putawayS = resp.data;
            this.$message({
              message: resp.msg,
              type: 'error'
            });
          }
        });
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
          if (resp.code == 0) {
            this.$message({
              message: resp.msg,
              type: 'success'
            });
          } else {
            rowData.homeBannerS = resp.data;
            this.$message({
              message: resp.msg,
              type: 'error'
            });
          }
        });
      },
      // dialog 关闭时的回调
      handleCloseForVideo() {
        var video = this.$refs.myVideo;
        video.pause();
      },
      // 某一行被点击
      rowClick(index, row) {
        this.dialogTitle = row.courseName;
        this.dialogVidelUrl = row.videoUrl;
        this.dialogVisible = true;
      },
      /**
       * 获取分类数据
       */
      fetchAllClassify() {
        getAllClassify().then(resp => {
          this.classifyOne = resp.data.oneLevel
          this.classifyTwo = resp.data.twoLevel
          this.classifyTwoEcType = resp.data.twoLevel.concat();
          for (var i = 0; i < this.classifyTwoEcType.length; i++) {
            this.classifyTwoEcType[i].unshift({
              classifyName: '所有',
              id: 0
            })
          };
          if (this.isEdit) {
            this.handleRenderUiClassify();
          }
        })
      },
      /**
       * 选择一级分类
       */
      selectOne(val) {
        // 选中一级分类后，默认二级分类为所有
        this.currentTwo = 0;
        this.selectClassifyDbId = this.classifyOne[this.currentOne - 1].dbId;
        // alert("一级：" + this.currentOne + "，二级：" + this.currentTwo + "，请求的dbId:" + this.selectClassifyDbId);
        this.currentPage = 1;
        this.fetchCourses();
      },
      /**
       * 选择二级分类
       */
      selectTwo(val) {
        if (this.currentTwo == 0) {
          this.selectClassifyDbId = this.classifyOne[this.currentOne - 1].dbId;
          this.fetchCourses();
          return;
        }
        this.selectClassifyDbId = this.classifyTwo[this.currentOne - 1][this.currentTwo].dbId;
        // alert("一级：" + this.currentOne + "，二级：" + this.currentTwo)
        this.currentPage = 1;
        this.fetchCourses();
      }
    },
    mounted() {
      this.fetchCourses();
      this.fetchAllClassify();
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

  .tips_text {
    font-size: 2px;
    color: yellowgreen;
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

  .test {
    padding: 0px;
    margin: 0px;
  }

</style>
