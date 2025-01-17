import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <svg
        className="h-40 w-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        {/* <!-- Define Gradient --> */}
        <defs>
          <linearGradient id="v-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6a00" />
            <stop offset="50%" stopColor="#ff006e" />
            <stop offset="100%" stopColor="#8338ec" />
          </linearGradient>
        </defs>

        {/* <!-- "V" Path --> */}
        <path
          d="M20 20 L50 80 L80 20"
          fill="none"
          stroke="url(#v-gradient)"
          strokeWidth="8" 
          strokeLinecap="round"
          strokeDasharray="120"
          strokeDashoffset="120"
          className="animate-draw-and-erase"
        />

        {/* <!-- Outline --> */}
        <path
          d="M20 20 L50 80 L80 20"
          fill="none"
          stroke="#00f5d4" 
          strokeWidth="12" 
          strokeLinecap="round"
          opacity="0.3" 
        />
      </svg>

      {/* <!-- Style for Custom Animation --> */}
      <style>
        {`
          @keyframes draw-and-erase {
            0% {
              stroke-dashoffset: 120; /* Fully hidden */
            }
            50% {
              stroke-dashoffset: 0; /* Fully drawn */
            }
            100% {
              stroke-dashoffset: 120; /* Erased */
            }
          }
          .animate-draw-and-erase {
            animation: draw-and-erase 2.5s ease-in-out infinite;
          }
        `}
      </style>  
    </div>
    )
}

      export default Loading