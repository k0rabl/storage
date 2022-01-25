import classNames from "classnames";
import { FC } from "react";

interface IProps {
  label: string
  click: () => void
  classes: string[]
}

export const Button:FC<IProps> = ({label, click, classes}) => 
  <div onClick={click} className={classNames(classes)}>
    {label}
  </div>