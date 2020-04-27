<template>
    <div class="menu">
        <el-menu
            :router="linkFlag"
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#49C0D2"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">网站系统管理</span>
            </el-menu-item>

            <el-submenu index="/product-type">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/manager">管理员信息管理</el-menu-item>
                    <el-menu-item index="/user-manager">用户信息管理</el-menu-item>
                    <!-- <el-menu-item index="product-list">商品列表</el-menu-item> -->
                    <el-menu-item index="/ranking">玩家排行榜</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="/rule">
                <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span>游戏关卡设置</span>
                </template>
                <!-- <el-menu-item-group>
          <el-menu-item index="/rule">关卡难度设置</el-menu-item>
          <el-menu-item index="/commission-list">关卡主题设置</el-menu-item>
                </el-menu-item-group>-->
            </el-menu-item>

            <!-- <el-menu-item index="/order">
        <i class="el-icon-s-order"></i>
        <span slot="title">游戏背景设置</span>
            </el-menu-item>-->

            <!-- <el-menu-item index="/profit">
        <i class="el-icon-coin"></i>
        <span slot="title">盈利情况</span>
            </el-menu-item>-->
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    data () {
        return {
            linkFlag: true
        };
    },
    methods: {}
};
</script>
<style lang="less" scoped>
.menu {
    width: 250px;
    height: 100%;
    .el-menu {
        height: 100%;
        border-right: none;
    }
    [class^="el-icon-"],
    [class*="el-icon-"] {
        color: #fff;
    }
}
</style>
