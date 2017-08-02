<template>
    <scroller class="container">

        <div class="selfInfo">
            <div class="basic-photo basic-border">
                <text class="basic-text">头像:</text>
                <div class="basic-right">
                    <image class="basic-photo-img basic-text" src="http://img.zmnbx.com//dist/Images/photo.png"></image>
                    <!--<div class="enterIn-box">
                            <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                        </div>-->
                </div>
            </div>
            <div class="basic-username basic-border">
                <text class="basic-text">用户名:</text>
                <div class="basic-right">
                    <text class="basic-text">{{item.name}}</text>
                    <!--<div class="enterIn-box">
                            <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                        </div>-->
                </div>
            </div>
            <div class="basic-sex basic-border">
                <text class="basic-text">性别:</text>
                <div class="basic-right">
                    <text class="basic-text">{{item.sex||"暂无"}}</text>
                    <!--<div class="enterIn-box">
                            <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                        </div>-->
                </div>
            </div>
            <div class="basic-mobile basic-border">
                <text class="basic-text">手机号:</text>
                <div class="basic-right">
                    <text class="basic-text">{{item.phone}}</text>
                    <!--<div class="enterIn-box">
                            <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                        </div>-->
                </div>
            </div>
            <div class="basic-email basic-border">
                <text class="basic-text">邮箱:</text>
                <div class="basic-right">
                    <text class="basic-text">{{item.email||"暂无"}}</text>
                    <!--<div class="enterIn-box">
                            <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                        </div>-->
                </div>
            </div>
        </div>
        <div class="companyInfo" v-if="!manager">
            <div class="basic-company">
                <text class="basic-text">公司:</text>
                <div class="basic-right">
                    <div class="basic-company-text">
                        <text class="basic-text">{{item.serviceCompany}}</text>
                        <text class="checkState">{{&nbsp;&nbsp;checkState}}</text>
                    </div>
                    <!--<div class="enterIn-box">
                            <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                        </div>-->
                </div>
            </div>
        </div>
        <div class="companyInfo" v-if="manager">
            <div class="basic-company">
                <text class="basic-text">公司:</text>
                <div class="basic-right">
                    <div class="basic-company-text">
                        <text class="basic-text">{{item.serviceCompany}}</text>
                        <text class="checkState">{{&nbsp;&nbsp;checkState}}</text>
                    </div>
                    <!--<div class="enterIn-box">
                            <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                        </div>-->
                </div>
            </div>
            <div class="basic-company" @click="pickImage">
                <text class="basic-text">LOGO:</text>
                <div class="basic-right">
                    <div class="basic-companyInformation">
                        <image class="showImg" :src="photo" @click="biggerImg(photo,index)"></image>
                    </div>
                </div>
            </div>
            <div class="basic-company" @click="showDetail('companyInformation','简介')" v-if="manager">
                <text class="basic-text">简介:</text>
                <div class="basic-right">
                    <div class="basic-companyInformation">
                        <text class="basic-text">{{companyInformation|none}}</text>
                    </div>
                    <div class="enterIn-box">
                        <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                    </div>
                </div>
            </div>
            <div class="basic-company" @click="showDetail('Categorys','企业维修业务范围')" v-if="manager">
                <text class="basic-text">维修业务范围:</text>
                <div class="basic-right">
                    <div class="basic-companyInformation">
                        <text class="basic-rangeText">{{Categorys|none}}</text>
                    </div>
                    <div class="enterIn-box">
                        <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                    </div>
                </div>
            </div>
            <!--是否扫码开始-->
            <div class="basic-company">
                <text class="basic-text">是否扫码开始:</text>
                <div class="basic-rightQrCode">
                    <div class="basic-qrCode">
                        <switch @change="onchange" class="change" :checked="user.workingway"></switch>
                    </div>
                </div>
            </div>
            <!--是否扫码结束-->
            <div class="basic-company">
                <text class="basic-text">是否扫码结束:</text>
                <div class="basic-rightQrCode">
                    <div class="basic-qrCode">
                        <switch @change="onchange2" class="change" :checked="user.workedway"></switch>
                    </div>
                </div>
            </div>
        </div>

        <!--蒙版-->
        <div class="task" @click="()=>{}" v-if="showMask">
            <div class="maskBox">
                <text class="task-text">点击图片返回</text>
                <image class="task-img" resize="cover" :src="maskImg" @click="returnMask"></image>
            </div>
        </div>
        <div class="version">
            <text class="version-text">{{"版本:&nbsp;&nbsp;v-"+appVersion}}</text>
        </div>

        <app-detail :path="detail.path" :title="detail.title" @close="closeDetail" />
    </scroller>
