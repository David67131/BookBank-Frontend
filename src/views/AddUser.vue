<template>
    <div>
    <h3 style="margin-bottom: 16px">Add User</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:40%">
        <el-form-item label="User" prop="user">
            <el-input v-model="ruleForm.user" placeholder="Please Enter"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Add</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>


<script>
import { saveUser } from '../api/list'
    export default {
        data() {
            return {
                ruleForm: {
                    user: '',
                },
                obj: {},
                rules: {
                    user: [
                        { required: true, message: 'please enter', trigger: 'blur' },
                    ],
                },
            };
        },
        created() {
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       const params = {
                            name: this.ruleForm.user,
                       }
                       saveUser(params).then(res => {
                           if(res.code === 1) {
                               this.$message.success('Success')
                               this.$router.push('/UserList')
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