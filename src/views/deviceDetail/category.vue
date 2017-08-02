<template>
    <div class="container">
        <!--更改设备名称-->
        <div class="deviceDetail-category">
            <div class="deviceDetail-serach">
                <div class="search-box">
                    <image class="img-search" src="http://img.zmnbx.com//dist/Images/search1.png"></image>
                </div>
                <div class="import">
                    <input class="deviceDetail-text" type="text" placeholder="请输入类目名称" v-model="val" @input="onSearch()" />
                    <div class="clear-box" @click="clearContent" v-if="val.length">
                        <text class="clear">清空</text>
                    </div>
                </div>
            </div>
            <div class="deviceDetail-content" v-if="!val.length&&histories.length">
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
                            <div class="history-record" v-for="item in histories">
                                <text class="history-text" @click="add(item)">{{item}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--搜索内容-->
            <div class="search-content" v-if="val.length">
                <div v-for="item in categoryArray">
                    <div class="search-details" @click="select(item)">
                        <text class="search-details-text">{{item.Name}}</text>
                    </div>
                </div>
                <div class="nothing" v-if="showNothing">
                    <text class="nothing-text">暂无结果</text>
                </div>
            </div>
        </div>
        <!--保存按钮-->
        <!--<div class="footer-bottom">
            <button class="footer-box" @click="saveChange">
                <text class="footer-sub">保存</text>    
            </button>
        </div>-->
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
                categoryArray: [],
                fieldName: '',
                fieldValue: '',
                history: '',
                histories: [],
                showNothing:false
            }
        },
        methods: {
            add(item) {
                this.val = item
                this.onSearch();
            },
            clearContent() {
                this.val = '';
            },
            // saveChange() {
            //     this.saveHistory();
            //     this._post("/api/Common/UpdateFieldValue",
            //         { table: 'device', fileName: 'CategoryId', fileValue: this.fieldValue, byField: 'DeviceId', byFieldValue: this.id },
            //         res => {
            //             this.$events.emit(C.event.DETAIL_BACK)
            //             modal.toast({
            //                 message: res.result,
            //                 duration: 0.2
            //             })
            //         })
            // },
            select(item) {
                this.val = item.Name;
                this.fieldName = this.val
                this.fieldValue = item.CategoryId
                this.saveHistory();
                // this.showHis = false;
                if (this.id == 0) {
                    this.$events.emit(C.event.DETAIL_BACK, this.fieldName)
                    return
                }
                this._post("/api/Common/UpdateFieldValue",
                    { table: 'device', fileName: 'CategoryId', fileValue: this.fieldValue, byField: 'DeviceId', byFieldValue: this.id },
                    res => {
                        this.$events.emit(C.event.DETAIL_BACK, this.fieldValue)
                        modal.toast({
                            message: res.result,
                            duration: 0.2
                        })
                    })
            },
            onSearch() {
                this.categoryArray = this.categoryAll.filter(m => {
                    return (m.Name).indexOf(this.val) >= 0
                });
                if(this.categoryArray.length==0){
                    this.showNothing = true
                }else{
                    this.showNothing = false
                }
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
                        this.histories = []
                        storage.removeItem('history', event => { })
                    }
                })

            },
            saveHistory() {
                if (this.histories.some(m => m == this.val)) {
                    return;
                }
                //更新历史记录值
                this.histories.unshift(this.val)
                this.histories.length = this.histories.length > 8 ? 8 : this.histories.length;
                storage.setItem('history', JSON.stringify(this.histories), event => {
                    this.history += this.val;
                    console.log('success' + this.history)
                })
            }
        },

        created() {
            var self = this;
            this._get('/api/device/GetDeviceSelectInfo', {}, res => {
                self.categoryAll = res.Category;
            });
            storage.getItem('history', event => {
                if (event.result == "success") {
                    this.histories = JSON.parse(event.data)
                }
            })
        }
    }

</script>