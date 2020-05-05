<template>
    <div class="user-manager">
        <div class="content">
            <div class="title">用户信息管理</div>
            <el-table :data="typeData" stripe border>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="注册时间">
                    <template slot-scope="scope">
                        <span>{{timeTrs(scope.row.registtime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="最高分数" prop="score"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="prev, pager, next, jumper"
                    :page-size="pageSize"
                    @current-change="pageChange"
                    :current-page="currentPage"
                    :page-count="this.total"
                ></el-pagination>
            </div>
        </div>
        <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="id" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
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
    data () {
        return {
            // 列表数据总数
            total: 0,
            currentPage: 1, // 当前分页
            pageSize: 10, // 分页数
            // 表格
            typeData: [],
            // 表单
            form: {
                name: '',
                pic: '',
                id: null
            },
            dialogFormVisible: false,
            formLabelWidth: '120px'
        };
    },
    methods: {
        /**
         * 分页变化
         */
        pageChange (cur) {
            this.currentPage = cur;
            this.getData();
        },
        /**
         * 获取列表数据
         */
        getData () {
            let param = {page: this.currentPage}
            this.$axios.get('/tank/users/userList', {params: param}).then(res => {
                this.typeData = res.data.data.result;
                this.total = res.data.data.total_page
            });
        },
        handleAdd () {
            this.dialogFormVisible = true;
            this.form = {
                name: '',
                pic: '',
                id: null
            };
        },
        handleEdit (index, row) {
            let typeJson = {
                username: row.username,
                score: row.score,
                id: row.id,
                rank: row.rank
            };
            this.dialogFormVisible = true;
            this.form = typeJson;
        },
        /**
         * 时间格式化
         */
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
        handleDelete (row) {
            let id = row.id;
            let param = { id: id };
            this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 调删除分类接口
                this.$axios
                    .post('/tank/users/userDel', param)
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
            this.dialogFormVisible = false;
        }
    },
    mounted () {
        this.getData()
    }
};
</script>
<style lang="less" scoped>
.user-manager {
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
.pagination{
    width: 100%;
    margin-top: 50px;
    text-align: center;
}
</style>
