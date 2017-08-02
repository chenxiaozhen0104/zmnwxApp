<template>
    <div>
        <div class="user-list">
            <text :class="['user-list-item',selectUser.id==user.id?'user-list-item-active':'']" v-for="user in users" @click="select(user)">{{user.name}}({{user.num|ordernum}})</text>
        </div>

        <div class="orderDetail-bottom">
            <text class="orderDetail-cancel" @click='submit'>确定派单</text>
        </div>
    </div>
</template>
<style src="./detail.css" />
<style>
    .user-list-footer {
        height: 100px;
    }

    .btn-default {
        color: #fff;
        font-size: 26px;
        text-align: center;
        height: 70px;
        width: 720px;
        background-color: #3879d9;
    }

    .user-list {
        padding-top: 30px;
        padding-left: 30px;
        flex-wrap: wrap;
        flex: 1;
        flex-direction: row;
    }

    .user-list-item {
        height: 70px;
        width: 180px;
        white-space: inherit;
        border-width: 2px;
        border-style: solid;
        border-color: #0092FC;
        color: #0092FC;
        font-size: 30px;
        line-height: 68px;
        text-align: center;
        margin-right: 30px;
        margin-bottom: 30px;
    }

    .user-list-item-active {
        color: #fff;
        background-color: #0092FC;
    }
</style>
<script>
    import C from '../../store/constants'
    var modal = weex.requireModule('modal')
    export default {
        data() {
            return {
                users: [],
                orderId: this.$route.params.id,
                selectUser: {}
            }
        },
        filters: {
            ordernum(num) {
                return num == 0 ? "空闲" : num
            }
        },
        methods: {
            select(user) {
                this.selectUser = user
            },
            emitClose() {
                this.$emit('close')
            },
            submit() {
                this._get("/api/order/dispatch", {
                    "orderId": this.orderId,
                    "serviceUserId": this.selectUser.id,
                    "serviceUserName": this.selectUser.name,
                    "serviceUserPhone": this.selectUser.phone
                }, res => {
                    modal.toast({
                        message: res.error || "执行成功",
                        duraiton: 0.2
                    })
                    this.$events.emit(C.event.DETAIL_BACK)
                })
            }
        },
        created() {
            console.log('指派页面初始化')
            this._post("/api/user/ServiceCompanyUserList", {}, res => {
                if (res.error) {
                    modal.toast({
                        message: res.error,
                        duration: 0.2
                    })
                } else {
                    this.users = res;
                }
            })
        }
    }

</script>