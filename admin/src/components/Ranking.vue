<template>
  <div class="popular">
    <div class="content">
      <div class="title">玩家排行榜</div>
      <el-table
        :data="popularList"
        stripe
        border>
        <el-table-column
          prop="userName"
          label="玩家名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="score"
          label="分数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="ranking"
          label="排名"
          align="center"
          width="200"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          prop="time"
          label="记录时间"
          align="center">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Popular',
    data() {
      return {
        search:'',
        popularList:[]
      }
    },
    created() {
      this.getPopularList()
    },
    methods: {
      submitSearch(){
        console.log(this.search)
        //调查询接口
      },
      handleEdit(index, row) {
        let typeJson = {
          userName:row.userName,
          score:row.score,
          id:row.id,
          rank: row.rank
        };
        this.dialogFormVisible = true;
        this.form=typeJson;
      },
      getPopularList(){
        let mockdata = [
          {
            ranking:1,
            userName:'奶茶',
            score:17,
            time:202010180252
          }, {
            ranking:1,
            userName:'奶茶',
            score:17,
            time:202010180252
          }, {
            ranking:1,
            userName:'奶茶',
            score:17,
            time:202010180252
          }
        ];
        this.popularList = mockdata.map((val,index,array)=>{
          return{
            ranking:`第${val.ranking}名`,
            userName:val.userName,
            score:val.score,
            time:val.time,
          }
        })
      },
      handleDelete(index, row) {
        /*console.log(index, row);*/
        this.$confirm('此操作将删除该用户所有信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(index);
          //调删除分类接口
          //如果该分类下面有商品就不能删除
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    }
  }
</script>
<style lang="less" scoped>
  .popular{
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
