<template>
    <el-row justify="space-between">
        <el-col :span="20">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template #title>我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template #title>选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4">
                    <a href="https://www.ele.me" target="_blank">订单管理</a>
                </el-menu-item>
            </el-menu>
        </el-col>

        <el-col :span="4" style="text-align: right;">
            <!-- Log Out 按钮 -->
            <el-button type="danger" @click="logout">Log Out</el-button>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: {
        activeIndex: {
            type: String,
            default: '1',
        },
        backgroundColor: {
            type: String,
            default: '#545c64',
        },
        textColor: {
            type: String,
            default: '#fff',
        },
        activeTextColor: {
            type: String,
            default: '#ffd04b',
        },
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        logout() {
            // 清除本地存储的 token
            localStorage.removeItem('token');

            // 跳转回登录页面
            this.$router.push('/');
        },
    },
};
</script>

<style scoped>
.el-menu-demo {
    line-height: 60px;
}
</style>