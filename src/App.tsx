import "./App.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { HomePage } from "./pages/Home/Home";
import { PrivateRoute } from "./components/PrivateRoute";

import { authMe, SIGN_OUT } from "./store/reducers/auth";
import { RootState } from "./store";
import { useEffect } from "react";
import { AppLoading } from "./components/AppLoading/AppLoading";
import { RegisterPage } from "./pages/Register/Register";
import { LoginPage } from "./pages/Login/Login";
import { SvgIcon } from "./components/SvgIcon/SvgIcon";
import { MoviePage } from "./pages/Movie/Movie";
import { GenrePage } from "./pages/Genre/Genre";
import { WatchListPage } from "./pages/WatchList/WatchList";

const App = () => {
  const dispatch = useDispatch();
  const isLoading: boolean = useSelector(
    (state: RootState) => state.Auth.isLoading
  );
  const isLogged: boolean = useSelector(
    (state: RootState) => state.Auth.isLogged
  );

  useEffect(() => {
    dispatch(authMe());
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading && <AppLoading />}
      {!isLoading && (
        <div className="App-content">
          <Router basename="oppa-task">
            <div>
              {isLogged && (
                <div className="container pb-xl">
                  <div className="d-flex align-items-center justify-content-between mt-xl">
                    <Link to="/" className="p-2 text-danger homeLink">
                      <SvgIcon name="home" />
                    </Link>
                    <button
                      className="btn btn-primary"
                      onClick={() => dispatch(SIGN_OUT())}
                    >
                      SignOut <SvgIcon name="logout" className="ms-2" />
                    </button>
                  </div>
                </div>
              )}
              <Switch>
                <PrivateRoute exact path="/">
                  <HomePage />
                </PrivateRoute>
                <PrivateRoute path="/movie/:id">
                  <MoviePage />
                </PrivateRoute>
                <PrivateRoute path="/genre/:id">
                  <GenrePage />
                </PrivateRoute>
                <PrivateRoute path="/watchlist">
                  <WatchListPage />
                </PrivateRoute>
                <Route path="/register">
                  <RegisterPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      )}
      <div className="App-utils">
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
