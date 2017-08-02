<template>
    <div class="wrapper">

        <AppHeader title="选择企业" back="/login"></AppHeader>
        <div class="btn-groups">
            <div class="group">
                <text class="button group-btn1" @click="pageTo('/addCompany')">加入已有企业</text>
            </div>
            <div class="group">
                <text class="button group-btn2" @click="pageTo('/company')">注册企业</text>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .btn-groups {
        flex: 1;
        align-items: center;
        justify-content: center;
    }
    
    .wrapper {
        flex-direction: column;
        justify-content: center;
    }
    
    .group {
        flex-direction: row;
        justify-content: center;
        margin-bottom: 50px;
        align-items: center;
    }
    
    .button {
        font-size: 36px;
        width: 380px;
        color: white;
        text-align: center;
        padding-top: 25px;
        padding-bottom: 25px;
        margin-bottom: 30px;
    }
    
    .group-btn1 {
        background-color: rgb(114, 133, 148);
    }
    
    .group-btn2 {
        background-color: #3879d9;
    }
</style>