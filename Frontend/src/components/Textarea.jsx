import React from "react";
const Textarea = ({ label, name, value, onChange, required = false, placeholder = "Type here", error }) => {
    return (
      <div className="flex flex-col">
        <label className="text-gray-700">{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`border px-3 py-2 rounded-md ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  };
  
  export default Textarea;
  