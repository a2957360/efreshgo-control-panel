import React from 'react';
import { authRoles } from 'app/auth';
// import { Redirect } from 'react-router-dom';

const MainConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.admin, //authRoles.onlyGuest, //
	routes: [
		//欢迎页面
		{
			path: '/landing',
			component: React.lazy(() => import('./Landing/Landing'))
		},

		//首页
		//轮播图
		{
			path: '/homepage/carousel/:id',
			component: React.lazy(() => import('./Carousel/Carousel'))
		},
		{
			path: '/homepage/carousels',
			component: React.lazy(() => import('./Carousels/Carousels'))
		},
		//广播站
		{
			path: '/homepage/annoucement/:id',
			component: React.lazy(() => import('./Announcement/Announcement'))
		},
		{
			path: '/homepage/annoucements',
			component: React.lazy(() => import('./Announcements/Announcements'))
		},
		//金刚区
		{
			path: '/homepage/transformer/:id',
			component: React.lazy(() => import('./Transformer/Transformer'))
		},
		{
			path: '/homepage/transformers',
			component: React.lazy(() => import('./Transformers/Transformers'))
		},
		//广告区
		{
			path: '/homepage/doublead/:id',
			component: React.lazy(() => import('./DoubleAd/DoubleAd'))
		},
		{
			path: '/homepage/doubleads',
			component: React.lazy(() => import('./DoubleAds/DoubleAds'))
		},
		//商品滚动区
		{
			path: '/homepage/rollingproduct/:id',
			component: React.lazy(() => import('./CarouselProduct/CarouselProduct'))
		},
		{
			path: '/homepage/carouselproducts',
			component: React.lazy(() => import('./CarouselProducts/CarouselProducts'))
		},
		//食谱广告
		{
			path: '/homepage/recipeadvertisement/:id',
			component: React.lazy(() => import('./RecipeAd/RecipeAd'))
		},
		{
			path: '/homepage/recipeadvertisements',
			component: React.lazy(() => import('./RecipeAds/RecipeAds'))
		},
		//单张广告
		{
			path: '/homepage/sectionadvertisement/:id',
			component: React.lazy(() => import('./SectionAd/SectionAd'))
		},
		{
			path: '/homepage/sectionadvertisements',
			component: React.lazy(() => import('./SectionAds/SectionAds'))
		},
		//产品大区
		{
			path: '/homepage/gridproduct/:id',
			component: React.lazy(() => import('./GridProduct/GridProduct'))
		},
		{
			path: '/homepage/gridproducts',
			component: React.lazy(() => import('./GridProducts/GridProducts'))
		},

		// 门店
		{
			path: '/branches',
			component: React.lazy(() => import('./Branches/Branches'))
		},
		{
			path: '/branch/branch/:storeNumber',
			component: React.lazy(() => import('./Branch/Branch'))
		},

		// 商品
		{
			path: '/product/products',
			component: React.lazy(() => import('./Products/Products'))
		},
		{
			path: '/product/product/:itemNumber',
			component: React.lazy(() => import('./Product/Product'))
		},

		//商品一级分类
		{
			path: '/product/maincategories',
			component: React.lazy(() => import('./ProductCategories/ProductMainCategories'))
		},
		{
			path: '/product/maincategory/:categoryNumber',
			component: React.lazy(() => import('./ProductCategory/ProductMainCategory'))
		},
		//商品二级分类
		{
			path: '/product/subcategories',
			component: React.lazy(() => import('./ProductSubCategories/ProductSubCategories'))
		},
		{
			path: '/product/subcategory/:categoryNumber',
			component: React.lazy(() => import('./ProductSubCategory/ProductSubCategory'))
		},

		//菜谱分类
		{
			path: '/recipe/categories',
			component: React.lazy(() => import('./RecipeCategories/RecipeCategories'))
		},
		{
			path: '/recipe/category/:categoryNumber',
			component: React.lazy(() => import('./RecipeCategory/RecipeCategory'))
		},

		//菜谱
		{
			path: '/recipe/recipes',
			component: React.lazy(() => import('./Recipes/Recipes'))
		},
		{
			path: '/recipe/recipe/:cookbookNumber',
			component: React.lazy(() => import('./Recipe/Recipe'))
		},

		//库存
		// {
		// 	path: '/stock/stocks',
		// 	component: React.lazy(() => import('./Stocks/Stocks'))
		// },
		// {
		// 	path: '/stock/stock',
		// 	component: React.lazy(() => import('./Stock/Stock'))
		// },

		// 报表
		{
			path: '/sales/salesreport',
			exact: true,
			component: React.lazy(() => import('./DailySalesReport/ReportType'))
		},
		{
			path: '/sales/salesreport/daily-report',
			component: React.lazy(() => import('./DailySalesReport/DailySalesReport'))
		},
		{
			path: '/sales/salesreport/monthly-report',
			component: React.lazy(() => import('./DailySalesReport/MonthlySalesReport'))
		},
		{
			path: '/sales/salesreport/yearly-report',
			component: React.lazy(() => import('./DailySalesReport/YearlySalesReport'))
		},
		{
			path: '/sales/profitreport',
			component: React.lazy(() => import('./ProfitReport/ProfitReport'))
		},

		//订单
		{
			path: '/order/order/:orderNumber',
			component: React.lazy(() => import('./Order/Order'))
		},
		{
			path: '/order/orders',
			component: React.lazy(() => import('./Orders/Orders'))
		},
		//退款
		{
			path: '/order/refund/:orderNumber',
			component: React.lazy(() => import('./Refund/Refund'))
		},
		{
			path: '/order/refunds',
			component: React.lazy(() => import('./Refunds/Refunds'))
		},

		//优惠券
		{
			path: '/coupon/coupons',
			component: React.lazy(() => import('./Coupons/Coupons'))
		},
		{
			path: '/coupon/coupon/:couponNumber',
			component: React.lazy(() => import('./Coupon/Coupon'))
		},

		//热搜
		{
			path: '/recommendation/recommendation/:id',
			component: React.lazy(() => import('./Recommendation/Recommendation'))
		},
		{
			path: '/recommendation/recommendations',
			component: React.lazy(() => import('./Recommendations/Recommendations'))
		},

		//普通用户管理
		{
			path: '/user/customer/:userNumber',
			component: React.lazy(() => import('./Customer/Customer'))
		},
		{
			path: '/user/customers',
			component: React.lazy(() => import('./Customers/Customers'))
		},
		//门店管理员用户
		{
			path: '/user/manager/:userNumber',
			component: React.lazy(() => import('./Manager/Manager'))
		},
		{
			path: '/user/managers',
			component: React.lazy(() => import('./Managers/Managers'))
		},
		//骑手
		{
			path: '/user/driver/:userNumber',
			component: React.lazy(() => import('./Driver/Driver'))
		},
		{
			path: '/user/drivers',
			component: React.lazy(() => import('./Drivers/Drivers'))
		},

		//其他管理
		// {
		// 	path: '/profitconfig',
		// 	component: React.lazy(() => import('./ProfitConfig/ProfitConfig'))
		// },
		{
			path: '/delivery-fee',
			component: React.lazy(() => import('./DeliveryFee/DeliveryFee'))
		},
		// {
		// 	path: '/terms-of-service',
		// 	component: React.lazy(() => import('./Terms/Terms'))
		// },
		// {
		// 	path: '/privacy-policy',
		// 	component: React.lazy(() => import('./Privacy/Privacy'))
		// },
		{
			path: '/contact-us',
			component: React.lazy(() => import('./ContactUs/ContactUs'))
		}

		// {
		// 	path: '/order/order/:orderNumber',
		// 	component: React.lazy(() => import('./Stock/Stock'))
		// }

		// {
		// 	path: '/productpage/subcategory',
		// 	component: React.lazy(() => import('./ProductCategories/ProductCategories'))
		// },

		// {
		// 	path: '/recipepage/recipes',
		// 	component: React.lazy(() => import('./Recipes/Recipes'))
		// },
		// {
		// 	path: '/recipepage/recipecategory',
		// 	component: React.lazy(() => import('./RecipeCategory/RecipeCategory'))
		// },
		// {
		// 	path: '/homepage/homePageSection/:_id',
		// 	component: React.lazy(() => import('./homePageSection/HomePageSection'))
		// },
		// {
		// 	path: '/homepage/brand-images',
		// 	component: React.lazy(() => import('./brandImages/BrandImages'))
		// },
		// {
		// 	path: '/homepage/brand-image/:_id',
		// 	component: React.lazy(() => import('./brandImage/BrandImage'))
		// },
		// {
		// 	path: '/homepage/bottom-categories',
		// 	component: React.lazy(() => import('./bottomCategories/BottomCategories'))
		// },
		// {
		// 	path: '/homepage/bottom-category/:_id',
		// 	component: React.lazy(() => import('./bottomCategory/BottomCategory'))
		// },
		// {
		// 	path: '/homepage/carousels',
		// 	component: React.lazy(() => import('./carousels/Carousels'))
		// },
		// {
		// 	path: '/homepage/carousel/:_id',
		// 	component: React.lazy(() => import('./carousel/Carousel'))
		// },
		// {
		// 	path: '/categories/recipes',
		// 	component: React.lazy(() => import('./recipeCategories/RecipeCategories'))
		// },
		// {
		// 	path: '/categories/recipe/:_id',
		// 	component: React.lazy(() => import('./recipeCategory/RecipeCategory'))
		// },
		// {
		// 	path: '/categories/products',
		// 	component: React.lazy(() => import('./productCategories/ProductCategories'))
		// },
		// {
		// 	path: '/categories/product/:_id',
		// 	component: React.lazy(() => import('./productCategory/ProductCategory'))
		// },
		// {
		// 	path: '/products',
		// 	component: React.lazy(() => import('./products/Products'))
		// },
		// {
		// 	path: '/product/:_id',
		// 	component: React.lazy(() => import('./product/Product'))
		// },
		// {
		// 	path: '/advertisements',
		// 	component: React.lazy(() => import('./advertisements/Advertisements'))
		// },
		// {
		// 	path: '/advertisement/:_id',
		// 	component: React.lazy(() => import('./advertisement/Advertisement'))
		// },
		// {
		// 	path: '/recipes',
		// 	component: React.lazy(() => import('./recipes/Recipes'))
		// },
		// {
		// 	path: '/recipe/:_id',
		// 	component: React.lazy(() => import('./recipe/Recipe'))
		// },
		// {
		// 	path: '/orders',
		// 	component: React.lazy(() => import('./orders/Orders'))
		// },
		// {
		// 	path: '/order/:_id',
		// 	component: React.lazy(() => import('./order/Order'))
		// },
		// {
		// 	path: '/shippingMissions',
		// 	component: React.lazy(() => import('./shippingMissions/ShippingMissions'))
		// },
		// {
		// 	path: '/shippingMission/:_id',
		// 	component: React.lazy(() => import('./shippingMission/ShippingMission'))
		// },
		// {
		// 	path: '/promote-codes',
		// 	component: React.lazy(() => import('./promoteCodes/PromoteCodes'))
		// },
		// {
		// 	path: '/promote-code/:_id',
		// 	component: React.lazy(() => import('./promoteCode/PromoteCode'))
		// },
		// {
		// 	path: '/terms-of-service',
		// 	component: React.lazy(() => import('./other/TermsOfService'))
		// },
		// {
		// 	path: '/contact-us',
		// 	component: React.lazy(() => import('./other/ContactUs'))
		// },
		// {
		// 	path: '/privacy-policy',
		// 	component: React.lazy(() => import('./other/PrivacyPolicy'))
		// },
		// {
		// 	path: '/shipments/settings',
		// 	component: React.lazy(() => import('./shipmentSettings/ShipmentSettings'))
		// },
		// {
		// 	path: '/shipments/setting/:_id',
		// 	component: React.lazy(() => import('./shipmentSetting/ShipmentSetting'))
		// },
		// {
		// 	path: '/shipments',
		// 	component: React.lazy(() => import('./shipments/Shipments'))
		// },
		// {
		// 	path: '/shipment/:_id',
		// 	component: React.lazy(() => import('./shipment/Shipment'))
		// }
	]
};

export default MainConfig;
