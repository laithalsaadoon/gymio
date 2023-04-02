import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { ROUTES } from "./constants/routes";



export default function MyRoutes() {
    return (
        <BrowserRouter forceRefresh={true}>
            <Routes>
                <Route exact path={ROUTES.workouts.path} element={<NotFound />} />
                <Route exact path={ROUTES.profiles.path} element={<NotFound />} />
                <Route exact path={ROUTES.main.path} element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}