<template xmlns:el-form-item="http://www.w3.org/1999/html">
    <div style="margin-left: 50px">
        <el-form label-position="top" label-width="200px">
            <el-form-item>
                <el-col></el-col>
            </el-form-item >
            <el-form-item label="SMTP服务">
                <el-button type="primary" icon="el-icon-setting" @click="openSMTP">
                    开启
                </el-button>
                <el-button type="info" icon="el-icon-warning"  @click="closeSMTP">
                    关闭
                </el-button>
            </el-form-item>
            <el-form-item label="POP3服务">
                <el-button type="primary" icon="el-icon-setting" @click="openPOP3">
                    开启
                </el-button>
                <el-button type="info" icon="el-icon-warning"  @click="closePOP3">
                    关闭
                </el-button>
            </el-form-item>
            <el-form-item label="邮件过滤">
                <el-button type="primary" icon="el-icon-setting" @click="openFilter">
                    开启
                </el-button>
                <el-button type="info" icon="el-icon-warning"  @click="closeFilter">
                    关闭
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {filter, pop3, smtp} from "../../api/api";

    export default {
        name: "integral-config",
        data() {
            return {
                num1: 1
            }
        },
        methods: {
            openSMTP() {
                let para = {action: 1};
                smtp(para).then(res =>{
                    if (res.data.flag == 1)
                    {
                        this.$notify({
                            title: '成功',
                            message: '服务开启成功',
                            type: 'success'
                        });
                    }
                    else
                    {
                        this.$notify({
                            title: '失败',
                            message: '服务开启失败',
                            type: 'error'
                        });
                    }
                    }
                )
            },

            closeSMTP() {
                let para = {action: 0};
                smtp(para).then(res =>{
                        if (res.data.flag == 1)
                        {
                            this.$notify({
                                title: '成功',
                                message: '服务关闭成功，我希望你知道你在做什么',
                                type: 'warning'
                            });
                        }
                        else
                        {
                            this.$notify({
                                title: '失败',
                                message: '服务关闭失败',
                                type: 'error'
                            });
                        }
                    }
                )
            },

            openPOP3() {
                let para = {action: 1};
                pop3(para).then(res =>{
                        if (res.data.flag == 1)
                        {
                            this.$notify({
                                title: '成功',
                                message: '服务开启成功',
                                type: 'success'
                            });
                        }
                        else
                        {
                            this.$notify({
                                title: '失败',
                                message: '服务开启失败',
                                type: 'error'
                            });
                        }
                    }
                )
            },

            closePOP3() {
                let para = {action: 0};
                pop3(para).then(res =>{
                        if (res.data.flag == 1)
                        {
                            this.$notify({
                                title: '成功',
                                message: '服务关闭成功，我希望你知道你在做什么',
                                type: 'warning'
                            });
                        }
                        else
                        {
                            this.$notify({
                                title: '失败',
                                message: '服务关闭失败',
                                type: 'error'
                            });
                        }
                    }
                )
            },

            openFilter() {
                let para = {action: 1};
                filter(para).then(res =>{
                        if (res.data.flag == 1)
                        {
                            this.$notify({
                                title: '成功',
                                message: '服务开启成功',
                                type: 'success'
                            });
                        }
                        else
                        {
                            this.$notify({
                                title: '失败',
                                message: '服务开启失败',
                                type: 'error'
                            });
                        }
                    }
                )
            },

            closeFilter() {
                let para = {action: 0};
                filter(para).then(res =>{
                        if (res.data.flag == 1)
                        {
                            this.$notify({
                                title: '成功',
                                message: '服务关闭成功，我希望你知道你在做什么',
                                type: 'warning'
                            });
                        }
                        else
                        {
                            this.$notify({
                                title: '失败',
                                message: '服务关闭失败',
                                type: 'error'
                            });
                        }
                    }
                )
            },
        }
    }
</script>

<style scoped>

</style>