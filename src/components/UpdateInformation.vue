<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        :background-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor">
        <el-sub-menu index="1">
            <template v-slot:title><img src="../assets/logo.png" alt="Image 1" style="width: 20px; height: 20px; margin-right: 8px;"></template>
            <el-menu-item index="1-1">Manage Personal Information</el-menu-item>
            <el-menu-item index="1-2" @click="logout">Log out</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2" @click="goToPage('/ReportGeneration')">Generate Report</el-menu-item>
        <el-menu-item index="3" @click="goToPage('/ReportReview')">Historical Report Review</el-menu-item>
    </el-menu>
    <div class="form-container">
    <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="Username" prop="username">
            <el-input v-model="form.username" placeholder="Please input username" clearable></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="name">
            <el-input v-model="form.name" placeholder="Please input your name" clearable></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" placeholder="Please input your email" clearable></el-input>
        </el-form-item>
        <el-form-item label="age" prop="selectedAge">
            <el-select v-model="form.selectedAge" placeholder="select your age">
                <el-option v-for="age in ageOptions" :key="age" :label="age" :value="age"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="phone number" prop="phone">
            <el-input v-model="form.phone" placeholder="please input your phone number" maxlength="11" show-word-limit clearable></el-input>
        </el-form-item>
        <el-form-item label="birth" prop="birth">
            <el-date-picker v-model="form.birth" type="date" :disabled-date="disableDate" placeholder="select birth date.."></el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">Submit</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data (){
        return{
            form: {
                username: '',
                name: '',
                email: '',
                selectedAge:'',
                phone:'',
                birth:'',
                ageOptions: [],
            },
            rules: {
                username: [
                { required: true, message: 'Username is required', trigger: 'blur' }
                ],
                name: [
                { required: true, message: 'Name is required', trigger: 'blur' }
                ],
                email: [
                { required: true, message: 'Email is required', trigger: 'blur' },
                { type: 'email', message: 'Invalid email format', trigger: ['blur', 'change'] }
                ],
                phone: [
                { required: true, message: '手机号是必填项', trigger: 'blur' },
                { 
                    pattern: /^[1][3-9][0-9]{9}$/, 
                    message: '手机号格式不正确', 
                    trigger: ['blur', 'change'] 
                }
                ],
                birth: [
                { required: true, message: '请选择出生日期', trigger: 'change' },
                { 
                    type: 'date', 
                    message: '出生日期无效', 
                    trigger: ['blur', 'change'], 
                    validator: (rule, value, callback) => {
                    if (value && new Date(value) > new Date()) {
                        callback(new Error('出生日期不能是未来的日期'));
                    } else {
                        callback();
                    }
                    }
                }
                ]
            },            
        }
    },
    created() {
        this.generateAgeOptions();
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
        generateAgeOptions() {
            this.ageOptions = Array.from({ length: 101 }, (_, i) => i);
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
        disableDate(time) {
            return time.getTime() > Date.now();
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
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100vh; /* 占满整个窗口 */
    background-color: #f5f7fac9; /* 背景色：浅灰色 */
}

.el-form {
    width: 650px; /* 调整表单宽度 */
    padding: 21px;
    background-color: #fff;
    box-shadow: 0 6px 30px rgba(70, 132, 180, 0.76); /* 为表单添加阴影 */
    border-radius: 12px; /* 圆角 */
    transition: all 0.3s ease-in-out; /* 增加过渡效果 */
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
    padding:16px 32px;
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

/* 输入框和选择器的边框 */
::v-deep .el-input__inner,
::v-deep .el-select .el-input__inner,
::v-deep .el-date-editor .el-input__inner {
    border-radius: 5px;
}

/* 为输入框和选择器添加聚焦时的边框加深 */
::v-deep .el-input__inner:focus,
::v-deep .el-select .el-input__inner:focus,
::v-deep .el-date-editor .el-input__inner:focus {
    border-color: #409EFF;
}
</style>