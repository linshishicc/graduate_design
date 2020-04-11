<template>
  <div class="commission-list">
    <div class="content">
      <div class="title">/佣金列表明细</div>
      <div class="search">
        <el-input v-model="search" placeholder="输入分销商邮箱关键字搜索"/>
        <el-button type="primary" @click="submitSearch">查询</el-button>
      </div>

      <el-table
        :data="commissionList"
        stripe
        border>

        <el-table-column
          prop="id"
          label="id"
          align="center">
        </el-table-column>

        <el-table-column
          prop="name"
          label="分销商"
          align="center"
          width="300"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          prop="commission"
          label="支付佣金"
          align="center">
        </el-table-column>

        <el-table-column
          prop="date"
          label="时间"
          align="center">
        </el-table-column>

        <el-table-column
          prop="orderId"
          label="订单号"
          align="center">
        </el-table-column>

      </el-table>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'CommissionList',
    data() {
      return {
        search:'',
        commissionList:[]
      }
    },
    created() {
      this.getCommissionListData()
    },
    methods: {
      submitSearch(){
        console.log(this.search)
      },
      getCommissionListData(){
        let mockData = [
          {
            id:1,
            name:'linshishi@163.com',
            commission:10,
            date:'2020/02/28',
            orderId:1102,
          },{
            id:2,
            name:'dongua@163.com',
            commission:15,
            date:'2020/03/01',
            orderId:8514,
          },
          {
            id:4,
            name:'lisi@163.com',
            commission:5,
            date:'2020/01/28',
            orderId:9856,
          }


        ]
        this.commissionList=mockData
      }
    }
  }
</script>
<style lang="less" scoped>
  .commission-list{
    padding: 0 20px;
    .content{
      .title{
        width: 100%;
        height: 60px;
        line-height: 60px;
      }
      .search{
        margin-bottom: 20px;
        display: flex;
        .el-input{
          width: 300px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
