<template>
  <div class="container">
    <image class="logo" src="http://img.zmnbx.com//dist/Images/login_logoservice.png"></image>
    <!-- 输入手机号 -->
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/user2.png"></image>
      </div>
      <input class="login-txt-mobile" type="tel" placeholder="请输入手机号" v-model="mobile" />
      <code :mobile="mobile" :verify-user="true"></code>
      <!-- 验证码组件 -->
    </div>
    <!-- 结束输入手机号 -->
    <!-- 输入验证码 -->
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/code2.png"></image>
      </div>
      <input class="login-txt-code" type="tel" placeholder="请输入验证码" v-model="smscode" />
    </div>
    <!-- 结束输入手机号 -->
    <!-- 登录按钮 -->
    <div class="login-btn" @click='submit' :disabled="!(mobile&&smscode)">
      <text class="log-btn-txt">登 录</text>
    </div>
    <goingOn v-if="isShow" :title="loadingTitle"></goingOn>
    <!-- 底部 -->
    <div class="login-footer">
      <text class="login-footer-text" @click="pageTo('/register')">账号注册</text>
      <text @click="pageTo('/password')" class="login-footer-text login-footer-right">密码登录</text>
    </div>
    <!-- 结束底部 -->
  </div>
</template>

<style scoped>
  .container {
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
  }
  
  .logo {
    width: 206px;
    height: 205px;
    margin-bottom: 30px;
  }
  
  .img {
    position: relative;
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
  
  .login-txt-mobile,
  .login-txt-code {
    flex: 1;
    height: 70px;
    border: none;
    background-color: transparent;
  }
  
  .login-btn {
    width: 650px;
    height: 80px;
    background-color: rgb(45, 117, 200);
    margin-top: 20px;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .login-btn:active {
    background-color: #3399ff;
  }
  
  .login-btn:disabled {
    opacity: 0.5;
  }
  
  .log-btn-txt {
    color: white;
    font-size: 30px;
    font-weight: bold;
  }
  
  .login-footer {
    width: 650px;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .login-footer-text {
    font-size: 30px;
    color: rgb(44, 97, 208);
  }
  
  .login-footer-right {
    text-align: right;
  }
</style>

<script>
  // 组件的路径
  import code from "../components/code.vue"
  import constants from "../store/constants"
  const storage = weex.requireModule('storage')
  var modal = weex.requireModule('modal')
  var getui = weex.requireModule('GetuiModule')
  export default {
    components: { code },
    data: function () {
      return {
        mobile: '',
        smscode: '',
        loadingTitle: '登录中...',
        isShow: false
      }
    },
    methods: {
      submit() {
        var self = this;
        this.isShow = true
        self._post('/api/user/SMSLogin', { mobile: this.mobile, smsCode: this.smscode }, (res) => {

          this.isShow = false
          if (res.error) {
            modal.toast({
              message: res.error,
              duration: 0.2
            })
          } else {
            this.$emit(constants.event.USER_LOAD, res)
            if (res.serviceCompany) {
              this.pageTo('/workOrder');
            } else {
              this.pageTo('/companyType')
            }
          }
        }, () => {
          modal.toast({
            message: '服务器内部错误',
            duration: 0.2
          })
        })
      }
    }
  }

</script>