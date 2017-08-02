<template>
    <div class="app-footer">
        <div class="footer-item"  @click="pageTo('/workOrder')">
            <image class="app-footer-image"  :src="order[active==0?1:0]"></image>
            <div>
                <text :style="{'color':colors[active==0?1:0]}">工单</text>
            </div>
        </div>
        <div class="footer-item"  @click="pageTo('/device')">
            <image class="app-footer-image"  :src="device[active==1?1:0]"></image>
            <div>
                <text :style="{'color':colors[active==1?1:0]}">设备</text>
            </div>
        </div>
        <div class="footer-item"  @click="pageTo('/my')">
            <image class="app-footer-image"  :src="my[active==2?1:0]"></image>
            <div>
                <text :style="{'color':colors[active==2?1:0]}">我的</text>
            </div>
        </div>
    </div>
</template>
<style>
    .app-footer-image {
        width: 40px;
        height: 40px;
        margin-bottom: 10px;
    }
    
    .app-footer {
        flex-direction: row;
        height: 100px;
        width: 750px;
        border-top-style: solid;
        border-top-width: 2px;
        border-top-color: #ddd;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #fff;
    }
    
    .footer-item {
        flex: 1;
        align-items: center;
        justify-content: center;
    }
</style>

<script>
    module.exports = {
        name: 'AppFooter',
        props: ['active'],
        data() {
            return {
                my: ['http://img.zmnbx.com//dist/Images/user2.png', 'http://img.zmnbx.com//dist/Images/clickUser.png'],
                device: ['http://img.zmnbx.com//dist/Images/equipment.png', 'http://img.zmnbx.com//dist/Images/clickEquipment.png'],
                order: ['http://img.zmnbx.com//dist/Images/workorder.png', 'http://img.zmnbx.com//dist/Images/clickWorkorder.png'],
                colors: ['#333333', '#3879D9']
            }
        }
    }
</script>