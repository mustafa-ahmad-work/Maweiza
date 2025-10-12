"use client";

import { useEffect, useState, useMemo } from "react";
import AudioPlayer from "react-h5-audio-player";
import "@/app/audio.css";
import Landing from "@/components/Layout/Landing";
import Aya from "./Aya";
import memorizingAll from "@/data/memorizingAll.json";

export default function Page({ params }) {
    const idRecitations = params.id_reciters;
    const id = params.id_sura;

    const [ayah, setAyah] = useState(1);
    const [dataAudio, setDataAudio] = useState("");
    const [dataAyah, setDataAyah] = useState([]);
    const [dataRecitations, setDataRecitations] = useState("");
    const [nameEn, setNameEn] = useState("");
    const [dataSuaruh, setDataSuaruh] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchDataApi1() {
            try {
                setIsLoading(true);
                let recitation = memorizingAll.data.filter(
                    (recitations) =>
                        recitations.id.toString() === idRecitations.toString()
                )[0];
                if (!recitation) {
                    throw new Error("Recitation not found");
                }
                setNameEn(recitation.name_en);
                setDataRecitations(recitation.name_ar);

                const response = await fetch(
                    `https://quran-api-id.vercel.app/surahs/${id}/ayahs/${ayah}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch audio data");
                }
                const suaruhAudioJson = await response.json();
                setDataAudio(suaruhAudioJson.audio[recitation.name_en]);
            } catch (error) {
                console.error("Error in fetchDataApi1:", error);
            }
        }
        fetchDataApi1();
    }, [id, idRecitations, ayah]);

    useEffect(() => {
        async function fetchDataApi2() {
            try {
                setIsLoading(true);
                const responseSuaruh = await fetch(
                    `https://api.alquran.cloud/v1/surah/${id}`
                );
                if (!responseSuaruh.ok) {
                    throw new Error("Failed to fetch surah data");
                }
                const dataSuaruhJson = await responseSuaruh.json();
                const suaruhData = dataSuaruhJson.data;
                setDataAyah(suaruhData.ayahs);
                setDataSuaruh(suaruhData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error in fetchDataApi2:", error);
                setIsLoading(false);
            }
        }
        fetchDataApi2();
    }, [id]);

    // دالة موحدة لجلب بيانات الآية وتحديث الحالة
    const fetchAyahData = async (ayahNumber) => {
        try {
            if (ayahNumber < 1 || ayahNumber > dataAyah.length) {
                return; // لا تفعل شيئًا إذا كان رقم الآية خارج النطاق
            }

            const response = await fetch(
                `https://quran-api-id.vercel.app/surahs/${id}/ayahs/${ayahNumber}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch ayah data");
            }
            const suaruhAudioJson = await response.json();
            setDataAudio(suaruhAudioJson.audio[nameEn]);
            setAyah(ayahNumber);
        } catch (error) {
            console.error("Error in fetchAyahData:", error);
        }
    };

    // استخدام useMemo لتحسين الأداء
    const ShowDataMap = useMemo(() => {
        if (isLoading || !dataAyah.length) return null;

        return dataAyah.map((aya, key) => (
            <span key={key} onClick={() => fetchAyahData(aya.numberInSurah)}>
                <Aya aya={aya} ayah={ayah} />
            </span>
        ));
    }, [dataAyah, ayah, isLoading]);

    const handleEnded = () => {
        if (ayah < dataAyah.length) {
            fetchAyahData(ayah + 1);
        }
    };

    const handleNext = () => {
        if (ayah < dataAyah.length) {
            fetchAyahData(ayah + 1);
        }
    };

    const handlePrevious = () => {
        if (ayah > 1) {
            fetchAyahData(ayah - 1);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Landing
                title={<span className="font-quran">{dataSuaruh.name}</span>}
                text=""
            />
            <section className="py-10 relative px-4">
                <div className="fixed bottom-0 right-0 left-0 bg-white py-10 px-10 shadow-lg dark:bg-black w-full">
                    <h1 className="m-auto text-center my-5 text-2xl font-quran">
                        {dataSuaruh.name}
                    </h1>
                    <p className="m-auto text-center text-xl">
                        بصوت الشيخ {dataRecitations}
                    </p>
                    <AudioPlayer
                        onClickNext={handleNext}
                        onClickPrevious={handlePrevious}
                        onEnded={handleEnded}
                        autoPlay={true}
                        src={dataAudio}
                    />
                </div>
                {id !== "9" ? (
                    <h4 className="text-2xl font-quran mb-7 w-fit m-auto">
                        بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ
                    </h4>
                ) : (
                    ""
                )}
                <div className="container m-auto">{ShowDataMap}</div>
                <h4 className="text-2xl font-quran mt-7 w-fit m-auto">
                    صّدٍقُ آلَلَهّ آلَعٌظُيَمً
                </h4>
            </section>
        </>
    );
}
