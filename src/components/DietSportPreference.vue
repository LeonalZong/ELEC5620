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
          <el-form-item label="Diet Preferences" prop="dietPreferences">
            <el-input type="textarea" v-model="form.dietPreferences" placeholder="Enter your diet preferences" clearable :rows="5"></el-input>
          </el-form-item>
          <el-form-item label="Sport Preferences" prop="sportPreferences">
            <el-input type="textarea" v-model="form.sportPreferences" placeholder="Enter your sport preferences" clearable :rows="5"></el-input>
          </el-form-item>
          
            <el-button type="primary" @click="submitForm">Submit</el-button>
          
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
import { saveDietSportPreference } from "../api";

export default {
  name: 'DietSportPreference',
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
  data() {
    return {
      form: {
        dietPreferences: '',
        sportPreferences: '',
      },
      rules: {
        // Add any validation rules if needed
      },
    };
  },
  methods: {
    goToPage(route) {
    this.$router.push(route);
    },
    logout() {
    localStorage.removeItem('token');
    this.$router.push('/');
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    data(){
      return{
        activeIndex: '1-3',
        backgroundColor: '#545c64',
        textColor: '#fff',
        activeTextColor: '#ffd04b',
      }
    },
    async submitForm() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          try {
            const response = await saveDietSportPreference({
              dietPreferences: this.form.dietPreferences,
              sportPreferences: this.form.sportPreferences,
            });

            console.log('Diet and sport preferences response:', response);

            if (response.data.code === 1) {  // Assuming success code is 1
              alert('Diet and sport preferences successfully submitted!');
              // Clear form or perform other logic
              this.form.dietPreferences = '';
              this.form.sportPreferences = '';
            } else {
              alert('Submission failed: ' + response.data.msg);
            }
          } catch (error) {
            console.error('Error submitting diet and sport preferences:', error);
            let errorMessage = 'Failed to submit diet and sport preferences.';
            if (error.response && error.response.data && error.response.data.msg) {
              errorMessage = error.response.data.msg;
            }
            alert(errorMessage);
          }
        } else {
          alert('Please ensure all required fields are filled!');
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
    /* background-color: #f5f7fac9; */
  }
  
  .el-form {
    width: 650px;
    padding: 21px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 30px rgba(70, 132, 180, 0.76);
    border-radius: 12px;
    transition: all 0.3s ease-in-out;
    text-align: center;
  }

  
  
  ::v-deep .el-form-item {
    margin-bottom: 40px;
  }

  ::v-deep .el-form-item:last-child {
    text-align: center;
  }
  ::v-deep .el-button {
    font-size: 18px;
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