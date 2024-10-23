<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
        <el-sub-menu index="1">
            <template v-slot:title>
              <img src="../assets/logo.png" alt="Image 1" style="width: 20px; height: 20px; margin-right: 8px; cursor: pointer;">
            </template>
            <el-menu-item index="1-1" @click="goToPage('/UpdateInformation')">Manage Personal Information</el-menu-item>
            <el-menu-item index="1-2" @click="goToPage('/HealthData')">Health Data</el-menu-item>
            <el-menu-item index="1-5" @click="goToPage('/DietSportPreference')">Diet and Sport Preference</el-menu-item>
            <el-menu-item index="1-4" @click="logout">Log out</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2" @click="goToPage('/ReportGeneration')">Generate Report</el-menu-item>
        <el-menu-item index="3" @click="goToPage('/ReportReview')">Historical Report Review</el-menu-item>
    </el-menu>
    <div class="form-container">
      <el-form :model="healthData" :rules="rules" ref="healthFormRef" class="health-form">
        <el-form-item label="Gender" prop="gender">
          <el-select v-model="healthData.gender" placeholder="Select your gender" clearable>
            <el-option label="Male" value="male"></el-option>
            <el-option label="Female" value="female"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Birth Date" prop="birthDate">
          <el-date-picker
            v-model="healthData.birthDate"
            type="date"
            placeholder="Select birth date"
            :disabled-date="disableFutureDate"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Height (cm)" prop="height">
          <el-input v-model="healthData.height" placeholder="Enter your height" clearable></el-input>
        </el-form-item>
        <el-form-item label="Weight (kg)" prop="weight">
          <el-input v-model="healthData.weight" placeholder="Enter your weight" clearable></el-input>
        </el-form-item>
        <el-form-item label="Cholesterol" prop="cholesterol">
          <el-input v-model="healthData.cholesterol" placeholder="Enter your cholesterol" clearable></el-input>
        </el-form-item>
        <el-form-item label="Systolic Blood Pressure" prop="systolicBP">
          <el-input v-model.number="healthData.systolicBP" placeholder="Enter your systolic blood pressure" clearable></el-input>
        </el-form-item>
        <el-form-item label="Diastolic Blood Pressure" prop="diastolicBP">
          <el-input v-model.number="healthData.diastolicBP" placeholder="Enter your diastolic blood pressure" clearable></el-input>
        </el-form-item>
        <el-form-item label="Resting Heart Rate" prop="restingHeartRate">
          <el-input v-model="healthData.restingHeartRate" placeholder="Enter your resting heart rate" clearable></el-input>
        </el-form-item>
        <el-form-item class="button-group">
          <el-button type="primary" @click="submitHealthData">Submit</el-button>
          <el-button type="primary" @click="viewHistoricalData">View My Historical Health Data</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 历史数据对话框 -->
    <el-dialog
      title="Historical Health Data"
      v-model="dialogVisible"
      width="80%"
      class="historical-dialog">
    <div class="table-container">  <!-- 添加一个容器 -->
    <el-table
      v-loading="tableLoading"
      :data="historicalData"
      stripe
      style="width: 100%"
      height="400px">  <!-- 添加固定高度 -->
      <el-table-column prop="recordedAt" label="Date" width="180">
        <template #default="scope">
          {{ formatDate(scope.row.recordedAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="Gender" width="100" align="center"></el-table-column>
        <el-table-column prop="birthDate" label="Birth Date" width="120" align="center"></el-table-column>
        <el-table-column prop="height" label="Height (cm)" width="120" align="center"></el-table-column>
        <el-table-column prop="weight" label="Weight (kg)" width="120" align="center"></el-table-column>
        <el-table-column prop="cholesterol" label="Cholesterol" width="120" align="center"></el-table-column>
        <el-table-column prop="systolicBloodPressure" label="Systolic BP" width="120" align="center"></el-table-column>
        <el-table-column prop="diastolicBloodPressure" label="Diastolic BP" width="120" align="center"></el-table-column>
        <el-table-column prop="restingHeartRate" label="Heart Rate" width="120" align="center"></el-table-column>
    </el-table>
  </div>
  <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">Close</el-button>
    </span>
  </template>
</el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HealthData',
  data() {
    return {
      loading: false,
      dialogVisible: false,
      tableLoading: false,
      historicalData: [],
      healthData: {
        gender: '',
        birthDate: '',
        height: '',
        weight: '',
        cholesterol: '',
        systolicBP: '',
        diastolicBP: '',
        restingHeartRate: '',
      },
      rules: {
        gender: [
          { required: true, message: 'Please select your gender', trigger: 'change' }
        ],
        birthDate: [
          { required: true, message: 'Please select your birth date', trigger: 'change' },
          { type: 'date', message: 'Invalid birth date', trigger: ['blur', 'change'] }
        ],
        height: [
          { required: true, message: 'Height is required', trigger: 'blur' },
        ],
        weight: [
          { required: true, message: 'Weight is required', trigger: 'blur' },
        ],
      },
    };
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
      localStorage.removeItem('token');
      this.$router.push('/');
    },
    goToPage(route) {
      this.$router.push(route);
    },
    async viewHistoricalData() {
      this.dialogVisible = true;
      this.tableLoading = true;
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.$message.error('No valid token found');
          return;
        }

        const response = await axios.get('http://localhost:8082/healthdata/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.code === 1) {
          this.historicalData = response.data.data;
        } else {
          this.$message.error(response.data.msg || 'Failed to fetch historical data');
        }
      } catch (error) {
        console.error('Error fetching historical data:', error);
        this.$message.error(error.response?.data?.msg || 'Failed to load historical data');
      } finally {
        this.tableLoading = false;
      }
    },
    disableFutureDate(time) {
      return time.getTime() > Date.now();
    },
    async submitHealthData() {
      this.$refs.healthFormRef.validate(async (valid) => {
        if (valid) {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              this.$message.error('No valid token found');
              return;
            }

            const response = await axios.post(
              'http://localhost:8082/healthdata/save',
              {
                height: this.healthData.height,
                weight: this.healthData.weight,
                gender: this.healthData.gender,
                birthDate: this.healthData.birthDate,
                cholesterol: this.healthData.cholesterol,
                systolicBloodPressure: this.healthData.systolicBP,
                diastolicBloodPressure: this.healthData.diastolicBP,
                restingHeartRate: this.healthData.restingHeartRate
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              }
            );

            if (response.data.code === 1) {
              this.$message.success('Health data submitted successfully!');
              this.resetForm();
            } else {
              this.$message.error(response.data.msg || 'Submission failed');
            }
          } catch (error) {
            console.error('Health data submission error:', error);
            this.$message.error(error.response?.data?.msg || 'An error occurred while submitting data');
          }
        } else {
          this.$message.warning('Please fill in all required fields');
        }
      });
    },
    resetForm() {
      this.healthData = {
        height: '',
        weight: '',
        gender: '',
        birthDate: '',
        cholesterol: '',
        systolicBP: '',
        diastolicBP: '',
        restingHeartRate: ''
      };
    },
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  background-color: #f5f7fa;
  padding: 20px;
}

.health-form {
  width: 100%;
  max-width: 600px;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 25px;
}

.button-group {
  text-align: center;
  margin-top: 40px;
}

.button-group .el-button {
  margin: 0 10px;
  padding: 12px 25px;
  font-size: 16px;
}

.el-input {
  width: 100%;
}

.el-button--primary {
  background-color: #409EFF;
  border-color: #409EFF;
}

.el-button--primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

::v-deep .el-form-item__label {
  font-weight: 500;
  color: #606266;
}

::v-deep .el-input__inner {
  border-radius: 4px;
}

::v-deep .el-input__inner:focus {
  border-color: #409EFF;
}

.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}

.el-table {
  margin: 20px 0;
}

.historical-dialog ::v-deep .el-table th {
  text-align: center !important;
  background-color: #f5f7fa;
}
.historical-dialog ::v-deep .el-table td {
  text-align: center !important;
}
</style>