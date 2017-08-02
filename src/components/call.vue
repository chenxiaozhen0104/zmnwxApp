<template>
    <div class="container">
        <text class="call-text" @click="call(telephoneNumber)">{{telephoneNumber}}</text>
    </div>
</template>
<style>
    .call-text {
        color: #3879d9;
        font-size: 26px;
    }
    .call-text:active{
        color:red;
    }
</style>
<script>
    var communication = weex.requireModule('Communication')
    module.exports = {
        name: 'Call',
        props: ['telephoneNumber'],
        data() {
            return {

            }
        },
        methods: {
            call(phoneNumber) {
                communication.call(phoneNumber)
            }
        }
    }

</script>