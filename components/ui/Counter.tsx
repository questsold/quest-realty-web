"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    delay?: number;
    margin?: string;
}

export function Counter({ value, suffix = "", prefix = "", duration = 2, delay = 0, margin = "0px" }: CounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: margin as any });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const displayValue = useTransform(springValue, (latest) => Math.round(latest).toLocaleString());

    useEffect(() => {
        if (isInView) {
            if (delay > 0) {
                const timeout = setTimeout(() => {
                    motionValue.set(value);
                }, delay * 1000);
                return () => clearTimeout(timeout);
            } else {
                motionValue.set(value);
            }
        }
    }, [isInView, value, motionValue, delay]);

    return (
        <span ref={ref}>
            {prefix}
            <motion.span>{displayValue}</motion.span>
            {suffix}
        </span>
    );
}
