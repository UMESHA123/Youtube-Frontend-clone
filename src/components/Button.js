import React from 'react'
import { classNames } from '../utils'
const Button = ({
  fullWidth,
  severity = "primary",
  size = "base",
  ...props
}) => {
  return (
    <>
      <button
        {...props}
        className={classNames(
          "mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto",
          fullWidth ? "w-full" : "",
          severity === "secondary"
            ? "bg-secondary hover:bg-secondary/80 disabled:bg-secondary/50 outline outline-[1px] outline-zinc-400"
            : severity === "danger"
            ? "bg-danger hover:bg-danger/80 disabled:bg-danger/50"
            : "bg-primary hover:bg-primary/80 disabled:bg-primary/50",
          size === "small" ? "text-sm px-3 py-1.5" : "text-base px-4 py-3",
          props.className || ""
        )}
      >
        {props.children}
      </button>
    </>
  )
}

export default Button