import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const PrivateRoute = ({ children, ...rest }: any) => {
  const isLogged = useSelector((state: RootState) => state?.Auth?.isLogged);

  return (
    <>
      {isLogged ? (
        <Route {...rest}>{children}</Route>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};
