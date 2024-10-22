<template>
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
        <el-sub-menu index="1">
          <template v-slot:title>
            <img src="../assets/logo.png" alt="Logo" style="width: 20px; height: 20px; margin-right: 8px; cursor: pointer;" @click="goToPage('/HealthManagement')">
          </template>
          <el-menu-item index="1-1" @click="goToPage('/HealthManagement')">Main Page</el-menu-item>
          <el-menu-item index="1-2" @click="goToPage('/UpdateInformation')">Manage Personal Information</el-menu-item>
          <el-menu-item index="1-3" @click="goToPage('/HealthData')">Health Data</el-menu-item>
          <el-menu-item index="1-4" @click="goToPage('/DietSportPreference')">Diet and Sport Preference</el-menu-item>
          <el-menu-item index="1-5" @click="logout">Log out</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2" @click="goToPage('/ReportGeneration')">Generate Report</el-menu-item>
        <el-menu-item index="3">Historical Report Review</el-menu-item>
      </el-menu>
  
        <div class="report-container">
            <h2>Historical Health Reports</h2>
            <el-table 
                v-if="!loading && !error && reports.length > 0" 
                :data="reports" 
                style="width: 100%"
                header-align="left"  
            >
            <el-table-column 
                prop="reportId" 
                label="Report ID" 
                width="100"
                align="left"  
            ></el-table-column>
            <el-table-column 
                prop="createdAt" 
                label="Date" 
                width="200"
                align="left"
            ></el-table-column>
            <el-table-column 
                label="Actions" 
                width="200"
                align="left"
            >
    <template v-slot="scope">
      <el-button 
        @click="viewReport(scope.row)" 
        type="text" 
        size="small"
        style="margin-right: 15px;"
      >View</el-button>
      <el-popconfirm
        title="Are you sure to delete this report?"
        @confirm="handleDelete(scope.row.reportId)"
      >
        <template #reference>
          <el-button 
            type="text" 
            size="small"
            class="delete-button"
          >Delete</el-button>
        </template>
      </el-popconfirm>
    </template>
  </el-table-column>

        </el-table>
            
            <p v-if="!loading && !error && reports.length === 0">No reports found.</p>
            <p v-if="loading">Loading reports...</p>
            <p v-if="error" class="error-message">{{ error }}</p>

            <el-dialog v-model="dialogVisible" title="Health Report" width="80%" custom-class="health-report-dialog">
                <div v-if="selectedReport" class="report-wrapper">
                <div class="report-header">
                    <h3>Report ID: {{ selectedReport.reportId }}</h3>
                    <p><strong>Date:</strong> {{ formatDate(selectedReport.createdAt) }}</p>
                </div>
                <el-divider></el-divider>
                <div v-if="parsedReport" class="report-content">
                    <h4>Report Content:</h4>
                    <div v-html="formatReportContent(parsedReport.choices[0].message.content)"></div>
                </div>
                <div v-else class="report-content">
                    <pre>{{ selectedReport.reportContent }}</pre>
                </div>
                <el-divider></el-divider>
                <div v-if="parsedReport" class="metadata">
                    <h4>Metadata:</h4>
                    <p><strong>Model:</strong> {{ parsedReport.model }}</p>
                    <p><strong>Total Tokens:</strong> {{ parsedReport.usage.total_tokens }}</p>
                    <p><strong>Finish Reason:</strong> {{ parsedReport.choices[0].finish_reason }}</p>
                </div>
                </div>
            </el-dialog>


        </div>
    </div>
  </template>
  
  <script>
 import { getHealthReports, deleteHealthReport } from '../api';

  export default {
    name: 'ReportReview',
    data() {
        return {
        activeIndex: '3',
        backgroundColor: '#545c64',
        textColor: '#fff',
        activeTextColor: '#ffd04b',
        reports: [],
        dialogVisible: false,
        selectedReport: null,
        loading: false,
        error: null
        };
    },
    mounted() {
        this.fetchReports();
    },
    methods: {
        async handleDelete(reportId) {
      try {
        await deleteHealthReport(reportId);
        this.$message({
          type: 'success',
          message: 'Report deleted successfully'
        });
        await this.fetchReports();
      } catch (error) {
        console.error('Error deleting report:', error);
        this.$message({
          type: 'error',
          message: 'Failed to delete report: ' + error.message
        });
      }
    },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/');
      },
      goToPage(route) {
        this.$router.push(route);
      },
      async fetchReports() {
    this.loading = true;
    this.error = null;
    try {
      const response = await getHealthReports();
      console.log('API response:', response);
      if (response && response.data) {
        this.reports = response.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      this.error = `Failed to fetch reports: ${error.message}`;
    } finally {
      this.loading = false;
    }
  },
  viewReport(report) {
      console.log('Viewing report:', report);
      try {
        this.selectedReport = report;
        this.parsedReport = JSON.parse(report.reportContent);
        this.dialogVisible = true;
      } catch (error) {
        console.error('Error viewing report:', error);
        this.$message.error(`Failed to view report: ${error.message}`);
        this.parsedReport = null;
      }
    },
    formatReportContent(content) {
      const sections = content.split('\n\n');
      let formattedContent = '';
      sections.forEach(section => {
        const [title, ...body] = section.split(':');
        formattedContent += `<h4>${title}:</h4>`;
        formattedContent += `<p>${body.join(':').trim()}</p>`;
      });
      return formattedContent;
    },

    // getTokensUsed(content) {
    //   try {
    //     const reportObject = JSON.parse(content);
    //     return reportObject.usage.total_tokens;
    //   } catch (error) {
    //     console.error('Error getting tokens used:', error);
    //     return 'N/A';
    //   }
    // },

    // getFinishReason(content) {
    //   try {
    //     const reportObject = JSON.parse(content);
    //     return reportObject.finish_reason;
    //   } catch (error) {
    //     console.error('Error getting finish reason:', error);
    //     return 'N/A';
    //   }
    // },

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
  </script>
  
<style scoped>
.report-container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
  .el-dialog__body {
  max-height: 70vh;
  overflow-y: auto;
}
  .error-message {
  color: red;
  font-weight: bold;
}
.health-report-dialog {
  display: flex;
  justify-content: center;
}

.report-wrapper {
  width: 100%;
  max-width: 800px; /* Adjust this value as needed */
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.report-header {
  text-align: center;
  margin-bottom: 20px;
}

.report-content {
  width: 100%;
  margin: 0 auto;
  line-height: 1.6;
  text-align: left;
}

.report-content h4 {
  margin-top: 20px;
  margin-bottom: 10px;
  color: #409EFF;
}

.report-content p {
  margin-bottom: 15px;
}

.metadata {
  margin: 20px auto;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
  text-align: left;
}

.el-dialog__body {
  padding: 0 !important;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.delete-button {
  color: #F56C6C;
}

.delete-button:hover {
  color: #f78989;
}
</style>