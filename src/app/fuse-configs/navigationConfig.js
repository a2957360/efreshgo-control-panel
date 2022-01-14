import i18next from 'i18next';
import { exact } from 'prop-types';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

//localstorage user information

const navigationConfig = [
	{
		id: 'landing',
		title: 'E-freshgo后台管理系统',
		icon: 'home',
		type: 'item',
		url: '/landing'
	},
	{
		id: 'homepage',
		title: '首页管理',
		type: 'collapse',
		icon: 'menu',
		children: [
			{
				id: 'carousels',
				title: '轮播图管理',
				type: 'item',
				url: '/homepage/carousels',
				exact: true
			},
			{
				id: 'annoucements',
				title: '广播站管理',
				type: 'item',
				url: '/homepage/annoucements',
				exact: true
			},
			{
				id: 'transformer',
				title: '金刚区管理',
				type: 'item',
				url: '/homepage/transformers',
				exact: true
			},
			{
				id: 'doubleadvertisement',
				title: '双广告管理',
				type: 'item',
				url: '/homepage/doubleads',
				exact: true
			},
			{
				id: 'carouselproducts',
				title: '滚动商品展示区管理',
				type: 'item',
				url: '/homepage/carouselproducts',
				exact: true
			},
			{
				id: 'recipeadvertisement',
				title: '食谱广告管理',
				type: 'item',
				url: '/homepage/recipeadvertisements',
				exact: true
			},
			{
				id: 'sectionadvertisement',
				title: '单张广告管理',
				type: 'item',
				url: '/homepage/sectionadvertisements',
				exact: true
			},
			{
				id: 'gridproducts',
				title: '商品大区管理',
				type: 'item',
				url: '/homepage/gridproducts',
				exact: true
			}
		]
	},
	{
		id: 'branchpage',
		title: '门店管理',
		type: 'collapse',
		icon: 'menu',
		children: [
			{
				id: 'branches',
				title: '门店列表',
				type: 'item',
				url: '/branches',
				exact: true
			}
		]
	},
	{
		id: 'productpage',
		title: '商品管理',
		type: 'collapse',
		icon: 'menu',
		children: [
			{
				id: 'products',
				title: '商品列表',
				type: 'item',
				url: '/product/products',
				exact: true
			},
			{
				id: 'productmaincategory',
				title: '商品一级分类管理',
				type: 'item',
				url: '/product/maincategories',
				exact: true
			},
			{
				id: 'productsubcategory',
				title: '商品二级分类管理',
				type: 'item',
				url: '/product/subcategories',
				exact: true
			}
		]
	},
	{
		id: 'dailyreport',
		title: '销量查询',
		type: 'collapse',
		icon: 'menu',
		children: [
			{
				id: 'report_products',
				title: '产品销量报表',
				type: 'item',
				url: '/sales/salesreport',
				exact: true
			},
			{
				id: 'report_profit',
				title: '利润统计报表',
				type: 'item',
				url: '/sales/profitreport',
				exact: true
			},
		]
	},
	{
		id: 'recipepage',
		title: '菜谱管理',
		type: 'collapse',
		icon: 'menu',
		children: [
			{
				id: 'recipes',
				title: '菜谱列表',
				type: 'item',
				url: '/recipe/recipes', //query id for single recipe mgmt
				exact: true
			},
			{
				id: 'recipe-category',
				title: '菜谱分类管理',
				type: 'item',
				url: '/recipe/categories',
				exact: true
			}
		]
	},
	{
		id: 'orders',
		title: '订单管理',
		type: 'collapse',
		icon: 'toc',
		children: [
			{
				id: 'orders',
				title: '订单列表',
				type: 'item',
				url: '/order/orders',
				exact: true
			},
			{
				id: 'refunds',
				title: '退款申请',
				type: 'item',
				url: '/order/refunds',
				exact: true
			},
		]
	},
	{
		id: 'coupons',
		title: '优惠券管理',
		type: 'collapse',
		icon: 'toc',
		children: [
			{
				id: 'coupons',
				title: '所有优惠券',
				type: 'item',
				url: '/coupon/coupons',
				exact: true
			}
		]
	},
	{
		id: 'recommendations',
		title: '热搜词条管理',
		type: 'collapse',
		icon: 'toc',
		children: [
			{
				id: 'hotkeys',
				title: '热搜词条',
				type: 'item',
				url: '/recommendation/recommendations',
				exact: true
			}
		]
	},
	{
		id: 'users',
		title: '用户管理',
		type: 'collapse',
		icon: 'toc',
		children: [
			{
				id: 'customers',
				title: '普通用户',
				type: 'item',
				url: '/user/customers',
				exact: true
			},
			{
				id: 'managers',
				title: '门店管理员',
				type: 'item',
				url: '/user/managers',
				exact: true
			},
			{
				id: 'drivers',
				title: '骑手管理',
				type: 'item',
				url: '/user/drivers',
				exact: true
			}
		]
	},
	{
		id: 'others',
		title: '其他管理',
		icon: 'more_horiz',
		type: 'collapse',
		children: [
			// {
			// 	id: 'profit-config',
			// 	title: '利润参数设置',
			// 	type: 'item',
			// 	icon: 'attach_money',
			// 	url: '/profitconfig'
			// },
			{
				id: 'delivery-fee',
				title: '运费设置',
				type: 'item',
				icon: 'motorcycle',
				url: '/delivery-fee'
			},
			// {
			// 	id: 'terms-of-service',
			// 	title: '服务条款',
			// 	type: 'item',
			// 	icon: 'record_voice_over',
			// 	url: '/terms-of-service'
			// },
			{
				id: 'contact-us',
				title: '联系我们',
				type: 'item',
				icon: 'phone',
				url: '/contact-us'
			},
			// {
			// 	id: 'privacy-policy',
			// 	title: '隐私政策',
			// 	type: 'item',
			// 	icon: 'remove_red_eye',
			// 	url: '/privacy-policy'
			// }
		]
	},
	{
		id: 'logout',
		title: '登出',
		icon: 'logout',
		type: 'item',
		url: '/logout'
	}
];

export default navigationConfig;
