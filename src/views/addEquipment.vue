<template>
    <div class="container" ref="right">
        <scroller>
            <div class="innerContainer">

                <div class="equipment-content content-top">
                    <div class="equipment-row" @click="showDetail('equipmentName','设备名称')">
                        <text class="equipment-title">设备名称：</text>
                        <div class="equipment-text">
                            <text class="equipment-text-content">{{equipmentName|none}}</text>
                            <div class="enterIn-box">
                                <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                            </div>
                        </div>
                    </div>
                    <div class="equipment-row" @click="showCategoryPanel=true">
                        <text class="equipment-title">类目：</text>
                        <div class="equipment-text">
                            <text class="equipment-text-content">{{category|name|none}}</text>
                            <div class="enterIn-box">
                                <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                            </div>
                        </div>
                    </div>
                    <div class="equipment-row" @click="showDetail('brand','品牌')">
                        <text class="equipment-title">品牌：</text>
                        <div class="equipment-text">
                            <text class="equipment-text-content">{{brand|none}}</text>
                            <div class="enterIn-box">
                                <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                            </div>
                        </div>
                    </div>
                    <div class="equipment-row" @click="showDetail('equipmentModel','型号')">
                        <text class="equipment-title">型号：</text>
                        <div class="equipment-text">
                            <text class="equipment-text-content">{{equipmentModel|none}}</text>
                            <div class="enterIn-box">
                                <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                            </div>
                        </div>
                    </div>
                    <div class="equipment-row" @click="showDetail('standard','规格')">
                        <text class="equipment-title">规格：</text>
                        <div class="equipment-text">
                            <text class="equipment-text-content">{{standard|none}}</text>
                            <div class="enterIn-box">
                                <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                            </div>
                        </div>
                    </div>
                    <div class="equipment-row" @click="showDetail('batchNumber','批次号')">
                        <text class="equipment-title">批次号：</text>
                        <div class="equipment-text">
                            <text class="equipment-text-content">{{batchNumber|none}}</text>
                            <div class="enterIn-box">
                                <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                            </div>
                        </div>
                    </div>
                    <!--扫二维码-->
                    <div class="equipment-row" @click="setQRCode">
                        <text class="equipment-title">二维码：</text>
                        <div class="equipment-text">
                            <text class="equipment-text-content">{{qrCode}}</text>
                            <div class="enterIn-box">
                                <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                            </div>
                        </div>
                    </div>
                    <!--图片上传-->
                    <div class="equipment-row-imgList" @click="showDetail('photoes','设备图片')">
                        <text class="equipment-title-imgList">设备图片：</text>
                        <div class="equipment-text-imgList">
                            <div class="imgList">
                                <image class="showImg" :src="imgItem.Url" v-for="(imgItem,index) in imgList" @click="biggerImg(imgItem,index)"></image>
                            </div>
                        </div>
                    </div>
                    <!--<div class="equipment-row" @click="showDetail('factory','厂家')">
                    <text class="equipment-title">厂家：</text>
                    <div class="equipment-text">
                        <text class="equipment-text-content">{{factory}}</text>
                        <div class="enterIn-box">
                            <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                        </div>
                    </div>
                </div>-->
                </div>
                <div class="equipment-content content-middle">
                    <div class="equipment-row">
                        <text class="equipment-title">采购时间：</text>
                        <div class="equipment-text" @click="pickDate('Procurement')">
                            <text class="equipment-text-content">{{procurementTime|none}}</text>
                            <div class="enterIn-box">
                                <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                            </div>
                        </div>
                    </div>
                    <div class="equipment-row" @click="showDetail('warrantyTime','质保')">
                        <text class="equipment-title">质保：</text>
                        <div class="equipment-text">
                            <text class="equipment-text-content">{{warrantyTime || '质保外'}}</text>
                            <div class="enterIn-box">
                                <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                            </div>
                        </div>
                    </div>
                    <div class="equipment-row" @click="showDetail('useCompany','客户名称')">
                        <text class="equipment-title">客户名称：</text>
                        <div class="equipment-text">
                            <text class="equipment-text-content">{{useCompany|none}}</text>
                            <div class="enterIn-box">
                                <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                            </div>
                        </div>
                    </div>
                    <div class="equipment-row" @click="showDetail('position','安装地址')">
                        <text class="equipment-title">安装地址：</text>
                        <div class="equipment-text">
                            <text class="equipment-text-content">{{position|none}}</text>
                            <div class="enterIn-box">
                                <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="equipment-content content-bottom">
                    <div class="equipment-row" @click="showDetail('note','信息备注')">
                        <text class="equipment-title">信息备注：</text>
                        <div class="equipment-text">
                            <text class="equipment-text-content">{{note|none}}</text>
                            <div class="enterIn-box">
                                <image class="enterIn" src="http://img.zmnbx.com//dist/Images/enterIn.png"></image>
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
                <!--动画加载-->
                <goingOn :title="loadingTitle" v-if="loadingShow"></goingOn>
                <!--提交按钮-->

            </div>
        </scroller>
        <div class="equipment-bottom" v-if="id==0">
        <!--<div class="equipment-right">
            <deviceDetail :name="detailName" :title="detailTitle" :id="id" />
        </div>-->
        </div>
        <div class="c" v-if="id==0">
            <button class="equipment-footer" @click="equipmentSubmit">
                <text class="equipment-sub">提交</text>    
            </button>
        </div>
        <app-detail :path="detail.path" :title="detail.title" @close="closeDetail" />
        <category-choose :choose-item="category" @onmaskclick="showCategoryPanel=false" :show="showCategoryPanel" @onselect="selectCategory"></category-choose>
    </div>
