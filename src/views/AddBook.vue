<template>
    <div>
        <h3 style="margin-bottom: 16px">Add Book</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:40%">
        <el-form-item label="Book Name" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Author" prop="author">
            <el-select v-model="ruleForm.author" placeholder="Please Select" style="width: 100%" no-data-text="No Data" no-match-text="No Data">
            <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Price" prop="price">
            <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Add</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>


<script>
import { saveBook, getAuthorList } from './../api/list'
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    author: '',
                    price: ''
                },
                rules: {
                    name: [
                        { required: true, message: 'please enter', trigger: 'blur' },
                    ],
                    author: [
                        { required: true, message: 'please enter', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: 'please enter', trigger: 'blur' },
                    ]
                },
                options: [] // 作者列表
            };
        },
        created() {
            this.getList();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       const params = {
                            name: this.ruleForm.name,
                            price: this.ruleForm.price,
                            author: {
                                id: this.ruleForm.author
                            }
                       }
                       saveBook(params).then(res => {
                           if(res.code === 1) {
                               this.$message.success('Success')
                               this.$router.push('/manage')
                           }
                       })
                    } else {
                        return false;
                    }
                });
            },
            getList() {
                getAuthorList({start: 0, length: 9999}).then(res => {
                    if(res.code === 1) {
                        this.options = res.data.content;
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.ruleForm.price = '';
            }
        }
    }
</script>