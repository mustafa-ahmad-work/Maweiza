import { Suspense } from "react";
import Tasbih from "@/components/worship/Tasbih";
import Adhkar from "@/components/adhkar/Adhkar";

export default function TasbihPage() {
    return (
        <>
            <Suspense>
                <Tasbih />
                <Adhkar />
            </Suspense>
        </>
    );
}
