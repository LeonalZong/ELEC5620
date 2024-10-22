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
        <el-menu-item index="3">Historical Report Review</el-menu-item>
    </el-menu>
    <div>
    <h1>Historical Report List</h1>
    <el-table
      :data="reports"
      style="width: 100%"
      stripe
    >
      <el-table-column
        prop="id"
        label="Report ID"
        width="180"
      />
      <el-table-column
        prop="title"
        label="Title"
        width="300"
      />
      <el-table-column
        prop="date"
        label="Generate Date"
        width="200"
      />
      <el-table-column
        prop="status"
        label="Status"
        width="200"
      />
      <el-table-column
        prop="detail"
        label="Detail"
        width="500"/>
      <el-table-column label="Instructions" width="180">
        <template v-slot:scope>
          <el-button
            @click="viewReport(scope.row.id)"
            type="text"
            size="small"
          >View</el-button>
          <el-button
            @click="deleteReport(scope.row.id)"
            type="text"
            size="small"
            style="color: red;"
          >Remove</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
    
</template>

<script>

export default {
    data(){
        return{
            reports: [
                { id: 1, title: '报告一', date: '2024-10-01', status: '完成' },
                { id: 2, title: '报告二', date: '2024-10-05', status: '进行中' },
                { id: 3, title: '报告三', date: '2024-10-10', status: '完成' },
            ],
        }
    },
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
        viewReport(reportId) {
            // 处理查看报告的逻辑
            console.log(`查看报告ID: ${reportId}`);
            // 例如，导航到报告详情页面
            this.$router.push({ name: 'ReportDetail', params: { id: reportId } });
            },
            deleteReport(reportId) {
            // 处理删除报告的逻辑
            console.log(`删除报告ID: ${reportId}`);
            // 可以调用 API 删除报告，成功后更新列表
            this.reports = this.reports.filter(report => report.id !== reportId);
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
h1 {
  margin-bottom: 20px;
}




</style>