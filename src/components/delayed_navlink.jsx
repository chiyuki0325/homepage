/* eslint-disable react/prop-types */

import {NavLink, useNavigate} from "react-router-dom"
import {useEffect, useRef} from "react"

export default function DelayedNavLink({replace, state, to, ...props}) {
  const navigate = useNavigate();
  const timerRef = useRef();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const clickHandler = (e) => {
    props.onClick?.(e);
    e.preventDefault();
    timerRef.current = setTimeout(navigate, 100, to, {replace, state});
  };

  return <NavLink to={to} {...props} onClick={clickHandler}/>;
}