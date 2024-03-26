import React from "react";

const variants = {
  primary:
    "bg-primary text-white transition-all hover:brightness-110 active:brightness-90 active:scale-[0.97] ",
};
const sizes = {
  md: "rounded-md px-2 py-1",
};

type Button = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = "primary",
  size = "md",
  children,
  ...props
}: Button) => {
  return (
    <button
      className={`${variants[variant]} ${sizes[size]} ${props.className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
