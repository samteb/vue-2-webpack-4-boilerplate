import AppHome from '@/components/AppHome';
const AppMedium = () => import('@/components/AppMedium');


const routes = [
    {
        path: '/',
        name: 'Home',
        component: AppHome
    },
    {
        path: '/medium',
        name: 'Medium',
        component: AppMedium
    }
];

export default routes;
