<template>
  <div class="order">
    <div class="content">
      <div class="title">/订单管理</div>
      <div class="search">
        <el-input v-model="search" placeholder="输入订单号搜索"/>
        <el-button type="primary" @click="submitSearch">查询</el-button>
      </div>

      <el-table
        :data="orderList"
        stripe
        border>

        <el-table-column
          prop="id"
          label="id"
          align="center">
        </el-table-column>

        <el-table-column
          prop="date"
          label="创建时间"
          align="center">
        </el-table-column>

        <el-table-column
          prop="user"
          label="消费者"
          align="center"
          width="160"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          prop="product"
          label="商品"
          align="center"
          width="160"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          prop="num"
          label="数量"
          align="center">
        </el-table-column>

        <el-table-column
          prop="price"
          label="总支付"
          align="center">
        </el-table-column>

        <el-table-column
          prop="address"
          label="收货地址"
          align="center"
          width="200"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          prop="status"
          label="支付状态"
          align="center">
        </el-table-column>

        <el-table-column
          prop="share"
          label="分销商"
          align="center">
        </el-table-column>


      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Order',
    data() {
      return {
        search:'',
        orderList:[]
      }
    },
    created() {
      this.getOrderList()
    },
    methods: {
      submitSearch(){
        console.log(this.search)
      },
      getOrderList(){
        let mockData = [
          {
            id:1,
            date:'2020/02/19',
            user:'donggua',
            product:'奶茶',
            num:2,
            price:152,
            address:'茂名市茂南区官渡二路广东石油化工学院',
            status:'支付成功',
            share:'axyao'
          },
          {
            id:2,
            date:'2019/05/19',
            user:'shishi',
            product:'菠萝',
            num:2,
            price:10,
            address:'茂名市茂南区官渡二路广东石油化工学院',
            status:'支付成功',
            share:'kaijie'
          }
        ];
        this.orderList = mockData
      }
    }
  }
</script>
<style lang="less" scoped>
  .order{
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
