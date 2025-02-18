import React from 'react'

const Spinner = () => {
    return (
        <span className="relative inline-block w-12 h-12">
            <span className="w-12 h-12 border-4 border-t-transparent border-l-transparent border-[#2dd4bf] rounded-full inline-block animate-spin"></span>

            <span className="absolute inset-0 m-auto w-10 h-10 border-4 border-transparent border-b-[#2dd4bf] border-r-[#2dd4bf] rounded-full"
                  style={{
                      animation: "spin-reverse 0.5s linear infinite",
                  }}
            ></span>

            <span className="absolute inset-0 m-auto w-8 h-8 border-4 border-t-transparent border-l-transparent border-[#2dd4bf] rounded-full"
                  style={{
                      animation: "spin 1.5s linear infinite",
                  }}
            ></span>

            <style>
        {`
          @keyframes spin-reverse {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
        `}
      </style>
    </span>
    );
}
export default Spinner
