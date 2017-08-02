<template>
  <div class="container">
    <image class="logo" src="http://img.zmnbx.com//dist/Images/login_logoservice.png" />
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/user2.png"></image>
      </div>
      <input class="register-txt-realname" type="text" placeholder="请输入真实姓名" v-model='realName' />
    </div>
    <!-- 输入手机号 -->
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/mobile1.png"></image>
      </div>
      <input class="register-txt-mobile" type="tel" placeholder="请输入手机号" v-model='mobile' />
      <code :mobile="mobile"></code>
    </div>
    <!-- 结束输入手机号 -->
    <!-- 输入验证码 -->
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/code2.png"></image>
      </div>
      <input class="register-txt-code" type="tel" placeholder="请输入验证码" v-model='code' />
    </div>
    <!-- 结束输入验证码 -->
    <!-- 输入登录密码 -->
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/password.png"></image>
      </div>
      <input type="password" class="register-txt-pwd" placeholder="请输入登录密码" v-model='password' @blur="onblur" />
    </div>
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/password.png"></image>
      </div>
      <input type="password" class="register-txt-repwd" placeholder="请再次输入登录密码" v-model='repassword' />
    </div>
    <!-- 结束输入登录密码 -->
    <!-- 注册按钮 -->
    <div class="register-btn" @click='submit' :disabled="!(realName && mobile && code && password && repassword)">
      <text class='register-txt-register'>注 册</text>
    </div>
    <goingOn v-if="isShow" :title="loadingTitle"></goingOn>
    <!-- 底部 -->
    <div class="footer" @click="pageTo('/login')">
      <text class="register-txt">已有账号？</text>
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
    margin-bottom: 30px;
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
  
  .register-txt-mobile,
  .register-txt-code,
  .register-txt-pwd,
  .register-txt-repwd,
  .register-txt-realname {
    flex: 1;
    height: 70px;
    border: none;
    background-color: transparent;
  }
  
  .tel-text {
    position: absolute;
    left: 50px;
    top: 0;
    height: 70px;
    border: none;
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
  
  .register-btn:active {
    background-color: #3399ff;
  }
  
  .register-btn:disabled {
    opacity: 0.5;
  }
  
  .footer {
    width: 650px;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 30px;
  }
  
  .register-txt {
    color: rgb(45, 117, 200);
    font-size: 30px;
  }
  
  .register-btn {
    align-items: center;
    justify-content: center;
    background-color: rgb(45, 117, 200);
    width: 650px;
    margin-top: 20px;
    height: 70px;
    opacity: 1;
  }
  
  .register-txt-register {
    color: white;
    font-size: 30px;
    font-weight: bold;
  }
</style>

<script>
  // 组件的路径

  import code from "../components/code.vue"
  import constants from "../store/constants"
  const storage = weex.requireModule('storage')
  var modal = weex.requireModule('modal')
  export default {
    components: { code },
    data: function () {
      return {
        mobile: '',
        code: '',
        password: '',
        repassword: '',
        realName: '',
        isShow: false,
        loadingTitle: '注册中...'
      }
    },
    methods: {
      submit() {
        if (this.password != this.repassword) {
          modal.toast({
            message: '密码前后输入不一致',
            duration: 0.2
          })
          return
        }
        this.isShow = true
        this._post('/api/user/register', { password: this.password, mobile: this.mobile, smsCode: this.code, realName: this.realName }, (res) => {
          // storage.setItem('userType', res.type, event => { });
          this.isShow = false
          if (res.error) {
            modal.toast({
              message: res.error,
              duration: 0.2
            })
          } else {
            // storage.setItem('name', res.name, event => { });
            // storage.setItem('token', res.id, event => { });
            this.$emit(constants.event.USER_LOAD, res)
            this.pageTo('/companyType');
          }
        }, (res) => {
          this.isShow = false
          modal.toast({
            message: '服务器内部错误',
            duration: 0.2
          })
        })
      },
      onblur() {
        if (this.password.length < 6 || this.password.length > 18) {
          modal.toast({
            message: '请输入6-18个字符',
            duration: 0.2
          })
        }
        return
      }
    }
  }

</script>