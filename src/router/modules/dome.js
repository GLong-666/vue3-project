export default {
    component: () => import('@/views/layout/default.vue'),
    children: [
        {
            path: '/dome',
            name: 'dome',
            component: () => import('@/views/dome/index.vue'),
            meta: { keepAlive: true, title: 'dome' }
        },
    ]
};
