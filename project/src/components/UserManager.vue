<template>
  <div class="user-manager">
    <div class="content">
      <div class="title">用户信息管理</div>
      <el-table
        :data="typeData"
        stripe
        border
        >
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column 
          label="用户名" 
          prop="userName">
        </el-table-column>
        <el-table-column 
          label="注册时间" 
          prop="registerTime">
        </el-table-column>
        <el-table-column 
          label="最高分数" 
          prop="score">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最高分数" :label-width="formLabelWidth">
          <el-input v-model="form.score" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'UserManager',
    data() {
      return {
        //表格
        typeData: [{
          id: 1,
          userName: '诗诗',
          registerTime: '202010120120',
          lastLogin:'202010120120',
          score:'485',
          rank:1
        }, {
          id: 1,
          userName: '诗诗',
          registerTime: '202010120120',
          lastLogin:'202010120120',
          score:'485',
          rank:2
        }, {
          id: 1,
          userName: '诗诗',
          registerTime: '202010120120',
          lastLogin:'202010120120',
          score:'485',
          rank:3
        }, {
          id: 1,
          userName: '诗诗',
          registerTime: '202010120120',
          lastLogin:'202010120120',
          score:'485',
          rank:4
        },{
          id: 1,
          userName: '诗诗',
          registerTime: '202010120120',
          lastLogin:'202010120120',
          score:'485',
          rank:5
        }],
        //表单
        form: {
          name: '',
          pic:'',
          id:null,
        },
        dialogFormVisible:false,
        formLabelWidth: '120px'
      }
    },
    methods: {
      handleAdd(){
        this.dialogFormVisible = true;
        this.form={
          name: '',
          pic:'',
          id:null
        }
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
      handleAvatarSuccess(res, file) {
        this.form.pic = URL.createObjectURL(file.raw);
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
      //提交数据
      submitData(){
        this.dialogFormVisible = false
      },
    }
  }
</script>
<style lang="less" scoped>
  .user-manager{
    padding: 0 20px;
    .content{
      .title{
        width: 100%;
        height: 60px;
        line-height: 60px;
      }
      .el-table{
        width: 100%;
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border:1px solid #DCDFE6;
    border-radius: 5px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
