<template>
    <div>
    <h3 style="margin-bottom: 16px">Edit Author</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:40%">
        <el-form-item label="Author" prop="author">
            <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Add</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>


<script>
import { saveAuthor } from './../api/list'
    export default {
        data() {
            return {
                ruleForm: {
                    author: '',
                },
                obj: {},
                rules: {
                    author: [
                        { required: true, message: 'please enter', trigger: 'blur' },
                    ],
                },
            };
        },
        created() {
            this.obj = JSON.parse(this.$route.query.obj);
            console.log(this.obj);
            this.ruleForm.author = this.obj.name;
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       const params = {
                            name: this.ruleForm.author,
                            id: this.obj.id
                       }
                       saveAuthor(params).then(res => {
                           if(res.code === 1) {
                               this.$message.success('Success')
                               this.$router.push('/author')
                           }
                       })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>