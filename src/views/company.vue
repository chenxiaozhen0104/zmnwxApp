<template>
    <div>

        <AppHeader :title="headerTitle" back="/companyType"></AppHeader>
        <div class="company-name company-border">
            <text class="company-left">公司名称</text>
            <div class="company-right">
                <input type="text" class="input-text" placeholder="请输入公司名称" autocomplete="off" v-model="Name" />
            </div>
        </div>
        <div class="company-linkman company-border">
            <text class="company-left">联系人</text>
            <div class="company-right">
                <input type="text" class="input-text" placeholder="请输入联系人" autocomplete="off" v-model="Contact" />
            </div>
        </div>
        <div class="company-mobile company-border">
            <text class="company-left">联系电话</text>
            <div class="company-right">
                <input type="tel" class="input-text" placeholder="请输入联系电话" autocomplete="off" v-model="Phone" />
            </div>
        </div>
        <div class="company-address company-border">
            <text class="company-left">地址</text>
            <div class="company-right">
                <input type="text" class="input-text" placeholder="请输入地址" autocomplete="off" v-model="Position" />
            </div>
        </div>
        <div class="company-photo">
            <text class="company-photo-left">营业执照扫描件</text>
            <div class="company-right-img">
                <!--长按删除-->
                <image @longpress="delPhoto(photo.id)" v-for="photo in photoes" class="uploadimg" :src="photo.localPath"></image>
                <image class="uploadimg" v-if="photoes.length<1" src="http://img.zmnbx.com//dist/Images/upload1.png" @click="camera"></image>
            </div>
        </div>
        <!--图片上传进度显示-->
        <div class="progress" v-if="progressShow">
            <text style="color:white">{{progress}}</text>
        </div>
        <div class="company-btn">
            <button class="company-btn-submit" @click='submit' :disabled="!(Name&&Contact&&Phone&&Position)">
                <text class="company-submit-text">提交</text>
            </button>
        </div>
    </div>
</template>
<style>
    .progress {
        height: 100px;
        width: 100px;
        background-color: rgba(40, 40, 40, 0.7);
        border-radius: 50px;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 390px;
        left: 325px;
    }
    
    .uploadimg {
        width: 200px;
        height: 200px;
        margin-right: 20px;
    }
    
    .company-left {
        font-size: 35px;
        color: #333;
    }
    
    .company-photo-left {
        margin-bottom: 30px;
        font-size: 35px;
        color: #333;
    }
    
    .company-right {
        width: 420px;
        height: 72px;
        border-style: solid;
        border-color: #ddd;
        border-width: 2px;
        border-radius: 5px;
        padding-left: 15px;
        padding-right: 15px;
    }
    
    .company-right-img {
        padding-left: 10px;
        flex-direction: row;
    }
    
    .company-photo {
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 62px;
        justify-content: center;
    }
    
    .company-border {
        border-bottom-style: solid;
        border-bottom-color: #ddd;
        border-bottom-width: 2px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 750px;
        height: 125px;
        padding-left: 62px;
        padding-right: 62px;
    }
    
    .input-text {
        width: 420px;
        height: 72px;
        border-width: 0;
    }
    
    .company-btn {
        width: 750px;
        height: 101px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 60px;
    }
    
    .company-btn-submit {
        width: 630px;
        height: 80px;
        background-color: rgb(45, 117, 200);
        opacity: 1;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
    }
    
    .company-btn-submit:active {
        background-color: #3399ff;
    }
    
    .company-btn-submit:disabled {
        opacity: 0.8;
    }
    
    .company-submit-text {
        text-align: center;
        color: white;
        font-size: 30px;
    }
</style>
<script>
    import config from 'config'
    import constants from "../store/constants"
    import { _getUser } from '../store/fecth.js';
    const animation = weex.requireModule('animation');
    const modal = weex.requireModule('modal');
    var camera = weex.requireModule('CameraModule')
    var photoPick = weex.requireModule('PhotoPickModule')
    var fileModule = weex.requireModule('FileModule')


    export default {
        data() {
            return {
                Name: '',
                Phone: '',
                Contact: '',
                Position: '',
                ImgUrl: '',
                photoes: [],
                headerTitle: "公司基本信息",
                progress: '',
                progressShow: false
            }
        },
        methods: {
            // 拍照上传图片
            camera() {
                camera.open(res => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        let photo = {
                            localPath: res.path
                        }
                        this.photoes.push(photo)
                        this.uploadImage(photo);
                        this.progressShow = true;
                    }
                })
            },
            // 图片显示在页面
            uploadImage(photo) {
                fileModule.upload(`${config.server}/api/upload/uploadimg?type=1`, photo.localPath, done => {
                    photo.id = JSON.parse(done)[0].PictureId
                }, res => {
                    if (res.progress == 1) {
                        this.progressShow = false;
                    }
                    this.progress = res.progress * 100 + "%";
                }, res => {
                    modal.toast({
                        message: JSON.stringify(res.error),
                        duration: 0.2
                    })
                })
            },
            // 图片删除
            delPhoto(id) {
                this.photoes = this.photoes.filter(m => m.id != id)
            },
            // 提交
            submit() {
                var self = this;
                if (self.photoes.length == 0) {
                    modal.toast({
                        message: '请上传公司营业执照',
                        duration: 0.2
                    })
                    return;
                }

                if (self.Name && self.Phone && self.Contact && self.Position) {
                    self._post('/api/user/AddServiceCompany', {
                        Name: this.Name,
                        Contact: this.Contact,
                        Phone: this.Phone,
                        Position: this.Position,
                        ImgUrl: this.photoes[0].id
                    }, (res) => {
                        // 弹出返回值
                        if (res.error) {
                            modal.toast({
                                message: res.error,
                                duartion: 0.3
                            });
                        } else {
                            modal.toast({
                                message: '申请已提交，请耐心等待审核',
                                duartion: 0.3
                            })
                            // 获取用户信息
                            _getUser().then((res) => {
                                modal.toast({
                                    message: "公司注册成功！",
                                    duration: 0.1
                                })

                                self.$emit(constants.event.USER_LOAD, res)
                                self.pageTo('/workOrder');

                            }).catch((res) => {
                                if (res.error) {
                                    modal.toast({
                                        message: res.error,
                                        duration: 0.2
                                    })
                                }
                            })
                        }
                    }, () => {
                        modal.toast({
                            message: '内部服务器错误',
                            duration: 0.3
                        });
                    });
                } else {
                    modal.toast({
                        message: '请填写完整信息',
                        duartion: 0.3,
                        okTitle: "确定"
                    }, function (result) { });

                }
            }
        }
    }

</script>