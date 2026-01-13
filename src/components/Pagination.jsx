export default function Pagination({
    currentPage,
    totalPages,
    onChange,
}) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages;

    function getVisiblePages(current, total) {
        const delta = 1; // current ke aas paas kitne pages dikhane hain
        const pages = [];

        const left = Math.max(2, current - delta);
        const right = Math.min(total - 1, current + delta);

        pages.push(1);

        if (left > 2) pages.push("...");

        for (let i = left; i <= right; i++) {
            pages.push(i);
        }

        if (right < total - 1) pages.push("...");

        if (total > 1) pages.push(total);

        return pages;
    }

    const visiblePages = getVisiblePages(currentPage, totalPages);



    return (
        <div className="flex items-center justify-between w-full max-w-80 text-gray-500 font-medium">
            <button
                type="button"
                aria-label="prev"
                disabled={prevDisabled}
                onClick={() => !prevDisabled && onChange(currentPage - 1)}
                className={`rounded-full bg-slate-200/50 ${prevDisabled ? "opacity-40 cursor-not-allowed" : ""
                    }`}
            >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                        d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
                        fill="#475569"
                        stroke="#475569"
                        strokeWidth=".078"
                    />
                </svg>
            </button>

            <div className="flex items-center gap-2 text-sm font-medium">
                {visiblePages.map((page, idx) =>
                    page === "..." ? (
                        <span key={`dots-${idx}`} className="px-2">
                            ...
                        </span>
                    ) : (
                        <button
                            key={`page-${page}-${idx}`}
                            onClick={() => onChange(page)}
                            className={`h-10 w-10 flex items-center justify-center aspect-square ${page === currentPage
                                    ? "text-gray-900 font-extrabold border bg-[#56CCF2] border-indigo-200 rounded-full"
                                    : ""
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <button
                type="button"
                aria-label="next"
                disabled={nextDisabled}
                onClick={() => !nextDisabled && onChange(currentPage + 1)}
                className={`rounded-full bg-slate-200/50 ${nextDisabled ? "opacity-40 cursor-not-allowed" : ""
                    }`}
            >
                <svg className="rotate-180" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                        d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a.1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
                        fill="#475569"
                        stroke="#475569"
                        strokeWidth=".078"
                    />
                </svg>
            </button>
        </div>
    );
}
