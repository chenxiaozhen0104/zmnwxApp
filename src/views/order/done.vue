<template>
    <div>
        <div style="margin-top:20px;flex:1">
            <div class="ctrl-group">
                <text class="form-label">结束工作状态:</text>
                <div class="status-list">
                    <text :class="['status-list-item',selectStatus.val==item.val?'status-list-item-active':'']" v-for="item in status" @click="selectStatus=item">{{item.name}}</text>
                </div>
            </div>
            <div class="ctrl-group" v-if="selectStatus.val==64">
                <text class="form-label">维修费用(单位：元):</text>
                <input class="descript-text" v-model="orderAmount" type="tel" placeholder="请输入维修费用..." />
            </div>
            <div class="ctrl-group">
                <text class="form-label">备注：</text>
                <input class="descript-text" autofocus="autofocus" v-model='selectStatus.description' :placeholder="selectStatus.placeholder"
                />
            </div>
        </div>
        <div class="done-bottom">
            <text :class="['orderDetail-cancel',selectStatus.description?'':'disabled']" @click='submit'>{{selectStatus.submit}}</text>
        </div>
    </div>
</template>
<style src="./detail.css" />
<style>
    .done-bottom {
        height: 100px;
        padding: 18px;
    }

    .user-list-footer {
        height: 100px;
    }

    .form-label {
        font-size: 32px;
    }

    .ctrl-group {
        margin-top: 30px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .disabled {
        opacity: 0.6;
    }

    .btn-default {
        color: #fff;
        font-size: 26px;
        text-align: center;
        height: 70px;
        width: 720px;
        background-color: #3879d9;
    }

    .status-list {
        padding-top: 30px;
        flex-direction: row;
        padding-left: 20px;
        padding-right: 20px;
    }

    .status-list-item {
        flex: 1;
        margin-left: 10px;
        margin-right: 10px;
        height: 70px;
        border-width: 2px;
        border-style: solid;
        border-color: #0092FC;
        color: #0092FC;
        font-size: 30px;
        line-height: 68px;
        text-align: center;
    }

    .status-list-item-active {
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
                status: [{ name: '完成', val: 64, placeholder: '请输入完成工作备注...', submit: '完成工作', description: '' },
                { name: '未解决', val: 128, placeholder: '请输入未解决原因...', submit: '提交', description: '' },
                { name: '关闭', val: 512, placeholder: '请输入关闭工单原因...', submit: '确认关闭工单', description: '' }],
                orderId: this.$route.params.id,
                selectStatus: {},
                selectUser: {},
                orderAmount: 0
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
                if (!this.selectStatus.description) {
                    return
                }
                this._get("/api/order/submitstate", {
                    orderId: this.$route.params.id,
                    description: this.selectStatus.description,
                    state: this.selectStatus.val,
                    level: 5,
                    amount: this.orderAmount,
                    toUserId: this.$store.state.user.id,
                    appType: 2
                }, res => {
                    modal.toast({
                        message: res.error || '执行成功',
                        duraiton: 0.2
                    })
                    this.$events.emit(C.event.DETAIL_BACK)
                })
            }
        },
        created() {
            console.log('工作结束页面初始化')
            this.selectStatus = this.status[0]
        }
    }

</script>