<template>
  <div>
    <h1>{{ msg }}</h1>

    <!-- 登录按钮 -->
    <el-button type="primary" @click="openLoginDialog">Login</el-button>

    <!-- 注册按钮 -->
    <el-button type="success" @click="openRegisterDialog">Register</el-button>

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
        <el-button type="primary" @click="handleLogin">Login</el-button>
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
        <el-button type="primary" @click="handleRegister">Register</el-button>
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
      }
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
            this.loginDialogVisible = false;

            // 登录成功后跳转到健康管理页面
            try {
              this.$router.push('/health-management');
            } catch (routerError) {
              console.error('路由跳转错误：', routerError);
              alert('跳转到健康管理页面失败');
            }
          } else {
            alert('登录失败：未收到令牌');
          }
        } catch (error) {
          console.error('登录错误：', error);

          // 从错误响应中提取信息
          let errorMessage = '登录失败，请检查您的凭据。';
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }

          alert(errorMessage);
        }
      } else {
        alert('请输入用户名和密码');
      }
    },
    async handleRegister() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert('Passwords do not match');
      } else if (this.registerForm.username && this.registerForm.email && this.registerForm.password) {
        try {
          const response = await registerUser({
            username: this.registerForm.username,
            email: this.registerForm.email,
            password: this.registerForm.password
          });
          alert(`Registration successful: ${response.data.message}`);
          this.registerDialogVisible = false;
        } catch (error) {
          console.error(error);
          alert('Registration failed. Please try again.');
        }
      } else {
        alert('Please fill out all fields');
      }
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>