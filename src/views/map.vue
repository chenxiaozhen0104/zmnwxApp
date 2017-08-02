<template>
    <div class="map-container">
        <!--地图页面-->
        <div class="pageMap" v-if="hasPositionLists">
            <div class="outerList">
                <scroller class="scroller" scroll-direction="horizontal" show-scrollbar="false">
                    <div class="track-list" v-for="(item,i) in positionLists" @click="move(item,i)">
                        <div class="time-style">
                            <text class="time-color" :style="{'color':colors[i===activeIndex?1:0]}">{{item.Creatime}}</text>
                        </div>
                        <image class="time-circle" :src="i===activeIndex?'http://img.zmnbx.com//dist/Images/ciricleBlue.png':'http://img.zmnbx.com//dist/Images/circleGray.png'"></image>
                    </div>
                </scroller>
            </div>
            <map class="webview" ref="map" :center="center">
            <marker v-for="(item,i) in positionLists" 
                :key="i" 
                :latitude="item.Latitude" 
                :longitude="item.Longitude" 
                :snippet="item.Creatime" />
                <polyline :points="points" color="#ff0000ff" width="20" />
            </map>
        </div>
        <div class="none">
            <text class="none-text">暂无数据</text>
        </div>
    </div>
    </div>
</template>
<script>
    import config from 'config'
    const modal = weex.requireModule('modal')
    const storage = weex.requireModule('storage')
    export default {
        data() {
            return {
                points: [],
                center: [30.288056, 120.058534],
                users: [],
                position: [30.288056, 120.058534],
                src: [1, 2, 3],
                userId: '',
                colors: ['#333333', '#3879D9'],
                userState: '',
                positionLists: null,
                nameMap: '',
                beginTime: '',
                endTime: '',
                activeIndex: '',
                hasPositionLists: false
            }
        },
        methods: {

            move(dateTime, index) {
                this.activeIndex = index;
                this.center = [dateTime.Latitude, dateTime.Longitude]
            },
            getMap(id) {
                var date = new Date()
                var today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                this._get('API/User/GetUserPositionList', { userId: id, beginTime: `${today} 08:00:00`, endTime: `${today} 20:00:00` }, res => {
                    res.list = res.list.map(function (item) {
                        item.Creatime = item.Creatime.substring(11, 16);
                        return item;
                    })
                    console.log(res.list)
                    // 判断是否出现地图
                    if (res && res.list) {
                        this.hasPositionLists = true
                        this.positionLists = res.list;
                        this.points = res.list.map(item => [item.Latitude, item.Longitude])
                    } else {
                        this.hasPositionLists = false
                    }
                })
            }
        },
        created() {
            this.getMap(this.$route.params.id)
        }
    }

</script>
<style>
    /*地图*/

    .none {
        flex: 1;
        align-items: center;
        padding-top: 20px;
    }

    .none-text {
        color: #ddd;
        font-size: 26px;
    }

    .pageMap {
        width: 750px;
        height:1334px;
    }

    .webview {
        flex: 1;
    }

    .outerList {
        width: 750px;
    }
    /*时间轴*/

    .scroller {
        flex-direction: row;
        height: 110px;
        background-color: #f5f5f5;
        padding-top: 20px;
    }

    .track-list {
        position: relative;
        flex-direction: row;
        padding-top: 15px;
    }

    .time-style {
        border-top-style: solid;
        border-top-color: #aaa;
        border-top-width: 2px;
        color: #728594;
        width: 150px;
        font-size: 26px;
        padding-top: 30px;
        padding-right: 10px;
        align-items: center;
    }


    .time-circle {
        position: absolute;
        left: 55px;
        top: 0px;
        height: 30px;
        width: 30px;
    }

    .time {
        margin-right: 20px;
        padding-bottom: 10px;
        color: #c0c0c0;
    }

    .time-color {
        flex-direction: column;
        color: #aaa;
    }
    /*头部*/

    .header-top {
        width: 750px;
    }

    .header-top-img {
        width: 88px;
        height: 88px;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
    }

    .header-top-content {
        height: 88px;
        background-color: #0092FC;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: relative;
        top: 0;
        left: 0;
    }

    .header-top-return {
        height: 40px;
        width: 40px;
    }

    .header-top-text {
        font-size: 40px;
        color: white;
    }
</style>