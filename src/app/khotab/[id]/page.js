import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faDownload,
    faCalendarAlt,
    faUser,
    faStar,
    faFileAudio,
    faFilePdf,
    faFileWord,
    faFilePowerpoint,
    faFileVideo,
    faLink,
    faGlobe,
    faLanguage,
    faHashtag,
    faImage
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import Landing from "@/components/Layout/Landing";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "موقع موعظه | خطب ",
};

// دالة لتحويل الطابع الزمني إلى تاريخ مقروء
const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// دالة للحصول على أيقونة حسب نوع الملف
const getFileIcon = (extension) => {
    switch(extension) {
        case 'mp3': return faFileAudio;
        case 'pdf': return faFilePdf;
        case 'doc': return faFileWord;
        case 'ppt': return faFilePowerpoint;
        case 'mp4': return faFileVideo;
        default: return faFilePdf;
    }
};

// دالة للحصول على لون حسب مستوى الأهمية
const getImportanceColor = (level) => {
    return level === 'high' ? 'bg-red-500' : 'bg-green-500';
};

export default async function _({ params }) {
    let khotab = [];
    let links = [];

    try {
        const response = await fetch(`https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/khotab/ar/ar/${params.id}/25/json`);
        const data = await response.json();
        khotab = data.data;
        links = data.links;
    } catch (errors) {
        console.log(errors);
    }

    const showData = khotab.map((item, key) => (
        <div
            key={key}
            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/30 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 dark:border-gray-700"
        >
            {/* شريط الأهمية */}
            <div className={`h-1 ${getImportanceColor(item.importance_level)}`}></div>

            {/* صورة الخطبة */}
            <div className="relative h-48 overflow-hidden">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <FontAwesomeIcon icon={faImage} className="text-4xl text-gray-400 dark:text-gray-500" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-emerald-600 rounded-full">
                            خطبة جمعة
                        </span>
                        <div className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                            <FontAwesomeIcon icon={faStar} className={`text-xs ${item.importance_level === 'high' ? 'text-yellow-400' : 'text-gray-300'}`} />
                            <span className="text-xs font-medium text-white mr-1">
                                {item.importance_level === 'high' ? 'عالية الأهمية' : 'عادية'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* رأس الكرت */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                            <FontAwesomeIcon icon={faUser} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="mr-3">
                            <h3 className="font-bold text-gray-800 dark:text-gray-200">{item.prepared_by[0]?.title || 'غير محدد'}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">المحاضر</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <FontAwesomeIcon icon={faCalendarAlt} className="ml-1" />
                            <span>{formatDate(item.add_date)}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <FontAwesomeIcon icon={faClock} className="ml-1" />
                            <span>{formatDate(item.update_date)}</span>
                        </div>
                    </div>
                </div>

                {/* عنوان الخطبة */}
                <a href={item.attachments?.[0]?.url || '#'} className="block mb-3">
                    <h5 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.title}
                    </h5>
                </a>

                {/* وصف الخطبة */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {item.description}
                </p>

                {/* معلومات إضافية */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <FontAwesomeIcon icon={faHashtag} className="ml-1" />
                        <span>الرقم: {item.id}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <FontAwesomeIcon icon={faLanguage} className="ml-1" />
                        <span>{item.source_language}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <FontAwesomeIcon icon={faFilePdf} className="ml-1" />
                        <span>{item.num_attachments} مرفقات</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <FontAwesomeIcon icon={faGlobe} className="ml-1" />
                        <span>مترجم: {item.translated_language}</span>
                    </div>
                </div>

                {/* أزرار التحميل */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                    {item.attachments?.map((attachment, key2) => (
                        <a
                            key={key2}
                            href={attachment.url}
                            download
                            className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg hover:opacity-90 transition-opacity"
                        >
                            <FontAwesomeIcon icon={getFileIcon(attachment.extension_type)} className="ml-2" />
                            <span>{attachment.extension_type.toUpperCase()}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* زر التحميل الرئيسي */}
            <div className="px-6 pb-4">
                <a
                    href={item.attachments?.[0]?.url || '#'}
                    download
                    className="w-full flex items-center justify-center py-3 text-sm font-medium text-center text-white bg-gradient-to-r from-emerald-600 to-lime-500 rounded-lg hover:opacity-90 transition-opacity"
                >
                    <FontAwesomeIcon icon={faDownload} className="ml-2" />
                    <span>تحميل الخطبة</span>
                </a>
            </div>
        </div>
    ));

    return (
        <>
            <Landing
                title="قسم الخطب"
                text="يحتوي هذا القسم علي اكثر من 280 خطبه نافعة"
            />
            <section className="py-10 container px-3 m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {showData}
                </div>

                {/* أزرار التنقل */}
                <div className="mt-10 flex justify-between items-center">
                    {links.prev === "" ? (
                        <div className="w-32"></div>
                    ) : (
                        <Link
                            href={`/khotab/${Number(params.id) - 1}`}
                            className="flex items-center justify-center w-32 py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors group"
                        >
                            <FontAwesomeIcon
                                className="ml-2 text-gray-600 dark:text-gray-300 group-hover:text-emerald-600"
                                icon={faAngleDoubleRight}
                            />
                            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-600">السابق</span>
                        </Link>
                    )}

                    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg px-6 py-3">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            صفحة {links.current_page} من {links.pages_number}
                        </span>
                    </div>

                    {links.next === "" ? (
                        <div className="w-32"></div>
                    ) : (
                        <Link
                            href={`/khotab/${Number(params.id) + 1}`}
                            className="flex items-center justify-center w-32 py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors group"
                        >
                            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-600">التالي</span>
                            <FontAwesomeIcon
                                className="mr-2 text-gray-600 dark:text-gray-300 group-hover:text-emerald-600"
                                icon={faAngleDoubleLeft}
                            />
                        </Link>
                    )}
                </div>
            </section>
        </>
    );
}
