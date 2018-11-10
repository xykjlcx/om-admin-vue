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
                <span class="text" style="float: left;margin:3px"><b>{{ delegateTitle }}</b></span>
              </el-row>
            </el-col>
            <el-col :span="20">
              <!-- 确定添加课程按钮 -->
              <el-button style="float: right;" type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="okBtn">{{
                delegateBtnText }}</el-button>
            </el-col>
          </el-row>
        </div>

        <!-- 内容区域 -->
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <!-- 上传课程图片 -->
            <el-form-item label="课程图片">
              <!-- 视频图上传 -->
              <el-upload class="upload-demo" action="http://127.0.0.1:8086/admin/main/upload" :on-success="uploadImgSuccess"
                name="file">
                <img v-if="form.previewImg" :src="this.form.previewImg" width="100">
                <el-button plain>图片上传</el-button>
              </el-upload>
            </el-form-item>

            <!-- 上传课程视频 -->
            <el-form-item label="课程视频">
              <!-- 视频上传 -->
              <el-upload class="upload-demo" action="http://127.0.0.1:8086/admin/main/upload" :on-success="uploadVideoSuccess"
                name="file">
                <video v-if="form.videoUrl" :src="this.form.videoUrl" width="250"></video>
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
            <el-row :gutter="60">
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
                  <el-select v-model="currentTwo" placeholder="请选择" class="full" @change="selectTwo">
                    <el-option v-for="item in classifyTwo[currentOne-1]" :key="item.id" :label="item.classifyName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row :gutter="60">
              <el-col :span="24">
                <el-form-item label="级别" required="">
                  <el-select v-model="form.level" placeholder="请选择" class="full">
                    <el-option v-for="item in courseLevel" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col>
                <el-form-item label="课程时长(分钟)" required="">
                  <el-slider v-model="form.duration" show-input :max="200" @change="durationChange">
                  </el-slider>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="60">
              <el-col :span="24">
                <el-form-item label="是否免费">
                  <el-radio-group v-model="isFree">
                    <el-radio label="免费"></el-radio>
                    <el-radio label=收费></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="价格" v-if="isFree == '免费' ? false : true">
                  <el-input v-model="form.price"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item label="是否上架" required>
                  <el-radio-group v-model="isPutaway">
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
          填写完毕后，<b>点击右上角的{{ delegateBtnText }}</b>，完成课程新增。
        </el-row>

      </el-card>
    </el-row>

  </div>
</template>

