<template>
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
          <el-sub-menu index="1">
              <template v-slot:title><img src="../assets/logo.png" alt="Image 1" style="width: 20px; height: 20px; margin-right: 8px;"></template>
              <el-menu-item index="1-1">Manage Personal Information</el-menu-item>
              <el-menu-item index="1-2" @click="goToPage('/HealthData')">Health Data</el-menu-item>
              <el-menu-item index="1-3" @click="logout">Log out</el-menu-item>
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
          <el-form-item label="Blood Pressure" prop="bloodPressure">
            <el-input v-model="healthData.bloodPressure" placeholder="Enter your blood pressure" clearable></el-input>
          </el-form-item>
          <el-form-item label="Heart Rate" prop="heartRate">
            <el-input v-model="healthData.heartRate" placeholder="Enter your heart rate" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitHealthData">Submit</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HealthData',
    data() {
      return {
        healthData: {
          height: '',
          weight: '',
          bloodPressure: '',
          heartRate: '',
        },
        rules: {
          height: [
            { required: true, message: 'Height is required', trigger: 'blur' },
          ],
          weight: [
            { required: true, message: 'Weight is required', trigger: 'blur' },
          ],
          bloodPressure: [
            { required: true, message: 'Blood pressure is required', trigger: 'blur' },
          ],
          heartRate: [
            { required: true, message: 'Heart rate is required', trigger: 'blur' },
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
        // 清除本地存储的 token
        localStorage.removeItem('token');
  
        // 跳转回登录页面
        this.$router.push('/');
      },
      goToPage(route) {
        this.$router.push(route); // 使用 Vue Router 进行页面跳转
      },
      submitHealthData() {
        this.$refs.healthFormRef.validate((valid) => {
          if (valid) {
            alert('Submit!');
            console.log('Health data submitted:', this.healthData);
            // Send data to backend
          } else {
            console.log('Validation failed');
          }
        });
      },
    },
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