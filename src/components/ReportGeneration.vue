<template>

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
        <el-sub-menu index="1">
            <template v-slot:title><img src="../assets/logo.png" alt="Image 1" style="width: 20px; height: 20px; margin-right: 8px;"></template>
            <el-menu-item index="1-1" @click="goToPage('/UpdateInformation')">Manage Personal Information</el-menu-item>
            <el-menu-item index="1-2" @click="goToPage('/HealthData')">Health Data</el-menu-item>
            <el-menu-item index="1-3" @click="goToPage('/DietSportPreference')">Diet and Sport Preference</el-menu-item>
            <el-menu-item index="1-4" @click="logout">Log out</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">Generate Report</el-menu-item>
        <el-menu-item index="3" @click="goToPage('/ReportReview')">Historical Report Review</el-menu-item>
    </el-menu>

    
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
        goToPage(route) {
            this.$router.push(route); // 使用 Vue Router 进行页面跳转
        },
    },
};
</script>

<style scoped>
.el-menu-demo {
    line-height: 0;
    margin-top: 0;
    padding-top: 0;
}





</style>