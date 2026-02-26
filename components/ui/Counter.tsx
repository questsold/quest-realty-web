"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
}

export function Counter({ value, suffix = "", prefix = "", duration = 2 }: CounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const displayValue = useTransform(springValue, (latest) => Math.round(latest).toLocaleString());

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    return (
        <span ref={ref}>
            {prefix}
            <motion.span>{displayValue}</motion.span>
            {suffix}
        </span>
    );
}
