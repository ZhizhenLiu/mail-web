<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="u_name" label="用户名" width="200" sortable>
			</el-table-column>
			<el-table-column prop="u_id" label="用户ID" width="200"  sortable>
			</el-table-column>
			<el-table-column prop="u_email" label="邮箱" width="300" sortable>
			</el-table-column>
			<el-table-column prop="u_type" label="身份" width="200" sortable>
				<template slot-scope="scope">
					<el-tag :type="scope.row.u_type === 'user' ? 'primary' : 'success'"
							disable-transitions>{{scope.row.u_type}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="time" label="最后一次上线时间" width="220" sortable>
			</el-table-column>
<!--			<el-table-column prop="addr" label="地址" min-width="180" sortable>-->
<!--			</el-table-column>-->
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" width="40%" center>
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="用户名" prop="u_name">
					<el-input v-model="editForm.u_name" auto-complete="off"></el-input>
				</el-form-item>
<!--				<el-form-item label="身份">-->
<!--					<el-radio-group v-model="editForm.u_type">-->
<!--						<el-radio class="radio" :label="1">用户</el-radio>-->
<!--						<el-radio class="radio" :label="0">管理员</el-radio>-->
<!--					</el-radio-group>-->
<!--				</el-form-item>-->
				<el-form-item label="邮箱" prop="u_email">
					<el-input v-model="editForm.u_email" auto-complete="off" ></el-input>
					<!--					<el-input type="textarea" v-model="addForm.userMail"></el-input>-->
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false" width="40%" center>
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="ID" prop="u_id">
					<el-input v-model="addForm.u_id" auto-complete="off" ></el-input>
				</el-form-item>
				<el-form-item label="用户名" prop="u_name">
					<el-input v-model="addForm.u_name" auto-complete="off" ></el-input>
				</el-form-item>
				<el-form-item label="身份">
					<el-radio-group v-model="addForm.u_type">
						<el-radio class="radio" :label="1">用户</el-radio>
						<el-radio class="radio" :label="0">管理员</el-radio>
					</el-radio-group>
				</el-form-item>
<!--				<el-form-item label="年龄">-->
<!--					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>-->
<!--				</el-form-item>-->
				<el-form-item label="密码" prop="u_password">
					<el-input v-model="addForm.u_password" auto-complete="off" ></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="u_email">
					<el-input v-model="addForm.u_email" auto-complete="off" ></el-input>
<!--					<el-input type="textarea" v-model="addForm.userMail"></el-input>-->
				</el-form-item>

<!--				<el-form-item label="生日">-->
<!--					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>-->
<!--				</el-form-item>-->

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					u_name: [
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					// u_type: [
					// 	{ required: true, message: '请选择身份类型', trigger: 'blur' }
					// ],
					u_email: [
						{ required: true, message: '请输入用户邮箱', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					u_id: 1,
					u_name: '',
					u_email: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					u_id: [
						{ required: true, message: '请输入用户ID', trigger: 'blur' }
					],
					u_name: [
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					u_password: [
						{ required: true, message: '请输入用户密码', trigger: 'blur' }
					],
					u_email: [
						{ required: true, message: '请输入用户邮箱', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					u_id: '',
					u_name: '',
					u_password: '',
					u_email: '',
					u_type: '',
				}

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.u_type == 1 ? '用户' : row.u_type == 0 ? '管理员' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					// page: this.page,
					u_name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				console.log(para);
				getUserListPage(para).then((res) => {
					console.log(res);
					// this.total = res.data.total;
					this.users = res.data.users;
					console.log(res.data.users);
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { u_id: row.u_id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						if (res.data.flag == 1)
						{
							this.$message({
								message: '删除成功',
								type: 'success'
							});
						}
						else
						{
							this.$message({
								message: '删除失败',
								type: 'error'
							});
						}
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					u_id: '',
					u_name: '',
					u_password: '',
					u_email: '',
					u_type: 1
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
								this.editLoading = true;
								//NProgress.start();
								let para = Object.assign({}, this.editForm);
								console.log(para);
								// para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
								editUser(para).then((res) => {
									this.editLoading = false;
									//NProgress.done();
									this.$message({
										message: '提交成功',
										type: 'success'
									});
									this.$refs['editForm'].resetFields();
									this.editFormVisible = false;
									this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							console.log(para);
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								if (res.data.flag == 1)
								{
									this.$message({
										message: '提交成功',
										type: 'success'
									});
								}
								else
								{
									this.$message({
										message: '提交失败',
										type: 'warning'
									});
								}
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>