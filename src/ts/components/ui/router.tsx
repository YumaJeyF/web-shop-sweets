import { createBrowserRouter } from 'react-router-dom';

import Main from '../screens/main/Main';
import News from "../screens/News/News";
import NewsPage from "../screens/news-page/NewsPage";
import Catalog from "../screens/catalog/Catalog";
import PageSet from "../screens/page-set/PageSet";
import Cart from "../screens/cart/Cart";
import FreshnessGuarantee from "../screens/freshness-guarantee/FreshnessGuarantee";
import DeliveryAndPayment from "../screens/delivery-and-payment/DeliveryAndPayment";
import Contacts from "../screens/contacts/Contacts";
import DessertCatalog from "../screens/dessert-catalog/DessertCatalog";
import CorporateGifts from "../screens/corporate-gifts/CorporateGifts";
import MacaroniCatalog from "../screens/macaroni-catalog/MacaroniCatalog";
import TubesCatalog from "../screens/tubes-catalog/TubesCatalog";
import EclairsCatalog from "../screens/eclairs-catalog/EclairsCatalog";
import ProfiterolesCatalog from "../screens/profiteroles-catalog/ProfiterolesCatalog";
import WholesaleSupplies from "../screens/wholesale-supplies/WholesaleSupplies";
import WeddingProposal from "../screens/wedding-proposal/WeddingProposal";
import WithoutPrinting from '../screens/assemble-sets/without-printing/WithoutPrinting';
import WithPrinting from "../screens/assemble-sets/with-printing/WithPrinting";
import PrivacyPolicy from '../screens/privacy-policy/PrivacyPolicy';
import NotFound from '../screens/not-found/NotFound';
import Estimation from '../screens/estimation/Estimation';
import ProbabilityToRecommend from "../screens/probability-to-recommend/ProbabilityToRecommend";

export const router = createBrowserRouter([
    { path: '/', Component: Main },
    { path: '/news', Component: News },
    { path: '/news/:id', Component: NewsPage },
    { path: '/complete-sets', Component: Catalog },
    { path: '/complete-sets/:id', Component: PageSet },
    { path: '/main/cart', Component: Cart },
    { path: '/freshness-guarantee', Component: FreshnessGuarantee },
    { path: '/delivery-and-payment', Component: DeliveryAndPayment },
    { path: '/contacts', Component: Contacts },
    { path: '/dessert-catalog', Component: DessertCatalog },
    { path: '/corporate-gifts', Component: CorporateGifts },
    { path: '/macaroni-catalog', Component: MacaroniCatalog },
    { path: '/tubes-catalog', Component: TubesCatalog },
    { path: '/eclairs-catalog', Component: EclairsCatalog },
    { path: '/profiteroles-catalog', Component: ProfiterolesCatalog },
    { path: 'wholesale-supplies', Component: WholesaleSupplies },
    { path: '/wedding-proposal', Component: WeddingProposal },
    { path: '/assemble-sets', Component: WithoutPrinting },
    { path: '/assemble-sets-with-printing', Component: WithPrinting },
    { path: '/privacy-policy', Component: PrivacyPolicy },
    { path: '/estimation', Component: Estimation },
    { path: '/probability-to-recommend', Component: ProbabilityToRecommend },
    { path: '*', Component:  NotFound }
])