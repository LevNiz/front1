import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "../components";
import { Home, Tracking, Warehouses } from "../pages";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="warehouses" element={<Warehouses />} />
        </Route>
    )
)