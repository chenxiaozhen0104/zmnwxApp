<template>
  <div class="container">
    <image class="logo" src="http://img.zmnbx.com//dist/Images/login_logoservice.png" />
    <!-- 开始用户名和验证码 -->
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/user2.png"></image>
      </div>
      <input class="password-username" type="text" placeholder="请输入手机号" v-model="mobile" />
    </div>
    <div class="form-group">
      <div class="img">
        <image class="img-image" src="http://img.zmnbx.com//dist/Images/password.png"></image>
      </div>
      <input class="password-pwd" type="password" placeholder="请输入密码" v-model="password" />
    </div>
    <!-- 结束用户名和验证码 -->
    <!-- 登录按钮 -->
    <div class="password-btn" @click='submit' :disabled="!(mobile&&password)">
      <text class="password-btn-text">登 录</text>
    </div>
    <goingOn v-if="isShow" :title="loadingTitle"></goingOn>
    <!-- 底部 -->
    <div class="password-footer">
      <text class="password-footer-text" @click="pageTo('/forgetpwd')">忘记密码</text>
      <text class="password-footer-text password-footer-right" @click="pageTo('/login')">手机快捷登录</text>
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
  
  .password-username,
  .password-pwd {
    flex: 1;
    height: 70px;
    border: none;
    background-color: transparent;
  }
  
  .password-btn {
    width: 650px;
    height: 70px;
    background-color: rgb(45, 117, 200);
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    opacity: 1;
  }
  
  .password-btn:active {
    background-color: #3399ff;
  }
  
  .password-btn:disabled {
    opacity: 0.5;
  }
  
  .password-btn-text {
    color: white;
    font-size: 30px;
    font-weight: bold;
  }
  
  .password-footer {
    width: 650px;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .password-footer-text {
    font-size: 30px;
    color: rgb(44, 97, 208);
  }
  
  .password-footer-right {
    text-align: right;
  }
</style>

<script>
  import code from "../components/code.vue"
  import constants from '../store/constants'
  var modal = weex.requireModule('modal')
  const storage = weex.requireModule('storage')
  export default {
    components: { code },
    data: function () {
      return {
        mobile: '',
        password: '',
        btnDisabled: false,
        isShow: false,
        loadingTitle: '登陆中...'
      }
    },
    methods: {
      submit() {
        this.isShow = true
        this._post('/api/user/PasswordLogin', { userName: this.mobile, password: this.password }, (res) => {
          console.log(res,'1111111111')
          this.isShow = false
          if (res.error) {
            modal.toast({
              message: res.error,
              duration: 0.2
            })
          } else {
            // storage.setItem('name', res.name, event => { });
            // storage.setItem('token', res.id, event => { });
            // storage.setItem('userType', res.type, event => { });
            // this.pageTo('/workOrder')
            // storage.setItem('token', res.id, event => { });
            // storage.setItem('name', res.name, event => { });
            // storage.setItem('userType', res.type, event => { });
            // this._post('/api/user/Info', {}, (res) => {
            // 存储用户信息
         
            this.$emit(constants.event.USER_LOAD, res)
           
            // storage.setItem('tokenCompany', res.id + "," + res.serviceCompany, event => { });
            if (res.serviceCompany) {
              this.pageTo('/workOrder');
            } else {
              this.pageTo('/companyType')
            }
            // })
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