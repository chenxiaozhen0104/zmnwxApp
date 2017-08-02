<template>
    <div class="container">
        <!--图片上传-->
        <div class="deviceDetail-imgList">
            <div class="imgList">
                <image @longpress="delPhoto(photo.PictureId)" v-for="photo in photoes" class="uploadImg" :src="photo.Url"></image>
                <image class="uploadImg" v-if="photoes.length<3" @click="camera" src="http://img.zmnbx.com/dist/Images/upload1.png"></image>
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
    import config from 'config'
    import C from '../../store/constants'
    var camera = weex.requireModule('CameraModule')
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
                photoes: JSON.parse(this.$route.params.value),
                imaList: []
            }
        },
        methods: {
            camera() {
                camera.open(res => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        let photo = {
                            Url: res.path
                        }
                        this.photoes.push(photo)
                        this.uploadImage(photo)
                    }
                })
            },
            decode(url) {
                return decodeURIComponent(url)
            },
            // 图片上传
            uploadImage(photo) {
                fileModule.upload(`${config.server}/api/upload/uploadimg?type=3`, photo.Url, done => {
                    photo.PictureId = JSON.parse(done)[0].PictureId
                }, res => {
                    modal.toast({
                        message: JSON.stringify(res.error),
                        duration: 0.4
                    })
                })
            },
            // 图片删除
            delPhoto(id) {
                this._post("/api/Picture/Delete", { picId: id }, res => {
                    this.photoes = this.photoes.filter(m => m.PictureId != id)
                })
            },
            saveChange() {
                if (this.id == 0) {
                    var photoes = JSON.stringify(this.photoes)
                    this.$events.emit(C.event.DETAIL_BACK, photoes)
                    return
                }
                if (this.photoes.length == 0) {
                    modal.toast({
                        message: "请至少上传一张照片",
                        duration: 0.2
                    })
                } else {
                    this._post("/api/Picture/EditPicture", {
                        pictureId: this.photoes.map(m => m.PictureId), outId: this.id
                    }, res => {
                        modal.toast({
                            message: res.result,
                            duration: 0.2
                        })
                        this.$events.emit(C.event.DETAIL_BACK)
                    })
                }
            }
        }
    }

</script>