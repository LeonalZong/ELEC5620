<template>
  <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
          <el-sub-menu index="1">
              <template v-slot:title>
                 <img src="../assets/icon.svg" alt="Image 1" style="width: 40px; height: 40px; margin-right: 8px; cursor: pointer; padding: 0px;">
                </template>
              <el-menu-item index="1-1" @click="goToPage('/health-management')">Main Page</el-menu-item>
              <el-menu-item index="1-2" @click="logout">Log out</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2" @click="goToPage('/ReportGeneration')">Generate Report</el-menu-item>
          <el-menu-item index="3" @click="goToPage('/ReportReview')">Historical Report Review</el-menu-item>
          <el-menu-item index="4" @click="goToPage('/UpdateInformation')">Manage Personal Information</el-menu-item>
          <el-menu-item index="5" @click="goToPage('/HealthData')">Health Data</el-menu-item>
          <el-menu-item index="6" @click="goToPage('/DietSportPreference')">Diet and Sport Preference</el-menu-item>
      </el-menu>
      <div class="background-image"></div> 
      <div class="form-container">
          <el-form :model="form" :rules="rules" ref="formRef">
              
          <h2 style="text-align: center;">Report Generation</h2>
          <p style="text-align: center;">Please fill in your requirements below.</p>
          <el-form-item>
              <el-input type="textarea" v-model="form.specialRequirements" placeholder="Enter your specific requirements for the health report..." clearable :rows="5"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm" style="text-align: center;">Generate Report</el-button>
          </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'ReportGeneration',
    data() {
      return {
        form: {
          specialRequirements: '',
        },
        rules: {
          specialRequirements: [
          { required: false }
        ]
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
      submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          const token = localStorage.getItem('token');
          if (!token) {
            this.$message.error('Please login first');
            return;
          }

          const data = {
            specialRequirements: this.form.specialRequirements
          };

          axios.post('http://localhost:8082/health-report/generate-report', data, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then(() => {
            this.$message.success('Report generation request submitted successfully');
            this.$router.push('/ReportReview');
          })
          .catch(error => {
            this.$message.error('Failed to generate report: ' + error.message);
          });
        }
      });
      },
    },
  };
</script>

<style scoped>
.background-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../assets/doctor-healthcare.jpeg');
    background-size: cover;
    background-position: center;
    z-index: -1;
    filter: brightness(0.6);
}

.form-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    
  }
  
  .el-form {
    width: 650px;
    padding: 21px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 30px rgba(70, 132, 180, 0.76);
    border-radius: 12px;
    transition: all 0.3s ease-in-out;
  }
  
  ::v-deep .el-form-item {
    margin-bottom: 40px;
  }
  ::v-deep .el-form-item:last-child {
    text-align: center;
  }
  ::v-deep .el-button {
    font-size: 24px;
    padding: 16px 32px;
    background-color: #409EFF;
    color: #fff;
    border: none;
    border-radius: 6px;
    text-align: center;
  }
  
  ::v-deep .el-button:hover {
    background-color: #66b0ff;
  }
  
  ::v-deep .el-input__inner {
    border-radius: 5px;
  }
  
  ::v-deep .el-input__inner:focus {
    border-color: #409EFF;
  }

  


</style>