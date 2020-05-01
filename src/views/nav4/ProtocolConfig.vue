<template xmlns:el-form-item="http://www.w3.org/1999/html">
    <div style="margin-left: 50px">
        <el-form label-position="top" label-width="200px">
            <el-form-item>
                <el-col></el-col>
            </el-form-item >
            <el-form-item label="SMTP服务">
                <el-button type="primary" icon="el-icon-setting" @click="open1">
                    开启
                </el-button>
                <el-button type="info" icon="el-icon-warning"  @click="open2">
                    关闭
                </el-button>
            </el-form-item>
            <el-form-item label="POP3服务">
                <el-button type="primary" icon="el-icon-setting" @click="open1">
                    开启
                </el-button>
                <el-button type="info" icon="el-icon-warning"  @click="open2">
                    关闭
                </el-button>
            </el-form-item>
            <el-form-item label="邮件过滤">
                <el-button type="primary" icon="el-icon-setting" @click="open1">
                    开启
                </el-button>
                <el-button type="info" icon="el-icon-warning"  @click="open2">
                    关闭
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "integral-config",
        data() {
            return {
                num1: 1
            }
        },
        methods: {
            open1() {
                this.$notify({
                    title: '成功',
                    message: '服务开启成功',
                    type: 'success'
                });
            },

            open2() {
                this.$notify({
                    title: '警告',
                    message: '服务关闭，我希望你知道你在做什么',
                    type: 'warning'
                });
            }
        }
    }
</script>

<style scoped>

</style>