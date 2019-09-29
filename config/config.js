export default {
    plugins: [
        ['umi-plugin-react', {
            dva: true,
            antd: true
        }]
    ],
    // 配置路由
    routes: [
        {
            path: "/",
            component: '../layouts',
            routes: [
                {
                  path: '/',
                  component: './Hi'
                },
                {
                    path: "/list",
                    component: './List'
                },
                {
                    path: '/show',
                    component: './Show'
                },
                {
                    path: '/user',
                    routes: [
                        {
                            path:'/user/add',
                            component: './user/UserAdd'
                        },
                        {
                            path: '/user/list',
                            component: './user/UserList'
                        }
                    ]
                }

            ]
        }
    ]
};