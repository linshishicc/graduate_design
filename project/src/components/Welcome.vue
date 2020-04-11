<template>
  <div class="welcome">
    <span class="title">快捷方式</span>
    <ul>
      <router-link to='/manager'><li class="shortcut">管理员信息管理</li></router-link>
      <router-link to='/user-manager'><li class="shortcut">用户信息管理</li></router-link>
      <router-link to='/rule'><li class="shortcut">玩家排行榜</li></router-link>
      <router-link to='/rule'><li class="shortcut">游戏关卡设置</li></router-link>
    </ul>
    <span class="title">系统信息</span>
    <table class="table">
      <tr>
        <td colspan="2" class="head">服务器信息</td>
      </tr>
      <tr v-for="(item, i) in tableData" :key="i" >
        <td>{{item.name}}</td>
        <td>{{item.date}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Welcome',
    data() {
      return {
        tableData: [
          {
            date: '1.0',
            name: '软件版本号'
          }, 
          {
            date: 'http://47.107.105.199',
            name: '服务器计算机名'
          }, 
          {
            date: '47.107.105.199',
            name: '服务器IP地址'
          }, 
          {
            date: '80',
            name: '服务器端口'
          },
          {
            date: ' 5.60',
            name: 'MySql版本'
          }
        ]
      };
    },
    methods: {

    }
  }
</script>
<style lang="less" scoped>
  .welcome{
    .title{
      margin: 10px;
      padding: 5px;
      line-height: 40px;
      font-size: 18px;
      width:90%;
      background: #eee;
      display: inline-block;
      border-left: 5px solid #49C0D2;
    }
    >ul{
      padding: 20px;
      margin-bottom: 20px;
      height: 150px;
      .shortcut{
        cursor: pointer;
        width: 150px;
        height: 150px;
        background: #49C0D2;
        float: left;
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 20px;
      }
    }
    .table{
      margin: 20px;
      width: 60%;
      line-height: 40px;
      color: #666;
      font-size: 14px;
      tr{
        .head{
          background: #eeeeee;
        }
        height: 40px;
        border: 1px solid #e6e6e6;
        td{
          border: 1px solid #e6e6e6;
          padding-left: 20px;
        }
      }
    }
  }
</style>
