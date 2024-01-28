import config from "~/config";

import Home from '~/pages/Home';
import Service from '~/pages/Service';
import ServiceDetail from "~/pages/ServiceDetail";
import Product from '~/pages/Product';
import ProductDetail from '~/pages/ProductDetail';
import Collection from '~/pages/Collection';
import CollectionDetail from "~/pages/CollectionDetail";
import Train from '~/pages/Train';
import Contact from '~/pages/Contact';
import Cart from '~/pages/Cart';
import BuyProduct from '~/pages/BuyProduct';


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

import AdminProduct from '~/pagesAdmin/Manage/Product/List';
import AdminProductCreate from '~/pagesAdmin/Manage/Product/Create';
import AdminProductUpdate from '~/pagesAdmin/Manage/Product/Update';

import AdminCommentCollection from '~/pagesAdmin/Manage/Comment/Collection';
import AdminCommentCollectionDetail from '~/pagesAdmin/Manage/Comment/Collection/CollectionDetail';
import AdminCommentProduct from '~/pagesAdmin/Manage/Comment/Product';
import AdminCommentProductDetail from '~/pagesAdmin/Manage/Comment/Product/ProductDetail';
import AdminCommentService from '~/pagesAdmin/Manage/Comment/Service';
import AdminCommentServiceDetail from '~/pagesAdmin/Manage/Comment/Service/ServiceDetail';

import AdminOrderWait from '~/pagesAdmin/Manage/Order/Wait';
import AdminOrderProcessing from '~/pagesAdmin/Manage/Order/Processing';
import AdminOrderSuccesse from '~/pagesAdmin/Manage/Order/Successed';
import AdminOrderCancel from '~/pagesAdmin/Manage/Order/Cancel';

import AdminBannerTocviet from '~/pagesAdmin/Manage/Banner/TocViet';
import AdminBannerOther from '~/pagesAdmin/Manage/Banner/Other';

import AdminOpinionCustomer from '~/pagesAdmin/Manage/OpinionCustomer';


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
        path: config.routes.serviceDetail,
        component: ServiceDetail,
        isParams: true,
    },
    {
        path: config.routes.product,
        component: Product,
    },
    {
        path: config.routes.productDetail,
        component: ProductDetail,
        isParams: true,
    },
    {
        path: config.routes.buyProduct,
        component: BuyProduct,
        isParams: true,
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
    {
        path: config.routes.adminProduct,
        component: AdminProduct,
        login: true,
    },
    {
        path: config.routes.adminProductCreate,
        component: AdminProductCreate,
        login: true,
    },
    {
        path: config.routes.adminProductUpdate,
        component: AdminProductUpdate,
        login: true,
        addId: true,
    },
    {
        path: config.routes.adminCommentCollection,
        component: AdminCommentCollection,
        login: true,
    },
    {
        path: config.routes.adminCommentCollectionDetail,
        component: AdminCommentCollectionDetail,
        login: true,
        addId: true,
    },
    {
        path: config.routes.adminCommentProduct,
        component: AdminCommentProduct,
        login: true,
    },
    {
        path: config.routes.adminCommentProductDetail,
        component: AdminCommentProductDetail,
        login: true,
        addId: true,
    },
    {
        path: config.routes.adminCommentService,
        component: AdminCommentService,
        login: true,
    },
    {
        path: config.routes.adminCommentServiceDetail,
        component: AdminCommentServiceDetail,
        login: true,
        addId: true,
    },
    {
        path: config.routes.adminOrderWait,
        component: AdminOrderWait,
        login: true,
    },
    {
        path: config.routes.adminOrderProcessing,
        component: AdminOrderProcessing,
        login: true,
    },
    {
        path: config.routes.adminOrderSuccessed,
        component: AdminOrderSuccesse,
        login: true,
    },
    {
        path: config.routes.adminOrderCancel,
        component: AdminOrderCancel,
        login: true,
    },
    {
        path: config.routes.adminBannerTocViet,
        component: AdminBannerTocviet,
        login: true,
    },
    {
        path: config.routes.adminBannerOther,
        component: AdminBannerOther,
        login: true,
    },
    {
        path: config.routes.adminOpinionCustomer,
        component: AdminOpinionCustomer,
        login: true,
    },
];