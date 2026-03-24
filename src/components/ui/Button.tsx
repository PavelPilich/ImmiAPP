import React from "react";
import { S } from "../../data/styles";

interface BtnProps {
  disabled?: boolean;
  onClick?: () => void;
  outline?: boolean;
  color?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function Btn({ disabled, onClick, outline, color, style, children }: BtnProps) {
  return (
    <button disabled={disabled} onClick={onClick} style={{
      ...(outline ? S.btnO : S.btn),
      opacity: disabled ? .5 : 1,
      ...(color ? { background: color } : {}),
      ...(style || {}),
    }}>{children}</button>
  );
}

export { Btn };
export default Btn;
