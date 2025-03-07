import React from "react";
export function Button({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: "8px 12px",
                background: "#007bff",
                color: "white",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer"
            }}
        >
            {children}
        </button>
    );
}
