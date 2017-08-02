<template>
    <div class="container">
        <!--更改设备名称-->
        <div class="deviceDetail-title">
            <div class="import">
                <input class="deviceDetail-text" type="text" placeholder="请输入企业文字说明" v-model="val" />
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
<style src="../deviceDetail/device.css" />

<script>
    import C from '../../store/constants'
    const modal = weex.requireModule('modal')
    export default {
        data() {
            return {
                val: this.$route.params.value == 'null' ? '' : this.$route.params.value,
                user: this.$store.state.user
            }
        },
        methods: {
            clearContent() {
                this.val = ''
            },
            saveChange() {
                this._post("/api/Company/EditField",
                 { id: this.user.serviceCompanyId, fieldName: 'Note', value: this.val },
                    res => {
                        console.log(res)
                        modal.toast({
                            message: res.result,
                            duration: 0.2
                        })
                        this.$events.emit(C.event.DETAIL_BACK,this.val)
                    })
            }
        }
    }

</script>