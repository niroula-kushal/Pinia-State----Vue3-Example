import {createRouter, createWebHashHistory} from "vue-router";
import Users from "./Pages/Users.vue";
import RecoverUsers from "./Pages/RecoverUsers.vue";

const routes = [
    {path: '/', component: Users},
    {path: '/recover', component: RecoverUsers}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

export default router;