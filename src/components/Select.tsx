import React from 'react';

type DefaultSelectProps = JSX.IntrinsicElements["select"];

interface SelectProps extends DefaultSelectProps {
  options: {
    name: string;
    value: string;
  }[];
  title: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, title, ...props }, ref) => (
    <div>
      <label className="text-xs font-semibold text-gray-600">{title}</label>
      <div className="flex w-full border-gray-200 border-y md:border md:rounded-md hover:border-gray-400">
        <select
          ref={ref}
          className="w-full h-10 px-3 py-2 mr-2 bg-transparent focus:outline-none focus:border-pink-400"
          {...props}
        >
          <option disabled selected defaultValue={undefined}>
            Please Select
          </option>
          {options.map((option) => (
            <option
              className="bg-secondaryBg"
              key={option.value}
              value={option.value}
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
);