</template>

<style>
    .container {
        flex: 1;
        background-color: #eee;
        padding-bottom: 20px;
    }
    
    .equipment-right {
        width: 750px;
        position: absolute;
        left: 750px;
        top: 0;
    }
    
    .innerContainer {
        width: 750px;
        align-items: center;
        padding-bottom: 100px;
    }
    
    .equipment-content {
        width: 700px;
        border-width: 1px;
        border-style: solid;
        border-color: #ccc;
        background-color: #fff;
        margin-top: 10px;
    }
    
    .content-top {
        margin-top: 20px;
    }
    
    .equipment-row,
    .equipment-row-imgList {
        width: 700px;
        align-items: center;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #dedede;
    }
    
    .equipment-row {
        flex-direction: row;
        justify-content: space-between;
    }
    
    .equipment-row:active {
        background-color: #ddd;
    }
    
    .equipment-title,
    .equipment-title-imgList {
        padding-left: 15px;
        font-size: 30px;
        color: #bdbdbd;
        justify-content: flex-start;
        align-items: center;
    }
    
    .equipment-title {
        width: 200px;
    }
    
    .equipment-title-imgList {
        width: 700px;
        padding-top: 20px;
        margin-bottom: 20px;
        /*padding-right:15px;*/
    }
    
    .equipment-text,
    .equipment-text-imgList {
        padding-right: 15px;
        border: none;
        flex-direction: row;
        justify-content: center;
    }
    
    .equipment-text {
        width: 500px;
    }
    
    .equipment-text-imgList {
        width: 750px;
    }
    
    .equipment-text-content {
        font-size: 30px;
        color: #333;
        width: 440px;
        height: 80px;
        text-align: right;
        line-height: 80px;
    }
    
    .enterIn-box {
        width: 80px;
        height: 80px;
        justify-content: center;
        align-items: center;
    }
    
    .enterIn {
        width: 30px;
        height: 30px;
    }
    /*上传图片*/
    
    .showImg {
        height: 205px;
        width: 205px;
        margin-left: 25px;
    }
    
    .imgList {
        width: 700px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-right: 20px;
        position: relative;
        margin-bottom: 20px;
    }
    
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
    /*按钮*/
    
    .equipment-bottom {
        height: 100px;
        width: 750px;
        justify-content: center;
        align-items: center;
        background-color: #f8f8f8;
        /*position: absolute;
        bottom: 0;
        left: 0;*/
        margin-bottom:0;
    }
    
    .equipment-footer {
        height: 70px;
        width: 720px;
        text-align: center;
        color: white;
        line-height: 70px;
        background-color: #3879d9;
        justify-content: center;
        align-items: center;
    }
    
    .equipment-sub {
        color: white;
        font-size: 26px;
        text-align: center;
        opacity: 1;
    }
    
    .equipment-footer:disabled {
        opacity: 0.6;
    }
