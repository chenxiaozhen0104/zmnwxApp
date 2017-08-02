<template>
    <div class="device-container">
        <!--搜素头部-->
        <div class="device-head1 wx-device-head">
            <div class="device-search1 wx-device-search">
                <div class="search-bg1 wx-search-bg">
                    <image class="img-search" src="http://img.zmnbx.com//dist/Images/search.png"></image>
                    <input class="search-input wx-search-input" @input="doSearch()" type="text" placeholder="搜索名称/地址/二维码/型号/批次" v-model='searchKey'
                    />
                </div>
                <div class="add-equipment" @click="showDetail(0)">
                    <image class="add-img" src="http://img.zmnbx.com//dist/Images/add.png"></image>
                </div>
            </div>
        </div>
        <!--设备列表及加载刷新-->
        <list class="device-content wx-device-content" loadmoreoffset="10" @loadmore="onOrderloading">
            <refresh class="refresh" @refresh="onpullingdown" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">刷新中...</text>
            </refresh>
            <cell class="device-list" v-for="item in items">
                <div class="list-left" @click="showDetail(item.id)">
                    <div class="row">
                        <div class="row-col-8">
                            <text class='text-title'>{{item.name}}</text>
                        </div>
                    </div>

                    <div class="row">
                        <div class="row-col-8">
                            <text class="text-info">类目：{{item.category|noneStr}}</text>
                        </div>
                        <div class="row-col-4">
                            <text class="text-info">品牌：{{item.brand|noneStr}}</text>
                        </div>
                    </div>
                    <div class="row">
                        <div class="row-col-8">
                            <text class="text-info">型号：{{item.model|noneStr}}</text>
                        </div>
                        <div class="row-col-4">
                            <text class="text-info">规格：{{item.spec|noneStr}}</text>
                        </div>
                    </div>

                    <div class="row">
                        <div class="row-col-8">
                            <text class="text-info">所属单位：{{item.useCompanyName}}</text>
                        </div>
                        <div class="row-col-4">
                            <text class="text-info">批号：{{item.lotNo|noneStr}}</text>
                        </div>
                    </div>
                    <div class="row">
                        <div class="row-col-8">
                            <text class="text-info col" >安装地址：{{item.address|noneStr}}</text>
                        </div>
                    </div>
                    <div class="row">
                        <div class="row-col-8">
                            <text class='text-info'>二维码：{{item.qrcode||'未绑定'}}</text>
                        </div>
                    </div>
                </div>
                <!--<div class="list-right">
					<text class="device-repairBtn" @click="redirectResult('/repairId/'+item.id,index)" :ref="'a'+index">报修</text>
				</div>-->
            </cell>
            <cell class="loading" v-if="hasMore">
                <text>没有更多了</text>
            </cell>
        </list>
        <!--设备tab切换-->
        <dropdown class="dropdown" @dropdownselect="dropdownSelect"></dropdown>
        <!--动画加载功能-->
        <goingOn :title="loadingTitle" v-if="isShow"></goingOn>
        <!--底部-->
        <Footer :active="1"></Footer>
        <app-detail :path="detail.path" :title="detail.title" @close="closeDetail" />
    </div>
</template>

<style>
    .device-container {
        width: 750px;
    }

    .device-head1 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: 750px;
    }

    .dropdown {
        position: absolute;
        top: 100px;
        left: 0;
        width: 750px;
    }
    /*搜索部分样式1*/

    .device-search1 {
        height: 100px;
        background-color: #0092fc;
        justify-content: center;
        align-items: center;
        position: relative
    }

    .add-equipment {
        height: 100px;
        width: 100px;
        position: absolute;
        right: 0;
        top: 0;
        justify-content: center;
        align-items: center;
    }

    .add-img {
        height: 50px;
        width: 50px;
    }

    .search-bg1 {
        /*height: 80px;
		width: 580px;*/
        height: 70px;
        width: 540px;
        background-color: rgba(46, 140, 212, 0.8);
        padding-left: 40px;
        border-radius: 70px;
        position: relative;
        margin-left: -10px;
    }

    .img-search {
        position: absolute;
        top: 18px;
        left: 20px;
        height: 40px;
        width: 40px;
    }

    .search-input {
        height: 70px;
        width: 500px;
        margin-left: 35px;
        border: 0;
        background-color: transparent;
        color: #FFFFFF;
        placeholder-color: #FFFFFF;
        font-size:28px;
    }
    /*设备列表样式*/

    .device-content {
        margin-top: 188px;
        margin-bottom: 105px;
    }

    .device-list {
        padding: 15px;
        background-color: #FFFFFF;
        border-bottom-color: #ddd;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        flex-direction: row;
    }

    .list-left {
        flex: 4;
        padding-left: 80px;
        padding-right: 30px;
    }

    .row {
        flex-direction: row;
        margin-top: 10px;
        margin-bottom: 10px;
        justify-content: space-between;
    }

    .row-col-8 {
        flex: 7;
        /*background-color:red;*/
        /*padding-left: 60px;*/
    }

    .row-col-4 {
        flex: 5;
        /*background-color:green;*/
        padding-left: 100px;
    }

    .col {
        height: auto;
        width: 560px;
    }

    .text-title {
        font-size: 26px;
        /*text-align:center;*/
    }

    .text-info {
        color: #aaa;
        font-size: 24px;
        /*text-align:center;*/
    }

    .img-erweima {
        height: 60px;
        width: 80px;
        margin-left: -13px;
    }
    /*设备列表右侧样式*/
    /*.list-right {
        flex: 1;
        align-items: flex-end;
        justify-content: center;
        height: 190px;
    }*/

    .device-repairBtn {
        background-color: #f8b551;
        height: 50px;
        width: 130px;
        font-size: 26px;
        text-align: center;
        line-height: 50px;
        color: white;
        /*margin-top:60px;*/
    }
    /*动画加载及刷新样式*/

    .loading,
    .refresh {
        height: 80px;
        justify-content: center;
        align-items: center;
        width: 750px;
        line-height: 80px;
    }

    .indicator {
        font-size: 26px;
        height: 80px;
        text-align: center;
        line-height: 80px;
    }
