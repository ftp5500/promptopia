"use client";
import {useState, useEffect} from "react";
import PromptCard from "./PromptCard";
import {usePathname, useRouter} from "next/navigation";
import {useDebounce} from "use-debounce";

const PromptCardList = ({data, handleTagClick}) => {

    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (

                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

function Feed() {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const [debounced] = useDebounce(searchText, 500);
    const [showAlert, setShowAlert] = useState(false);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);

    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const data = await response.json();
            router.push('/');
            if (!debounced) {
                setPosts(data);
            } else {
                router.push(`?search=${debounced}`);
                const filteredData = [];
                data.map((post) => (
                    post.prompt.toLowerCase().indexOf(debounced.toLowerCase()) >= 0
                    || post.creator.username.toLowerCase().indexOf(debounced.toLowerCase()) >= 0
                    || post.tag.toLowerCase().indexOf(debounced.toLowerCase()) >= 0
                        ? filteredData.push(post) && setPosts(filteredData)
                        : setPosts([]) && setShowAlert(true)

                ));
            }
        };
        fetchPosts();
    }, [debounced,  showAlert , router,]);

    return (
        <section className="feed">
            <form
                className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search_input peer"
                />
            </form>

            {showAlert &&
                <div className={`w-full flex bg-indigo-200 h-10 mt-5 text-left rounded-md align-middle items-center `}>
                    <div className="h-full w-2 bg-indigo-500 justify-start rounded-s"/>
                    <p className="px-3 justify-center align-middle items-center font-semibold text-indigo-800">No results found for your search!</p>
                </div>
            }


            <PromptCardList
                data={posts}
                handleTagClick={() => {}}
            />


        </section>
    );
}

export default Feed;