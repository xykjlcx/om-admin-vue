<template>
  <div class="app-container">

    <el-row type="flex" justify="center">

      <!-- 卡片布局 -->
      <el-card class="box-card">
        <!-- card 头部 -->
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="4">
              <el-row type="flex" align="middle">
                <span class="text" style="float: left;margin:3px"><b>新增课程</b></span>
              </el-row>
            </el-col>
            <el-col :span="20">
              <el-button style="float: right;" type="primary" @click="addCourse">确定添加</el-button>

            </el-col>
          </el-row>
        </div>

        <!-- 内容区域 -->
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <!-- 上传课程图片 -->
            <el-form-item label="课程图片">
              <!-- 视频图上传 -->
              <el-upload class="upload-demo" action="http://127.0.0.1:8086/admin/main/upload" :on-preview="handlePreview"
                :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed"
                :file-list="fileList" :on-success="uploadImgSuccess" name="file">
                <img v-if="imageUrl" :src="imageUrl" width="100">
                <el-button plain>图片上传</el-button>
              </el-upload>
            </el-form-item>

            <!-- 上传课程视频 -->
            <el-form-item label="课程视频">
              <!-- 视频图上传 -->
              <el-upload class="upload-demo" action="http://127.0.0.1:8086/admin/main/upload" :on-preview="handlePreview"
                :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed"
                :file-list="fileList" :on-success="uploadVideoSuccess" name="file">
                <video v-if="videlUrl" :src="videlUrl" width="250"></video>
                <el-button plain>视频上传</el-button>
              </el-upload>
            </el-form-item>


            <el-row>
              <el-col :span="24">
                <!-- 课程名称 -->
                <el-form-item label="课程名称">
                  <el-input v-model="form.courseName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 分类 -->
            <el-row gutter="60">
              <el-col :span="12">
                <el-form-item label="一级分类">
                  <el-select v-model="currentOne" placeholder="请选择" class="full" @change="selectOne">
                    <el-option v-for="item in classifyOne" :key="item.id" :label="item.classifyName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="二级分类">
                  <el-select v-model="value" placeholder="请选择" class="full">
                    <el-option v-for="item in classifyTwo[1]" :key="item.id" :label="item.classifyName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row gutter="60">
              <el-col :span="24">
                <el-form-item label="级别" required="">
                  <el-select v-model="value" placeholder="请选择" class="full">
                    <el-option v-for="item in courseLevel" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row gutter="60">
              <el-col :span="24">
                <el-form-item label="是否免费">
                  <el-radio-group v-model="form.isFree">
                    <el-radio label="免费"></el-radio>
                    <el-radio label=收费></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="价格" v-if="form.isFree == '免费' ? false : true">
                  <el-input v-model="form.price"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item label="是否上架" required>
                  <el-radio-group v-model="form.isPutWay">
                    <el-radio-button label="上架"></el-radio-button>
                    <el-radio-button label="入库"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="推荐权重">
                  <el-input v-model="form.weight"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="课程描述">
                  <el-input type="textarea" v-model="form.courseDesc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>

        <!-- card尾部 -->
       <el-row type="flex" justify="center" class="bottomTips">
         填写完毕后，<b>点击右上角的确定添加</b>，完成课程新增。
       </el-row>

      </el-card>
    </el-row>

  </div>
</template>

<script>
  import {
    getAllClassify
  } from '@/api/index'

  export default {
    data() {
      return {
        labelPosition: 'left',
        imageUrl: '',
        videlUrl: '',
        form: {
          courseName: '',
          weight: 0,
          price: 0,
          courseDesc: '',
          isPutWay: '',
          isFree: '免费',
        },
        classifyOne: [],
        currentOne: '',
        classifyTwo: [
          []
        ],
        currentTwo: '',
        courseLevel: [{
            value: 1,
            label: '初级'
          },
          {
            value: 2,
            label: '初级'
          },
          {
            value: 3,
            label: '高级'
          },
        ],
        isFree: [{
            value: 1,
            label: '免费'
          },
          {
            value: 1,
            label: '收费'
          },
        ],
        value: ''
      }
    },
    mounted() {
      this.fetchAllClassify();
    },
    methods: {
      selectOne(index) {
        alert(index)
      },
      uploadVideoSuccess(resp) {
        if (resp.code == 0) {
          this.videlUrl = resp.data;
          this.$message({
            message: '视频上传成功',
            type: 'success'
          });
        } else {
          this.$message.error('视频上传失败');
        }
      },
      uploadImgSuccess(resp) {
        if (resp.code == 0) {
          this.imageUrl = resp.data;
          this.$message({
            message: '图片上传成功',
            type: 'success'
          });
        } else {
          this.$message.error('图片上传失败');
        }
      },
      fetchAllClassify() {
        getAllClassify().then(resp => {
          this.classifyOne = resp.data.oneLevel
          this.classifyTwo = resp.data.twoLevel
          console.log(this.classifyTwo)
        })
      },
      addCourse() {
        // 确定新增课程
        if (this.imageUrl == '' || this.videlUrl == '') {
          this.$message.error("请先上传图片和视频");
        } else {
          this.$message({
            message: '新增课程成功',
            type: 'success'
          });
          // 添加完成后，跳转至所有课程页面
          this.$router.push({
            path: this.redirect || '/courses/all'
          })
        }
      }
    }
  }

</script>



<style rel="stylesheet/scss" lang="scss" scoped>
  .full {
    width: 100%;
  }

  .text {
    font-size: 30px;
  }

  .box-card {
    width: 85%;
  }

  .clearfix:after {
    clear: both
  }

  .bottomTips {
    padding: 30px;
  }

</style>
