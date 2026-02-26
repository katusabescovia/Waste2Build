import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import axios from "axios";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Learn from "./pages/Learn";
import Auth from "./pages/Auth";
import SellerDashboard from "./pages/SellerDashboard";
import CreateListing from "./pages/CreateListing";
import Rewards from "./pages/Rewards";
import RecyclerPortal from "./pages/RecyclerPortal";
import ListingDetails from "./pages/ListingDetails";
import PickupConfirmation from "./pages/PickupConfirmation";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/auth" element={<Auth />} />

        {/* Seller */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/create-listing" element={<CreateListing />} />
        <Route path="/seller/rewards" element={<Rewards />} />

        {/* Recycler */}
        <Route path="/recycler/portal" element={<RecyclerPortal />} />

        {/* Shared */}
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/pickup/:pickupId" element={<PickupConfirmation />} />
      </Route>
    </Routes>
  );
}
