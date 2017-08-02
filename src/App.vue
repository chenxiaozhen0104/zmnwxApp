<template>
  <div @androidback="back">
    <router-view @onuserload="userload" style="flex:1"></router-view>
  </div>
</template>

<script>
  import config from 'config'
  const animation = weex.requireModule('animation')
  import C from './store/constants'
  var storage = weex.requireModule('storage')
  export default {
    methods: {
      data() {
        return {
          user: null
        }
      },
      back() {
        this.$events.emit(C.event.ANDROID_BACK)
      },
      userload(user) {
        this.user = user
        this.$store.commit(C.store.SET_TOKEN, user.id)
        this.$store.commit(C.store.SET_USER, user)
        try {

          let getuiType = (user.type & 4) > 0 ? '2' : '1'
          console.log('个推-Tag:', getuiType, user.serviceCompanyId)
          weex.requireModule('LocationModule').start(`${config.server}/api/user/UserPosition`, user.id)
          weex.requireModule('GetuiModule').setTag(`${user.serviceCompanyId},${getuiType},${user.id}`)
        } catch (error) {
          console.warn("初始化错误",error)
        }
      }
    },
    created() {

      storage.getItem(C.store.USER, e => {
        if (e.result == C.SUCCESS) {
          let user = JSON.parse(e.data)
          this.userload(user)
          if (!user.serviceCompany) {
            this.$router.push('/companyType')
          } else {
            this.$router.push('/')
          }
        } else {
          this.$router.push('/login')
        }
      })
      this.$events.on(C.event.ANDROID_BACK, () => {
        if (this.$store.state[C.store.PAGE] == 0) {
          weex.requireModule('AndroidModule').close()
        }
      })
    }
  }

</script>