import clsx from "clsx";
import React from "react";

export const ProfileInput = ({
  value,
  onChange,
  label,
  required,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {label: string;}) => {
  return (
    <label className="text-sm font-medium text-gray-700 block mb-1">
      {label} {required && <span className="text-red-500">*</span>}
      <input
        value={value}
        onChange={onChange}
        required={required}
        className={clsx("input-style", className)}
        {...props}
      />
    </label>
  );
};
