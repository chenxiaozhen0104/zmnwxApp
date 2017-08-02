<template>
    <div>
        <image resize="cover" class="app-img" :src="src" :style="thumbnailStyle" />
        <div class="app-img-mask" ref="imagePanel" @panstart="touchstart" @panmove="touchmove" @panend="touchend">
            <image resize="contain" class="app-img" :src="src" :style="style" />
            <text>{{show}}</text>
            <text>b1:{{JSON.stringify(b1)}}</text>
            <text>b:{{JSON.stringify(b)}}</text>
            <text>scale:{{scale}}</text>
            <text>{{JSON.stringify(style)}}</text>
        </div>
    </div>

</template>
<style>
    .app-img-mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .app-thumbnail {}

    .app-img {
        width: 750px;
        height: 750px;
        position: absolute;
    }
</style>
<script>
    const storage = weex.requireModule('storage')
    const animation = weex.requireModule('animation')
    var env = weex.config.env;
    export default {
        props: ['src', 'width', 'height'],
        data() {
            return {
                b: { x: 0, y: 0 },
                b1: { x: 0, y: 0 },
                style: {
                    width: '750px',
                    // height: env.deviceHeight / env.deviceWidth * 750 + 'px',
                    left: 0,
                    top: 0,
                    transform: 'scale(1, 1)'
                },
                thumbnailStyle: {
                    width: this.width,
                    height: this.height
                },
                scale: 1,
                bScale: 1,
                bLength: 0,
                event: '',
                btouch2: {},
                clicktime: 0,
            }
        },
        methods: {
            getPointLength(p1, p2) {
                return Math.abs(Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2)))
            },
            touchstart(e) {
                this.event = '开始'
                this.clicktime = (new Date()).getTime()
                var touchs = e.changedTouches
                this.b = {
                    x: touchs[0].screenX,
                    y: touchs[0].screenY
                }
                //移动端touchstart只能识别出一个手指
            },
            touchmove(e) {
                this.event = '移动'
                var touchs = e.changedTouches
                if (touchs.length > 1) {
                    var one = { x: touchs[0].screenX, y: touchs[0].screenY }
                    var two = { x: touchs[1].screenX, y: touchs[1].screenY }
                    if (this.bLength == 0) {
                        this.bLength = this.getPointLength(one, two)
                    }
                    var cLength = this.getPointLength(one, two)
                    this.scale = this.bScale * cLength / this.bLength
                    this.style.transform = `scale(${this.scale},${this.scale})`
                    //两点距离公式 (x1-x2)平方+(y1-y2)平方=len平方
                } else {
                    this.style.left = this.b1.x + touchs[0].screenX - this.b.x
                    this.style.top = this.b1.y + touchs[0].screenY - this.b.y
                }
            },
            touchend(e) {
                this.event = '结束'
                this.b1.x = this.style.left
                this.b1.y = this.style.top
                this.bLength = 0
                this.bScale = this.scale
                let time = (new Date()).getTime() - this.clicktime
                if (time < 1000) {
                    this.$emit('click')
                }
            }
        },
        watch: {
            show(newVal, oldVal) {
                console.log('更新SHOW值')
                let scale = newVal ? 1 : 0
                animation.transition(this.$refs.imagePanel, {
                    styles: {
                        transform: `scale(${scale},${scale})`,
                        transformOrigin: 'center center'
                    },
                    duration: 400, //ms
                    timingFunction: 'ease',
                    delay: 0 //ms
                })
            }
        },
        created() {
            this.style.height = env.deviceHeight / env.deviceWidth * 750 + 'px'
        }
    }

</script>