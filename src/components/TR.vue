<template>
    <div class="traveling-apply-management">
      <!-- 表格展示申请信息 -->
      <el-table :data="displayData" height="300" style="width: 100%" @row-click="handleRowClick">
        <el-table-column prop="id" label="ID:" width="80" sortable/>
        <el-table-column prop="reasonForTravel" label="Reason for travel:" width="240" sortable/>
        <el-table-column prop="clientName" label="ClientName:" width="120" sortable/>
        <el-table-column prop="dateOfTravel" label="Date of travel:" width="120" sortable/>
        <el-table-column prop="time" label="Time:" width="120" sortable/>
        <el-table-column prop="brand" label="Brand:" width="120" sortable/>
        <el-table-column prop="model" label="Model:" width="120" sortable/>
        <el-table-column prop="distance" label="Distance:" width="120" sortable/>
        <el-table-column prop="otherCost" label="Other Cost:" width="120" sortable/>
        <el-table-column prop="status" label="Status:" width="120" sortable />

        <el-table-column label="Actions" width="250">
          <template #default="scope">
            <el-button size="small" type="success" @click="approveApplication(scope.row)">Approve</el-button>
            <el-button size="small" type="danger" @click="rejectApplication(scope.row)">Reject</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 分页组件 -->
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="tableData.length"
          layout="total, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          style="margin-top: 10px;"
          @input="handleInput"
      />
    </div>
</template>
  
  <script>
  import axios from "axios";

  export default {
    name: 'TravelingApplyManagement',
  
    props: {
      tableData: {
        type: Array,
        default: () => [] 
      },
      visible: {
        type: Boolean,
        required: true
      }
    },
  
    data() {
      return {
        isVisible: true,
        // tableData: [],
        displayData: [],  
        currentPage: 1,
        pageSize: 6,
        selectedFile: null, 
      };
    },
  
    methods: {
      handleRowClick(row) {
        this.selectedFile = row; 
      },
  
      approveApplication(application) {
        axios.post(`http://localhost:8081/approveTra/${application.id}`).then(response => {
            if (response.data.success) {
                alert(`Application ${application.id} approved`)
                this.fetchAllTraInfo();
            } else {
                alert(`Failed to approve application: ${response.data.msg}`);
            }
        })
        .catch (error => {
            console.error("Error approving application: ", error);
            alert("Error approving application");
        });
      },
  
      rejectApplication(application) {
        axios.post(`http://localhost:8081/rejectTra/${application.id}`)
        .then(response => {
            if (response.data.success) {
                alert(`Application ${application.id} rejected`);
                this.fetchAllTraInfo();
            } else {
                alert (`Failed to reject application: ${response.data.msg}`);
            }
        })
        .catch(error => {
            console.error("Error rejecting application:", error);
            alert("Error rejecting application");
        });
      },
  
      handleCurrentChange(newPage) {
        this.currentPage = newPage;  
        this.fetchPaginatedData();
      },
  
      handleSizeChange(newSize) {
        this.pageSize = newSize; 
        this.fetchPaginatedData(); 
      },
  
      fetchPaginatedData() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.displayData = (this.tableData || []).slice(start, end); 
      },
  
      handleInput(event) {
        const value = event.target.value; 
        const pageNumber = Number(value);
        const totalPages = Math.ceil(this.tableData.length / this.pageSize); 
  
        if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
          this.currentPage = pageNumber; 
          this.fetchPaginatedData();
        }
      },
      async fetchAllTraInfo(){
        try {
            //const response = await axios.get("http://localhost:8081/getAllTraInfo");
            // this.tableData = response.data.data;
            this.fetchPaginatedData();
        } catch (error) {
            console.error("Error fetching Tra info", error);
        }
      }
    },
    created() {
        this.fetchAllTraInfo();
    },
  
    computed: {
      // displayData() {
      //   const start = (this.currentPage - 1) * this.pageSize;
      //   return (this.tableData || []).slice(start, start + this.pageSize); // 确保 tableData 存在
      // },
    },
  };
  </script>
  
  <style scoped>
  .table-container {
    width: 100%;
    margin-top: 20px;
  }
  
  .el-button {
    margin-left: 10px;
  }
  </style>