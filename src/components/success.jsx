import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SuccessMessage = ({ title, message, state }) => {
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        if (state) {
            setIsAnimating(true);
        }
    }, [state]);

    const handleProgressComplete = () => {
        setIsAnimating(false);
    };

    return (
        <div className="w-[230px] fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
            <motion.div
                className="bg-gradient-to-r from-white to-gray-50 text-green-500 shadow-lg py-2 flex flex-col items-center border border-gray-800 shadow-white/25 dark:shadow-black/75"
                initial={{ opacity: 0, y: -100 }}
                animate={{
                    opacity: isAnimating ? 1 : 0,
                    y: isAnimating ? 0 : -100,
                }}
                transition={{ duration: 0.3, delayChildren: 1}}
            >
                <div className="flex items-center px-3">
                    <motion.i
                        className="fas fa-check-circle text-green-500 fa-2x mr-7"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                    <div className="text-left">
                        <div className="text-xl font-semibold text-gray-800">{title}</div>
                        <div className="text-sm text-gray-600 mt-1">{message}</div>
                    </div>
                </div>
                <div className="relative w-full h-1 mt-1">
                    <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-blue-600 rounded-sm"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                        onAnimationComplete={handleProgressComplete}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 h-1 bg-blue-300 rounded-sm"
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 2 }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default SuccessMessage;
