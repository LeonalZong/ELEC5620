<template>

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
        <el-sub-menu index="1">
            <template v-slot:title><img src="../assets/logo.png" alt="Image 1" style="width: 20px; height: 20px; margin-right: 8px;"></template>
            <el-menu-item index="1-1" @click="goToPage('/Health-Management')">Main Page</el-menu-item>
            <el-menu-item index="1-2" @click="goToPage('/UpdateInformation')">Manage Personal Information</el-menu-item>
            <el-menu-item index="1-3" @click="goToPage('/HealthData')">Health Data</el-menu-item>
            <el-menu-item index="1-4" @click="goToPage('/DietSportPreference')">Diet and Sport Preference</el-menu-item>
            <el-menu-item index="1-5" @click="logout">Log out</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2" @click="goToPage('/ReportGeneration')">Generate Report</el-menu-item>
        <el-menu-item index="3" @click="goToPage('/ReportReview')">Historical Report Review</el-menu-item>
    </el-menu>
    <div class="homepage">
    <h1>欢迎来到健康管理系统！</h1>
    <p>欢迎您登入本系统！我们专注于提供个性化的健康管理服务，帮助您全面掌控自己的健康状况，并优化生活方式。以下是系统为您提供的主要功能：</p>

    <section class="feature">
      <h2>1. 个人健康数据管理</h2>
      <p>
        在“个人健康数据管理”模块中，您可以随时查看和更新您的健康数据，包括身高、体重、血压、心率等重要健康指标。我们的系统将帮助您跟踪健康变化，并为您提供健康建议。
      </p>
      <ul>
        <li>查看和编辑个人健康数据</li>
        <li>定期提醒数据更新</li>
        <li>数据历史趋势分析</li>
      </ul>
    </section>

    <section class="feature">
      <h2>2. 健康报告生成</h2>
      <p>
        根据您提交的健康数据，系统将自动生成详尽的健康报告，帮助您了解健康状况，并为未来的健康管理提供科学依据。
      </p>
      <ul>
        <li>自动生成个人健康报告</li>
        <li>专业的健康分析与建议</li>
        <li>生成PDF格式报告，便于分享和记录</li>
      </ul>
    </section>

    <section class="feature">
      <h2>3. 历史报告查看</h2>
      <p>
        想查看过去的健康状况？您可以在“历史报告查看”模块中访问所有历史健康报告，轻松对比各时间段的数据变化，了解自己在健康管理方面的进展。
      </p>
      <ul>
        <li>查看所有历史健康报告</li>
        <li>数据变化趋势可视化</li>
        <li>支持按日期筛选报告</li>
      </ul>
    </section>

    <section class="feature">
      <h2>4. 饮食与运动偏好设置</h2>
      <p>
        系统允许您设置并管理个人的饮食和运动偏好，生成个性化的生活方式建议，帮助您达到健康目标。
      </p>
      <ul>
        <li>定制化饮食与运动计划</li>
        <li>追踪饮食与运动目标完成情况</li>
        <li>个性化推荐与调整</li>
      </ul>
    </section>

    <section class="feature">
      <h2>6. 退出系统</h2>
      <p>
        完成所有操作后，您可以随时退出系统，确保您的个人信息和数据安全。我们致力于为您提供一个安全、可靠的健康管理平台。
      </p>
    </section>

    <el-divider></el-divider>

    <h2>立即开始您的健康管理之旅！</h2>
    <p>通过使用我们的系统，您将更好地理解和管理自己的健康状态，迈向更加健康的生活方式。</p>
  </div>
    
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