import React, { useState } from "react";

interface Props {
  label: string | undefined;
  options: {
    label: string;
    value: string;
  }[];
  name: string;
  selectedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  label,
  options,
  name,
  selectedValue,
  handleChange,
}: Props) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-200"
        >
          {label}
        </label>
      )}
      <select
        name={name}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-emerald-600 sm:text-sm sm:leading-6"
        value={selectedValue}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
