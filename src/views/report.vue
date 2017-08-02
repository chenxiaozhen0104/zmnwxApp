<template>
    <div>
        <web class="web" :src="pageSrc"></web>
    </div>
</template>
<script>
    import config from 'config'
    const storage = weex.requireModule('storage')
    export default {
        data() {
            return {
                pageSrc: ''
            }
        },
        created() {
            storage.getItem('token', m => {
                this.pageSrc = config.reportPage + '?token=' + m.data
            })
        }
    }
</script>
<style scoped>
    .web {
        flex: 1;
        /*margin-top:88px;*/
    }
</style>