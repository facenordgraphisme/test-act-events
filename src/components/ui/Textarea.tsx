import { forwardRef, TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label htmlFor={props.id} className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={cn(
                        "flex min-h-[120px] w-full rounded-sm border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
                        error && "border-red-500 focus:ring-red-500",
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);
Textarea.displayName = 'Textarea';

export { Textarea };
