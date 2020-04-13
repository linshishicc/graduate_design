<template>
  <div class="product-list">
    <div class="content">
      <div class="title">/商品列表</div>
      <div class="search">
        <el-input v-model="search" placeholder="输入商品名称关键字搜索"/>
        <el-button type="primary" @click="submitSearch">查询</el-button>
      </div>
      <el-table
        :data="productList"
        @selection-change="selectAll"
        border
        stripe>
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          align="center">
        </el-table-column>

        <el-table-column
          prop="type"
          label="类型"
          align="center">
        </el-table-column>

        <el-table-column
          prop="name"
          label="名称"
          align="center"
          width="200"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          prop="disc"
          label="描述"
          align="center"
          width="400"
          :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column
          prop="principal"
          label="成本"
          align="center">
        </el-table-column>

        <el-table-column
          prop="price"
          label="销售"
          align="center">
        </el-table-column>

        <el-table-column label="主题" prop="bannerPic" align="center">
          　　<template slot-scope="scope">
          　　　　<img :src="scope.row.bannerPic" width="40" height="40"/>
          　　</template>
        </el-table-column>

        <el-table-column label="详情" prop="detailPic" align="center">
          　　<template slot-scope="scope">
          　　　　<img :src="scope.row.detailPic" width="40" height="40"/>
          　　</template>
        </el-table-column>

        <el-table-column align="center" width="200">
          <template slot="header" slot-scope="scope">
            <el-button
              size="mini"
              @click="handleAdd">新增</el-button>
            <el-button
              size="mini"
              @click="handleBatchDelete">批量删除</el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <el-dialog title="商品列表" :visible.sync="dialogFormVisible" @close="cancelDialog">
      <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择商品类型">
            <el-option :label="item.name" :value="item.id" :key="index" v-for="(item,index) in typeList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="disc">
          <el-input type="textarea" v-model="form.disc"></el-input>
        </el-form-item>
        <el-form-item label="成本" prop="principal">
          <el-input v-model.number="form.principal" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售价" prop="price">
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <div class="pic-item">
          <el-form-item label="图片" prop="bannerPic">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccessPic"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.bannerPic" :src="form.bannerPic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情" prop="detailPic">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccessDetail"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.detailPic" :src="form.detailPic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="submitProductItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ProductList',
    data() {
      return {
        productList:[],
        search:'',
        typeList:[
          {id:0,name:"吃"},
          {id:1,name:"住"},
          {id:2,name:"用"},
          {id:3,name:"行"},
          {id:4,name:"穿"},
        ],
        dialogFormVisible: false,
        form: {
          type:'',
          name:'',
          disc:'',
          principal:null,
          price:null,
          bannerPic:'',
          detailPic:''
        },
        rules: {
          type:[{required: true, message: '请选择商品类别', trigger: 'change'}],
          name:[{required: true, message: '请输入商品名字', trigger: 'blur'}],
          disc:[{required: true, message: '请输入商品描述', trigger: 'blur'}],
          principal:[
            { required: true, message: '请输入商品成本价格'},
            { type: 'number', message: '成本价格必须为数字值'}
          ],
          price:[
            { required: true, message: '请输入商品销售价'},
            { type: 'number', message: '商品销售价必须为数字值'}
          ],
          bannerPic:[{required: true, message: '请上传商品banner图片'}],
          detailPic:[{required: true, message: '请上传商品详情图片'}],
        },
        deleteList:[]
      }
    },
    created() {
      //获取类型
      // 获取商品列表
      this.getProductList();
    },
    methods: {
      //查询数据
      getProductList(){
        let mockProductList=[
          {
            id:23,
            typeId:0,
            type:'吃',
            name:"蒙牛特仑苏低脂牛奶1",
            disc:'蒙牛特仑苏低脂牛奶250ml*12盒/整箱不是所有牛奶都叫特仑苏',
            principal:40,//本金
            price:60,//销售价
            bannerPic:require('../assets/images/product-type/road.png'),
            detailPic:require('../assets/images/product-type/wear.png')
          },
          {
            id:54,
            typeId:0,
            type:'吃',
            name:"蒙牛特仑苏低脂牛奶2",
            disc:'蒙牛特仑苏低脂牛奶250ml*12盒/整箱不是所有牛奶都叫特仑苏',
            principal:40,//本金
            price:60,//销售价
            bannerPic:require('../assets/images/product-type/live.png'),
            detailPic:require('../assets/images/product-type/road.png')
          },
          {
            id:98,
            typeId:0,
            type:'吃',
            name:"蒙牛特仑苏低脂牛奶3",
            disc:'蒙牛特仑苏低脂牛奶250ml*12盒/整箱不是所有牛奶都叫特仑苏',
            principal:40,//本金
            price:60,//销售价
            bannerPic:require('../assets/images/product-type/use.png'),
            detailPic:require('../assets/images/product-type/road.png')
          }
        ];
        this.productList = mockProductList;
      },
      //查询
      submitSearch(){
        console.log(this.search)
        //调查询接口
      },
      //新增
      handleAdd(){
        this.form={};
        this.dialogFormVisible=true;
        // this.$refs.ruleForm.clearValidate()
      },
      //批量删除
      handleBatchDelete(){
        if(this.deleteList.length<=0){
          this.$message.error('请选择要删除的商品list!');
          return
        }
        console.log(this.deleteList)
      },
      //单条记录编辑
      handleEdit(row){
        let ProductJson = {
          id:row.id,
          type:row.type,
          name:row.name,
          disc:row.disc,
          principal:row.principal,
          price:row.price,
          bannerPic:row.bannerPic,
          detailPic:row.detailPic
        };
        this.form=ProductJson;
        this.dialogFormVisible=true;
        // this.$refs.ruleForm.clearValidate();
        console.log(this.form)
      },
      //单条记录删除
      handleDelete(row){
        this.$confirm('此操作将删除该商品信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row.id);
          //调删除商品接口
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
      beforeAvatarUpload(file) {
        const isFormat = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isFormat) {
          this.$message.error('上传头像图片只能是JPG或者是PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过2MB!');
        }
        return isFormat && isLt2M;
      },
      handleAvatarSuccessPic(res, file) {
        this.form.bannerPic = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccessDetail(res, file) {
        this.form.detailPic = URL.createObjectURL(file.raw);
      },
      cancelDialog(){
        this.$refs.ruleForm.resetFields()
        this.dialogFormVisible=false;
      },
      //弹窗确定
      submitProductItem(){
        this.$refs.ruleForm.validate(valid => {
          console.log(valid);
          console.log(this.form);
          // if (valid) {
          //   //发起请求
          //   setTimeout(()=>{
          //     this.dialogFormVisible=false;
          //   },1000)
          // }
        })
      },
      //批量选择
      selectAll(selection){
        this.deleteList = selection;
      }
    }
  }
</script>
<style lang="less" scoped>
  .product-list{
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
    .pic-item{
      display: flex;
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
