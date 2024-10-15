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
        <el-menu-item index="4">Manage API</el-menu-item>
    </el-menu>
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
.el-select, .el-input {
    width: 300px;
}


.el-menu-demo {
    line-height: 0;
}





</style>