<template>
  <div class="container">
    <div class="button-container">
    
    <!-- 登录按钮 -->
    <el-button class="login-btn" type="primary" @click="openLoginDialog">Login</el-button>

    <!-- 注册按钮 -->
    <el-button class="register-btn" type="success" @click="openRegisterDialog">Register</el-button>
  </div>

    <!-- 登录对话框 -->
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

    <!-- 注册对话框 -->
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
      loading:false
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

          console.log('登录响应：', response);

          // 从response.data.data中提取token
          if (response.data && response.data.data) {
            const token = response.data.data;  // 获取token
            localStorage.setItem('token', token);
            alert('登录成功');
            this.loading = false;
            this.loginDialogVisible = false;

            // 登录成功后跳转到健康管理页面
            try {
              this.$router.push('/health-management');
            } catch (routerError) {
              console.error('路由跳转错误：', routerError);
              alert('跳转到健康管理页面失败');
              this.loading = false;
            }
          } else {
            alert('登录失败：未收到令牌');
            this.loading = false;
          }
        } catch (error) {
          console.error('登录错误：', error);

          // 从错误响应中提取信息
          let errorMessage = '登录失败，请检查您的凭据。';
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }

          alert(errorMessage);
          this.loading = false;
        }
      } else {
        alert('请输入用户名和密码');
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
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa7b; /* 背景色：浅灰色 */
}

/* 按钮容器 */
.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 2px solid #ccc;
  padding: 20px;
  background-color: #fff;
  width: 350px;
  text-align: center;
  box-shadow: 0 7px 30px rgba(0, 123, 255, 0.5); /* 添加阴影 */
}

/* 按钮样式 */
.login-btn,
.register-btn {
  font-size: 22px;
  width: 100%; /* 确保按钮占据容器的全部宽度 */
  margin-bottom: 25px; /* 按钮之间的间距 */
  margin-top: 25px;
  padding: 30px; /* 控制按钮的高度 */
  border-radius: 7px; /* 按钮的圆角 */
  box-sizing: border-box; /* 包含 padding 和 border 在内 */
}
.register-btn {
  margin-left: 0px;
}

/* 边框样式 */
.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 2px solid #ccc;
  padding: 20px;
  background-color: #fff;
}
</style>