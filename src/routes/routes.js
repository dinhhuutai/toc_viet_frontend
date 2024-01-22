import config from "~/config";

import Home from '~/pages/Home';
import Service from '~/pages/Service';
import Product from '~/pages/Product';
import Collection from '~/pages/Collection';
import CollectionDetail from "~/pages/CollectionDetail";
import Train from '~/pages/Train';
import Contact from '~/pages/Contact';
import Cart from '~/pages/Cart';


import AdminAnalytics from "~/pagesAdmin/Menu/Dashboards/Analytics";
import AdminChartArea from "~/pagesAdmin/Menu/Dashboards/ChartArea";
import AdminExplore from '~/pagesAdmin/Menu/Pages/Explore';
import AdminHub from '~/pagesAdmin/Menu/Pages/Hub';
import AdminMailBox from '~/pagesAdmin/Menu/Applications/Mailbox';
import AdminChat from '~/pagesAdmin/Menu/Applications/Chat';
import AdminSection from '~/pagesAdmin/Menu/Applications/FAQSection';


import AdminCollection from '~/pagesAdmin/Manage/Collection/List';
import AdminCollectionCreate from '~/pagesAdmin/Manage/Collection/Create';
import AdminCollectionUpdate from '~/pagesAdmin/Manage/Collection/Update';


import AdminService from '~/pagesAdmin/Manage/Service/List';
import AdminServiceCreate from '~/pagesAdmin/Manage/Service/Create';
import AdminServiceUpdate from '~/pagesAdmin/Manage/Service/Update';

import AdminIntroduce from "~/pagesAdmin/Manage/Introduce";
import AdminPriceTable from "~/pagesAdmin/Manage/PriceTable";
import AdminTrain from "~/pagesAdmin/Manage/Train";
import Login from "~/pagesAdmin/Login";


export const routes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.service,
        component: Service,
    },
    {
        path: config.routes.product,
        component: Product,
    },
    {
        path: config.routes.collection,
        component: Collection,
    },
    {
        path: config.routes.collectionDetail,
        component: CollectionDetail,
        isParams: true,
    },
    {
        path: config.routes.train,
        component: Train,
    },
    {
        path: config.routes.contact,
        component: Contact,
    },
    {
        path: config.routes.cart,
        component: Cart,
    },
    {
        path: config.routes.login,
        component: Login,
        login: false,
        isLogin: true,
    },
];


export const routesAdmin = [
    {
        path: config.routes.adminAnalytics,
        component: AdminAnalytics,
        login: true,
    },
    {
        path: config.routes.adminChartArea,
        component: AdminChartArea,
        login: true,
    },
    {
        path: config.routes.adminExplore,
        component: AdminExplore,
        login: true,
    },
    {
        path: config.routes.adminHub,
        component: AdminHub,
        login: true,
    },
    {
        path: config.routes.adminMailBox,
        component: AdminMailBox,
        login: true,
    },
    {
        path: config.routes.adminChat,
        component: AdminChat,
        login: true,
    },
    {
        path: config.routes.adminSection,
        component: AdminSection,
        login: true,
    },
    {
        path: config.routes.adminCollection,
        component: AdminCollection,
        login: true,
    },
    {
        path: config.routes.adminCollectionCreate,
        component: AdminCollectionCreate,
        login: true,
    },
    {
        path: config.routes.adminCollectionUpdate,
        component: AdminCollectionUpdate,
        login: true,
        addId: true,
    },
    {
        path: config.routes.adminService,
        component: AdminService,
        login: true,
    },
    {
        path: config.routes.adminServiceCreate,
        component: AdminServiceCreate,
        login: true,
    },
    {
        path: config.routes.adminServiceUpdate,
        component: AdminServiceUpdate,
        login: true,
        addId: true,
    },
    {
        path: config.routes.adminIntroduce,
        component: AdminIntroduce,
        login: true,
    },
    {
        path: config.routes.adminPriceTable,
        component: AdminPriceTable,
        login: true,
    },
    {
        path: config.routes.adminTrain,
        component: AdminTrain,
        login: true,
    },
];