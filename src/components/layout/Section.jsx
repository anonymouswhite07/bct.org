import { cn } from "../../utils/cn";

export function Section({ children, className, id }) {
    return (
        <section id={id} className={cn("py-16 md:py-24", className)}>
            {children}
        </section>
    );
}
