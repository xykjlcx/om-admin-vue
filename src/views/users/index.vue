<template>

  <div class="app-container">
    <el-row type="flex" justify="center">
      <el-card class="box-card" shadow="hover">
        <!-- card header -->
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="4">
              <el-row type="flex" align="middle">
                <span class="text" style="float: left;margin:3px"><b>用户管理</b></span>
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
              <el-select v-model="selectStatus" placeholder="请选择" style="width:100%" @change="statusChange">
                <el-option label="全部" value="-1"></el-option>
                <el-option label="禁用" value="0"></el-option>
                <el-option label="可用" value="1"></el-option>
              </el-select>
            </el-col>
            <!-- <el-col :span="8">
              <el-input v-model="searchContent" placeholder="请输入内容" @keyup.enter.native="searchUser"></el-input>
            </el-col> -->
            <!-- <el-col :span="8">
              <el-button type="primary" @click="searchUser">搜索</el-button>
            </el-col> -->
          </el-row>

          <el-table :data="userData" style="width: 100%" class="margin_top" v-loading="loading">
            <el-table-column fixed prop="id" label="序号" min-width="60" align="center">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="120" align="center">
            </el-table-column>
            <el-table-column prop="realName" label="真实姓名" min-width="120" align="center">
            </el-table-column>
            <el-table-column prop="genderStr" label="性别" width="60" align="center">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="150" align="center">
            </el-table-column>
            <el-table-column prop="education" label="学历" width="120" align="center">
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="150" align="center">
              <template slot-scope="scope">
                <el-switch style="display: block" v-model="scope.row.statusBool" active-color="#13ce66" inactive-color="#ff4949"
                  active-text="可用" inactive-text="禁用" @change="operateStatus(scope.$index,scope.row)">
                </el-switch>
                <p></p>
              </template>
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
    getAllUserInfo,
    deleteUser,
    operateUserStatus
  } from '@/api/index'

  export default {
    data() {
      return {
        selectStatus: '-1',
        searchContent: "",
        total: 0,
        currentPage: 1,
        size: 5,
        loading: false,
        userData: [],
      }
    },
    mounted() {
      this.fetchAllUserList();
    },
    methods: {
      /**
       * 获取用户列表
       */
      fetchAllUserList() {
        var status = -1;
        if (this.selectStatus == undefined) {
          status = -1;
        } else {
          status = this.selectStatus;
        }
        var params = {
          page: this.currentPage - 1,
          size: this.size,
          status: status
        }
        this.loading = true;
        getAllUserInfo(params).then(resp => {
          this.loading = false;
          if (resp.code == 0) {
            this.userData = resp.data.users;
            this.total = resp.data.count;
          } else {
            this.$message({
              message: '暂时没有用户数据',
              type: 'warning'
            })
          }
        })
      },
      /**
       * 用户搜索
       */
      searchUser() {

      },
      /**
       * 删除用户
       */
      deleteUser(index, row) {
        var params = {
          userId: row.dbId
        };
        deleteUser(params).then(resp => {
          if (resp.code == 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.fetchAllUserList();
          } else {
            this.$message({
              message: resp.msg,
              type: 'error'
            });
          }
        });
      },
      /**
       * 选择状态被改变
       */
      statusChange(val) {
        this.selectStatus = val;
        //   alert(this.selectStatus);
        this.fetchAllUserList();
      },
      /**
       * 点击翻页
       */
      pageChanage(val) {
        this.currentPage = val;
        this.fetchAllUserList();
      },
      /**
       * 删除确认
       */
      openConfirm(index, row) {
        this.$confirm('点击将永久删除用户数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确定删除
          this.deleteUser(index, row);
        }).catch(() => {
          // 取消删除
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /**
       * 操作用户状态
       */
      operateStatus(index, row) {
        //   alert('status:' + row.statusBool)
        var params = {
          userId: row.dbId,
          isBan: !row.statusBool
        };
        operateUserStatus(params).then(resp => {
          if (resp.code == 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: resp.msg,
              type: 'error'
            });
          }
        });
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

</style>
