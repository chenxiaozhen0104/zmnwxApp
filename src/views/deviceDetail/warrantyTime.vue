<template>
    <div class="container">
        <div class="dateTime">
            <div class="dateTime-left">
                <text class="dateTime-text">是否过保：</text>
            </div>
            <div class="dateTime-right">
                <switch @change="onchange" class="change" :checked="this.$route.params.value == 'null' ? true : false"></switch>
                <text class="dateTime-text">是</text>
            </div>
        </div>
        <div class="pick" v-if="showDate">
            <div class="dateTime-left">
                <text class="dateTime-text">质保日期至：</text>
            </div>
            <div class="dateTime-right" @click="pickDate">
                <text class="dateTime-text">{{val}}</text>
                <!--<input class="dateTime-pick" type="text" placeholder="请选择质保日期" v-model="val" :disabled="true" />-->
                <div class="img-box">
                    <image class="img" src="http://img.zmnbx.com//dist/Images/triangle.png"></image>
                </div>
            </div>
        </div>
        <!--保存按钮-->
        <div class="footer-bottom" @click="saveChange">
            <button class="footer-box">
                <text class="footer-sub">保存</text>    
            </button>
        </div>
    </div>
</template>

<style>
    .container {
        width: 750px;
    }
    
    .dateTime,
    .pick {
        width: 700px;
        /*height:80px;*/
        justify-content: center;
        align-items: center;
        flex-direction: row;
        /*background-color:red;*/
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }
    
    .dateTime-left,
    .dateTime-right {
        flex-direction: row;
        width: 350px;
        height: 80px;
        justify-content: center;
        align-items: center;
    }
    
    .dateTime-pick {
        border: none;
        width: 280px;
        height: 80px;
        justify-content: flex-start;
        align-items: center;
        padding-left: 10px;
    }
    
    .dateTime-pick:disabled {
        opacity: 1;
    }
    
    .dateTime-right-pick {
        border-style: solid;
        border-color: #cfcfcf;
        border-width: 1px;
        flex-direction: row;
        width: 350px;
        height: 80px;
        justify-content: space-between;
        align-items: center;
    }
    
    .change {
        width: 100px;
    }
    
    .dateTime-text {
        color: #aaa;
        font-size: 30px;
    }
    
    .pickDate {
        border: none;
        width: 350px;
        height: 80px;
    }
    
    .img-box {
        height: 80px;
        width: 80px;
        justify-content: center;
        align-items: center;
    }
    
    .img {
        width: 30px;
        height: 30px;
    }
    /*保存按钮*/
    
    .footer-bottom {
        height: 100px;
        width: 750px;
        justify-content: center;
        align-items: center;
        background-color: #f8f8f8;
        /*position:absolute;
        bottom:0;
        left:0;*/
        margin-top: 40px;
    }
    
    .footer-box {
        height: 70px;
        width: 720px;
        text-align: center;
        color: white;
        line-height: 70px;
        background-color: #3879d9;
        justify-content: center;
        align-items: center;
    }
    
    .footer-sub {
        color: white;
        font-size: 26px;
        text-align: center;
        opacity: 1;
    }
</style>

<script>
    import C from '../../store/constants'
    const modal = weex.requireModule('modal')
    const storage = weex.requireModule('storage')
    const picker = weex.requireModule('picker')
    const categoryAll = []
    export default {
        data() {
            return {
                id: this.$route.params.id,
                val: this.$route.params.value == 'null' ? '请选择质保时间' : this.$route.params.value,
                batchNumberList: [],
                batchNumber: '',
                showDate: this.$route.params.value == 'null' ? false : true,
                warrantyTime: '请选择质保时间',
                fileValue: ''
            }
        },
        methods: {
            onchange(event) {
                if (event.value == true) {
                    this.showDate = false
                    this.fileValue = ''
                } else {
                    this.showDate = true
                }
            },
            pickDate() {
                picker.pickDate({
                    max: '2087-01-01',
                    min: '1900-01-01',
                    value: this.val
                }, event => {
                    if (event.result == 'success') {
                        this.val = event.data;
                        this.fileValue = this.val
                        // if (this.id > 0) {
                        //     this._post("/api/Common/UpdateFieldValue",
                        //         { table: 'device', fileName: 'WarrantyTime', fileValue: this.warrantyTime, byField: 'DeviceId', byFieldValue: this.id },
                        //         res => {
                        //             modal.toast({
                        //                 message: res.result,
                        //                 duration: 0.2
                        //             })
                        //         })
                        // }
                    }
                })
            },
            saveChange() {
                if (this.id == 0) {
                    this.$events.emit(C.event.DETAIL_BACK, this.fileValue)
                    console.log('value:' + this.fileValue)
                    return
                }
                if (this.id > 0) {
                    if (this.fileValue == '请选择质保时间') {
                        this.fileValue = ''
                    }
                    this._post("/api/device/editfield",
                        { fieldName: 'WarrantyTime', value: this.fileValue, id: this.id },
                        res => {
                            console.log(this.fileValue)
                            this.$events.emit(C.event.DETAIL_BACK)
                            if(res.error){
                                modal.toast({
                                    message:res.error,
                                    duration:0.2
                                })
                            }else{
                                modal.toast({
                                    message:'执行成功',
                                    duration:0.2
                                })
                            }
                        })
                }
            }
        },
        created() {
            console.log('id:' + this.$route.params.value)
        }
    }

</script>