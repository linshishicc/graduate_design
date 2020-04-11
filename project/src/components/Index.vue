<template>
  <div class="index">
    <div class="container">
      <my-menu></my-menu>
      <div class="main">
        <div class="nav">
          <div class="manage">坦克大战后台管理系统</div>
          <el-col :span="12" class="userName">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{adminName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item> -->
                <el-dropdown-item icon="el-icon-switch-button" @click.native.prevent="loginOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import Menu  from '@/components/Menu';
  export default {
    name: 'Index',
    components: {
      'my-menu': Menu
    },
    data() {
      return {
        adminName: localStorage.getItem("userName"),
      };
    },
    methods: {
      loginOut(){
        localStorage.setItem("userName", '')
        localStorage.setItem("token", '')
        this.$router.push('/login')
      }
    },
    mounted() {
      console.log(localStorage.getItem("userName"))
      if(!localStorage.getItem("userName")){
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="less" scoped>
  .index,.container{
    height: 100%;
    width: 100%;
  }
  .container{
    display: flex;
    .main{
      flex: 1;
      // margin-left: 1px;
      .nav{
        padding-right: 30px;
        height: 56px;
        line-height: 56px;
        background: #49C0D2;
        color:#fff;
        .el-dropdown{
          color: #fff;
        }
        .userName{
          display: block;
          float: right;
          width: auto;
        }
        .manage{
          margin-left: 30px;
          float: left;
          font-size: 20px;
        }
      }
    }
  }
</style>
