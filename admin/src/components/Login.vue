<template>
    <div class="login-container">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
        >
            <div class="title-container">
                <h3 class="title">坦克大战后台登录系统</h3>
            </div>

            <el-form-item prop="username">
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="请输入用户名..."
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>

            <el-form-item prop="password">
                <el-input
                    ref="password"
                    v-model="loginForm.password"
                    placeholder="请输入密码..."
                    name="password"
                    type="password"
                    tabindex="2"
                    autocomplete="on"
                />
            </el-form-item>

            <el-button
                :loading="loading"
                type="primary"
                style="width:100%;"
                @click.native.prevent="handleLogin"
            >登录</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error('管理员的名字不能为空!'));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (!value) {
                callback(new Error('密码不能为空!'));
            } else if (value.length < 6) {
                callback(new Error('密码不少于6位!'));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validateUsername
                    }
                ],
                password: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validatePassword
                    }
                ]
            },
            loading: false
        };
    },
    mounted () {},
    methods: {
        handleLogin () {
            // console.log(this.loginForm.username == '')
            if (this.loginForm.username == '' || this.loginForm.password == '')
                return;
            let param = {
                username: this.loginForm.username,
                password: this.loginForm.password
            };
            this.loading = true;
            this.$axios
                .post('/tank/login/adminLogin', param)
                .then(res => {
                    if (res.data.status == 1) {
                        localStorage.setItem('token', res.data.result.token);
                        localStorage.setItem(
                            'userName',
                            res.data.result.userInfo.username
                        );
                        localStorage.setItem(
                            'group',
                            res.data.result.userInfo.group
                        );
                        this.$message({
                            type: 'success',
                            message: '登录成功！'
                        });
                        setTimeout(() => {
                            this.$router.push('/');
                        }, 1000);
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                    this.loading = false;
                })
                .catch(() => {});
        }
    }
};
</script>

<style lang="less">
@bg: #49c0d2;
@light_gray: #fff;
@cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
    .login-container .el-input input {
        color: @cursor;
    }
}
/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        // width: 85%;
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: @light_gray;
            height: 47px;
            caret-color: @cursor;
            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px @bg inset !important;
                -webkit-text-fill-color: @cursor !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
    .el-button--primary {
        color: #49c0d2;
        background-color: #fff;
        border-color: #fff;
    }
}
</style>
<style lang="less" scoped>
@bg: #49c0d2;
@dark_gray: #889aa4;
@light_gray: #eee;
.login-container {
    min-height: 100%;
    width: 100%;
    background-color: @bg;
    overflow: hidden;
    .login-form {
        position: relative;
        width: 350px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }
    .title-container {
        position: relative;
        .title {
            font-size: 26px;
            color: @light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: @dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>

