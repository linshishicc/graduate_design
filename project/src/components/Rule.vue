<template>
  <div class="rule">
    <div class="content">
      <div class="title">关卡设置</div>
      <el-table
        :data="ruleData"
        stripe
        border
      >
        <el-table-column
          prop="level"
          label="关卡">
        </el-table-column>
        <el-table-column label="主题" prop="theme">
        </el-table-column>
        <el-table-column
          prop="purple"
          label="紫坦克数">
        </el-table-column>
        <el-table-column
          prop="yellow"
          label="黄坦克数">
        </el-table-column>
        <el-table-column
          prop="blue"
          label="蓝坦克数">
        </el-table-column>
        <el-table-column
          prop="live"
          label="玩家生命">
        </el-table-column>
        <el-table-column label="操作">
          <template slot="header">
            <el-button
              size="mini"
              @click="handleAdd">添加关卡</el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="关卡设置" :visible.sync="dialogFormVisible" @close="cancelDialog">
      <el-form :model="levelForm" status-icon ref="levelForm" label-width="100px">
        <el-form-item label="关卡" prop="level">
          <el-input v-model.number="levelForm.level" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主题" prop="level">
           <el-select v-model="levelForm.theme" placeholder="请选择">
            <el-option
              v-for="item in themeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紫坦克数" prop="purple">
          <el-input v-model.number="levelForm.purple" type="number" placeholder="请输入紫坦克数..." autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="黄坦克数" prop="yellow">
          <el-input v-model="levelForm.yellow" type="number" placeholder="请输入黄坦克数..." autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="蓝坦克数" prop="blue">
          <el-input v-model="levelForm.blue" type="number" placeholder="请输入蓝坦克数..." autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="玩家生命数" prop="live">
          <el-input v-model="levelForm.live" type="number" placeholder="请输入玩家生命数..." autocomplete="off"></el-input>
        </el-form-item>
        <span class="attention">注：若关卡顺序不连续，则被跳过的那道关卡以及比它大的关卡均不生效，请仔细填写关卡数避免出现失效情况。</span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="submitRuleItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Rule',
    data() {
      return {
        ruleData:[],
        levelForm:{},
        dialogFormVisible:false,
        themeOptions: [{
          value: '1',
          label: '草地'
        }, {
          value: '2',
          label: '雪地'
        }, {
          value: '3',
          label: '沙漠'
        }],
      }
    },
    created() {
      this.getRuleList()
    },
    methods: {
      getRuleList(){
        let mockData = [
          {
            id:1,
            theme: 1,
            level: 1,
            yellow: 2,
            blue:3,
            purple:2,
            bannerPic:require('../assets/images/product-type/road.png'),
          },
          {
            id:2,
            theme: 1,
            level: 2,
            yellow: 2,
            blue:3,
            purple:2,
            bannerPic:require('../assets/images/product-type/road.png'),
          },
          {
            id:3,
            theme: 1,
            level: 3,
            yellow: 2,
            blue:3,
            purple:2,
            bannerPic:require('../assets/images/product-type/road.png'),
          },
        ];
        this.ruleData = mockData;
      },
      //新增
      handleAdd(){
        this.levelForm={};
        this.dialogFormVisible=true
      },
      //编辑
      handleEdit(index,row){
        let levelJson = {
          purple:row.purple,
          level:row.level,
          yellow:row.yellow,
          blue:row.blue,
          theme: row.theme,
          live: row.live
        };
        this.levelForm=levelJson;
        this.dialogFormVisible=true;
      },
      //删除
      handleDelete(index,row){
        this.$confirm('此操作将删除该条分销商设置记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row.id);
          //调删除分销商接口
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
      //弹窗取消
      cancelDialog(){
        this.$refs.levelForm.resetFields();
        this.dialogFormVisible=false;
      },
      submitRuleItem(){
        console.log(this.levelForm)
      },
      getData() {
        this.$axios.get('/tank/level/levelList').then((res) =>{
          this.ruleData = res.data.data
          this.ruleData.forEach((item) => {
            if(item.theme == 1){
              item.theme = "草地"
            } else if (item.theme == 2) {
              item.theme = "雪地"
            } else {
              item.theme = "沙漠"
            }
          })
        })
      },
    },
    mounted() {
      this.getData()
    }
  }
</script>
<style lang="less" scoped>
  .rule{
    padding: 0 20px;
    .content{
      .title{
        width: 100%;
        height: 60px;
        line-height: 60px;
      }
    }
    .attention{
      margin-left: 32px;
      color: rgb(255, 0, 0)
    }
  }
</style>
