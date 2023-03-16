<template>
    <div>
        <h3 style="margin-bottom: 16px">Author List</h3>
        <el-table empty-text="No Data" :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
            <el-table-column prop="id" label="Author No." width="140">
            </el-table-column>
            <el-table-column prop="author" label="Author" width="140">
                <template slot-scope="scope">
                    <i class="el-icon-user-solid"></i>
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Operate">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" placeholder="Please enter author name" />
                </template>
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="edit(scope.row)">Edit</el-button>
                    <el-button type="primary" size="mini" @click="deleteById(scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="change">
        </el-pagination>
    </div>
</template>

<script>
import { deleteAuthor, getAuthorList } from './../api/list'
export default {
    data() {
        return {
            searchContent: '',
            pageSize: 10,
            total: 0,
            page: 1,
            tableData: [],
            search: ''
        }
    },
    methods: {

        change(currentPage) {
            this.page = currentPage;
            this.geiList();
        },
        edit(row) {
            this.$router.push({
                path: '/editauthor',
                query: {
                    obj: JSON.stringify(row)
                }
            })
        },
        geiList() {
            const params = {
                start: this.page - 1,
                length: this.pageSize
            }
            getAuthorList(params).then(res => {
                if (res.code === 1) {
                    this.tableData = res.data.content;
                    this.total = res.data.totalElements;
                }
            })
        },
        deleteById(row) {
            const _this = this;
            _this.$confirm('Sure to delete it?', 'tips', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                deleteAuthor(row.id).then(res => {
                    if(res.code === 1) {
                        this.$message.success('success')
                        this.geiList();
                    }
                })
                console.log(111);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Cancel delete'
                });
            });
        }
    },

    created() {
        this.geiList();
    }
}
</script>

<style scoped></style>