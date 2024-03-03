import Link from "next/link";
function Form({type, post, setPost, submitting, handleSubmit}) {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} Post</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share amazing prompt with the world, and let your imagination run wild with any
                AI-powered platform
            </p>
            <form
                onSubmit={handleSubmit}
                className="mt10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            >
                {/* New Prompt*/}
                <label htmlFor="prompt">
                    <span className=" font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
                    <textarea
                        value={post.prompt}
                        onChange={(e) =>setPost({
                            ...post,
                            prompt:e.target.value
                        })}
                        required
                        placeholder="Write your pormpt here..."
                        className="form_textarea"
                    />
                </label>

                {/* Edit Prompt*/}
                <label htmlFor="prompt">
                    <span className=" font-satoshi font-semibold text-base text-gray-700">
                        Tag {``}
                        <span className="font-normal">(#product, #webdevelopment, #idea ....) </span>
                    </span>
                    <input
                        value={post.tag}
                        onChange={(e) =>setPost({
                            ...post,
                            tag:e.target.value
                        })}
                        placeholder="#tag"
                        required
                        className="form_input"
                    />
                </label>
                <div className="flex flex-end mx-4 pt-5 gap-4">
                    <Link
                    href="/"
                    className="text-gray-700"
                    >Cancel</Link>

                    <button

                        type="submit"
                        disabled={submitting}
                        className="text-white px-5 py-1.5 bg-primary-orange rounded-full font-medium">
                        {submitting? `${type}...`: type}
                    </button>

                </div>

            </form>
        </section>
    );
}

export default Form;