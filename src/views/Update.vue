<template>
    <div>
        <h3 style="margin-bottom: 16px">Edit Book Info</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:40%">
        <el-form-item label="ID" prop="id">
            <el-input v-model="ruleForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="Book Name" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Author" prop="author">
            <el-select v-model="ruleForm.author" placeholder="please select" style="width: 100%">
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
                    price: '',
                    id: null
                },
                rules: {
                    name: [
                        { required: true, message: 'please enter', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: 'please enter', trigger: 'blur' },
                    ],
                    id: [
                        { required: true, message: 'please enter', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: 'please enter', trigger: 'blur' },
                    ]
                },
                options: [], // 作者列表
                rows: [] // 图书信息
            };
        },
        created() {
            this.rows = JSON.parse(this.$route.query.obj);
            this.ruleForm.id = this.rows.id;
            this.ruleForm.name = this.rows.name;
            this.ruleForm.author = this.rows.author.id;
            this.ruleForm.price = this.rows.price || '';
            console.log(this.rows);
            this.getList();
        },
        methods: {
            submitForm(formName) {
                console.log(this.options);
                const list = this.options.filter(item => {
                    return item.id === this.ruleForm.author;
                })
                console.log(list);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       const params = {
                            id: this.ruleForm.id,
                            name: this.ruleForm.name,
                            price: this.ruleForm.price,
                            author: {
                                id: list[0].id,
                                name: list[0].name
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