<script>
  import {
    getAllClassify,
    addAndEditCourse,
    getCourseOneById
  } from '@/api/index'



  export default {
    name: 'CourseDelegate',
    // 父子组件通信
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        fullscreenLoading: false,
        labelPosition: 'left',
        // isFree的显示变量
        isFree: '免费',
        // isPutaway的显示变量
        isPutaway: '上架',
        delegateTitle: '新增课程',
        delegateBtnText: '确定添加',
        delegateCourseId: -1,
        form: {
          courseName: '',
          courseDesc: '',
          classifyId: 0,
          duration: 0,
          level: '',
          previewImg: '',
          videoUrl: '',
          isPutaway: -1,
          weight: 0,
          price: 0,
          isFree: -1,
        },
        classifyOne: [],
        currentOne: '',
        classifyTwo: [
          []
        ],
        currentTwo: '',
        courseLevel: [{
            value: '初级',
            label: '初级'
          },
          {
            value: '中级',
            label: '中级'
          },
          {
            value: '高级',
            label: '高级'
          },
        ],
        value: 0
      }
    },
    created() {
      if (this.isEdit) {
        // 跳转到编辑页面
        // 获取路由参数
        this.delegateTitle = '课程编辑';
        this.delegateBtnText = '确定修改';
        const id = this.$route.params && this.$route.params.id
        this.delegateCourseId = id;
        // 查询该课程的信息填充到ui
        this.fetchCourseItem();
      } else {
        // 默认新增
      }
    },
    mounted() {
      this.fetchAllClassify();
    },
    methods: {
      durationChange(val) {
        this.form.duration = val;
      },
      selectOne(index) {
        console.log("一级分类：" + index)
        this.currentTwo = 1;
      },
      selectTwo(index) {
        console.log("二级分类：" + index)
      },
      uploadVideoSuccess(resp) {
        if (resp.code == 0) {
          this.form.videoUrl = resp.data;
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
          this.form.previewImg = resp.data;
          this.$message({
            message: '图片上传成功',
            type: 'success'
          });
        } else {
          this.$message.error('图片上传失败');
        }
      },
      /**
       * 获取分类数据
       */
      fetchAllClassify() {
        getAllClassify().then(resp => {
          this.classifyOne = resp.data.oneLevel
          this.classifyTwo = resp.data.twoLevel
          // console.log(this.classifyTwo)
          if (this.isEdit) {
            this.handleRenderUiClassify();
          }
        })
      },
      // 编辑课程时，获取课程信息 填充
      fetchCourseItem() {
        var params = {
          courseId: this.delegateCourseId
        };
        getCourseOneById(params).then(resp => {
          this.form = resp.data;
          // 处理是否上架 问题
          if (this.form.putawayS) {
            this.isPutaway = '上架';
          } else {
            this.isPutaway = '入库'
          }
          // 处理是否免费问题
          if (this.form.isFree == 0) {
            this.isFree = '免费';
          } else {
            this.isFree = '收费';
          }
          this.form.duration = parseInt(this.form.duration)
        });
      },
      // 处理填充ui时的默认分类
      handleRenderUiClassify() {
        var classifyId = this.form.classifyId;
        var parentClassId = 0;
        var childClassId = 0;
        // 处理分类问题
        if (this.classifyOne.length != 0 &&
          this.classifyTwo.length != 0) {
          for (var i = 0; i < this.classifyOne.length; i++) {
            if (this.classifyOne[i].dbId == classifyId) {
              parentClassId = i + 1;
              break;
            } else {
              for (var j = 0; j < this.classifyTwo[i].length; j++) {
                if (this.classifyTwo[i][j].dbId == classifyId) {
                  parentClassId = i + 1;
                  childClassId = j + 1;
                  break;
                }
              }
            }
          }
        } else {
          console.log("分类数据为空");
        }
        console.log("一级： " + parentClassId + ",二级：" + childClassId)
        this.currentOne = parseInt(parentClassId);
        this.currentTwo = parseInt(childClassId);
      },
      okBtn() {
        this.addAndEditCourses();
      },
      addAndEditCourses() {
        // 确定新增课程
        if (this.form.imageUrl == '' || this.form.videoUrl == '') {
          this.$message.error("请完成课程预览图和视频的上传");
        } else {
          // 课程数据处理
          // 获取分类id
          var classifyId = 0;
          if (this.currentOne == '') {
            this.$message.error('请选择分类')
            return;
          } else {
            if (this.currentTwo == '') {
              // 没有选择二级分类
              classifyId = this.classifyOne[this.currentOne - 1].dbId;
            } else {
              // 选择二级分类
              classifyId = this.classifyTwo[this.currentOne - 1][this.currentTwo - 1].dbId;
            }
          }
          console.log("您选择的分类id为：" + classifyId)
          this.form.classifyId = classifyId;
          // 处理是否上架
          var isPutawayNum = -1;
          if (this.isPutaway == '上架') {
            isPutawayNum = 0;
          } else if (this.isPutaway == '入库') {
            isPutawayNum = 1;
          } else {
            console.log("判断是否上架失败");
          }
          this.form.isPutaway = isPutawayNum;
          console.log("是否上架为：" + this.form.isPutaway)
          // 处理是否免费和价格
          var isFreeNum = -1;
          var price = -1;
          if (this.isFree == '免费') {
            isFreeNum = 0;
            price = 0; // 若免费，则默认价格为0
          } else if (this.isFree == '收费') {
            isFreeNum = 1;
            price = this.form.price;
          } else {
            console.log("判断是否收费失败");
          }
          this.form.isFree = isFreeNum;
          this.form.price = price;
          console.log("是否收费为：" + this.form.isFree)

          console.log("判断前打印：" + this.form)

          if (this.form.courseName == '' ||
            this.form.courseDesc == '' ||
            this.form.classifyId == 0 ||
            this.form.level == '' ||
            this.form.duration == 0 ||
            this.form.isFree == -1 ||
            this.form.isPutaway == -1) {
            this.$message.error("请完整填写课程信息");
            return;
          } else {
            this.fullscreenLoading = true;
            addAndEditCourse(this.form).then(resp => {
              this.fullscreenLoading = false;
              if (resp.code == 0) {
                this.$message({
                  message: this.delegateTitle + '成功',
                  type: 'success'
                });
                // 添加完成后，跳转至所有课程页面
                this.$router.push({
                  path: this.redirect || '/courses/all'
                })
              } else {
                this.$message.error(resp.msg);
              }
            });
          }

        }
      },
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
    width: 90%;
  }

  .clearfix:after {
    clear: both
  }

  .bottomTips {
    padding: 30px;
  }

</style>
