import Sprites from "../../sprites.svg";

import "./svgIcon.scss";

export const SvgIcon = ({ name, ...rest }: any) => {
  return (
    <span {...rest}>
      <svg className={`icon icon-${name}`} fill="currentColor">
        <use href={`${Sprites}#icon-${name}`} />
      </svg>
    </span>
  );
};
