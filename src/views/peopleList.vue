<template>
    <div class="map-container">

        <!--列表页面-->
        <div style="flex:1">
            <list class="map-user-list">
                <header>
                    <div class="map-list-list">
                        <text class="map-btn-user-text map-btn-content">姓名</text>
                        <text class="map-btn-user-num map-btn-content">工单数量</text>
                        <text class="map-btn-user-phone map-btn-content">手机号</text>
                        <text class="map-btn-user-type map-btn-content">管理员</text>
                        <text class="map-btn-user-btn map-btn-content">按钮操作</text>
                    </div>
                </header>
                <cell v-for="(item,index) in userLists">
                    <div class="map-list-list">
                        <div class="map-list-left" @click="showDetail(item)">
                            <text class="map-btn-user-text map-btn-content">{{item.RealName}}</text>
                            <text class="map-btn-user-num1 map-btn-content">{{(item.Num>0)?item.Num+'单':'空闲'}}</text>
                            <!--打电话-->
                            <Call class="map-btn-user-tel" :telephoneNumber="item.Phone"></Call>
                            <!--结束打电话-->
                            <text class="map-btn-user-type map-btn-content">{{(item.RoleKey & 4)?'是':'否'}}</text>
                        </div>
                        <button class="map-btn  map-btn-user-btn" @click="btnClick(item,index)" :style="{'backgroundColor':color[item.UserState?0:1]}">
                            <text class="map-btn-text">{{item.UserState?'审核':'删除'}}</text>
                        </button>
                    </div>
                </cell>
            </list>
        </div>
        <app-detail :path="detail.path" :title="detail.title" @close="hideDetail" />
        <!--<div class="map-btnWork" @click="btnWork">
            <text class="map-btnWork-text">管理</text>
        </div>-->
    </div>
</template>
<script>
    import config from 'config'
    import detail from "../components/detail.vue"
    const modal = weex.requireModule('modal')
    const storage = weex.requireModule('storage')
    var timeId;
    export default {
        components: {
            'app-detail': detail
        },
        data() {
            return {
                detail: {
                    path: '',
                    title: ''
                },
                users: [],
                userLists: [],
                src: [1, 2, 3],
                userId: '',
                btnContent: '',
                colors: ['#333333', '#3879D9'],
                color: ['#0092FC', '#D9534F'],
                showList: true,
                userState: '',
                // btnShow: false,
                longpressBtn: ""
            }
        },
        methods: {
            showDetail(item,e) {
                console.log(item)
                this.detail.path = '/my/peopleList/map/' + item.UserId + '/' + item.RealName
                this.detail.title = item.RealName
            },
            hideDetail() {
                this.detail.path = ''
            },
            // 长按编辑
            // btnWork(item) {
            //     this.btnShow = !this.btnShow;
            // },
            // 按钮点击
            btnClick(item) {
                if (item.UserState == 0) {
                    this.userState = 3;
                    this.deleteBtn(item)
                }
                if (item.UserState == 1) {
                    this.check(item)
                }
            },
            deleteBtn(item) {
                modal.confirm({
                    message: '确定删除？',
                    duration: 0.3,
                    okTitle: '确定',
                    cancelTitle: '取消'
                }, (value) => {
                    if (value == "确定") {
                        this.userState = 3;
                        this.judge(this.userState, item)
                    }
                })
            },
            onSwipe(event, item) {
                modal.toast({
                    message: item.RealName + event,
                    duration: 0.2
                })
                if (e.direction == 'left') {

                }
            },
            // 审核
            check(item) {
                modal.confirm({
                    message: '审核通过？',
                    duration: 0.3,
                    okTitle: '通过',
                    cancelTitle: '不通过'
                }, (value) => {
                    if (value == "通过") {
                        this.userState = 0;
                        this.judge(this.userState, item)
                    } else if (value == "不通过") {
                        this.userState = 3;
                        this.judge(this.userState, item)
                    }
                })
            },
            // 判断
            judge(status, item) {
                // status用来接收userState传来的值
                var self = this
                this._post("/api/User/UpdateUserState", { userState: status, userId: item.UserId }, res => {
                    console.log(res)
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        modal.toast({
                            message: res.success,
                            duration: 0.2
                        })
                        self.getUser()//重新刷新
                    }
                })
            },
            getUser() {
                this._post('/api/user/GetUserList', { userId: this.userId, appType: 2 }, (res => {
                    console.log(res)
                    this.userLists = res;
                    this.users = res.filter(m => m.Longitude && m.Latitude)
                    this.nameMap = res.filter(m => m.RealName)
                    storage.setItem('nameMap', res.nameMap, event => { });
                }))
            },
            move(dateTime, index) {
                modal.toast({
                    message: index,
                    duration: 0.2
                })
                this.imgBlue = true
                this.center = [dateTime.Latitude, dateTime.Longitude]
            },
        },
        created() {
            // this.beginTime=this.getNowFormatDate()+' '+'08:00:00'
            // this.endTime=this.getNowFormatDate()+' '+'20:00:00'
            storage.getItem('userId', m => {
                this.userId = m.data
                this.getUser()
            })
            timeId = setInterval(() => {
                this.getUser()
            }, 1000 * 30)

        },
        beforeDestroy() {
            clearInterval(timeId)
        },
    }

</script>

<style>
    .map-user-list {
        flex: 1;
        width: 750px;
        justify-content: center;
        margin-bottom: 10px;
    }
    
    .map-container {
        width: 750px;
        position: inherit;
        align-items: center;
    }
    
    .map-btnWork {
        height: 88px;
        width: 140px;
        position: absolute;
        right: 10px;
        top: -35px;
        justify-content: center;
        align-items: center;
    }
    
    .map-btnWork-text {
        color: red;
        font-size: 26px;
    }
    
    .map-btn {
        width: 120px;
        height: 60px;
        justify-content: center;
        align-items: center;
        background-color: #3879d9;
    }
    
    .map-list-list {
        flex-wrap: wrap;
        flex-direction: row;
        width: 750px;
        display: flex;
        justify-content: center;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: #ddd;
        align-items: center;
        height: 80px;
        background-color: white;
        padding-right: 5px;
        padding-left: 5px;
    }
    
    .map-list-list:active {
        background-color: #f1f1f1;
    }
    
    .map-btn-content,
    .map-btn-content1 {
        font-size: 30px;
        /*height: 78px;
        line-height: 78px;*/
        padding-top:15px;
        padding-bottom:15px;
    }
    
    .map-btn-content1 {
        color: #3879d9;
    }
    
    .map-btn-content1:active {
        color: red;
    }
    
    .map-btn-content {
        color: #333;
    }
    
    .map-list-left {
        flex: 12;
        flex-direction: row;
        align-items: center;
    }
    
    .map-list-left:active {
        background-color: #f1f1f1;
    }
    
    .map-btn-user-text {
        flex: 2;
        text-align: center;
        flex-wrap:wrap;
    }
    
    .map-btn-user-num {
        flex: 2.5;
        text-align: center;
    }
    
    .map-btn-user-num1 {
        padding-left: 80px;
        flex: 2.5;
    }
    
    .map-btn-user-tel {
        flex: 3;
    }
    
    .map-btn-user-phone {
        flex: 3;
        text-align: center;
    }
    
    .map-btn-user-type {
        flex: 2;
        text-align: center;
    }
    
    .map-btn-user-btn {
        flex: 2.5;
        text-align: center;
    }
    
    .map-btn-text {
        font-size: 30px;
        color: white;
    }
    
    .map-change-text {
        color: white;
        font-size: 30px;
    }
    
    .map-change:active {
        opacity: 0.8;
    }
</style>