<template>
    <div class="container">
        <!--更改设备名称-->
        <div class="deviceDetail-title">
            <div class="import">
                <input class="deviceDetail-text" type="text" placeholder="请输入备注信息" v-model="val" />
                <div class="clear-box" @click="clearContent" v-if="val.length">
                    <text class="clear">清空</text>
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
    export default {
        data() {
            return {
                id: this.$route.params.id,
                val: this.$route.params.value == 'null' ? '' : this.$route.params.value
            }
        },
        methods: {
            clearContent() {
                this.val = ''
            },
            saveChange() {
                if (this.id == 0) {
                    this.$events.emit(C.event.DETAIL_BACK, this.val)
                    return
                }
                this._post("/api/Common/UpdateFieldValue",
                    { table: 'device', fileName: 'Note', fileValue: this.val, byField: 'DeviceId', byFieldValue: this.id },
                    res => {
                        console.log('val:' + this.val)
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