<template>
    <div>
        <h3 style="margin-bottom: 16px">Book List</h3>
        <el-table empty-text="No Data" :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
            <el-table-column prop="id" label="Book No." width="140">
            </el-table-column>
            <el-table-column prop="name" label="Book Name" width="120">
            </el-table-column>
            <el-table-column prop="author" label="Author" width="140">
                <template slot-scope="scope">
                    <i class="el-icon-user-solid"></i>
                    <span style="margin-left: 10px">{{ scope.row.author.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="Price" width="120">
            </el-table-column>
            <el-table-column label="操作">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" placeholder="please enter book name" />
                </template>
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="edit(scope.row)">Edit</el-button>
                    <el-button type="primary" size="mini" @click="deleteById(scope.row)">Delete</el-button>
                    <el-button type="primary" size="mini" @click="buyBookById(scope.row)">Buy Book For Customer</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="change">
        </el-pagination>
        
<el-dialog
  title="User Buy Book"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <el-select v-model="value" placeholder="select customer">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="okBuy">Confirm</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
import { getList, deleteBook, buyBook, getUserList } from './../api/list'
export default {
    data() {
        return {
            searchContent: '',
            pageSize: 10,
            total: 0,
            page: 1,
            tableData: [],
            search: '',
            dialogVisible: false,
            options: [],
            value: null,
            bookId: null
        }
    },
    methods: {
        geiList() {
            const params = {
                start: 0,
                length: 999999
            }
            getUserList(params).then(res => {
                if (res.code === 1) {
                    this.options = res.data.content;
                }
            })
        },
        change(currentPage) {
            this.page = currentPage;
            this.getBookList();
        },
        edit(row) {
            this.$router.push({
                path: '/update',
                query: {
                    obj: JSON.stringify(row)
                }
            })
        },
        getBookList() {
            const params = {
                start: this.page - 1,
                length: this.pageSize
            }
            getList(params).then(res => {
                if (res.code === 1) {
                    this.tableData = res.data.content;
                    this.total = res.data.totalElements;
                }
            })
        },
        deleteById(row) {
            const _this = this;
            _this.$confirm('Sure to delete it?', 'Tips', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                deleteBook(row.id).then(res => {
                    if(res.code === 1) {
                        this.$message.success('success')
                        this.getBookList();
                    }
                })
                console.log(111);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Cancel delete'
                });
            });
        },
        buyBookById(row) {
            this.bookId = row.id;
            this.geiList();
            this.dialogVisible = true;
        },
        okBuy() {
            const params = {
                bookId: this.bookId,
                customerId: this.value
            }
            buyBook(params).then(res => {
                if(res.code === 1) {
                    this.$message.success('Buy Success!');
                    this.getBookList();
                    this.dialogVisible = false;
                }
            })
        }
    },

    created() {
        this.getBookList();
    }
}
</script>

<style scoped></style>