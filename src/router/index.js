import { createRouter, createWebHistory } from 'vue-router';

// 引入router配置文件
const modules = import.meta.globEager('./modules/*.js');

// 处理router配置文件
export const router_arr = Object?.keys(modules)?.map(i => modules[i].default);

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),

    routes: [
        {
            path: '',
            redirect: '/home'
        },

        ...router_arr,

        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/other/404/index.vue'),
            meta: { keepAlive: false, title: '404' }
        }
    ]
});

router.beforeEach((to, from, next) => {
    // 设置title
    document.title = to?.meta?.title || '';

    next()
});

router.afterEach(() => {

});

export default router;