</style>

<script>
    import C from '../store/constants'
    import { _getDeviceById } from '../store/fecth.js'
    import detail from '../components/detail.vue';
    import categoryOne from './deviceDetail/category.one.vue';
    const picker = weex.requireModule('picker')
    const modal = weex.requireModule('modal')
    const storage = weex.requireModule('storage');
    const qrCodeModule = weex.requireModule('QRCodeModule')
    const animation = weex.requireModule('animation')
    export default {
        components: {
            'app-detail': detail,
            'category-choose': categoryOne
        },
        data() {
            return {
                showCategoryPanel: false,
                detail: {
                    path: {},
                    title: ''
                },
                detailTitle: '',
                detailName: '',
                headerTitle: '添加设备',
                procurementTime: '请选择采购时间',
                warrantyTime: '请选择质保时间',
                factory: '',
                brand: null,
                area: '',
                category: null,
                brandArray: null,
                qrCode: null,
                equipmentName: null,
                equipmentModel: null,
                standard: null,
                batchNumber: null,
                position: null,
                note: null,
                serviceCompanyId: [],
                loadingTitle: '提交中……',
                loadingShow: false,
                id: 0,
                useCompany: null,
                imgList: [],
                photoes: '[]',
                maskImg: '',
                showMask: false,
                fieldName: '',
                fileName: '',
                fileValue: '',
                object: ''
            }
        },
        filters: {
            name(val) {
                return val && val.Name
            },
            none(val) {
                return val || '暂无'
            },
            warrantyTime(val) {

            }
        },
        methods: {
            selectCategory(category) {
                this.showCategoryPanel = false
                this.category = category
                if (this.id > 0) {
                    this._post("/api/Common/UpdateFieldValue",
                        { table: 'device', fileName: 'CategoryId', fileValue: category.CategoryId, byField: 'DeviceId', byFieldValue: this.id },
                        res => {
                            modal.toast({
                                message: res.result,
                                duration: 0.2
                            })
                        })
                }
            },
            // 图片放大查询
            biggerImg(imgItem, index) {
                this.showMask = true;
                this.maskImg = imgItem.Url;
            },
            // 返回
            returnMask() {
                this.showMask = false;
            },
            // 查看图片原来的尺寸
            // onload(e) {
            //     console.log("图片加载加载完成")
            //     let imgSize = {
            //         imgH: e.size.naturalHeight,
            //         imgW: e.size.naturalWidth
            //     }
            //     this.imgSizeArray.push(imgSize);
            // },
            // 点击移动
            showDetail(name, title, value) {
                this.fieldName = name
                console.log(this.id, this[name], "ttttt")
                this.detail.path = {
                    name: name,
                    params: {
                        value: this[name] || 'null',
                        id: this.id,
                    }
                }
                this.detail.title = title
            },
            closeDetail(val) {
                this.detail.path = ''
                if (this.id > 0) {
                    this.load(this.id)
                    // 有val值
                } else if (val) {
                    if (this.fieldName == 'photoes') {
                        console.log('返回值', val)
                        this.imgList = JSON.parse(val)
                    }
                    this[this.fieldName] = val
                    // val值是空值
                } else if (!val) {
                    this[this.fieldName] = val
                }
            },
            // 时期选择
            pickDate() {
                picker.pickDate({
                    max: '2087-01-01',
                    min: '1900-01-01',
                    value: this.procurementTime
                }, event => {
                    if (event.result == 'success') {
                        this.procurementTime = event.data;
                        if (this.id > 0) {
                            this._post("/api/Common/UpdateFieldValue",
                                { table: 'device', fileName: 'BuyTime', fileValue: this.procurementTime, byField: 'DeviceId', byFieldValue: this.id },
                                res => {
                                    modal.toast({
                                        message: res.result,
                                        duration: 0.2
                                    })
                                })
                        }
                    }
                })
            },
            setQRCode() {
                qrCodeModule.showQRCode((result) => {
                    result = result.substr(result.lastIndexOf('/') + 1);
                    if (this.id == 0) {
                        this.qrCode = result
                    } else {
                        this._post('/api/device/setQRCode', {
                            deviceId: this.id,
                            qrCode: result,
                            address: this.position
                        }, (res) => {
                            if (res.error) {
                                modal.toast({
                                    message: res.error,
                                    duration: 0.2
                                })
                            } else {
                                modal.toast({
                                    message: '保存成功',
                                    duration: 0.2
                                })
                                this.qrCode = result
                            }
                        })
                    }
                })
            },
            // 服务公司是否选择事件
            // onchange(item) {
            //     var self = this;
            //     if (item.Checked) {
            //         item.Checked = false;
            //     } else {
            //         item.Checked = true;
            //     }
            // },
            // 提交按钮事件
            equipmentSubmit() {
                var self = this;
                if (!self.equipmentName) {
                    modal.toast({
                        message: '请输入设备名称(必填项)',
                        duration: 0.2
                    })
                    return;
                } else {
                    self.loadingShow = true;
                    // 如果添加设备时没有选择时间，就传空值
                    if (self.procurementTime == '请选择采购时间') {
                        self.procurementTime = '';
                    }
                    if (self.warrantyTime == '请选择质保时间') {
                        self.warrantyTime = ''
                    }
                    // for (let i = 0; i < self.serviceCompany.length; i++) {
                    //     if (self.serviceCompany[i].Checked) {
                    //         self.serviceCompanyId.push(self.serviceCompany[i].ServiceCompanyId);
                    //     }
                    // }
                    this._post('/api/device/SaveDeviceInfo',
                        {
                            // 加''以防再进来时undefined
                            QRCode: self.qrCode || '',
                            Name: self.equipmentName,
                            Model: self.equipmentModel || '',
                            Spec: self.standard || '',
                            LotNo: self.batchNumber || '',
                            BrandName: self.brand || '',
                            CategoryName: self.category ? self.category.Name : '',
                            Position: self.position || '',
                            BuyTime: self.procurementTime || '',
                            WarrantyTime: self.warrantyTime || '',
                            Note: self.note || '',
                            ServiceCompanyId: self.serviceCompanyId,
                            UseCompanyName: self.useCompany || '',
                            pictureId: self.imgList.map(m => m.PictureId)
                        }, res => {
                            // console.log(this.warrantyTime)
                            if (res.error) {
                                modal.toast({
                                    message: res.error,
                                    duration: 0.1,
                                })
                            } else {
                                modal.toast({
                                    message: res.success,
                                    duration: 0.1
                                })
                                // 返回上一页面
                                this.$events.emit(C.event.DETAIL_BACK)
                                // storage.setItem('deviceItem', JSON.stringify([]), event => { });
                            }
                            self.loadingShow = false;
                        })
                }
            },
            load(id) {
                _getDeviceById(id).then((res) => {

                    this.equipmentName = res.Name;
                    this.qrCode = res.QRCode;
                    this.position = res.Position;
                    this.equipmentModel = res.Model || null;
                    this.standard = res.Spec;
                    this.batchNumber = res.LotNo;
                    this.factory = res.ManufacturerName;
                    this.brand = res.brand;
                    this.area = res.area;
                    this.category = res.Category;
                    this.useCompany = res.UseCompanyName;
                    this.note = res.Note
                    this.imgList = res.imgList
                    this.photoes = JSON.stringify(this.imgList)
                    this.procurementTime = res.BuyTime;
                    this.warrantyTime = res.WarrantyTime;
                }).catch((res) => {
                    console.error(res)
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    }
                });
            }
        },
        // 初始化
        created() {
            // this.InitDate()
            var self = this;
            self.serviceCompanyId.push(this.$store.state.user.serviceCompanyId);

            let id = self.$route.params.id;
            self.id = id;
            // 从列表进入
            if (self.id != 0) {
                this.load(id)
            }
        }
    }

</script>