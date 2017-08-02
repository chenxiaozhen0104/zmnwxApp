<template>
    <div>

        <AppHeader title="我的"></AppHeader>
        <div class="my-repaire">
            <image class="my-repaire-img" src="http://img.zmnbx.com//dist/Images/photo.png"></image>
            <div class="my-Name">
                <text class="my-Name-userName">{{user.name}}</text>
                <text class="my-Name-ServiceCompanyName">{{user.serviceCompany}}</text>
            </div>
        </div>
        <div class="my-form">
            <div class="my-basicInformation after" @click="jump('/my/basicInformation','基本信息')">
                <div class="my-form-left">
                    <image class="my-img" src="http://img.zmnbx.com//dist/Images/information.png"></image>
                    <text class="clickAfter">基本信息</text>
                </div>
                <image class="my-img-go" src="http://img.zmnbx.com//dist/Images/go.png"></image>
            </div>
            <div class="my-connect  after" @click="jump('/my/connect','联系我们')">
                <div class="my-form-left">
                    <image class="my-img" src="http://img.zmnbx.com//dist/Images/connect.png"></image>
                    <text class="clickAfter">联系我们</text>
                </div>
                <image class="my-img-go" src="http://img.zmnbx.com//dist/Images/go.png"></image>
            </div>
            <div class="my-changePwd  after" @click="jump('/my/changePwd','修改密码')">
                <div class="my-form-left">
                    <image class="my-img" src="http://img.zmnbx.com//dist/Images/changePwd.png"></image>
                    <text class="clickAfter">修改密码</text>
                </div>
                <image class="my-img-go" src="http://img.zmnbx.com//dist/Images/go.png"></image>
            </div>
            <div class="my-changePwd  after" @click="jump('/my/report','统计报表')">
                <div class="my-form-left">
                    <image class="my-img" src="http://img.zmnbx.com//dist/Images/statistical.png"></image>
                    <text class="clickAfter">统计报表</text>
                </div>
                <image class="my-img-go" src="http://img.zmnbx.com//dist/Images/go.png"></image>
            </div>
            <div class="my-changePwd  after" v-if="isManage()" @click="jump('/my/peopleList','人员管理')">
                <div class="my-form-left">
                    <image class="my-img" src="http://img.zmnbx.com//dist/Images/clickUser.png"></image>
                    <text class="clickAfter">人员管理</text>
                </div>
                <image class="my-img-go" src="http://img.zmnbx.com//dist/Images/go.png"></image>
            </div>
            <div class="my-quit  after" @click="quit">
                <div class="my-form-left">
                    <image class="my-img" src="http://img.zmnbx.com//dist/Images/quit.png"></image>
                    <text class="clickAfter">退出登录</text>
                </div>
                <image class="my-img-go" src="http://img.zmnbx.com//dist/Images/go.png"></image>
            </div>
        </div>
        <!--插件-->
        <Footer :active="2"></Footer>
        <app-detail :path="detail.path" :title="detail.title" @close="closeDetail" />
    </div>
</template>
<style>
    .clickAfter:active {
        background-color: #f5f5f5;
    }

    .my-header {
        width: 750px;
        height: 88px;
        justify-content: center;
        align-items: center;
        background-color: #0092FC;
    }

    .my-header-text {
        font-size: 40px;
        color: white;
    }

    .my-repaire {
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        height: 215px;
        border-bottom-style: solid;
        border-bottom-color: #ddd;
        border-bottom-width: 2px;
    }

    .my-user {
        flex-direction: row;
        align-items: center;
    }

    .my-repaire-img {
        width: 100px;
        height: 100px;
        margin-left: 33px;
        margin-right: 13px;
    }

    .my-Name {
        align-items: flex-start;
        justify-content: center;
    }

    .my-Name-userName,
    {
        margin-bottom: 10px;
    }

    .my-Name-userName,
    .my-Name-ServiceCompanyName {
        font-size: 30px;
        color: #333;
    }

    .my-form {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .my-img {
        width: 40px;
        height: 40px;
        margin-left: 33px;
        margin-right: 15px;
    }

    .clickAfter {
        font-size: 30px;
        color: #333;
    }

    .my-form-left {
        flex-direction: row;
    }

    .my-img-go {
        width: 40px;
        height: 40px;
        margin-right: 61px;
    }

    .my-basicInformation,
    .my-orderForm,
    .my-connect,
    .my-changePwd,
    .my-quit {
        flex-direction: row;
        border-bottom-style: solid;
        border-bottom-color: #ddd;
        border-bottom-width: 2px;
        height: 90px;
        width: 750px;
        align-items: center;
        justify-content: space-between;
    }

    .after:active {
        background-color: #f5f5f5;
    }
</style>
<script>
    import constants from "../store/constants"
    import detail from "../components/detail.vue"
    var modal = weex.requireModule('modal')
    var animation = weex.requireModule('animation')
    const storage = weex.requireModule('storage')
    export default {
        components: {
            'app-detail': detail
        },
        data() {
            return {
                showReturn: true,
                user: this.$store.state.user,

                detail: {
                    path: '',
                    title: ''
                }
            }
        },
        methods: {
            closeDetail() {
                this.detail.path = ''
            },
            jump(path, title) {
                this.detail.path = path
                this.detail.title = title
                console.log(this.detailPath)
            },
            isManage() {
                return (this.user.type & 4) > 0
            },
            quit() {
                modal.confirm({
                    message: '确定退出？',
                    duration: 0.3,
                    okTitle: '确认',
                    cancelTitle: '取消'
                }, (value) => {
                    // console.log(value)
                    if (value == "确认") {
                        // 清除存储数据
                        storage.getAllKeys(event => {
                            // modal.toast({ message: event.result })
                            if (event.result === 'success') {
                                event.data.forEach(m => storage.removeItem(m), () => { })
                            }
                        })
                        this.pageTo('/login')
                    }

                })
            }
        }
    }

</script>