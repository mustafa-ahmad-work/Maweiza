import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Pagination({ links, basePath, currentPage, onPrev, onNext }) {
    const isClient = !!onPrev;

    if (isClient) {
        return (
            <div className="flex justify-center items-center gap-4 mt-12 mb-6">
                <button
                    onClick={onPrev}
                    disabled={!links?.prev}
                    className={`flex items-center px-5 py-3 rounded-xl font-medium transition-all ${links?.prev
                        ? "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-800 dark:text-zinc-200 hover:text-green-600 dark:hover:text-green-400 shadow-sm"
                        : "opacity-40 cursor-not-allowed bg-gray-100 dark:bg-zinc-800 text-gray-400"
                        }`}
                >
                    <FontAwesomeIcon icon={faAngleDoubleRight} className="ml-2" />
                    السابق
                </button>

                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
                    الصفحة {currentPage || links?.current_page} من {links?.pages_number || "?"}
                </span>

                <button
                    onClick={onNext}
                    disabled={!links?.next}
                    className={`flex items-center px-5 py-3 rounded-xl font-medium transition-all ${links?.next
                        ? "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-800 dark:text-zinc-200 hover:text-green-600 dark:hover:text-green-400 shadow-sm"
                        : "opacity-40 cursor-not-allowed bg-gray-100 dark:bg-zinc-800 text-gray-400"
                        }`}
                >
                    التالي
                    <FontAwesomeIcon icon={faAngleDoubleLeft} className="mr-2" />
                </button>
            </div>
        );
    }

    return (
        <div className="mt-10 flex justify-between items-center">
            {links.prev === "" ? (
                <div className="w-32"></div>
            ) : (
                <Link
                    href={`${basePath}/${Number(currentPage) - 1}`}
                    className="flex items-center justify-center w-32 py-3 px-4 bg-gray-100 dark:bg-zinc-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-colors group"
                >
                    <FontAwesomeIcon className="ml-2 text-gray-600 dark:text-zinc-300 group-hover:text-green-600" icon={faAngleDoubleRight} />
                    <span className="font-medium text-gray-700 dark:text-zinc-300 group-hover:text-green-600">السابق</span>
                </Link>
            )}

            <div className="flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg px-6 py-3">
                <span className="font-medium text-gray-700 dark:text-zinc-300">
                    صفحة {links.current_page} من {links.pages_number}
                </span>
            </div>

            {links.next === "" ? (
                <div className="w-32"></div>
            ) : (
                <Link
                    href={`${basePath}/${Number(currentPage) + 1}`}
                    className="flex items-center justify-center w-32 py-3 px-4 bg-gray-100 dark:bg-zinc-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-colors group"
                >
                    <span className="font-medium text-gray-700 dark:text-zinc-300 group-hover:text-green-600">التالي</span>
                    <FontAwesomeIcon className="mr-2 text-gray-600 dark:text-zinc-300 group-hover:text-green-600" icon={faAngleDoubleLeft} />
                </Link>
            )}
        </div>
    );
}
