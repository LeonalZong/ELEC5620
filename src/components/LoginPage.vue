<template>
  <div class="login-page">
    <div class="background-image"></div>
    <div class="container">
      <div class="button-container">
        <h1 class="welcome-title">Welcome to Health Management System</h1>
        <p class="welcome-subtitle">Take control of your health journey</p>
        
        <el-button class="login-btn" type="primary" @click="openLoginDialog">Login</el-button>
        <el-button class="register-btn" type="success" @click="openRegisterDialog">Register</el-button>
      </div>
    </div>

    <el-dialog title="Login" v-model="loginDialogVisible" width="30%">
      <div>
        <el-input v-model="loginForm.username" placeholder="Username"></el-input>
      </div>
      <div style="margin-top: 20px;">
        <el-input v-model="loginForm.password" placeholder="Password" type="password"></el-input>
      </div>
      <template v-slot:footer>
        <el-button @click="loginDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleLogin" v-loading="loading">Login</el-button>
      </template>
    </el-dialog>

    <el-dialog title="Register" v-model="registerDialogVisible" width="30%">
      <div>
        <el-input v-model="registerForm.username" placeholder="Username"></el-input>
      </div>
      <div style="margin-top: 20px;">
        <el-input v-model="registerForm.email" placeholder="Email"></el-input>
      </div>
      <div style="margin-top: 20px;">
        <el-input v-model="registerForm.password" placeholder="Password" type="password"></el-input>
      </div>
      <div style="margin-top: 20px;">
        <el-input v-model="registerForm.confirmPassword" placeholder="Confirm Password" type="password"></el-input>
      </div>
      <template v-slot:footer>
        <el-button @click="registerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleRegister" v-loading="loading">Register</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { loginUser, registerUser } from '../api';

export default {
  name: 'LoginPage',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loginDialogVisible: false,
      registerDialogVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      loading: false,
    };
  },
  methods: {
    openLoginDialog() {
      this.loginDialogVisible = true;
    },
    openRegisterDialog() {
      this.registerDialogVisible = true;
    },
    async handleLogin() {
      this.loading = true;
      if (this.loginForm.username && this.loginForm.password) {
        try {
          const response = await loginUser({
            username: this.loginForm.username,
            password: this.loginForm.password
          });

          if (response.data && response.data.data) {
            const token = response.data.data;  
            localStorage.setItem('token', token);

            alert('Login successful');
            this.loading = false;
            this.loginDialogVisible = false;

            try {
              this.$router.push('/health-management');
            } catch (routerError) {
              console.error('Router navigation error:', routerError);
              alert('Failed to navigate to health management page');
              this.loading = false;
            }
          } else {
            alert('Login failed: No token received');
          }
        } catch (error) {
          console.error('Login error:', error);
          let errorMessage = 'Login failed, please check your credentials.';
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          alert(errorMessage);
          this.loading = false;
        }
      } else {
        alert('Please enter username and password');
        this.loading = false;
      }
    },
    async handleRegister() {
      this.loading = true;
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert('Passwords do not match');
        this.loading = false;
      } else if (this.registerForm.username && this.registerForm.email && this.registerForm.password) {
        try {
          const response = await registerUser({
            username: this.registerForm.username,
            email: this.registerForm.email,
            password: this.registerForm.password
          });
          alert(`Registration successful: ${response.data.message}`);
          this.loading = false;
          this.registerDialogVisible = false;
        } catch (error) {
          console.error(error);
          alert('Registration failed. Please try again.');
          this.loading = false;
        }
      } else {
        alert('Please fill out all fields');
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  position: relative;
}

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
  filter: brightness(0.4) contrast(0.8);
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: transparent;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 350px;
  gap: 20px;
}

.welcome-title {
  color: #409EFF;
  font-size: 28px;
  margin: 0;
  text-align: center;
}

.welcome-subtitle {
  color: #606266;
  font-size: 16px;
  margin: 0 0 20px 0;
  text-align: center;
}

.login-btn,
.register-btn {
  width: 100%;
  height: 50px;
  font-size: 18px;
  margin: 0;
  padding: 0;
}

.login-btn {
  background-color: #409EFF;
}

.register-btn {
  background-color: #67C23A;
}

:deep(.el-dialog) {
  border-radius: 8px;
}

:deep(.el-input) {
  margin-bottom: 15px;
}

:deep(.el-dialog__header) {
  padding: 20px;
  background-color: #f5f7fa;
  margin-right: 0;
  border-bottom: 1px solid #e4e7ed;
}

:deep(.el-dialog__footer) {
  padding: 10px 20px;
  background-color: #f5f7fa;
  border-top: 1px solid #e4e7ed;
}
</style>