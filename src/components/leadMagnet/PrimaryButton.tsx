"use client";

import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center rounded-lg bg-[#EA3D2A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA3D2A]/90 focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-2 transition-colors";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
};
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
};

export function PrimaryButton(props: ButtonProps | AnchorProps) {
  if (props.as === "a") {
    const { as: _a, ...rest } = props;
    return <a className={base} {...rest} />;
  }
  const { as: _a, ...rest } = props;
  return <button type="button" className={base} {...rest} />;
}
