<template>
    <div class="manager">
        <div class="content">
            <div class="title">管理员信息管理</div>
            <el-table :data="typeData" stripe border>
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="管理组" prop="group"></el-table-column>
                <el-table-column label="最后登录时间" prop="logintime"></el-table-column>
                <el-table-column align="right">
                    <template slot="header">
                        <el-button size="mini" @click="handleAdd">添加管理员</el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="editType ? '编辑信息':'添加管理员'" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="id" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="管理组" :label-width="formLabelWidth" v-if="currentGroup == 1">
                    <el-select v-model="form.group" placeholder="请选择">
                        <el-option
                            v-for="item in manageGroup"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off" :disabled="editType"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="请输入密码（若不填则为不修改）"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input
                        v-model="form.conPassword"
                        type="password"
                        placeholder="请确认密码..."
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-if="!editType" @click="submitData">确 定</el-button>
                <el-button type="primary" v-if="editType" @click="editData">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Manager',
    data () {
        return {
            // 表格
            typeData: [],
            // 表单
            form: {
                name: '',
                pic: '',
                id: null,
                password: ''
            },
            dialogFormVisible: false,
            formLabelWidth: '120px',
            editType: true,
            manageGroup: [
                {
                    value: 1,
                    label: '超级管理员'
                },
                {
                    value: 2,
                    label: '管理员'
                }
            ],
            currentGroup: localStorage.getItem('group')
        };
    },
    methods: {
        handleAdd () {
            if (localStorage.getItem('group') != 1) {
                this.$message({
                    type: 'info',
                    message: '你无权执行改操作'
                });
                return;
            }
            this.dialogFormVisible = true;
            this.editType = false;
            this.form = {
                username: '',
                password: '',
                id: '',
                conPassword: ''
            };
        },
        handleEdit (row) {
            let username = localStorage.getItem('userName');
            if (
                username !== row.username &&
                localStorage.getItem('group') != 1
            ) {
                this.$message({
                    type: 'info',
                    message: '你无权操作该用户'
                });
                return;
            }
            this.editType = true;
            this.form = {
                username: row.username,
                group: row.group,
                password: '',
                id: row.id,
                conPassword: ''
            };
            this.dialogFormVisible = true;
        },
        handleAvatarSuccess (res, file) {
            this.form.pic = URL.createObjectURL(file.raw);
        },
        handleDelete (row) {
            if (localStorage.getItem('group') != 1) {
                this.$message({
                    type: 'info',
                    message: '你无权执行改操作'
                });
                return;
            }
            let id = row.id;
            let param = { id: id };
            this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 调删除分类接口
                this.$axios
                    .post('/tank/users/managerDel', param)
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getData();
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.message
                            });
                        }
                    })
                    .catch(() => {});
            });
        },
        // 提交数据
        submitData () {
            if (this.form.username == '') {
                this.$message({
                    type: 'error',
                    message: '用户名不能为空'
                });
                return;
            }
            if (
                this.form.password.length < 6 ||
                this.form.password.length > 16
            ) {
                this.$message({
                    type: 'error',
                    message: '密码长度必须在6~16个字符之间'
                });
                return;
            }
            if (this.form.password !== this.form.conPassword) {
                this.$message({
                    type: 'error',
                    message: '前后密码不一致'
                });
                return;
            }
            let param = {
                username: this.form.username,
                password: this.form.password,
                group: this.form.group
            };
            this.$axios.post('/tank/users/managerAdd', param).then(res => {
                if (res.data.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.getData();
                    this.dialogFormVisible = false;
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        timeTrs (val) {
            let t = val
                ? val.substr(0, 4) +
                  '-' +
                  val.substr(4, 2) +
                  '-' +
                  val.substr(6, 2) +
                  ' ' +
                  val.substr(8, 2) +
                  ':' +
                  val.substr(10, 2)
                : null;
            return t;
        },
        // 获取管理员信息列表
        getData () {
            this.$axios.get('/tank/users/managerList').then(res => {
                res.data.data.forEach((item, i) => {
                    if (item.begroup == 1) {
                        item.group = 1;
                    } else {
                        item.group = 2;
                    }
                    item.logintime = this.timeTrs(item.logintime);
                });
                this.typeData = res.data.data;
            });
        },
        editData () {
            // if(this.form.password.length < 6 || this.form.password.length > 16){
            //   this.$message({
            //     type: 'error',
            //     message: '密码长度必须在6~16个字符之间'
            //   });
            //   return;
            // }
            if (this.form.password !== this.form.conPassword) {
                this.$message({
                    type: 'error',
                    message: '前后密码不一致'
                });
                return;
            }
            let param = {
                id: this.form.id,
                password: this.form.password,
                group: this.form.group
            };
            this.$axios.post('/tank/users/managerEdit', param).then(res => {
                if (res.data.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
                this.dialogFormVisible = false;
            });
        }
    },
    created () {
        this.getData();
    }
};
</script>
<style lang="less" scoped>
.manager {
    padding: 0 20px;
    .content {
        .title {
            width: 100%;
            height: 60px;
            line-height: 60px;
        }
        .el-table {
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
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
