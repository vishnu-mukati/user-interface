import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Header from "./components/layout/Header";
import AuthForm from "./components/auth/AuthForm";
import ChangePassword from "./components/page/ChangePassword";
import Dashboard from "./components/page/Dashboard";
import UserProfile from "./components/user/UserProfile";
import Cart from "./components/cart/Cart";
import Footer from "./components/layout/Footer";
import RecipeDetail from "./components/page/RecipeDetail";
import OrderStatus from "./components/cart/OrderStatus";
import CategoriesDetail from "./components/page/CategoriesDetails";

import "./App.css";

function App() {

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  return (
    <div className="app-container">
      <BrowserRouter>
        {isAuth && <Header />}
        <Switch>
          {!isAuth && (<Route path="/" exact component={AuthForm} />)}
          <Route path="/changepassword" component={ChangePassword} />
          {isAuth && (
            <>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/profile" component={UserProfile} />
              <Route path="/cart" component={Cart} />
              <Redirect from="/" to="/dashboard" />
              <Route path="/category/:categoryName" component={CategoriesDetail} />
              <Route path="/recipe/:id" component={RecipeDetail} />
              <Route path="/orders" component={OrderStatus} />
            </>
          )}
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
