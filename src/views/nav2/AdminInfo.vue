<template>
	<div style="margin-top: 50px;margin-left: 50px">
		<el-card class="box-card" style="width: 50%">
			<div slot="header" class="clearfix">
				<div >
					<el-avatar shape="circle" size="60">
						<img src="https://i.loli.net/2020/04/30/Oh7Tw1mogkU3Iul.jpg" />
					</el-avatar>
				</div>
				<el-button style="float: right; padding: 3px 0" type="text">修改信息</el-button>
			</div>
			<div class="" style="margin-left: 50px">
				<el-collapse v-model="activeNames" @change="handleChange">
					<el-collapse-item title="身份" name="1" icon="el-icon-user" >
						<div>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{user.a_type}}</div>
					</el-collapse-item>
					<el-collapse-item title="ID" name="3">
						<div>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{user.a_no}}</div>
					</el-collapse-item>
					<el-collapse-item title="密码" name="2">
						<div>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{user.a_password}}</div>
					</el-collapse-item>
					<el-collapse-item title="宣言" name="4">
						<div>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp简化流程：设计简洁直观的操作流程；</div>
						<div>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
						<div>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
					</el-collapse-item>
				</el-collapse>
			</div>


		</el-card>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeNames: ['1','2','3','4'],
				user: {
					a_no: '',
					a_type: '',
					a_password: ''
				}
			};
		},
		methods: {
			getAdminInfo(){
				let storedUser = sessionStorage.getItem('user');
				console.log(1+storedUser);
				if (storedUser) {
					storedUser = JSON.parse(storedUser);
					this.user.a_no = storedUser.a_no || '';
					this.user.a_type = storedUser.a_type || '';
					this.user.a_password = storedUser.a_password || '';
					// this.sysUserAvatar = user.avatar || '';
				}
				console.log(this.user);
			}
		},
		mounted() {
			this.getAdminInfo();
		}
	};

</script>

<style scoped>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 480px;
	}
	img {
		width: 30%;
		height: 30%;
		border-radius: 600px;
		margin: 10px 0px 10px 10px;
	}

</style>