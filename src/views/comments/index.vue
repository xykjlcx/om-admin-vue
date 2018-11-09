<template>

  <div class="app-container">
    <el-row type="flex" justify="center">
      <el-card class="box-card" shadow="hover">
        <!-- card header -->
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="4">
              <el-row type="flex" align="middle">
                <span class="text" style="float: left;margin:3px"><b>评论管理</b></span>
              </el-row>
            </el-col>
            <el-col :span="20">
            </el-col>
          </el-row>
        </div>

        <!-- card body -->
        <div>
          <!-- 表格操作头部 -->
          <!-- <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="selectStatus" placeholder="请选择" style="width:100%" @change="statusChange">
                <el-option label="全部" value="-1"></el-option>
                <el-option label="禁用" value="0"></el-option>
                <el-option label="可用" value="1"></el-option>
              </el-select>
            </el-col>
          </el-row> -->

          <el-table :data="commentData" style="width: 100%" class="margin_top" v-loading="loading">
            <el-table-column fixed prop="id" label="序号" min-width="60" align="center">
            </el-table-column>
            <el-table-column prop="userHeadImg" label="用户头像" min-width="60" align="center">
              <template slot-scope="scope">
                <img class="radius" :src="scope.row.userHeadImg" alt="" width="50%">
              </template>
            </el-table-column>
            <el-table-column prop="userAccount" label="用户名" min-width="100" align="center">
            </el-table-column>
            <el-table-column prop="realName" label="真实姓名" min-width="80" align="center">
            </el-table-column>
            <el-table-column prop="courseName" label="课程名称" width="120" align="center">
            </el-table-column>
            <el-table-column prop="commentContent" label="评论内容" min-width="130" align="center">
            </el-table-column>
            <el-table-column prop="commentBelongSection" label="评论章节" width="80" align="center">
            </el-table-column>
            <el-table-column prop="commentTime" label="评论时间" min-width="120" align="center">

            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="openConfirm(scope.$index, scope.row)">删除</el-button>
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
    getAllComment,
    deleteComment
  } from '@/api/index'

  export default {
    data() {
      return {
        total: 0,
        size: 5,
        currentPage: 0,
        commentData: [],
        loading: false,
      }
    },
    mounted() {
      this.fetchAllCommentData();
    },
    methods: {
      /**
       * 获取所有评论数据
       */
      fetchAllCommentData() {
        var params = {
          page: this.currentPage,
          size: this.size,
          sortType: 1,
          sortProp: 'createTime'
        };
        this.loading = true;
        getAllComment(params).then(resp => {
          this.loading = false;
          if (resp.code == 0) {
            this.commentData = resp.data.comments
            this.total = resp.data.count;
          }
        })
      },
      /**
       * 点击分页按钮
       */
      pageChanage(val) {
        // alert(val)
        this.currentPage = val - 1;
        this.fetchAllCommentData();
      },
      /**
       * 删除确认
       */
      openConfirm(index, row) {
        this.$confirm('点击将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确定删除
          this.requestDeleteComment(row.dbId);
        }).catch(() => {
          // 取消删除
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      requestDeleteComment(dbId) {
        var params = {
          delId: dbId
        };
        this.loading = true;
        deleteComment(params).then(resp => {
          this.loading = false;
          if(resp.code == 0){
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          this.fetchAllCommentData();
          }else {
        this.$message.error('删除失败');
          }
        })
      }
    }
  }

</script>


<style>
  .text {
    font-size: 30px;
  }


  .box-card {
    width: 95%;
  }

  .margin_top {
    margin-top: 20px;
  }

  .radius {
    border-radius: 50%
  }

</style>
