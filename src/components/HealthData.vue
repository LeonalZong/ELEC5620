<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
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
      <el-form :model="healthData" :rules="rules" ref="healthFormRef">
        <el-form-item label="Height (cm)" prop="height">
          <el-input v-model="healthData.height" placeholder="Enter your height" clearable></el-input>
        </el-form-item>
        <el-form-item label="Weight (kg)" prop="weight">
          <el-input v-model="healthData.weight" placeholder="Enter your weight" clearable></el-input>
        </el-form-item>
        <el-form-item label="Cholesterol" prop="cholesterol">
          <el-input v-model="healthData.cholesterol" placeholder="Enter your cholesterol" clearable></el-input>
        </el-form-item>
        <el-form-item label="Blood Pressure" prop="bloodPressure">
          <el-input v-model="healthData.bloodPressure" placeholder="Enter your blood pressure" clearable></el-input>
        </el-form-item>
        <el-form-item label="Resting Heart Rate" prop="restingHeartRate">
          <el-input v-model="healthData.restingHeartRate" placeholder="Enter your resting heart rate" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitHealthData">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { saveHealthData, getHealthData } from "../api";

export default {
  name: 'HealthData',
  data() {
    return {
      activeIndex: '1-2',
      healthData: {
        height: '',
        weight: '',
        cholesterol: '',
        bloodPressure: '',
        restingHeartRate: '',
      },
      rules: {
        height: [
          { required: true, message: 'Height is required', trigger: 'blur' },
        ],
        weight: [
          { required: true, message: 'Weight is required', trigger: 'blur' },
        ],
      },
    };
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
    async fetchExistingHealthData() {
      try {
        const response = await getHealthData();
        if (response.data && response.data.data) {
          this.healthData = { ...this.healthData, ...response.data.data };
        }
      } catch (error) {
        console.error('Error fetching existing health data:', error);
      }
    },
    async submitHealthData() {
      this.$refs.healthFormRef.validate(async (valid) => {
        if (valid) {
          try {
            const response = await saveHealthData(this.healthData);

            console.log('Health data response:', response);

            if (response.data.code === 1) {
              alert('Health data successfully submitted!');
            } else {
              alert('Submission failed: ' + response.data.msg);
            }
          } catch (error) {
            console.error('Error submitting health data:', error);
            let errorMessage = 'Failed to submit health data.';
            if (error.response && error.response.data && error.response.data.msg) {
              errorMessage = error.response.data.msg;
            }
            alert(errorMessage);
          }
        } else {
          alert('Please ensure all required fields are filled!');
        }
      });
    }
  },
  mounted() {
    this.fetchExistingHealthData();
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fac9;
}

.el-form {
  width: 650px;
  padding: 21px;
  background-color: #fff;
  box-shadow: 0 6px 30px rgba(70, 132, 180, 0.76);
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
}

/* 增加表单项之间的间距 */
::v-deep .el-form-item {
  margin-bottom: 40px;
}
/* 让提交按钮居中 */
::v-deep .el-form-item:last-child {
  text-align: center;
}
/* 美化提交按钮 */
::v-deep .el-button {
  font-size: 24px;
  padding: 16px 32px;
  background-color: #409EFF;
  color: #fff;
  border: none;
  border-radius: 6px;
  text-align: center;
}

/* 提交按钮的加深效果 */
::v-deep .el-button:hover {
  background-color: #66b0ff;
}

/* 输入框的边框 */
::v-deep .el-input__inner {
  border-radius: 5px;
}

/* 为输入框添加聚焦时的边框加深 */
::v-deep .el-input__inner:focus {
  border-color: #409EFF;
}
</style>