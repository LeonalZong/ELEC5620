<template>
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
        <el-form-item label="Name" prop="name">
            <el-input v-model="form.name" placeholder="Please input your name" clearable></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" placeholder="Please input your email" clearable></el-input>
        </el-form-item>
        <el-form-item label="phone number" prop="phone">
            <el-input v-model="form.phone" placeholder="please input your phone number" maxlength="11" show-word-limit clearable></el-input>
        </el-form-item>
            <el-button type="primary" @click="submitForm">Submit</el-button>
        
    </el-form>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data (){
        return{
            form: {
                name: '',
                email: '',
                phone:'',
            },
            rules: {
                
                name: [
                { required: true, message: 'Name is required', trigger: 'blur' }
                ],
                email: [
                { required: true, message: 'Email is required', trigger: 'blur' },
                { type: 'email', message: 'Invalid email format', trigger: ['blur', 'change'] }
                ],
                phone: [
                { required: true, message: 'Mobile phone number is required', trigger: 'blur' },
                { 
                    pattern: /^(\+61|0)[2-478](?!1)[0-9]{8}$/, 
                    message: 'Incorrect mobile phone number format', 
                    trigger: ['blur', 'change'] 
                }
                ],
            },            
        }
    },
    created() {
        this.generateAgeOptions();
        this.loadUserInfo();
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
        loadUserInfo() {
        const token = localStorage.getItem('token');
        if (!token) return;

        axios.get('http://localhost:8082/user/info', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.code === 1) {
                const userData = response.data.data;
                this.form.name = userData.name || '';
                this.form.email = userData.email || '';
                this.form.phone = userData.phone || '';
                console.log('Loaded user info:', this.form);
            }
        })
        .catch(error => {
            console.error('Failed to load user info:', error);
            this.$message.error('Failed to get user information');
        });
    },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        logout() {
            // Clear the locally stored token
            localStorage.removeItem('token');

            // Jump back to the login page
            this.$router.push('/');
        },
        goToPage(route) {
            this.$router.push(route); // Page Jumping with Vue Router
        },
        generateAgeOptions() {
            this.ageOptions = Array.from({ length: 101 }, (_, i) => i);
        },
        submitForm() {
            this.$refs.formRef.validate((valid) => {
                if (valid) {
                    this.sendDataToBackend(); // without passing parameters
                }
            });
        },
        sendDataToBackend() {
    const token = localStorage.getItem('token');
    if (!token) {
        this.$message.error('Not logged in, please log in first');
        return;
    }
    
    try {
        // Parsing token to get user ID
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        console.log('Token payload:', tokenPayload);
        
        // Construct the data to be sent, containing the userId
        const dataToSend = {
            ...this.form,
            userId: tokenPayload.id  // Get the userId from the token
        };
        
        console.log('Sending form data:', dataToSend);
        
        axios.put('http://localhost:8082/user/update', dataToSend, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.code === 1) {
                this.$message.success('Identity updated successfully!');
                console.log('Data updated successfully:', response.data);
            } else {
                this.$message.error(response.data.msg || 'Update failed, please try again!');
            }
        })
        .catch(error => {
            console.error('Error details:', error.response?.data);
            this.$message.error(error.response?.data?.msg || 'Update failed, please try again!');
        });
    } catch (error) {
        console.error('Token parsing error:', error);
        this.$message.error('Login information is invalid, please login again');
    }
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
    padding:16px 32px;
    background-color: #409EFF;
    color: #fff;
    border: none;
    border-radius: 6px;
    text-align: center;
}

::v-deep .el-button:hover {
    background-color: #66b0ff;
}

::v-deep .el-input__inner,
::v-deep .el-select .el-input__inner,
::v-deep .el-date-editor .el-input__inner {
    border-radius: 5px;
}



::v-deep .el-input__inner:focus,
::v-deep .el-select .el-input__inner:focus,
::v-deep .el-date-editor .el-input__inner:focus {
    border-color: #409EFF;
}
</style>