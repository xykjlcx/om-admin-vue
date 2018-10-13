<template>
  <div class="app-container">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="课程名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="课程描述">
        <el-input type="textarea" v-model="formLabelAlign.region"></el-input>
      </el-form-item>

      <el-row>
        <el-form-item label="课程级别">
          <!-- <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
      </el-row>

          <el-row :gutter="20">

        <el-col :span="12">
<el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>        </el-col>
         <el-col :span="12">
                            <el-input v-model="formLabelAlign.name"></el-input>
        </el-col>
        
    </el-row>

    </el-form>



  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition: 'left',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        options: [{
          value: '选项1',
          label: '初级'
        }, {
          value: '选项2',
          label: '中级'
        }, {
          value: '选项3',
          label: '高级'
        }],

      }
    }
  }

</script>
