<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span><b class="text">分类管理</b></span>
      </div>
      <el-row :gutter="30">
        <el-col :span="7">
          <!-- <div class="classify-height"> -->
          <el-button type="primary" style="width:100%" @click="addNewClassifyOnClick">添加新分类</el-button>
          <el-scrollbar style="height:500px">
            <el-tree :data="classifyData" :props="defaultProps" @node-click="handleNodeClick" v-loading="loading"
              default-expand-all style="margin:10px" :expand-on-click-node="false"></el-tree>
          </el-scrollbar>
          <!-- </div> -->
        </el-col>
        <el-col :span="11">
          <el-card>
            <div class="classify-height">
              <el-form label-position="top" label-width="80px">
                <el-form-item label="分类名称">
                  <el-input v-model="newClassifyName"></el-input>
                </el-form-item>
                <el-form-item label="上级分类">
                  <el-select class="full-width" v-model="newClassifyParentName" placeholder="请选择" style="width:100%"
                    @change="selectParent">
                    <el-option v-for="item in classifyDataEcType" :key="item.dbId" :label="item.classifyName" :value="item.dbId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="操作">
                  <el-button type="success" style="width:100%" @click="addAndSaveClassifyOnClick">{{ btnName }}</el-button>
                </el-form-item>
                <el-button type="danger" style="width:100%" v-if="isEdit">删除分类</el-button>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import {
    getAllClassifyTree,
    addAndEditClassify
  } from '@/api/index'

  export default {
    data() {
      return {
        loading: false,
        classifyData: [],
        classifyDataEcType: [],
        defaultProps: {
          children: 'childs',
          label: 'classifyName'
        },
        isEdit: false,
        newClassifyParentName: '一级分类',
        newClassifyParentDbId: 0,
        newClassifyName: '',
        editCurrentDbId: -1,
        btnName: '新增分类'
      }
    },
    mounted() {
      this.fetchAllClassifyThee();
    },
    methods: {
      /**
       * 点击左上角新增分类按钮
       */
      addNewClassifyOnClick() {
        // alert('点击添加')
        this.btnName = "新增分类";
        this.newClassifyName = '';
        this.newClassifyParentName = '一级分类';
        this.newClassifyParentDbId = 0;
        this.editCurrentDbId = -1;
        this.isEdit = false;
      },
      fetchAllClassifyThee() {
        this.loading = true;
        getAllClassifyTree().then(resp => {
          this.loading = false;
          if (resp.code == 0) {
            this.classifyData = resp.data;
            this.classifyDataEcType = resp.data.concat();
            this.classifyDataEcType.unshift({
              classifyName: '一级分类',
              dbId: 0
            });
          } else {
            // 出错
          }
        });
      },
      /**
       * 选择上级分类
       */
      selectParent(val) {
        this.newClassifyParentDbId = val;
      },
      /**
       * 处理节点点击
       */
      handleNodeClick(data) {
        this.isEdit = true;
        this.btnName = "确定保存";
        if (data.childs == null) {
          // alert('子')
          var parentDbId = data.parentId;
          for (var i = 0; i < this.classifyData.length; i++) {
            if (this.classifyData[i].dbId == parentDbId) {
              this.newClassifyParentName = this.classifyData[i].classifyName;
              this.newClassifyParentDbId = parentDbId;
            } else {

            }
          }
        } else {
          // alert('父')
          this.newClassifyParentName = this.classifyDataEcType[0].classifyName;
        }
        this.editCurrentDbId = data.dbId;
        this.newClassifyName = data.classifyName;
      },
      /**
       * 点击新增或者保存分类
       */
      addAndSaveClassifyOnClick() {
        if (this.newClassifyName == '') {
          this.$message({
            message: '请输入分类名称',
            type: 'warning'
          })
          return;
        }
        // 请求服务器
        var params = {
          classifyName: this.newClassifyName,
          parentId: this.newClassifyParentDbId,
          selfDbId: this.editCurrentDbId
        };
        this.loading = true;
        addAndEditClassify(params).then(resp => {
          this.loading = false;
          var type = 'success';
          if (resp.code == 0) {
            this.classifyData = resp.data;
            this.classifyData = resp.data;
            type = 'success';
            this.classifyDataEcType = resp.data.concat();
            this.classifyDataEcType.unshift({
              classifyName: '一级分类',
              dbId: 0
            });
          } else {
            type = 'error';
          }
          this.$messsage({
            message: resp.msg,
            type: 'success'
          });
        });
      }
    }
  }

</script>

<style>
  .classify-height {
    height: 500px;
    /* background-color: #00ff00; */
  }

  .text {
    font-size: 30px;
  }

</style>
