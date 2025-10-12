export default function Search(props) {
    return (
        <div className="font-sans px-5 text-black flex dark:text-white items-center justify-center my-5">
            <div className="relative w-full max-w-2xl">
                {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                </div> */}
                <input
                    type="text"
                    onChange={props.handleChange}
                    className="w-full pl-10 pr-4 py-3 text-lg rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-300"
                    placeholder="بحث..."
                />
                <button className="absolute inset-y-0 left-3     flex items-center pr-3">
                    <div className="p-1.5 rounded-full bg-gradient-to-r from-lime-500 to-emerald-500 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}
