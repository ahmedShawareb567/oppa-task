import { FunctionComponent } from "react";
import "./appLoading.scss";

interface AppLoadingInterface {
  size?: string;
}

export const AppLoading: FunctionComponent<AppLoadingInterface> = ({
  size = "",
}) => {
  return (
    <div
      className={`appLoading d-flex align-items-center justify-content-center ${size}`}
    >
      <span></span>
    </div>
  );
};
