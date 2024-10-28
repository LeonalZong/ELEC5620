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
    
    <div class="homepage">
        <div class="background-image"></div>
        <div class="content-wrapper">
            <el-form class="form-content">
                <h1>Welcome to the Health Management System!</h1>
                <p>Welcome to our system! We specialize in providing personalized health management services, helping you fully understand and take control of your health status, and optimize your lifestyle. Here are the main features our system offers:</p>
                
                <el-divider></el-divider>
                
                <section class="feature">
                <h2>1. Personal Health Data Management</h2>
                <p>
                    In the "Personal Health Data Management" module, you can view and update your health data anytime, including height, weight, blood pressure, heart rate, and other key health indicators. Our system will help you track your health changes and provide health suggestions.
                </p>
                <ul>
                    <li>View and edit personal health data</li>
                    <li>Regular reminders to update data</li>
                    <li>Historical trend analysis</li>
                </ul>
                </section>

                <el-divider></el-divider>

                <section class="feature">
                <h2>2. Health Report Generation</h2>
                <p>
                    Based on the health data you submit, the system will automatically generate a detailed health report to help you understand your health status and provide scientific guidance for future health management.
                </p>
                <ul>
                    <li>Automatically generate personal health reports</li>
                    <li>Professional health analysis and recommendations</li>
                    <li>Generate PDF reports for easy sharing and recording</li>
                </ul>
                </section>

                <el-divider></el-divider>

                <section class="feature">
                <h2>3. Historical Report Review</h2>
                <p>
                    Want to review your past health status? In the "Historical Report Review" module, you can access all historical health reports, easily compare data changes over different time periods, and track your progress in health management.
                </p>
                <ul>
                    <li>View all historical health reports</li>
                    <li>Data trend visualization</li>
                    <li>Filter reports by date</li>
                </ul>
                </section>

                <el-divider></el-divider>

                <section class="feature">
                <h2>4. Diet and Exercise Preferences</h2>
                <p>
                    The system allows you to set and manage your diet and exercise preferences, generating personalized lifestyle suggestions to help you achieve your health goals.
                </p>
                <ul>
                    <li>Customized diet and exercise plans</li>
                    <li>Track goal completion for diet and exercise</li>
                    <li>Personalized recommendations and adjustments</li>
                </ul>
                </section>

                <el-divider></el-divider>

                <section class="feature">
                <h2>5. Logout</h2>
                <p>
                    After completing all operations, you can log out of the system at any time, ensuring the security of your personal information and data. We are committed to providing you with a secure and reliable health management platform.
                </p>
                </section>

                <el-divider></el-divider>

                <h2>Start Your Health Management Journey Now!</h2>
                <p>By using our system, you will gain better insight into and control over your health status, moving toward a healthier lifestyle.</p>
            </el-form>
        </div>
    </div>

    
</template>

<script>

export default {
    name: "HomePage",
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
    },
};
</script>

<style scoped>
.el-menu-demo {
    line-height: 0;
    margin-top: 0;
    padding-top: 0;
    margin-bottom: 0;
    padding-bottom: 0;
}

.homepage {
    margin: 0px;
    line-height: 1.8;
}

.feature {
  margin-bottom: 20px;
}

h1,
h2 {
    text-align: left;
    color: #409EFF;
}

p{
    text-align: left;
}

ul {
  margin-top: 10px;
  padding-left: 0px;
}

ul li {
    text-align: left;
    margin-bottom: 5px;
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
    filter: brightness(0.6); 
}

.form-content{
    width: 80%; 
    height: 100vh;
    max-width: 800px;
    max-height: 110vh;
    overflow-y: auto; 
    padding: 20px;
    background-color: #ffffff; 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    opacity: 0.8;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  align-items:baseline;
  height: 100vh;
  overflow: hidden; 
  padding: 20px;
}


</style>