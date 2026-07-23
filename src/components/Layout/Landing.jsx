import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMosque } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Landing({ title, text }) {
    return (
        <section className="relative dark:from-zinc-950 dark:to-zinc-950 py-2">
            <div className="relative z-10 container mx-auto px-2 text-center">
                {/* أيقونة مزخرفة */}
                {/* <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-lime-100 to-lime-200 dark:from-lime-900/40 dark:to-lime-800/60 shadow-lg border border-lime-200 dark:border-lime-800">

                        <Image
                            loading="lazy"
                            quality={95}
                            width="50"
                            height="50"
                            src="/logo.png"
                            alt="Website logo"
                            style={{ width: "auto", height: "auto" }}
                            className="transition-transform duration-300 hover:rotate-12"
                        />
                    </div>
                </div> */}

                {/* العنوان */}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {title}
                </h1>

                {/* النص */}
                <p className="text-lg text-gray-600 dark:text-zinc-300 max-w-2xl mx-auto">
                    {text}
                </p>

            </div>
        </section>
    );
}