</style>

<script>
    import dropdown from '../components/dropdown.vue';
    import detail from '../components/detail.vue';
    import { _getDevices, _getDeviceById } from '../store/fecth.js';
    const animation = weex.requireModule('animation');
    const modal = weex.requireModule('modal');
    const dom = weex.requireModule('dom');
    const storage = weex.requireModule('storage')
    export default {
        components: { dropdown, 'app-detail': detail },
        data() {
            return {
                detail: {
                    id: 0,
                    path: '',
                    title: ''
                },
                searchKey: '',
                areaId: '',
                categoryId: '',
                brandId: '',
                pageIndex: 1,
                pageSize: 20,
                items: [],
                num: '',
                isShow: false,
                refreshing: false,
                loadingTitle: '加载中……',
                hasMore: false
                // addShow: false
            }
        },
        methods: {
            closeDetail() {
                this.detail.path = ''
                console.log('关闭详情页', this.detail.id)
                // if (this.detail.id == 0) {
                //     this.doSearch()
                //     return
                // }
                // for (let i = 0; i < this.items.id; i++) {
                //     var item = this.items[i]
                //     if (item.id == this.detail.id) {
                //         _getDeviceById(item.id).then(res => {
                //             item = {
                //                 id: item.id,
                //                 name: res.Name,
                //                 qrcode: res.QRCode,
                //                 category: res.Category && res.Category.Name || '',
                //                 brand: res.Brand && res.Brand.Name || '',
                //                 model: res.Model,
                //                 serverName: res.UseCompanyName,
                //                 address: res.Position,
                //             }
                //         })
                //         return;
                //     }
                // }
                this.pageIndex = 1;
				this.items = [];
				this.search();
            },
            showDetail(id) {
                this.detail.path = '/device/detail/' + id
                this.detail.id = id
                this.detail.title = id ? '设备详情' : '新增设备'
            },
            // tab菜单下拉选择
            dropdownSelect(type, id) {
                if (type == "area") {
                    this.areaId = id;
                }
                if (type == "category") {
                    this.categoryId = id;
                }
                if (type == "brand") {
                    this.brandId = id;
                }
                this.pageIndex = 1;
                this.items = [];
                this.search();
                this.refreshing = false;
                this.loadingTitle = "加载中...";
            },
            doSearch() {
                this.pageIndex = 1;
                this.items = [];
                this.search();
            },
            // 搜索事件
            search() {
                this.isShow = true;
                _getDevices(this.searchKey, this.areaId, this.categoryId, this.brandId, this.pageIndex, this.pageSize).then((res) => {
                    this.num = res.count;
                    if (this.items.length < this.num) {
                        this.pageIndex++;
                        this.items = this.items.concat(res.data);
                        this.hasMore = false;
                    } else {
                        this.hasMore = true;
                    }
                    this.refreshing = false;
                    this.isShow = false;
                }).catch((res) => {
                    if (res.error) {
                        modal.toast({
                            message: res.error,
                            duration: 0.1
                        })
                    }
                })
            },
            // 下拉加载
            onOrderloading() {
                this.search();
            },
            // 上拉刷新
            onpullingdown() {
                this.refreshing = true;
                this.loadingTitle = "刷新中..."
                this.pageIndex = 1;
                this.items = [];
                this.search();
            }
        },
        created() {
            var self = this;
            if (self.items.length == 0) {
                this.search();
                this.isShow = true;
            }

        },
        // 过滤器
        filters: {
            noneStr: function (value) {
                return value || '暂无'
            }
        }
    }

</script>