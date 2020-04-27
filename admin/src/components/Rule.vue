<template>
    <div class="rule">
        <div class="content">
            <div class="title">关卡设置</div>
            <el-table :data="ruleData" stripe border>
                <el-table-column prop="level" label="关卡"></el-table-column>
                <el-table-column label="主题" prop="theme"></el-table-column>
                <el-table-column prop="purple" label="紫坦克数"></el-table-column>
                <el-table-column prop="blue" label="蓝坦克数"></el-table-column>
                <el-table-column prop="yellow" label="黄坦克数"></el-table-column>
                <el-table-column prop="deepblue" label="深蓝坦克数"></el-table-column>
                <el-table-column prop="live" label="玩家生命"></el-table-column>
                <el-table-column label="操作">
                    <!-- <template slot="header">
            <el-button
              size="mini"
              @click="handleAdd">添加关卡</el-button>
                    </template>-->
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <!-- <el-button
              size="mini"
              type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
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
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="紫坦克数" prop="purple">
                    <el-input
                        v-model.number="levelForm.purple"
                        type="number"
                        placeholder="请输入紫坦克数..."
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="蓝坦克数" prop="blue">
                    <el-input
                        v-model="levelForm.blue"
                        type="number"
                        placeholder="请输入蓝坦克数..."
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="黄坦克数" prop="yellow">
                    <el-input
                        v-model="levelForm.yellow"
                        type="number"
                        placeholder="请输入黄坦克数..."
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="深蓝坦克数" prop="deepblue">
                    <el-input
                        v-model="levelForm.deepblue"
                        type="number"
                        placeholder="请输入深蓝坦克数..."
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="玩家生命数" prop="live">
                    <el-input
                        v-model="levelForm.live"
                        type="number"
                        placeholder="请输入玩家生命数..."
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <span class="attention">注：若关卡顺序不连续，则被跳过的那道关卡以及比它大的关卡均不生效，请仔细填写关卡数避免出现失效情况。</span>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelDialog">取 消</el-button>
                <el-button type="primary" @click="submitRuleItem" v-if="!editType">确 定</el-button>
                <el-button type="primary" @click="editRuleItem" v-if="editType">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Rule',
    data () {
        return {
            ruleData: [],
            levelForm: {},
            dialogFormVisible: false,
            themeOptions: [
                {
                    value: 'lawn',
                    label: '草地'
                },
                {
                    value: 'snowfield',
                    label: '雪地'
                },
                {
                    value: 'sandlot',
                    label: '沙漠'
                }
            ],
            editType: false
        };
    },
    created () {
        this.getRuleList();
    },
    methods: {
        getRuleList () {
            let mockData = [];
            this.ruleData = mockData;
        },
        // 新增
        handleAdd () {
            this.editType = false;
            this.levelForm = {};
            this.dialogFormVisible = true;
        },
        // 编辑
        handleEdit (row) {
            this.editType = true;
            let levelJson = {
                purple: row.purple,
                level: row.level,
                yellow: row.yellow,
                blue: row.blue,
                theme: row.theme,
                live: row.live,
                id: row.id,
                deepblue: row.deepblue
            };
            this.levelForm = levelJson;
            this.dialogFormVisible = true;
        },
        // 删除
        handleDelete (index, row) {
            this.$confirm('此操作将删除该关卡, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    // 调删除分类接口
                    let id = row.id;
                    let param = { id: id };
                    this.$axios
                        .post('/tank/level/levelDel', param)
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
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 弹窗取消
        cancelDialog () {
            this.$refs.levelForm.resetFields();
            this.dialogFormVisible = false;
        },
        submitRuleItem () {
            if (this.levelForm.level == '') {
                this.$message({
                    type: 'error',
                    message: '关卡数必须填写'
                });
                return;
            }
            if (this.levelForm.live == '') {
                this.$message({
                    type: 'error',
                    message: '玩家生命数必须填写'
                });
                return;
            }
            this.$axios
                .post('/tank/level/levelAdd', this.levelForm)
                .then(res => {
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
        editRuleItem () {
            if (this.levelForm.level == '') {
                this.$message({
                    type: 'error',
                    message: '关卡数必须填写'
                });
                return;
            }
            if (this.levelForm.live == '') {
                this.$message({
                    type: 'error',
                    message: '玩家生命数必须填写'
                });
                return;
            }
            // console.log(this.levelForm)
            this.$axios
                .post('/tank/level/levelUpdate', this.levelForm)
                .then(res => {
                    if (res.data.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.getData();
                        this.dialogFormVisible = false;
                    } else {
                        // console.log(res.data.message)
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                });
        },
        getData () {
            this.$axios.get('/tank/level/levelList').then(res => {
                this.ruleData = res.data.data;
                this.ruleData.forEach(item => {
                    if (item.theme == 'lawn') {
                        item.theme = '草地';
                    } else if (item.theme == 'snowfield') {
                        item.theme = '雪地';
                    } else {
                        item.theme = '沙漠';
                    }
                });
            });
        }
    },
    mounted () {
        this.getData();
    }
};
</script>
<style lang="less" scoped>
.rule {
    padding: 0 20px;
    .content {
        .title {
            width: 100%;
            height: 60px;
            line-height: 60px;
        }
    }
    .attention {
        margin-left: 32px;
        color: rgb(255, 0, 0);
    }
}
</style>