</template>
<style>
    .container {
        width: 750px;
        background-color: #eee;
        flex: 1;
        /*justify-content: center;*/
        align-items: center;
    }

    .selfInfo,
    .companyInfo {
        margin-top: 10px;
        width: 720px;
        /*padding-left:10px;*/
        padding-right: 10px;
        background-color: #fff;
        border-radius: 2px;
    }

    .companyInfo {
        margin-bottom: 30px;
    }

    .basic-border,
    .basic-company {
        width: 720px;
        /*height: 90px;*/
        padding-top: 20px;
        padding-bottom: 20px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
        border-bottom-style: solid;
        border-bottom-color: #cfcfcf;
        border-bottom-width: 1px;
    }

    .basic-company:active {
        background-color: #ddd;
    }

    .basic-company-text {
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }

    .basic-text,
    .basic-rangeText {
        font-size: 30px;
        color: #333;
    }

    .basic-rangeText {
        width: 300px;
        text-align: right;
    }

    .basic-photo-img {
        width: 50px;
        height: 50px;
    }

    .basic-text {
        font-size: 30px;
        color: #333;
        flex-wrap: wrap;
    }

    .basic-companyInformation {
        text-align: right;
        align-items: center;
    }

    .version {
        /*position: absolute;
        bottom: 0;
        left: 0;*/
        margin-top: 20px;
        margin-bottom: 20px;
        width: 750px;
        justify-content: center;
        align-items: center;
    }

    .version-text {
        color: #aaa;
        font-size: 30px;
    }

    .checkState {
        /*margin-top: -10px;*/
        color: orange;
        font-size: 26px;
        /*width: 750px;*/
        /*height: 90px;*/
        /*padding-right: 63px;*/
        text-align: right;
        margin-top: 10px;
    }

    .enterIn-box {
        width: 60px;
        height: 60px;
        justify-content: center;
        align-items: center;
        /*margin-right: -50px;*/
    }

    .enterIn {
        width: 30px;
        height: 30px;
    }

    .basic-right {
        justify-content: flex-end;
        align-items: center;
        flex-direction: row;
    }
    /*logo*/

    .showImg {
        height: 205px;
        width: 205px;
        margin-left: 25px;
    }
    /*蒙版*/

    .task {
        width: 750px;
        height: 1334px;
        background-color: rgba(40, 40, 40, 0.6);
        position: absolute;
        left: 0;
        top: 0;
        align-items: center;
        justify-content: center;
        display: flex;
    }

    .maskBox {
        margin-top: -140px;
        align-items: center;
        justify-content: center;
    }

    .task-img {
        width: 600px;
        height: 600px;
        z-index: 10000;
    }

    .task-text {
        font-size: 30px;
        color: white;
        margin-bottom: 30px;
        z-index: 10000;
    }
    /*是否扫码*/

    .change {
        width: 100px;
        margin-bottom: 20px;
    }

    .basic-qrCode {
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
    }

    .basic-rightQrCode {
        justify-content: flex-end;
        align-items: center;
    }

    .dateTime-text {
        color: #aaa;
        font-size: 30px;
    }
