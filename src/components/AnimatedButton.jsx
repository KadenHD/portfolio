export const AnimatedButton = ({
    className = "",
    size = "default",
    children,
    ...props
}) => {
    const baseClasses =
        "relative bg-transparent border border-border text-foreground hover:border-primary/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-full overflow-x-visible animated-border group duration-300";

    const sizeClasses = {
        sm: "px-4 py-2 text-sm",
        default: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;

    return (
        <button className={classes} {...props}>
            <span className="relative flex items-center justify-center gap-2 z-10">
                {children}
            </span>
        </button>
    );
};
