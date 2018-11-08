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


export default {
    data () {
        return {
            
        }
    }        
}
</script>

<style>

</style>

