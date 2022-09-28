import { FunctionComponent } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import "./appImage.scss";

interface AppImageInterface {
  src: string;
  alt?: string;
  ratio?: string;
  width?: string;
  height?: string;
  rest?: any;
}

export const AppImage: FunctionComponent<AppImageInterface> = ({
  src,
  alt,
  ratio = "is-1-1",
  width,
  height,
  ...rest
}) => {
  return (
    <>
      <div className={`appImage ${ratio}`} {...rest}>
        <LazyLoadImage
          alt={alt}
          height={height}
          src={src}
          width={width}
          effect="blur"
        />
      </div>
    </>
  );
};
