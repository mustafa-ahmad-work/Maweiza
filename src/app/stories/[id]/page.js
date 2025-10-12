import Landing from "@/components/Layout/Landing";
import stories from "@/data/stories.json";
export default function _({ params }) {

    const filterData = stories.filter((item) => item.id === Number(params.id))[0];

    return (
        <>
            <Landing title={filterData.name} text="" />
            <section className="py-5 relative px-4">
                <div className="container m-auto">{filterData.data.map((item, index) => (
                    <div key={index} className="px-6 py-6 mb-3 shadow-[0_0_15px_rgb(0_0_0_/_5%)] border border-gray-200 rounded-md bg-white dark:bg-gray-900 dark:border dark:border-gray-600">
                        <span className="text-lime-600 text-xl block mb-2">
                            {item.title} :
                        </span>
                        <p>{item.data}</p>
                    </div>
                ))}</div>
            </section>
        </>
    );
}
