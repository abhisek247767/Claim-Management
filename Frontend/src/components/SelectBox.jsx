import React from "react";

const SelectBox = ({ label, name, value, onChange, options, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectBox;
