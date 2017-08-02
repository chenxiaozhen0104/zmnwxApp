<template>
    <div class="orderDetail-container">
        <scroller>
            <div class="orderDetail-list">
                <div class="orderDetail-top orderDetail-style">
                    <div class="orderDetail-row">
                        <text class="order-title order-font">单号：</text>
                        <text class="order-text order-font">{{item.Id}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">二维码：</text>
                        <text class="order-text">{{item.QRCode}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">工单级别：</text>
                        <text class="order-text">{{item.Level | orderLevel}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">需求类型：</text>
                        <text class="order-text">{{item.Type | orderType}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">创建时间：</text>
                        <text class="order-text">{{item.CreateTime}}</text>
                    </div>
                    <image class="work-status" :src="imgUrl"></image>
                </div>
                <div class="orderDetail-describe  orderDetail-style">
                    <div class="orderDetail-row">
                        <text class="order-title">需求描述：</text>
                        <text class="order-text">{{item.Describe}}</text>
                    </div>
                </div>
                <div class="orderDetail-info  orderDetail-style">
                    <div class="orderDetail-row">
                        <text class="order-title">设备名称：</text>
                        <text class="order-text">{{item.DeviceName}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">设备型号：</text>
                        <text class="order-text">{{item.DeviceModel||"暂无"}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">所属品牌：</text>
                        <text class="order-text">{{item.DeviceBrand||"暂无"}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">所属厂家：</text>
                        <text class="order-text">{{item.DeviceManufacturer||"暂无"}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">所属类目：</text>
                        <text class="order-text">{{item.CategoryName||"暂无"}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">所属区域：</text>
                        <text class="order-text">{{item.AreaName||"暂无"}}</text>
                    </div>
                    <!--加质保和客户名称-->
                    <div class="orderDetail-row">
                        <text class="order-title">质保时间：</text>
                        <text class="order-text">{{item.warrantytime||"质保外"}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">客户名称：</text>
                        <text class="order-text">{{item.companyname||"暂无"}}</text>
                    </div>
                </div>
                <!--图片区域-->
                <div class="orderDetail-describe  orderDetail-style">
                    <div class="orderDetail-row">
                        <text class="order-title">现场图片：</text>
                    </div>
                    <div class="orderDetail-row">
                        <image class="showImg" :src="imgs.Url" v-for="imgs in showImgUrl" @click="showMask(imgs)"></image>
                    </div>
                </div>
                <div class="orderDetail-repair orderDetail-style">
                    <div class="orderDetail-row">
                        <text class="order-title">报修单位：</text>
                        <text class="order-text">{{item.UserCompany}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">报修人员：</text>
                        <text class="order-text">{{item.UserName}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">联系电话：</text>
                        <!--打电话-->
                        <Call :telephoneNumber="item.UserPhone" class="order-text"></Call>
                    </div>
                </div>
                <div class="orderDetail-maintain orderDetail-style">
                    <div class="orderDetail-row">
                        <text class="order-title">维修单位：</text>
                        <text class="order-text">{{item.ServiceCompany}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">维修人员：</text>
                        <text class="order-text">{{item.ServiceUserName}}</text>
                    </div>
                    <div class="orderDetail-row">
                        <text class="order-title">联系电话：</text>
                        <!--打电话-->
                        <Call :telephoneNumber="item.ServiceUserPhone" class="order-text"></Call>
                    </div>
                </div>
            </div>
            <!--时间轴-->
            <div class="track-rcol">
                <div class="track-list" v-for="(timeLineItem,i) in timeLineContents">
                    <div class="time-style">
                        <text :class="[ i==0?'time-color':'time']">{{timeLineItem.CreateTime}}</text>
                        <text :class="[ i==0?'time-color':'txt']">{{timeLineItem.Content}}</text>
                    </div>
                    <image class="time-circle" :src="i==0?'http://img.zmnbx.com//dist/Images/ciricleBlue.png':'http://img.zmnbx.com//dist/Images/circleGray.png'"></image>
                </div>
            </div>

        </scroller>
        <!--底部按钮-->
        <div class="orderDetail-bottom" v-if="cancelShow">
            <text class="orderDetail-cancel" @click='btnFun' v-if="oneBtn">{{btnContent}}</text>
            <div class="twoBtn" v-if="!oneBtn">
                <text class="orderDetail-left-cancel" @click='btnFun'>{{btnCancel}}</text>
                <text class="orderDetail-right-transfer" @click='transfer'>{{btnTransfer}}</text>
            </div>
        </div>
        <!--转单弹框-->
        <div class="transfer-descript" v-if="cancelTransfer">
            <div class="transfer-box">
                <div class="transfer-content">
                    <text class="word-text">请选择接受服务单位</text>
                    <div class="selectList" @click="selectCompany">
                        <text class="selectList-text-size">{{serviceCompany.ServiceCompanyName}}</text>
                        <image class="select-img" src="http://img.zmnbx.com//dist/Images/triangle.png"></image>
                    </div>
                    <div class="btn">
                        <button class="submit-transfer" @click="submitTransfer">
                            <text class="submit-text">提交</text>
                        </button>
                    </div>
                </div>
                <image @click='hideDescript' class="workOrder-delete" src="http://img.zmnbx.com//dist/Images/delete.png"></image>
            </div>
        </div>
        <!--文本框-->
        <div class="cancel-descript" @click="clicks" v-if="descriptShow">
            <div class="cancel-box">
                <div class="cancel-content">
                    <text class="descript-title">描述:</text>
                    <textarea class="descript-text" v-model='descriptCont'></textarea>
                    <text @click='commit' class="descript-commit">提交</text>
                </div>
                <image @click='hideCont' class="workOrder-delete" src="http://img.zmnbx.com//dist/Images/delete.png"></image>
            </div>
        </div>
        <!--弹出单选按钮-->
        <!--<div class="radio-form" v-if>
            <text class="text-size" @click="worked">{{selectItem}}</text>
        </div>-->
        <!--蒙版-->
        <div class="mask" @click="clicks" v-if="isMask">
            <div class="maskBox">
                <text class="mask-text">点击图片返回</text>
                <image class="mask-img" resize="cover" :src="imgs" @click="imgReturn"></image>
            </div>
        </div>
        <app-detail :path="detail.path" :title="detail.title" @close="closeDetail" />
    </div>
</template>
<style src="./detail.css" />
<script>
    import * as orderCommon from '../../filters/index.js'
    import assign from './assign.vue'
    import detail from '../../components/detail.vue';
    var modal = weex.requireModule('modal')
    const qrCodeModule = weex.requireModule('QRCodeModule')
    const picker = weex.requireModule('picker')
    const pickerItems = [{ name: "完成", value: 64 }, { name: "未解决", value: 128 }, { name: "取消", value: 256 }, { name: "关闭", value: 512 }]
    export default {
        components: {
            'app-detail': detail
        },
        data() {
            return {
                detail: {
                    path: '',
                    title: ''
                },
                imgSizeArray: [],
                imgBig: [],
                user: this.$store.state.user,
                item: {},
                listItem: [],
                timeLineContents: [],
                imgUrl: '',
                cancelShow: false,
                listShow: false,
                descriptShow: false,
                btnContent: '',
                orderId: '',
                descriptCont: '',
                State: '',
                headerTitle: '工单详情',
                QRCode: '',
                selectItem: "pickerItems[0]",
                serviceUserId: '',
                type: '',
                showImgUrl: null,
                imgs: '',
                isMask: false,
                oneBtn: false,
                cancelTransfer: false,
                serviceCompany: {},//定义的一个数组里面的对象的名字
                selectServiceCompany: []//接收后台数据的数组
            }
        },
        methods: {
            closeDetail() {
                this.detail.path = ''
                this.init()
            },
            btnFun() {
                console.log(this.user.workingway, '000000')
                // 获取工作方式
                this._get("api/Company/GetWorkWay", { serviceCompanyId: this.user.serviceCompanyId }, res => {
                    if (this.State == 16 || this.State == 128) {
                        if (res.workingway == 0) {
                            this.work()
                        } else {
                            this.sms("work")
                        }

                    } else if (this.State == 32) {
                        if (res.workedway == 0) {
                            this.worked()
                        } else {
                            this.sms("worked")
                        }

                    } else if (this.State == 8) {
                        this.detail.path = `/workOrder/orderDetail/${this.orderId}/assign`;
                        this.detail.title = '派单选择'
                    }
                })
            },
            // 转单
            transfer() {
                this.cancelTransfer = true
            },
            // 弹框关闭事件
            hideDescript() {
                this.cancelTransfer = false;
            },
            selectCompany() {
                // 改变radio的颜色
                var index = 0;
                this.selectServiceCompany.forEach((m, i) => {
                    if (m.ServiceCompanyId == this.serviceCompany.ServiceCompanyId) {
                        index = i
                    }
                })
                // 选择接收服务单位

                picker.pick({
                    index: index,
                    items: this.selectServiceCompany.map(item => item.ServiceCompanyName)
                }, event => {
                    if (event.result === 'success') {
                        this.serviceCompany = this.selectServiceCompany[event.data]
                    }
                })

            },
            // 转单提交按钮
            submitTransfer() {
                this._post('/api/order/Forward', { serviceCompanyId: this.serviceCompany.ServiceCompanyId, orderId: this.orderId }, res => {
                    this.cancelTransfer = false;
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        // 将初始化时得到的orderId赋给当前的orderId
                        this.orderId = res.orderId
                        modal.toast({
                            message: "转单成功",
                            duration: 0.2
                        })
                        this.init();
                    }

                })
            },
            // 蒙版
            showMask(imgs) {
                // var ratio1 = (this.imgSizeArray[index].imgH / this.imgSizeArray[index].imgW).toFixed(2);
                // var imgW = 650;
                // var imgH = imgW * ratio1;
                // this.imgBig = [imgW + "px", imgH + "px"];

                this.isMask = true;
                this.imgs = imgs.Url;
            },
            // 去掉蒙版
            imgReturn() {
                this.isMask = false;
            },
            //图片处理
            //  onload(e) {
            //     let imgSize = {
            //         imgH: e.size.naturalHeight,
            //         imgW: e.size.naturalWidth
            //     }
            //     this.imgSizeArray.push(imgSize);
            // },
            // 关闭
            hideCont() {
                this.descriptShow = false;
            },
            // call(phoneNumber) {

            //     communication.call(phoneNumber)
            // },
            sms(type) {
                qrCodeModule.showQRCode((result) => {
                    result = result.substr(result.lastIndexOf('/') + 1);
                    if (result != this.QRCode) {
                        modal.toast({
                            message: '二维码不正确' + result,
                            duration: 0.2
                        })
                    }
                    else {
                        if (type == "work") {
                            this.work();
                        } else if (type == "worked") {
                            this.worked();
                        } else {
                            modal.toast({
                                message: "操作错误",
                                duration: 0.2
                            })
                        }
                    }
                })
            },
            // 开始工作
            work() {
                modal.confirm({
                    message: '确定开始工作？',
                    okTitle: '确定',
                    cancelTitle: '取消'
                }, result => {
                    if (result == "确定") {
                        this._get("/api/order/working",
                            { "orderId": this.orderId },
                            res => {
                                if (res.error) {
                                    modal.toast({
                                        message: '服务器繁忙,请稍后再试试',
                                        duration: 0.2
                                    })
                                } else {
                                    modal.toast({
                                        message: "执行成功",
                                        duration: 0.2
                                    })
                                }
                                this.init();
                            })
                    }
                })
            },
            // 结束工作
            worked() {
                this.detail.path = `/workOrder/orderDetail/${this.orderId}/done`;
                this.detail.title = '结束工作'
            },
            // 判断获取维修员还是管理员应该看到的状态
            getImgSrc(state) {
                if (this.user.type & 1 || this.user.type & 4)
                    return orderCommon.orderStatePic(state)
                else
                    return orderCommon.orderSvcAdminPic(state)
            },
            // 蒙版下面的元素不可点击
            clicks() {

            },
            init() {
                // 获取登录用户的用户类型
                this.cancelShow = false
                this.orderId = this.$route.params.id;
                this._get("/api/order/get", {
                    id: this.orderId
                }, res => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        console.log(res, 'aaaaaa');
                        this.QRCode = res.QRCode;
                        this.ServiceUserId = res.ServiceUserId;
                        this.item = res;
                        this.imgUrl = this.getImgSrc(res.State);
                        this.State = res.State;
                        this.showImgUrl = res.ImgUrl;
                        //console.log(this.showImgUrl,"aa")
                        // console.log(res.imgUrl)
                        //待派单或未解决且用户id就是服务人员的id
                        if ((this.State == 16 || this.State == 128) && (this.ServiceUserId == this.user.id)) {
                            this.cancelShow = true;
                            this.oneBtn = true;
                            this.btnContent = '开始工作'
                        } else if (this.State == 32 && (this.ServiceUserId == this.user.id)) {
                            this.cancelShow = true;
                            this.btnContent = '工作结束'
                            this.oneBtn = true;
                            //只有待派单且是管理员的情况下显示
                        } else if (this.State == 8 && this.user.type & 4) {
                            this.cancelShow = true;
                            this.btnTransfer = '转单'
                            this.btnCancel = '派单';
                            this.oneBtn = false;
                        } else {
                            this.cancelShow = false;
                        }
                    }
                });
                this._get("/api/order/timeline", {
                    orderId: this.orderId
                }, res => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.2
                        })
                    } else {
                        this.timeLineContents = res
                    }
                });
                // 获取登录用户的Id
                this.serviceUserId = this.user.id;
            }
        },
        created() {
            this.init()
            this._post('/api/company/ListServiceCompany', {}, res => {
                this.selectServiceCompany = res;
                this.serviceCompany = res[0]
            })
        }
    }

</script>