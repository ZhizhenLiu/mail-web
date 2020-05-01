import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import Form from './views/nav1/Form.vue'
import Page5 from './views/nav2/AdminInfo.vue'
import SysLog from './views/nav3/SysLog.vue'
import AdminLog from './views/nav3/AdminLog.vue'
import UserLog from './views/nav3/UserLog.vue'
import ProtocolConfig from './views/nav4/ProtocolConfig.vue'
import User from "./views/nav2/User";

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-menu',
        leaf: true,//只有一个节点
        children: [
            {   path: '/Index',
                component: Index,
                name: '首页'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-loading',
        leaf: true,
        children: [
            // { path: '/user', component: user, name: '页面4' },
            { path: '/page5', component: Page5, name: '个人资料' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-view',//图标样式class
        leaf: true,//只有一个节点
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/User', component: User, name: '用户管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-setting',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/ProtocolConfig', component: ProtocolConfig, name: '服务控制' }
        ]
    },

    {
        path: '/',
        component: Home,
        name: '日志管理',
        iconCls: 'el-icon-menu',
        children: [
            { path: '/SysLog', component: SysLog, name: '系统日志' },
            { path: '/AdminLog', component: AdminLog, name: '管理员操作日志' },
            { path: '/UserLog', component: UserLog, name: '用户使用日志' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '权限管理',
        iconCls: 'el-icon-menu',
        children: [
            // { path: '/page4', component: Page4, name: '权限组管理' },
            // { path: '/Main', component: Main, name: '权限组权限管理' },
            { path: '/Form', component: Form, name: '权限组人员管理' }
        ]
    },

    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;