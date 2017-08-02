<template>
  <div class="container">
    <!-- 输入手机号 -->
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/user2.png"></image>
      </div>
      <input class="forgetpwd-phone" type="tel" placeholder="请输入注册手机号" v-model='mobile' />
      <code :mobile="mobile"></code>
    </div>
    <!-- 结束输入手机号 -->
    <!-- 输入验证码 -->
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/code2.png"></image>
      </div>
      <input class="forgetpwd-code" type="tel" placeholder="请输入验证码" v-model='code' />
    </div>
    <!-- 结束输入验证码 -->
    <!-- 输入登录密码 -->
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/password.png"></image>
      </div>
      <input type="password" class="forgetpwd-newCode" placeholder="请输入新的登录密码" v-model='newPassword' @blur="onblur" />
    </div>
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/password.png"></image>
      </div>
      <input type="password" class="forgetpwd-reNewCode" placeholder="请再次输入登录密码" v-model='reNewPassword' />
    </div>
    <!-- 结束输入登录密码 -->
    <!-- 注册按钮 -->
    <div class='set-newpwd' @click='submit' :disabled="!(mobile&&code&&newPassword&&reNewPassword)">
      <text class='newText'>设置新密码</text>
    </div>
    <goingOn v-if="isShow" :title="loadingTitle"></goingOn>
    <!-- 底部 -->
    <div class="forgetpwd-footer">
      <text class="forgetpwd-footer-text" @click="pageTo('/login')">返回登录</text>
    </div>
    <!-- 结束底部 -->
  </div>
</template>

<style>
  .container {
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
  }
  
  .logo {
    width: 206px;
    height: 205px;
  }
  
  .form-group {
    flex-direction: row;
    width: 650px;
    height: 70px;
    margin-top: 20px;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(162, 162, 162);
    align-items: center;
    padding-right: 5px;
  }
  
  .forgetpwd-phone,
  .forgetpwd-code,
  .forgetpwd-newCode,
  .forgetpwd-reNewCode {
    flex: 1;
    height: 70px;
    border: none;
    background-color: transparent;
  }
  
  .img {
    position: relative;
    top: 0;
    left: 0;
    width: 70px;
    height: 70px;
  }
  
  .img-image {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 15px;
    bottom: 20px;
  }
  
  .set-newpwd {
    width: 650px;
    height: 70px;
    background-color: rgb(45, 117, 200);
    margin-top: 20px;
    opacity: 1;
    align-items: center;
    justify-content: center;
  }
  
  .newText {
    font-size: 30px;
    color: white;
  }
  
  .set-newpwd:active {
    background-color: #3399ff;
  }
  
  .set-newpwd:disabled {
    opacity: 0.5;
  }
  
  .forgetpwd-footer {
    width: 650px;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .forgetpwd-footer-text {
    color: rgb(45, 117, 200);
    font-size: 30px;
    padding-left: 30px;
  }
</style>

<script>
  // 组件的路径
  import code from "../components/code.vue"
  import constants from "../store/constants"
  var modal = weex.requireModule('modal')
  export default {
    components: { code },
    data: function () {
      return {
        mobile: '',
        code: '',
        newPassword: '',
        reNewPassword: '',
        btnDisabled: false,
        isShow:false,
        loadingTitle: '提交中...'
      }
    },
    methods: {
      submit() {
        if (this.newPassword != this.reNewPassword) {
          modal.toast({
            message: '密码前后输入不一致',
            duration: 0.2
          })
          return
        }
        this.isShow = true
        this._post('/api/user/forgetPassword', {
          mobile: this.mobile,
          smsCode: this.code,
          password: this.newPassword
        }, (res) => {
          this.isShow = false
          if (res.error) {
            modal.toast({
              message: res.error,
              duration: 0.2
            })
          } else {
            modal.toast({
              message: '设置新密码成功',
              duration: 0.2
            })
            this.pageTo('/login');
          }
        }, () => {
          this.isShow = false
          modal.toast({
            message: '服务器内部错误',
            duration: 0.2
          })
        })
      },
      onblur() {
        if (this.newPassword.length < 6 || this.newPassword.length > 18) {
          modal.toast({
            message: '请输入6-18个字符',
            duration: 0.2
          })
        }
      }
    }
  }

</script>