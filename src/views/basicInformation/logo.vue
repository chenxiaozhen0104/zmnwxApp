<template>
    <div class="container">
        <!--图片上传-->
        <div class="deviceDetail-imgList">
            <div class="imgList">
                <image @longpress="delPhoto(photo.id)"  class="uploadImg" :src="decode(photo)"></image>
                <image class="uploadImg" v-if="photoes.length<1" @click="pickImage" src="http://img.zmnbx.com/dist/Images/upload1.png"></image>
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
    import config from 'config'
    import C from '../../store/constants'
    var photoPick = weex.requireModule('PhotoPickModule')
    var fileModule = weex.requireModule('FileModule')
    const animation = weex.requireModule('animation')
    const modal = weex.requireModule('modal')
    const categoryAll = []
    const brandAll = []
    export default {
        data() {
            return {
                id: this.$route.params.id,
                photo: JSON.parse(this.$route.params.value),
                user: this.$store.state.user
            }
        },
        methods: {
            // 选择图片
            pickImage() {
                photoPick.open(res => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        let photo = {
                            localPath: res.path
                        }
                        this.photo=res.path
                        this.uploadImage(photo)
                    }
                })
            },

            decode(url){
                return decodeURIComponent(url)
            },
            // 图片上传
            uploadImage(photo) {
                fileModule.upload(`${config.server}/api/upload/uploadimg?type=1`, photo.localPath, done => {
                    photo.id = JSON.parse(done)[0].PictureId
                }, res => {
                    modal.toast({
                        message: JSON.stringify(res.error),
                        duration: 0.4
                    })
                })
            },
            
            // 图片删除
            delPhoto(id) {
                this.photoes = this.photoes.filter(m => m.id != id)
            },
            saveChange() {
                this._post("/api/Picture/EditPicture", { 
                    pictureId: this.photoes.map(m => m.id), outId: this.user.serviceCompanyId
                 }, res => {
                    modal.toast({
                        message: res.result,
                        duration: 0.2
                    })
                    this.$events.emit(C.event.DETAIL_BACK,this.photoes.map(m => m.id))
                })
            }
        }
    }

</script>