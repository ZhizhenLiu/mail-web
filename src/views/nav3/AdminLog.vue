<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getDiaries">查询</el-button>
				</el-form-item>

			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="diaries" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="d_id" label="日志ID" width="270" sortable>
			</el-table-column>
			<el-table-column prop="d_executor" label="执行者" width="270"  sortable>
			</el-table-column>
			<el-table-column prop="d_execution" label="执行操作" width="270" sortable>
			</el-table-column>
			<el-table-column prop="d_time" label="执行时间" width="270" sortable>
			</el-table-column>
			<el-table-column prop="d_state" label="状态" min-width="180" :formatter="formatState" sortable>
			</el-table-column>
<!--			<el-table-column label="操作" width="150">-->
<!--				<template slot-scope="scope">-->
<!--					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
<!--				</template>-->
<!--			</el-table-column>-->
		</el-table>




	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import {getDiaries} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				diaries: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列


			}
		},
		methods: {
			//状态显示转换
			formatState: function (row, column) {
				return row.d_state == 1 ? '成功' : row.d_state == 0 ? '失败' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getDiaries();
			},
			//获取日志列表
			getDiaries() {
				let para = {
					// page: this.page,
					// name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getDiaries(para).then((res) => {
					// this.total = data.total;
					console.log(res)
					this.diaries = res.data.diaries;
					console.log(this.diaries);
					this.listLoading = false;
					//NProgress.done();
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			}
		},
		mounted() {
			this.getDiaries();
		}
	}

</script>

<style scoped>

</style>