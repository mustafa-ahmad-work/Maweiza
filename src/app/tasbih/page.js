import { Suspense } from "react";
import Tasbih from "@/components/Tasbih/Tasbih";
import Azekar from "@/components/Azekar/Azekar";

export default function TasbihPage() {
    return (
        <>
            <Suspense>
                <Tasbih />
                <Azekar />
            </Suspense>
        </>
    );
}
