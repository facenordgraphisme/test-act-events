import { forwardRef, SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { label: string; value: string }[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, placeholder, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label htmlFor={props.id} className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    className={cn(
                        "flex h-11 w-full rounded-sm border border-black/10 bg-white px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-colors",
                        error && "border-red-500 focus:ring-red-500",
                        className
                    )}
                    {...props}
                >
                    {placeholder && <option value="" disabled>{placeholder}</option>}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);
Select.displayName = 'Select';

export { Select };
