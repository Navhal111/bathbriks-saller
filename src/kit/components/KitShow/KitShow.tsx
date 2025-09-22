import { type ReactNode } from "react";

interface Props {
  show: boolean;
  children: ReactNode;
}

const KitShow = ({ show, children }: Props) => {
  return show ? <>{children}</> : null;
};

export default KitShow;

