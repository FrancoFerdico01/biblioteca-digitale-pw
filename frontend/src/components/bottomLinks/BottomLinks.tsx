import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { BottomLinksProps } from "../../types/interface";
import "./bottomlinks.css";

const BottomLinks = ({
  route_1,
  route_2,
  route_3,
  route_4,
  icon_1,
  icon_2,
  icon_3,
  icon_4,
}: BottomLinksProps) => {
  const location = useLocation();
  const routes = [route_1, route_2, route_3, route_4];
  const currentRoute = `${location.pathname}${location.search}${location.hash}`;
  const getActiveIndex = () =>
    routes.findIndex((route) => route !== "" && route === currentRoute);
  const [activeIndex, setActiveIndex] = useState(getActiveIndex);

  const isPublicRoute = location.pathname === "/" || location.pathname === "/catalog";

  useEffect(() => {
    setActiveIndex(getActiveIndex());
  }, [currentRoute, route_1, route_2, route_3, route_4]);

  const getLinkClassName = (index: number) =>
    `bottomLinks-list-item-icon${activeIndex === index ? " is-active" : ""}`;

  return (
    <div className="bottomLinks">
      <ul className="bottomLinks-list">
        <li className="bottomLinks-list-item">
          <Link
            className={getLinkClassName(0)}
            to={route_1}
            onClick={() => setActiveIndex(0)}
          >
            {icon_1}
          </Link>
        </li>
        {isPublicRoute ? (
          <li className="bottomLinks-list-item">
            <a
              className={getLinkClassName(1)}
              href={route_2}
              onClick={() => setActiveIndex(1)}
            >
              {icon_2}
            </a>
          </li>
        ) : (
          <li className="bottomLinks-list-item">
            <Link
              className={getLinkClassName(1)}
              to={route_2}
              onClick={() => setActiveIndex(1)}
            >
              {icon_2}
            </Link>
          </li>
        )}
      
        <li className="bottomLinks-list-item">
          <Link
            className={getLinkClassName(2)}
            to={route_3}
            onClick={() => setActiveIndex(2)}
          >
            {icon_3}
          </Link>
        </li>  
          {isPublicRoute ? (
          <li className="bottomLinks-list-item">
            <a
              className={getLinkClassName(3)}
              href={route_4}
              onClick={() => setActiveIndex(3)}
            >
              {icon_4}
            </a>
          </li>
        ) : (
          <li className="bottomLinks-list-item">
            <Link
              className={getLinkClassName(3)}
              to={route_4}
              onClick={() => setActiveIndex(3)}
            >
              {icon_4}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default BottomLinks;
