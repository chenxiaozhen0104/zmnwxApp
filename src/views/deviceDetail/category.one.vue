<template>
    <div class="mask" ref="mask" :style="maskStyle" @click="close">
        <!--更改设备名称-->

        <!--保存按钮-->
        <!--<div class="footer-bottom">
            <button class="footer-box" @click="saveChange">
                <text class="footer-sub">保存</text>    
            </button>
        </div>-->
        <div class="category-panel" ref="panel" @click="(e)=>{e.stopPropagation()}">
            <div class="category-select category-select-title">
                <div class="category-cell">
                    <text class="text-center">{{level1|selectItem}}</text>
                </div>
                <div class="category-cell">
                    <text class="text-center">{{level2|selectItem}}</text>
                </div>
                <div class="category-cell">
                    <text class="text-center">{{level3|selectItem}}</text>
                </div>
                <div class="category-cell">
                    <text class="text-center">{{level4|selectItem}}</text>
                </div>
                <text class="link" @click="save">保 存</text>
            </div>
            <div class="category-select">
                <scroller class="category-scorller">
                    <text v-for="item in level1" :class="['text-center',item.selected?'text-active':'']" @click="optionClick(item)">{{item.Name}}</text>
                </scroller>
                <scroller class="category-scorller">
                    <text v-for="item in level2" :class="['text-center',item.selected?'text-active':'']" @click="optionClick(item)">{{item.Name}}</text>
                </scroller>
                <scroller class="category-scorller">
                    <text v-for="item in level3" :class="['text-center',item.selected?'text-active':'']" @click="optionClick(item)">{{item.Name}}</text>
                </scroller>
                <scroller class="category-scorller">
                    <text v-for="item in level4" :class="['text-center',item.selected?'text-active':'']" @click="optionClick(item)">{{item.Name}}</text>
                </scroller>
            </div>
        </div>
    </div>
</template>

<style src="./device.css" />
<style>
    .text-active {
        color: #0998d6;
        border-bottom-color: #0998d6;
        border-bottom-style: solid;
        border-bottom-width: 1px;
    }

    .link {
        color: #0998d6;
        position: absolute;
        right: 20px;
        font-size: 30px;
        top: 0;
    }

    .text-center {
        text-align: center;
        font-size: 26px;
        height: 50px;
        line-height: 50px;
        border-bottom-width: 0;
    }



    .category-select {
        flex-direction: row;
        margin-top: 10px;
    }

    .category-select-title {
        width: 750px;
        border-bottom-width: 1px;
        border-bottom-color: #ddd;
        border-bottom-style: solid;
        height: 50px;
        position: relative;
    }

    .category-scorller {
        margin-left: 10px;
        margin-right: 10px;
        height: 640px;
        padding-bottom: 40px;
    }

    .category-cell {
        margin-left: 10px;
        margin-right: 10px;
    }

    .category-panel {
        background-color: #fff;
        position: absolute;
        bottom: 0;
        width: 750px;
        height: 700px;
        transform: translateY(700px)
    }

    .mask {
        background-color: rgba(0, 0, 0, 0.1);
        width: 0;
        position: fixed;
        top: 0;
        bottom: 0;
    }
</style>
<script>
    import C from '../../store/constants'
    const modal = weex.requireModule('modal')
    const storage = weex.requireModule('storage')
    var categoryAll = []
    var animation = weex.requireModule('animation')
    export default {
        props: ['show', 'chooseItem'],
        filters: {
            selectItem(list) {
                let result = list.filter(m => m.selected);
                return result.length > 0 ? result[0].Name : ''
            }
        },
        data() {
            return {
                id: this.$route.params.id,
                val: this.$route.params.value == 'null' ? '' : this.$route.params.value,
                fieldName: '',
                fieldValue: '',
                history: '',
                histories: [],
                showNothing: false,
                level1: [],
                level2: [],
                level3: [],
                level4: [],
                selectItem: {},
                //===动画属性
                maskStyle: { width: 0 }
            }
        },
        methods: {
            close() {
                this.$emit('onmaskclick')
            },
            optionClick(item) {
                categoryAll.forEach(m => {
                    if (m.LevelDeep >= item.LevelDeep) {
                        m.selected = false
                    }
                })
                item.selected = true
                console.log(item, this['level' + item.LevelDeep])
                var nextDept = item.LevelDeep + 1
                for (let i = nextDept; i < 5; i++) {
                    this['level' + i] = []
                }
                if (nextDept < 5) {
                    this['level' + nextDept] = categoryAll.filter(m => m.LevelDeep == nextDept
                        && m.Left > item.Left
                        && m.Right < item.Right)
                }
                this.selectItem = item;
            },
            save() {
                console.log('触发选择类目事件', this.selectItem)
                this.$emit('onselect', this.selectItem)
            },
            hideAnimation() {
                var maskEl = this.$refs.mask;
                animation.transition(maskEl, {
                    styles: {
                        backgroundColor: 'rgba(0,0,0,0)'
                    },
                    duration: 400, //ms
                    timingFunction: 'ease-in',
                    delay: 0 //ms
                })
                var panelEl = this.$refs.panel;
                animation.transition(panelEl, {
                    styles: {
                        transform: 'translateY(100%)'
                    },
                    duration: 400, //ms
                    timingFunction: 'ease-in',
                    delay: 0 //ms
                }, () => {
                    this.maskStyle.width = '0px'
                })
            },
            showAnimation() {
                this.maskStyle.width = '750px'
                var maskEl = this.$refs.mask;
                animation.transition(maskEl, {
                    styles: {
                        backgroundColor: 'rgba(0,0,0,0.6)'
                    },
                    duration: 400, //ms
                    timingFunction: 'ease-in',
                    delay: 0 //ms
                })
                var panelEl = this.$refs.panel;
                animation.transition(panelEl, {
                    styles: {
                        transform: 'translateY(0)'
                    },
                    duration: 400, //ms
                    timingFunction: 'ease-in',
                    delay: 200 //ms
                })
            }
        },
        created() {
            this.$watch('show', (newVal, oldVal) => {
                if (newVal) {
                    this._get('/api/device/GetDeviceSelectInfo', {}, res => {
                        var s = {}
                        categoryAll = res.Category.map(m => {
                            if (this.chooseItem && m.Left <= this.chooseItem.Left && m.Right >= this.chooseItem.Right) {
                                m.selected = true
                                s[m.LevelDeep + ''] = m;
                            } else {
                                m.selected = false
                            }
                            return m
                        })
                        this.level1 = categoryAll.filter(m => m.LevelDeep == 1)
                        for (let key in s) {
                            let parent = s[key]
                            let dept = key * 1 + 1
                            this['level' + dept] = categoryAll.filter(m => m.LevelDeep == dept
                                && parent.Left < m.Left
                                && parent.Right > m.Right)
                            console.log('level' + dept, this['level' + dept].length)
                        }
                        this.selectItem = this.chooseItem || {}
                    })
                    this.showAnimation()
                } else {
                    this.hideAnimation()
                }
            })
        }
    }

</script>