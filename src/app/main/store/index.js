import { combineReducers } from '@reduxjs/toolkit';

import carousel from './carouselSlice';
import carousels from './carouselsSlice';
import productMainCategory from '../store/ProductCategoryStore/productMainCategorySlice';
import productMainCategories from '../store/ProductCategoryStore/productMainCategoriesSlice';
import productSubCategory from '../store/ProductCategoryStore/productSubCategorySlice';
import productSubCategories from '../store/ProductCategoryStore/productSubCategoriesSlice';
import product from '../store/ProductStore/ProductSlice';
import products from '../store/ProductStore/ProductsSlice';
import recipeCategory from '../store/RecipeCateoryStore/RecipeCategorySlice';
import recipeCategories from '../store/RecipeCateoryStore/RecipeCategoriesSlice';
import recipe from '../store/RecipeStore/RecipeSlice'
import recipes from '../store/RecipeStore/RecipesSlice'
// import privacy from './privacySlice';
// import terms from './termsSlice';
// import contactUs from './contactUsSlice';
// import shipment from './shipmentSlice';
// import shipments from './shipmentsSlice';
// import shipmentSettings from './shipmentSettingsSlice';
// import shipmentSetting from './shipmentSettingSlice';
// import promoteCodes from './promoteCodesSlice';
// import promoteCode from './promoteCodeSlice';
// import products from './productsSlice';
// import product from './productSlice';
// import recipeCategories from './recipeCategoriesSlice';
// import recipeCategory from './recipeCategorySlice';
// import recipes from './recipesSlice';
// import recipe from './recipeSlice';
// import bottomCategories from './bottomCategoriesSlice';
// import bottomCategory from './bottomCategorySlice';
// import productCategories from './productCategoriesSlice';
// import productCategory from './productCategorySlice';
// import advertisement from './advertisementSlice';
// import advertisements from './advertisementsSlice';
// import brandImage from './brandImageSlice';
// import brandImages from './brandImagesSlice';
// import order from './orderSlice';
// import orders from './ordersSlice';
// import shippingMission from './shippingMissionSlice';
// import shippingMissions from './shippingMissionsSlice';
// import featuredCategories from './featuredCategoriesSlice';
// import featuredCategory from './featuredCategorySlice';
// import homePageSection from './homePageSectionSlice';
// import homePageSections from './homePageSectionsSlice';

const reducer = combineReducers({
	carousel,
	carousels,
	productMainCategory,
	productMainCategories,
	productSubCategory,
	productSubCategories,
	product,
	products,
	recipeCategory,
	recipeCategories,
	recipe,
	recipes,

	// order,
	// orders,
	// shippingMission,
	// shippingMissions,
	// recipes,
	// recipe,
	// advertisement,
	// advertisements,
	// brandImage,
	// brandImages,
	// bottomCategories,
	// bottomCategory,
	// featuredCategories,
	// featuredCategory,
	// productCategories,
	// productCategory,
	// recipeCategories,
	// recipeCategory,
	// products,
	// product,
	// promoteCodes,
	// promoteCode,
	// privacy,
	// terms,
	// contactUs,
	// shipment,
	// shipments,
	// shipmentSettings,
	// shipmentSetting,
	// homePageSection,
	// homePageSections
});

export default reducer;
