import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMosque } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Landing({ title, text }) {
    return (
        <section className="relative dark:from-gray-900 dark:to-gray-800 py-24 mt-20">
            {/* خلفية زخرفية */}
            {/* <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
            </div> */}

            <div className="relative z-10 container mx-auto px-6 text-center">
                {/* أيقونة مزخرفة */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-lime-100 to-lime-200 dark:from-lime-900/40 dark:to-lime-800/60 shadow-lg border border-lime-200 dark:border-lime-800">
                        {/* <FontAwesomeIcon
                            icon={faMosque}
                            className="text-amber-600 dark:text-amber-400 text-4xl"
                        /> */}

                        <Image
                            loading="lazy"
                            quality={95}
                            width="50"
                            height="50"
                            src="/logo.png"
                            alt="Website logo"
                            className="transition-transform duration-300 hover:rotate-12"
                        />
                    </div>
                </div>

                {/* العنوان */}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {title}
                </h1>

                {/* النص */}
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {text}
                </p>

                {/* فاصل زخرفي */}
                <div className="flex justify-center items-center mt-8">
                    <div className="h-px bg-gray-300 dark:bg-gray-700 w-20"></div>
                    <div className="mx-3 w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></div>
                    <div className="h-px bg-gray-300 dark:bg-gray-700 w-20"></div>
                </div>
            </div>
        </section>
    );
}
