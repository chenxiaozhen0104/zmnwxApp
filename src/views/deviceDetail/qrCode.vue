<template>
    <div class="container">
        <!--更改设备名称-->
        <div class="deviceDetail-title">
            <div class="qrCode-content">
                <div class="import-qrCode">
                    <input class="deviceDetail-text" type="text" placeholder="请输入二维码" v-model="val" />
                    <div class="clear-box" @click="clearContent" v-if="val.length">
                        <text class="clear">清空</text>
                    </div>
                </div>
                <!--新添加内容,扫码-->
                <div class="qrCode-box" @click="scan">
                    <image class="scan-code" src="http://img.zmnbx.com//dist/Images/scan.png"></image>
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
    const qrCodeModule = weex.requireModule('QRCodeModule')
    export default {
        data() {
            return {
                id: this.$route.params.id,
                val: this.$route.params.value
            }
        },
        methods: {
            clearContent() {
                this.val = ''
            },
            // 扫码事件
            scan() {
                qrCodeModule.showQRCode((result) => {
                    result = result.substr(result.lastIndexOf('/') + 1);
                    this.qrCode = result
                })
            },
            saveChange() {
                this._post("/api/Common/UpdateFieldValue",
                    { table: 'device', fileName: 'Note', fileValue: this.val, byField: 'DeviceId', byFieldValue: this.id },
                    res => {
                        this.$events.emit(C.event.DETAIL_BACK)
                        modal.toast({
                            message: res.result,
                            duration: 0.2
                        })
                    })
            }
        }
    }

</script>