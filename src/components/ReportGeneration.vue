<template>
  <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
          <el-sub-menu index="1">
              <template v-slot:title>
                  <img src="../assets/logo.png" alt="Image 1" style="width: 20px; height: 20px; margin-right: 8px; cursor: pointer;">
              </template>
              <el-menu-item index="1-1" @click="goToPage('/Health-Management')">Main Page</el-menu-item>
              <el-menu-item index="1-2" @click="goToPage('/UpdateInformation')">Manage Personal Information</el-menu-item>
              <el-menu-item index="1-3" @click="goToPage('/HealthData')">Health Data</el-menu-item>
              <el-menu-item index="1-4" @click="goToPage('/DietSportPreference')">Diet and Sport Preference</el-menu-item>
              <el-menu-item index="1-5" @click="logout">Log out</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2" @click="goToPage('/ReportGeneration')">Generate Report</el-menu-item>
          <el-menu-item index="3" @click="goToPage('/ReportReview')">Historical Report Review</el-menu-item>
      </el-menu>
      <div class="form-container">
          <el-form :model="form" :rules="rules" ref="formRef">
            <h2 style="text-align: center;">Report Generation</h2>
            <p style="text-align: center;">Please fill in your requirements below.</p>
            <el-form-item>
                <el-input type="textarea" v-model="form.sportPreferences" placeholder="Enter your requirement for this task.." clearable :rows="5"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm">Submit</el-button>
          </el-form>
      </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'HealthData',
    data() {
      return {
        form: {
          dietPreferences: '',
          sportPreferences: '',
        },
        rules: {
          // Removed required validation for dietPreferences and sportPreferences
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
      submitForm() {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            alert('Submit!');
            // 将数据打包为 JSON
            const jsonData = JSON.stringify(this.form);
            // 发送到后端
            this.sendDataToBackend(jsonData);
          } else {
            console.log('Error submit!');
            return false;
          }
        });
      },
      sendDataToBackend(data) {
        //未测试
        axios.post('YOUR_BACKEND_URL', data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log('Data sent successfully:', response.data);
        })
        .catch(error => {
          console.error('Error sending data:', error);
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
    text-align: center;
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
    font-size: 18px;
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