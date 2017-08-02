<template>
    <div class="container">
        <div class="import">
            <!--<input class="import-input" type="text" placeholder="请选择维修业务范围" v-model="val" />-->
            <text class="import-text">{{val}}</text>
        </div>
        <div class="range">
            <div class="range-select" v-for="item in category" @click="selectRange(item)" :style="{'background-color':colors[item.isSelect?1:0]}">
                <text class="range-text">{{item.Name}}</text>
            </div>
        </div>
        <div class="footer-bottom">
            <button class="footer-box" @click="saveChange">
                <text class="footer-sub">保存</text>    
            </button>
        </div>
    </div>
</template>
<style>
    .container {
        width: 750px;
        flex: 1;
        /*justify-content: center;*/
        align-items: center;
    }
    
    .range {
        margin-top: 30px;
        width: 720px;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
    }
    
    .import {
        width: 720px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom-style: solid;
        border-bottom-color: #cdcdcd;
        border-bottom-width: 2px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-right: 20px;
        padding-left: 20px;
    }
    
    .import-text {
        width: 700px;
        flex-wrap: wrap;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 10px;
        border: none;
        padding-left: 10px;
        font-size: 30px;
        color: #333;
    }
    
    .range-select {
        padding-top: 20px;
        padding-bottom: 20px;
        padding-right: 30px;
        padding-left: 30px;
        border-color: #bcbcbc;
        border-width: 1px;
        border-style: solid;
        margin-bottom: 15px;
    }
    
    .range-text {
        color: #333;
        font-size: 30px;
    }
    /*保存按钮*/
    
    .footer-bottom {
        height: 100px;
        width: 750px;
        justify-content: center;
        align-items: center;
        background-color: #f8f8f8;
        /*position:absolute;
        bottom:0;
        left:0;*/
        margin-top: 40px;
    }
    
    .footer-box {
        height: 70px;
        width: 720px;
        text-align: center;
        color: white;
        line-height: 70px;
        background-color: #3879d9;
        justify-content: center;
        align-items: center;
    }
    
    .footer-sub {
        color: white;
        font-size: 26px;
        text-align: center;
        opacity: 1;
    }
</style>

<script>
    import C from '../../store/constants'
    const modal = weex.requireModule('modal')
    const storage = weex.requireModule('storage')
    export default {
        data() {
            return {
                category: [],
                colors: ["#ffffff", "#fbbe2a"],
                user: this.$store.state.user,
                fieldValue: '',
                rangeName: '',
                val: this.$route.params.value == 'null' ? '' : this.$route.params.value,
            }
        },
        methods: {
            selectRange(item) {
                var self = this;
                self.val = '';
                item.isSelect = !item.isSelect
                self.category.filter(function (obj) {
                    if (obj.isSelect == true) {
                        self.val += obj.Name + ',';
                    }
                });
            },
            saveChange() {
                this._post("/api/Company/EditField",
                    { id: this.user.serviceCompanyId, fieldName: 'Categorys', value: this.val },
                    res => {
                        console.log(res)
                        this.$events.emit(C.event.DETAIL_BACK, this.val)
                        modal.toast({
                            message: res.result,
                            duration: 0.2
                        })
                    })
            }
        },
        created() {
            var self=this;
            self._get("/api/Company/GetCategorys", {}, res => {
                self.category = res.filter(function (item) {
                    if(self.val.indexOf(item.Name)!=-1){
                        item.isSelect = true;
                    }else{
                         item.isSelect = false;
                    }
                    return true;
                });

            })
        }
    }

</script>