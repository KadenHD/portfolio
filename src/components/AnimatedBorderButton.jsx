export const AnimatedBorderButton = ({children, ...props}) => {
    return <button className="relative bg-transparent border border-border text-foreground hover:border-primary/50 transition-all duration-1000 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 text-lg font-medium rounded-full overflow-x-visible animated-border group" {...props}>
        <svg
            className="absolute left-0 top-0 w-full h-full pointer-events-none"
            viewBox="0 0 200 60"
            preserveAspectRatio="none"
            style={{overflow: "visible"}}
        >
            <path
            pathLength="1"
            d="M 30,1
                A 29,29 0 0 0 1,30
                A 29,29 0 0 0 30,59
                L 170,59
                A 29,29 0 0 0 199,30
                A 29,29 0 0 0 170,1
                Z"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeDasharray="0.35 0.65"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animated-border-path"
            />
        </svg>
        <span className="relative flex items-center justify-center gap-2 z-10">
            {children}
        </span>
    </button>
}
