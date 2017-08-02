<template>
    <div class="container">
        <!--更改设备名称-->
        <div class="deviceDetail-category">
            <div class="deviceDetail-serach">
                <div class="import">
                    <input class="deviceDetail-text" type="text" placeholder="请输入安装地址" v-model="val" />
                    <div class="clear-box" @click="clearContent" v-if="val.length">
                        <text class="clear">清空</text>
                    </div>
                </div>
            </div>
            <div class="deviceDetail-content" v-if="!val.length && positionList.length">
                <!--历史记录-->
                <div class="history">
                    <!--历史头部-->
                    <div class="history-header">
                        <text class="history-header-text">输入记录</text>
                        <div class="delete-box" @click="clearHistory">
                            <image class="delete-img" src="http://img.zmnbx.com//dist/Images/deleteGrey.png"></image>
                        </div>
                    </div>
                    <!--存储记录-->
                    <div class="history-content">
                        <div class="history-details-content">
                            <div class="history-details-imgBox">
                                <image class="history-details-img" src="http://img.zmnbx.com//dist/Images/history.png"></image>
                            </div>
                            <div class="history-record" v-for="item in positionList">
                                <text class="history-text" @click="add(item)">{{item}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--保存按钮-->
        <div class="footer-bottom">
            <button class="footer-box" @click="saveChange">
                <text class="footer-sub">保存</text>    
            </button>
        </div>
    </div>
</template>

<style src="./device.css" />

<script>
    import C from '../../store/constants'
    const modal = weex.requireModule('modal')
    const storage = weex.requireModule('storage')
    const categoryAll = []
    export default {
        data() {
            return {
                id: this.$route.params.id,
                val: this.$route.params.value == 'null' ? '' : this.$route.params.value,
                positionList: [],
                position: ''
            }
        },
        methods: {
            add(item) {
                this.val = item
            },
            clearContent() {
                this.val = ''
            },
            saveChange() {
                this.saveHistory();
                if (this.id == 0) {
                    this.$events.emit(C.event.DETAIL_BACK, this.val)
                    return
                }
                this._post("/api/Common/UpdateFieldValue",
                    { table: 'device', fileName: 'Position', fileValue: this.val, byField: 'DeviceId', byFieldValue: this.id },
                    res => {
                        this.$events.emit(C.event.DETAIL_BACK)
                        modal.toast({
                            message: res.result,
                            duration: 0.2
                        })
                    })
            },
            // 清除历史记录
            clearHistory() {
                modal.confirm({
                    message: '确定删除输入记录？',
                    duration: 0.3,
                    okTitle: '确认',
                    cancelTitle: '取消'
                }, (value) => {
                    // console.log(value)
                    if (value == "确认") {
                        this.positionList = [];
                        storage.removeItem('position', event => { })
                    }
                })
            },
            saveHistory() {
                if (this.positionList.some(m => m == this.val)) {
                    return;
                }
                //更新历史记录值
                this.positionList.unshift(this.val)
                this.positionList.length = this.positionList.length > 8 ? 8 : this.positionList.length
                storage.setItem('position', JSON.stringify(this.positionList), event => {
                    this.note += this.val;
                    console.log('success' + this.position)
                })
            },
        },
        created() {
            storage.getItem('position', event => {
                if (event.result == "success") {
                    this.positionList = JSON.parse(event.data)
                }
            })
        }
    }

</script>