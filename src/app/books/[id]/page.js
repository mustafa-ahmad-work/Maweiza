import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight, faDownload, faBook, faUser, faFileAlt, faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import Landing from "@/components/Layout/Landing";
import Link from "next/link";
import Image from "next/image";

export default async function Page({ params }) {
    let books = [];
    let links = [];
    try {
        const response = await fetch(`https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/books/ar/ar/${params.id}/25/json`);
        const data = await response.json();
        books = data.data;
        links = data.links;
    } catch (errors) {
        console.log(errors);
    }

    // دالة لتحديد لون مستوى الأهمية
    const getImportanceColor = (level) => {
        switch (level) {
            case 'critical': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'normal': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    // دالة لتحديد نص مستوى الأهمية
    const getImportanceText = (level) => {
        switch (level) {
            case "critical":
                return "مهم جدًا";
            case "high":
                return "مهم";
            case "normal":
                return "عادي";
            default:
                return "غير مصنف";
        }
    };

    // دالة لتحديد أيقونة مستوى الأهمية
    const getImportanceIcon = (level) => {
        switch (level) {
            case 'critical': return faStar;
            case 'high': return faStar;
            case 'normal': return faBook;
            default: return faBook;
        }
    };

    return (
        <>
            <Landing
                title="قسم الكتب الإسلامية"
                text="مكتبة شاملة تضم أكثر من 4900 كتاب إسلامي تعليمي مفيد ونافع بإذن الله تعالى"
            />

            <section className="pt-5 pb-20 container px-3 m-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                        <FontAwesomeIcon icon={faBook} className="ml-3 text-emerald-600 text-2xl" />
                        المكتبة الإسلامية
                    </h2>
                    <div className="text-base text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
                        <span className="font-semibold">إجمالي الكتب:</span> {links.total_items || '0'}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                    {books.map((item, key) => (
                        <div
                            key={key}
                            className="flex flex-col h-full bg-white rounded-2xl shadow-lg overflow-hidden dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {/* صورة الكتاب */}
                            <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-lime-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain p-4"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-4">
                                        <FontAwesomeIcon icon={getImportanceIcon(item.importance_level)} className={`text-5xl ${getImportanceColor(item.importance_level).replace('bg-', 'text-')} mb-3`} />
                                        <span className="text-gray-500 dark:text-gray-400 text-sm text-center">لا توجد صورة</span>
                                    </div>
                                )}

                                {/* شارة مستوى الأهمية */}
                                <div className="absolute top-3 left-3">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full text-white flex items-center ${getImportanceColor(item.importance_level)}`}>
                                        <FontAwesomeIcon icon={getImportanceIcon(item.importance_level)} className="ml-1" />
                                        {getImportanceText(item.importance_level)}
                                    </span>
                                </div>
                            </div>

                            {/* محتوى الكتاب */}
                            <div className="flex flex-col flex-grow p-5">
                                <a href={item.attachments[0]?.url || '#'} className="block">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-emerald-600 transition-colors">
                                        {item.title}
                                    </h3>
                                </a>

                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                                    {item.description}
                                </p>

                                <div className="mt-auto space-y-3">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <FontAwesomeIcon icon={faUser} className="ml-2 text-emerald-500" />
                                        <span className="font-medium">المؤلف:</span>
                                        <span className="mr-2 truncate">{item.prepared_by[0]?.title || 'غير محدد'}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <FontAwesomeIcon icon={faFileAlt} className="ml-2 text-emerald-500" />
                                            <span className="font-medium">الحجم:</span>
                                            <span className="mr-2">{item.attachments[0]?.size || 'غير محدد'}</span>
                                        </div>

                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <FontAwesomeIcon icon={faCalendar} className="ml-2 text-emerald-500" />
                                            <span className="font-medium">الصيغة:</span>
                                            <span className="mr-2">{item.attachments[0]?.extension_type || 'غير محدد'}</span>
                                        </div>
                                    </div>

                                    <a
                                        href={item.attachments[0]?.url || '#'}
                                        download
                                        className="flex justify-center items-center w-full py-3 text-sm font-bold text-center text-white bg-gradient-to-r from-emerald-600 to-lime-500 rounded-lg hover:from-emerald-700 hover:to-lime-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <FontAwesomeIcon icon={faDownload} className="ml-2" />
                                        تحميل الكتاب
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-between items-center">
                    {links.prev === "" ? (
                        <div className="w-32"></div>
                    ) : (
                        <Link
                            href={`/books/${Number(params.id) - 1}`}
                            className="flex items-center justify-center w-32 px-4 py-3 text-sm font-bold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:text-emerald-600 hover:border-emerald-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-300"
                        >
                            <FontAwesomeIcon className="ml-2" icon={faAngleDoubleRight} />
                            السابق
                        </Link>
                    )}

                    <div className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-emerald-100 dark:border-gray-600">
                        <span className="text-gray-700 dark:text-gray-300 font-bold">
                            الصفحة {links.current_page} من {links.pages_number}
                        </span>
                    </div>

                    {links.next === "" ? (
                        <div className="w-32"></div>
                    ) : (
                        <Link
                            href={`/books/${Number(params.id) + 1}`}
                            className="flex items-center justify-center w-32 px-4 py-3 text-sm font-bold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:text-emerald-600 hover:border-emerald-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-300"
                        >
                            التالي
                            <FontAwesomeIcon className="mr-2" icon={faAngleDoubleLeft} />
                        </Link>
                    )}
                </div>
            </section>
        </>
    );
}
