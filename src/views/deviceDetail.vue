<template>
    <div class="container">
\
        <AppHeader :title="title" canBack="1"></AppHeader>
        <!--更改设备名称-->
        <div class="deviceDetail-title" v-if="name=='deviceName'">
            <input class="deviceDetail-text" type="text" placeholder="请输入设备名称" v-model="fieldName" />
        </div>
        <!--选择类目-->
        <div class="deviceDetail-category" v-if="name=='deviceCategory'">
            <!--<search></search>-->
            <div class="deviceDetail-serach">
                <div class="search-box">
                    <image class="img-search" src="http://img.zmnbx.com//dist/Images/search1.png"></image>
                </div>
                <input class="deviceDetail-text" type="text" placeholder="请输入类目名称" v-model="fieldName" @input="onSearch()" />
            </div>
            <div class="deviceDetail-content">
                <!--历史记录-->
                <div class="history" v-if="showHistory">
                    <!--历史头部-->
                    <div class="history-header">
                        <text class="history-text">搜索历史</text>
                        <div class="delete-box" @click="clearHistory">
                            <image class="delete-img" src="http://img.zmnbx.com//dist/Images/deleteGrey.png"></image>
                        </div>
                    </div>
                    <!--存储记录-->
                    <div class="history-content">
                        <div class="history-details-content" @click="importContent">
                            <div class="history-details-imgBox">
                                <image class="history-details-img" src="http://img.zmnbx.com//dist/Images/history.png"></image>
                            </div>
                            <div class="history-record" v-for="item in histories">
                                <text class="history-text" v-if="histories.length <= 5">{{item}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--搜索内容-->
            <div class="search-content" v-if="hidden">
                <list>
                    <cell v-for="item in categoryArray">
                        <div class="search-details" @click="select(item)">
                            <text class="search-details-text">{{item.Name}}</text>
                        </div>
                    </cell>
                </list>
            </div>
        </div>
        <!--品牌-->
        <div class="deviceDetail-category" v-if="name=='brand'">
            <!--<search></search>-->
            <div class="deviceDetail-serach">
                <div class="search-box">
                    <image class="img-search" src="http://img.zmnbx.com//dist/Images/search1.png"></image>
                </div>
                <input class="deviceDetail-text" type="text" placeholder="请输入品牌名称" v-model="fieldName" @input="onSearch()" />
            </div>
            <div class="deviceDetail-content">
                <!--历史记录-->
                <div class="history" v-if="showHistory">
                    <!--历史头部-->
                    <div class="history-header">
                        <text class="history-text">搜索历史</text>
                        <div class="delete-box" @click="clearHistory">
                            <image class="delete-img" src="http://img.zmnbx.com//dist/Images/deleteGrey.png"></image>
                        </div>
                    </div>
                    <!--存储记录-->
                    <div class="history-content">
                        <div class="history-details-content" @click="importContent">
                            <div class="history-details-imgBox">
                                <image class="history-details-img" src="http://img.zmnbx.com//dist/Images/history.png"></image>
                            </div>
                            <div class="history-record" v-for="item in histories">
                                <text class="history-text" v-if="histories.length <= 5">{{item}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--搜索内容-->
            <div class="search-content" v-if='hidden'>
                <list>
                    <cell v-for="item in brandArray">
                        <div class="search-details" @click="select(item)">
                            <text class="search-details-text">{{item.Name}}</text>
                        </div>
                    </cell>
                </list>
            </div>
        </div>
        <!--型号-->
        <div class="deviceDetail-title" v-if="name=='equipmentModel'">
            <input class="deviceDetail-text" type="text" placeholder="请输入设备型号" v-model='equipmentModel' />
        </div>
        <!--厂家-->
        <!--<div class="deviceDetail-category" v-if="name=='factory'">
            <div class="deviceDetail-serach">
                <div class="search-box">
                    <image class="img-search" src="http://img.zmnbx.com//dist/Images/search1.png"></image>
                </div>
                <input class="deviceDetail-text" type="text" placeholder="请输入厂家名称" v-model="fieldName" @input="onSearch()" />
            </div>
            <div class="deviceDetail-content">
                <div class="history" v-if="showHistory">
                    <div class="history-header">
                        <text class="history-text">搜索历史</text>
                        <div class="delete-box" @click="clearHistory">
                            <image class="delete-img" src="http://img.zmnbx.com//dist/Images/deleteGrey.png"></image>
                        </div>
                    </div>
                    <div class="history-content">
                        <div class="history-details-content" @click="importContent">
                            <div class="history-details-imgBox">
                                <image class="history-details-img" src="http://img.zmnbx.com//dist/Images/history.png"></image>
                            </div>
                            <div class="history-record" v-for="item in histories">
                                <text class="history-text" v-if="histories.length <= 5">{{item}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-content" v-if="!showHistory">
                <list>
                    <cell v-for="item in factoryArray">
                        <div class="search-details" @click="select(item)">
                            <text class="search-details-text">{{item.Name}}</text>
                        </div>
                    </cell>
                </list>
            </div>
        </div>-->
        <!--客户名称-->
        <div class="deviceDetail-category" v-if="name=='useCompany'">
            <!--<search></search>-->
            <div class="deviceDetail-serach">
                <div class="search-box">
                    <image class="img-search" src="http://img.zmnbx.com//dist/Images/search1.png"></image>
                </div>
                <input class="deviceDetail-text" type="text" placeholder="请输入客户名称" v-model="fieldName" @input="onSearch()" />
            </div>
            <div class="deviceDetail-content">
                <!--历史记录-->
                <div class="history" v-if="showHistory">
                    <!--历史头部-->
                    <div class="history-header">
                        <text class="history-text">搜索历史</text>
                        <div class="delete-box" @click="clearHistory">
                            <image class="delete-img" src="http://img.zmnbx.com//dist/Images/deleteGrey.png"></image>
                        </div>
                    </div>
                    <!--存储记录-->
                    <div class="history-content">
                        <div class="history-details-content" >
                            <div class="history-details-imgBox">
                                <image class="history-details-img" src="http://img.zmnbx.com//dist/Images/history.png"></image>
                            </div>
                            <div class="history-record" v-for="item in histories" @click="importContent(item)">
                                <text class="history-text">{{item}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--搜索内容-->
            <div class="search-content" v-if="hidden">
                <list>
                    <cell v-for="item in company">
                        <div class="search-details" @click="select(item)">
                            <text class="search-details-text">{{item}}</text>
                        </div>
                    </cell>
                </list>
            </div>
        </div>
        <!--安装地址-->
        <div class="deviceDetail-title" v-if="name=='position'">
            <input class="deviceDetail-text" type="text" placeholder="请添加或者选择安装地址" v-model="fieldName" />
        </div>
        <!--信息备注-->
        <div class="deviceDetail-title" v-if="name=='note'">
            <input class="deviceDetail-text" type="text" placeholder="请输入信息备注" v-model="fieldName" />
        </div>
        <!--二维码-->
        <div class="deviceDetail-title" v-if="name=='qrCode'">
            <div class="qrCode-content">
                <input class="deviceDetail-text" type="text" placeholder="请输入二维码" v-model="fieldName" />
                <!--新添加内容,扫码-->
                <div class="qrCode-box" @click="scan">
                    <image class="scan-code" src="http://img.zmnbx.com//dist/Images/scan.png"></image>
                </div>
            </div>
        </div>
        <!--图片上传-->
        <div class="deviceDetail-imgList" v-if="name=='photos'">
            <div class="imgList">
                <image @longpress="delPhoto(photo.id)" v-for="photo in photoes" class="uploadImg" :src="photo.localPath"></image>
                <image class="uploadImg" v-if="photoes.length<3" @click="camera" src="http://img.zmnbx.com//dist/Images/upload1.png"></image>
            </div>
        </div>
        <!--保存按钮-->
        <button class="device-footer" @click="saveChange">
            <text class="device-sub">保存</text>    
        </button>
    </div>
</template>

<style>
    .container {
        width: 750px;
        align-items: center;
        background-color: #fff;
    }
    /*设备名称*/
    
    .deviceDetail-title,
    .deviceDetail-serach {
        width: 750px;
        /*height: 80px;*/
        /*margin-top: 20px;*/
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: #dedede;
        justify-content: flex-start;
        align-items: center;
    }
    
    .deviceDetail-serach {
        /*height: 80px;*/
        flex-direction: row;
    }
    
    .deviceDetail-text {
        width: 660px;
        height: 80px;
        padding-left: 20px;
        border: none;
    }
    /*类目*/
    
    .deviceDetail-category {
        width: 750px;
    }
    
    .img-search {
        width: 60px;
        height: 60px;
    }
    
    .deviceDetail-header {
        flex-direction: row;
    }
    
    .search-box,
    .qrCode-box {
        width: 80px;
        height: 80px;
        justify-content: center;
        align-items: center;
    }
    
    .deviceDetail-content {
        width: 730px;
    }
    
    .history {
        width: 730px;
    }
    
    .history-header {
        width: 730px;
        height: 80px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
    }
    
    .history-text {
        color: #aaa;
        font-size: 30px;
    }
    
    .history-content {
        width: 730px;
    }
    
    .history-record {
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 20px;
        padding-right: 20px;
        height: 80px;
        align-items: flex-start;
        justify-content: center;
    }
    
    .delete-box,
    .history-details-imgBox {
        width: 80px;
        height: 80px;
        justify-content: center;
        align-items: center;
    }
    
    .delete-img,
    .history-details-img,
    .scan-code {
        width: 45px;
        height: 45px;
    }
    
    .history-details-img {
        margin-right: 20px;
    }
    
    .history-details-content {
        width: 720px;
        height: 80px;
        /*border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #cdcdcd;*/
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap:wrap;
    }
    
    .search-content {
        width: 720px;
        justify-content: center;
        /*background-color: #dedede;*/
    }
    
    .search-details {
        width: 720px;
        height: 80px;
        justify-content: center;
        border-bottom-style: solid;
        border-bottom-color: #cdcdcd;
        border-bottom-width: 1px;
        padding-left: 20px;
    }
    
    .search-details:active {
        background-color: #efefef;
    }
    
    .search-details-text {
        font-size: 30px;
        color: #333;
    }
    /*二维码*/
    
    .qrCode-content {
        width: 730px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    /*图片上传*/
    
    .deviceDetail-imgList {
        margin-top: 20px;
        width: 750px;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
    }
    
    .imgList {
        width: 750px;
        flex-direction: row;
        height: 200px;
        padding-left: 20px;
    }
    
    .uploadImg {
        width: 200px;
        height: 200px;
        margin-right: 20px;
    }
    /*保存按钮*/
    
    .device-footer {
        height: 88px;
        width: 88px;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
    }
    
    .device-sub {
        color: white;
        font-size: 30px;
    }
</style>

<script>
    var camera = weex.requireModule('CameraModule')
    var photoPick = weex.requireModule('PhotoPickModule')
    var fileModule = weex.requireModule('FileModule')
    const storage = weex.requireModule('storage')
    const qrCodeModule = weex.requireModule('QRCodeModule')
    const animation = weex.requireModule('animation')
    const modal = weex.requireModule('modal')
    const categoryAll = []
    const brandAll = []
    export default {
        name: 'deviceDetail',
        props: ['name', 'title', 'id'],
        data() {
            return {
                deviceName: '',
                showHistory: true,
                history: '',
                deviceCategory: '',
                equipmentModel: '',
                position: '',
                note: '',
                qrCode: '',
                categoryName: '',
                categoryArray: [],
                brandArray: [],
                factoryArray: [],
                useCompanyArray: [],
                company: [],
                histories: [],
                CategoryId: '',
                fieldName: '',
                fieldValue: '',
                hidden: false,
                photoes: [],
                history: ''
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
                            localPath: res.path
                        }
                        this.photoes.push(photo)
                        this.uploadImage(photo);
                    }
                })
            },
            // 图片上传
            uploadImage(photo) {
                fileModule.upload(`${config.server}/api/upload/uploadimg?type=3`, photo.localPath, done => {
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
            // 清空搜索历史
            clearHistory() {
                this.showHistory = false;
            },
            // 点击显示在输入框
            importContent(item) {
                this.deviceName = this.item
            },
            // 搜索
            onSearch() {
                this.showHistory = false;// 输入搜索时隐藏历史记录
                this.hidden = true
                this.categoryArray = this.categoryAll.filter(m => {
                    return (m.Name).indexOf(this.fieldName) >= 0
                });
                this.brandArray = this.brandAll.filter(m => {
                    return (m.Name).indexOf(this.fieldName) >= 0
                });
                this.company = this.useCompanyArray.filter(m => {
                    return m.indexOf(this.fieldName) >= 0
                })

            },
            // 扫码事件
            scan() {
                qrCodeModule.showQRCode((result) => {
                    result = result.substr(result.lastIndexOf('/') + 1);
                    this.qrCode = result
                })
            },
            saveChange() {
                this.saveHistory()
                if (this.name == 'deviceName') {
                    this.field = 'Name';
                    this.fieldValue = this.fieldName;
                } else if (this.name == 'qrCode') {
                    this.field = 'QRCode';
                    this.fieldValue = this.fieldName;
                } else if (this.name == 'position') {
                    this.field = 'Position';
                    this.fieldValue = this.fieldName;
                } else if (this.name == 'note') {
                    this.field = 'Note';
                    this.fieldValue = this.fieldName;
                }
                this._post("/api/Common/UpdateFieldValue",
                    { table: 'device', fileName: this.field, fileValue: this.fieldValue, byField: 'DeviceId', byFieldValue: this.id },
                    res => {

                        // 跳转到上一个页面
                        this.pageTo(this.$router.back())
                        modal.toast({
                            message: res.result,
                            duration: 0.2
                        })
                    })

            },
            saveHistory() {
                if (this.histories.some(m => m == this.fieldName)) {
                    return;
                }
                //更新历史记录值
                this.histories.unshift(this.fieldName)
                this.histories.length = 8
                storage.setItem(this.name + 'history', JSON.stringify(this.histories), event => {
                    this.history += this.filedName;
                    console.log('success' + this.history)
                })
            },
            // 搜索后的选择事件
            select(item) {
                if (this.name == 'deviceCategory') {
                    this.field = 'CategoryId';
                    this.fieldName = item.Name;
                    this.fieldValue = item.CategoryId;
                    this.hidden = false
                } else if (this.name == 'brand') {
                    this.field = 'BrandId';
                    this.fieldName = item.Name;
                    this.fieldValue = item.BrandId;
                    this.hidden = false
                } else if (this.name == 'useCompany') {
                    this.field = 'UseCompanyName';
                    this.fieldName = item;
                    this.fieldValue = item;
                    this.hidden = false
                }
            }

        },
        created() {
            var self = this;
            this._get('/api/device/GetDeviceSelectInfo', {}, res => {
                console.log(res, "aaaa")
                self.categoryAll = res.Category;
                self.useCompanyArray = res.CompanyName;
            });
            this.$watch('name', (newVal, oldVal) => {
                if (newVal) {
                    storage.getItem(newVal + 'history', event => {
                        if (event.result == "success") {
                            this.histories = JSON.parse(event.data)
                        }
                    })
                }
            })
            // self.serviceCompanyId.push(this.$store.state.user.serviceCompanyId);

            this._get('/api/device/GetBrandWithManufacturer', { ManufacturerId: 0 }, res => {
                self.brandAll = res.Brand;
            })
        }
    }

</script>