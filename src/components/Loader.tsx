import React from "react";

const Loader: React.FC = () => {
  const count = 7;
  const radius = 20;
  const size = 10;
  const orbitDuration = "1.8s";
  const bounceDuration = "1.2s";
  const stagger = 0.12;

  const colors = [
    "bg-violet-500",
    "bg-indigo-500",
    "bg-blue-600",
    "bg-green-500",
    "bg-yellow-500",
    "bg-orange-600",
    "bg-red-500",
  ];

  return (
    <div role="status" className="flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: `${radius * 2 + size}px`,
          height: `${radius * 2 + size}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            animation: `orbit ${orbitDuration} linear infinite`,
            transformOrigin: "50% 50%",
          }}
        >
          {Array.from({ length: count }).map((_, i) => {
            const angle = (360 / count) * i;
            const delay = `${(stagger * i).toFixed(2)}s`;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${angle}deg) translateX(${radius}px)`,
                  transformOrigin: "0 0",
                }}
              >
                <div
                  style={{
                    transform: "translate(-50%,-50%)",
                    animation: `bounce ${bounceDuration} ease-in-out ${delay} infinite`,
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    className={`rounded-full ${colors[i % colors.length]}`}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <span className="sr-only">Loading...</span>

      <style>
        {`
          @keyframes orbit {
            to { transform: rotate(360deg); }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translate(-50%,-50%) translateY(0) scale(1);
              opacity: 1;
            }
            50% {
              transform: translate(-50%,-50%) translateY(-6px) scale(0.95);
              opacity: 0.95;
            }
          }

          /* Respect users who prefer reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .rotating-orbit, .rotating-orbit * {
              animation: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