</style>
<script>
    var photoPick = weex.requireModule('PhotoPickModule')
    var fileModule = weex.requireModule('FileModule')
    import detail from '../components/detail.vue';
    import { _getUser } from "../store/fecth.js"
    import config from 'config'
    var modal = weex.requireModule('modal')
    const storage = weex.requireModule('storage')
    export default {
        components: {
            'app-detail': detail
        },
        data: function () {
            return {
                detail: {
                    path: {},
                    title: ''
                },
                item: {},
                checkState: '',
                company: '',
                appVersion: weex.config.env ? weex.config.env.appVersion : '0.1.0',
                showImgUrl: [],
                fieldName: '',
                user: this.$store.state.user,
                manager: false,
                showMask: false,
                maskImg: '',
                imgList: [],
                photo: '',
                photoId: '',
                value: '',
                workName: ''
            }
        },
        filters: {
            none(val) {
                return val || '暂无'
            }
        },
        methods: {
            // 是否需要扫码
            onchange(event) {
                this._post("/api/Company/EditField",
                    { id: this.user.serviceCompanyId, fieldName: 'WorkingWay', value: event.value ? 1 : 0 },
                    res => {
                        console.log(res)
                        modal.toast({
                            message: res.result,
                            duration: 0.2
                        })
                    })
            },
            onchange2(event) {
                this._post("/api/Company/EditField",
                    { id: this.user.serviceCompanyId, fieldName: 'WorkedDWay', value: event.value ? 1 : 0 },
                    res => {
                        console.log(res)
                        modal.toast({
                            message: res.result,
                            duration: 0.2
                        })
                    })
            },
            pickImage() {
                photoPick.open(res => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        this.photo = res.path
                        this.uploadImage()
                    }
                })
            },
            // 图片上传
            uploadImage(photo) {
                fileModule.upload(`${config.server}/api/upload/uploadimg?type=1`, this.photo, done => {

                    this.saveChange(JSON.parse(done)[0].PictureId)
                }, res => {
                    modal.toast({
                        message: JSON.stringify(res.error),
                        duration: 0.4
                    })
                })
            },
            saveChange(id) {
                this._post("/api/Picture/EditPicture", { pictureId: id, outId: this.user.serviceCompanyId }, res => {
                    modal.toast({
                        message: res.result,
                        duration: 0.2
                    })
                })
            },
            // 点击查看图片
            biggerImg(imgItem, index) {
                this.showMask = true;
                this.maskImg = this.photo;
            },
            // 返回
            returnMask() {
                this.showMask = false;
            },
            showDetail(name, title) {
                this.fieldName = name
                console.log(this[name], "ttttt")
                this.detail.path = `/my/basicInformation/${name}/${this[name] || 'null'}`
                this.detail.title = title
            },
            closeDetail(val) {
                console.log('返回值', val)
                this.detail.path = ''
                this[this.fieldName] = val

            },
            init() {
                this._get("/api/Company/GetGetServiceCompanyInfo", { serviceCompanyId: this.user.serviceCompanyId }, res => {
                    console.log(res, 'qqqqqqqqq')
                    this.companyInformation = res.Note
                    this.Categorys = res.Categorys
                    this.photo = res.ImgUrl
                    this.user.workingway = res.WorkingWay == 1
                    this.user.workedway = res.WorkedDWay == 1
                })
            }
        },
        created() {
            if (this.user.type & 4) {
                this.manager = true
            } else {
                this.manager = false
            }
            this.init()
            var self = this;
            _getUser().then((res) => {
                console.log(res)
                self.item = res
                if (res.status == "Normal") {
                    self.checkState = ''
                } else if (res.status == "NotActive") {
                    self.checkState = '审核中'
                } else {
                    self.checkState = '审核不通过'
                }
            }).catch((res) => {
                if (res.error) {
                    modal.toast({
                        message: res.error,
                        duration: 0.2
                    })
                }
            })
        }
    }

</script>