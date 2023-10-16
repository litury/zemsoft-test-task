import {createRouter, createWebHistory} from 'vue-router'
import ContactsViews from "@/views/ContactsViews.vue";
import ContactFormViews from "@/views/ContactFormViews.vue";
import ContactDetailsViews from "@/views/ContactDetailsViews.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'ContactsViews',
            component: ContactsViews
        },

        {
            path: '/form',
            name: 'form',
            component: ContactFormViews
        },

        {
            path: '/contact/:id',
            name: 'contact',
            component: ContactDetailsViews
        }

    ]
})

export default router
