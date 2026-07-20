"use client";

import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "@/app/audio.css";

import Landing from "@/components/Layout/Landing";

export default function ListenSuraPage({ params }) {
    const idRecitations = params.id_reciters;
    const id = params.id_sura;

    const [dataSuaruh, setDataSuaruh] = useState({});
    const [dataAyah, setDataAyah] = useState([]);
    const [dataRecitations, setDataRecitations] = useState("");
    const [dataAudio, setDataAudio] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const responseSuaruh = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);
                const dataSuaruhJson = await responseSuaruh.json();
                const suaruhData = dataSuaruhJson.data;

                setDataAyah(suaruhData.ayahs || []);
                setDataSuaruh(suaruhData || {});

                const responseFileAudio = await fetch(
                    `https://abdoahmed26.github.io/api/arabic.json`
                );
                const dataFileAudio = await responseFileAudio.json();
                const dataFileAudioFilter = dataFileAudio.reciters.find((recitations) => recitations.id === idRecitations);

                if (dataFileAudioFilter) {
                    setDataAudio(`${dataFileAudioFilter.Server}/${id.toString().padStart(3, "0")}.mp3`);
                    setDataRecitations(dataFileAudioFilter.name);
                }
            } catch (error) {
                console.error("Error fetching audio/surah data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [id, idRecitations]);

    if (isLoading) {
        return <div className="text-center py-20 text-gray-500 dark:text-zinc-400">جاري التحميل...</div>;
    }

    return (
        <>
            <Landing title={<span className="font-quran">{dataSuaruh.name}</span>} />
            <section className="py-10 relative px-4">
                <div className="bg-white py-10 px-10 mb-20 dark:bg-zinc-900 w-full rounded-2xl border border-gray-100 dark:border-zinc-800">
                    <h1 className="m-auto text-center my-5 text-2xl font-quran">
                        {dataSuaruh.name}
                    </h1>
                    <p className="m-auto text-center text-xl"> بصوت الشيخ {dataRecitations}</p>
                    <AudioPlayer autoPlay loop src={String(dataAudio)} />
                </div>
                {id !== "9" &&
                    <h4 className="text-2xl font-quran mb-7 w-fit m-auto">
                        بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ
                    </h4>}
                <div className="container m-auto">{dataAyah.map((aya) => (
                    <span className="leading-[65px]" key={aya.number}>
                        <span className="font-quran text-xl md:text-2xl">
                            {aya.text.replace("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", "")}
                        </span>
                        <span className="font-quran text-lime-600 text-xl md:text-2xl">
                            <span className="mr-2 font-quran"> ﴿ </span>
                            <span className="text-black dark:text-white">
                                {aya.numberInSurah}
                            </span>
                            <span className="ml-2 font-quran"> ﴾ </span>
                        </span>
                    </span>
                ))}</div>
                <h4 className="text-2xl font-quran mt-7 w-fit m-auto"> صّدٍقُ آلَلَهّ آلَعٌظُيَمً</h4>
            </section>
        </>
    );
}
