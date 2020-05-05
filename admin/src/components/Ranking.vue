<template>
    <div class="popular">
        <div class="content">
            <div class="title">玩家排行榜</div>
            <el-table :data="popularList" stripe border>
                <el-table-column prop="username" label="玩家名" align="center"></el-table-column>
                <el-table-column prop="score" label="分数" align="center"></el-table-column>
                <el-table-column
                    prop="ranking"
                    label="排名"
                    align="center"
                    width="200"
                    :show-overflow-tooltip="true"
                ></el-table-column>
                <!-- <el-table-column prop="time" label="记录时间" align="center"></el-table-column> -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
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
                    :total="this.total"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Popular',
    data () {
        return {
            total: 0, // 列表数据总数
            currentPage: 1, // 当前分页
            pageSize: 10, // 分页数
            search: '',
            popularList: [],
            allData: []
        };
    },
    created () {
        this.getPopularList();
    },
    methods: {
        /**
         * 分页变化
         */
        pageChange (cur) {
            this.currentPage = cur;
            this.popularList = []
            this.allData.forEach((item, i) => {
                // console.log((this.currentPage - 1) * this.pageSize)
                // console.log(this.currentPage * this.pageSize)
                if ((this.currentPage - 1) * this.pageSize <= i && i < this.currentPage * this.pageSize) {
                    this.popularList.push(item)
                }
            })
        },
        submitSearch () {
            console.log(this.search);
            // 调查询接口
        },
        handleEdit (index, row) {
            let typeJson = {
                userName: row.userName,
                score: row.score,
                id: row.id,
                rank: row.rank
            };
            this.dialogFormVisible = true;
            this.form = typeJson;
        },
        /**
         * 获取用户数据
         */
        getData () {
            this.$axios.get('/tank/score/allRanking').then(res => {
                this.allData = res.data.data.rows;
                this.allData.forEach((item, i) => {
                    item.ranking = `第${i + 1}名`
                    if (i < this.pageSize) {
                        this.popularList.push(item)
                    }
                })
                this.total = res.data.data.rows.length
            });
        },
        handleDelete (index, row) {
            /* console.log(index, row); */
            this.$confirm('此操作将删除该用户所有信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    console.log(index);
                    // 调删除分类接口
                    // 如果该分类下面有商品就不能删除
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        }
    },
    mounted () {
        this.getData()
    }
};
</script>
<style lang="less" scoped>
.popular {
    padding: 0 20px;
    .content {
        .title {
            width: 100%;
            height: 60px;
            line-height: 60px;
        }
        .search {
            margin-bottom: 20px;
            display: flex;
            .el-input {
                width: 300px;
                margin-right: 10px;
            }
        }
        .pagination{
            width: 100%;
            margin-top: 50px;
            text-align: center;
        }
    }
}
</style>
