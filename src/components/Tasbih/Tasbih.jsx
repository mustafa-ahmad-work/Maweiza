"use client";

import Image from "next/image";
import Landing from "../Layout/Landing";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/config/constants";

function Tasbih() {
    const [tasbih, setTasbih] = useLocalStorage(STORAGE_KEYS.TASBIH, 0);

    const tasbihAdd = () => setTasbih(Number(tasbih) + 1);
    const tasbihRefresh = () => setTasbih(0);

    return (
        <>
            <Landing title="مسبحة الكترونية" text="قم التسبيح الان الكترونيا بدون الحاجه لسبحة يدوية مع الاحتفاظ بالعدد" />
            <section className="py-10 relative">
                <Image width={100} height={100} src="/img.png" style={{ width: "auto", height: "auto" }} className="absolute w-32 top-16 left-0 -z-40" alt="img" />
                <div className="px-3">
                    <div className="shape-electronic m-auto">
                        <div className="screen-digit">
                            <div className="layout-screen-digit" />
                            <div className="contain-screen-digit font-sans bg-white border-white text-black">
                                {tasbih}</div>
                        </div>
                        <div className="buttons-wrapper">
                            <div className="wrapper-button">
                                <div className="button">
                                    <button onClick={() => setTasbih(tasbih)} className="bg-white" />
                                </div>
                                <span>حفظ</span>
                            </div>
                            <div className="wrapper-button">
                                <div className="button">
                                    <button onClick={tasbihAdd} className="bg-white" />
                                </div>
                            </div>
                            <div className="wrapper-button">
                                <div className="button">
                                    <button onClick={tasbihRefresh} className="bg-white" />
                                </div>
                                <span>مسح</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Image width={100} height={100} src="/img.png" style={{ width: "auto", height: "auto" }} className="absolute w-32 bottom-0 rotate-180 right-0 -z-40" alt="img" />
            </section>
        </>
    );
}

export default Tasbih;
