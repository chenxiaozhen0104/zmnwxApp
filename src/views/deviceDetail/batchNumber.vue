<template>
    <div class="container">
        <!--更改设备名称-->
        <div class="deviceDetail-category">
            <div class="deviceDetail-serach">
                <div class="import">
                    <input class="deviceDetail-text" type="text" placeholder="请输入设备规格" v-model="val" />
                    <div class="clear-box" @click="clearContent" v-if="val.length">
                        <text class="clear">清空</text>
                    </div>
                </div>
            </div>
            <div class="deviceDetail-content" v-if="!val.length && lotNoList.length">
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
                            <div class="history-record" v-for="item in lotNoList">
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
                val: this.$route.params.value=='null'?'':this.$route.params.value,
                lotNoList: [],
                lotNo:''
            }
        },
        methods: {
            add(item) {
                this.val = item
            },
            clearContent() {
                this.val = '';
            },
            saveChange() {
                this.saveHistory();
                if (this.id == 0) {
                    this.$events.emit(C.event.DETAIL_BACK, this.val)
                    return
                }
                
                this._post("/api/Common/UpdateFieldValue",
                    { table: 'device', fileName: 'LotNo', fileValue: this.val, byField: 'DeviceId', byFieldValue: this.id },
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
                        this.lotNoList = [];
                        storage.removeItem('lotNo', event => { })
                    }
                })
            },
            saveHistory() {
                if (this.lotNoList.some(m => m == this.val)) {
                    return;
                }
                //更新历史记录值
                this.lotNoList.unshift(this.val)
                this.lotNoList.length = this.lotNoList.length > 8 ? 8 : this.lotNoList.length;
                storage.setItem('lotNo', JSON.stringify(this.lotNoList), event => {
                    this.lotNo += this.val;
                    console.log('success' + this.lotNo)
                })
            },
        },
        created() {
            storage.getItem('lotNo', event => {
                if (event.result == "success") {
                    this.lotNoList = JSON.parse(event.data)
                }
            })
        }
    }

</script>