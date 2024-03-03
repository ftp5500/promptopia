"use client";
import {useSession} from "next-auth/react";
import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Profile from "../../components/Profile";

function MyProfile() {
    const [myPosts, setMyPosts] = useState([]);
    const {data: session} = useSession();
    const router = useRouter();
    const searchParams = useSearchParams()
    const promptId = searchParams.get("id")
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    };
    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete?")
        if(hasConfirmed){
             try {
                     await fetch(`/api/prompt/${post._id.toString()}`,{
                         method:"DELETE"
                     })
                 const filteredPosts = myPosts.filter((post) => post._id !== post._id)
                 setMyPosts(filteredPosts)

                 } catch (error){
                 console.log(error);
              }
        } // End IF

    };
    useEffect(() => {

        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

           setMyPosts(data)
            console.log(myPosts);

        };
        if (session?.user.id) {
            fetchPosts();
        }
    }, [session?.user.id]);
    return (
        <div>
            <Profile
                name="My"
                desc="Welcome to your personalized profile page"
                data={myPosts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default MyProfile;