import React from "react";
const Input = ({ label, type, name, value, onChange, required = false, placeholder = "Enter ",error }) => {
    return (
        <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full p-2 border rounded ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };
  
  
  export default Input;
  