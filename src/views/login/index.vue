<template>
  <div id="particles" class="login-container">
    <canvas id="canvas-basic"></canvas>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form intro" auto-complete="on"
      label-position="left">
      <h3 class="title">Welcome To OceanMooc</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.account" name="account" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="pwdType" v-model="loginForm.password" name="password" auto-complete="on" placeholder="password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">账户: admin</span>
        <span> 密码: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {
    isvalidUsername
  } from '@/utils/validate'

  import {
    login
  } from '@/api/index'

  import {
    setStore
  } from '@/store/storage'

  // md5 加密
  import md5 from 'blueimp-md5'

  import $ from 'jquery'

  // 鼠标跟随背景效果
  // import particleground from '../../../static/js/jquery.particleground.min.js'

  import granim from '../../../static/js/granim.min.js'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          account: 'admin',
          password: ''
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePass
          }]
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    mounted() {
      // $('#particles').particleground({
      //   dotColor: '#5cbdaa',
      //   lineColor: '#5cbdaa'
      // });
      // $('.intro').css({
      //   'margin-top': -($('.intro').height() / 2)
      // });
      this.$notify.info({
        title: '提示',
        message: '测试账号：admin 测试密码：123456',
        position: 'top-left'
      });
      var granimInstance = new Granim({
        element: '#canvas-basic',
        name: 'basic-gradient',
        direction: 'left-right', // 'diagonal', 'top-bottom', 'radial'
        opacity: [1, 1],
        isPausedWhenNotInView: true,
        states: {
          "default-state": {
            gradients: [
              ['#ABDCFF', '#0396FF'],
              ['#81FFEF', '#F067B4'],
              ['#FFF6B7', '#F6416C']
            ]
          }
        }
      });
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        if (this.loginForm.account == '' ||
          this.loginForm.password == '') {
          this.$message({
            message: '请输入账号密码！',
            type: 'error'
          });
          return;
        }
        this.loading = true;
        var params = {
          account: this.loginForm.account,
          password: md5(this.loginForm.password)
        };
        login(params).then(resp => {
          this.loading = false;
          if (resp.code == 0) {
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            console.log(resp.code)
            setStore('token', resp.data.token);
            setStore('userInfo', resp.data)
            this.$router.push({
              path: '/'
            });
          } else {
            this.$message({
              message: resp.msg,
              type: 'error'
            })
          }
        })
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $light_gray:#eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        // color: #2d3a4b;
        height: 47px;

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    // background-color: $bg;
    background-color: #fff;
    // background-image: linear-gradient(to bottom right, #736EFE 0%, #5EFCE8 100%);

    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      // color: $dark_gray;
      color: $light_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      // color: '#ffffff';
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

</style>

<style>
  /* #particles {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .intro {
    position: absolute;
    left: 0;
    top: 50%;
    padding: 0 20px;
    width: 100%;
    z-index: 1;
    text-align: center;
  } */

  #canvas-basic {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

</style>
