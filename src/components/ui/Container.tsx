import { clsx } from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
    return (
        <div
            className={clsx("container mx-auto px-4 sm:px-6 lg:px-8", className)}
            {...props}
        >
            {children}
        </div>
    );
}
