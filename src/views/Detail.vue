<template>
    <div>
    <h3 style="margin-bottom: 16px">User Detail</h3>
    <div style="display: flex">
        <div style="flex: 1">
            <h5>User Name:{{ obj.name }}</h5>
        </div>
        <div style="flex: 1">
            <h5>Books purchased:</h5>
            <h5 v-for="(item,index) in obj.books" :key="index">
                《{{ item.name }}》
                <el-button type="text" @click="deleteBook(item, obj)">delete</el-button>
                <div style="display: flex">
                <h5>Author Name:</h5>
            <h5>
                {{ item.author.name }}
            </h5>
            <h5 style="margin-left:16px">Price:</h5>
            <h5>
                {{ item.price }}
            </h5>
        </div>
            </h5>
        </div>
    </div>
</div>
</template>


<script>
import { Detail, deleteBuyBook } from '../api/list';
    export default {
        data() {
            return {
                obj: {}
            };
        },
        created() {
            Detail(this.$route.query.id).then(res => {
                this.obj = res.data;
            })
        },
        methods: {
            deleteBook(val, obj) {
                console.log(val, obj);
                const params = {
                    id: obj.id,
                    bookId: val.id
                }
                deleteBuyBook(params).then(res => {
                    if(res.code === 1) {
                        this.$message.success('Success!')
                        Detail(this.$route.query.id).then(res => {
                            this.obj = res.data;
                        })
                    }
                })
            }
        }
    }
</script>