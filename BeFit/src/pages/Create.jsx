import React, { useState } from "react";
import { supabase } from "../client";
import SuccessPopup from "../components/SuccessPopup"; // Import the popup component

const Create = () => {
    const [message, setMessage] = useState();
    const [formData, setFormData] = useState({
        title: '',
        img_src: '',
        caption: '',
        likes: 0,
        post_type: ''
    });

    const [showPopup, setShowPopup] = useState(false); // Track popup visibility

    // Handles any changes to the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle the submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the page reload
        
        // Insert data into supabase
        const { data, error } = await supabase
            .from('posts')
            .insert([formData]);

        if (error) {
            console.error("Error saving post:", error.message);
            setMessage("There was a problem.");
            // Show fail popup
            setShowPopup(true);
        } else {
            console.log('Post saved:', data);

            setMessage("Success! Post created.");
            // Show success popup
            setShowPopup(true);

            // Clear the fields
            setFormData({ title: '', img_src: '', caption: '', post_type: '' });
        }
    };

    return (
        <div className="create">
            <h1>Create a Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="image">Image URL:</label>
                <input
                    type="text"
                    id="img_src"
                    name="img_src"
                    value={formData.img_src}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="caption">Caption:</label>
                <textarea
                    type="text"
                    id="caption"
                    name="caption"
                    value={formData.caption}
                    onChange={handleChange}
                    className="captionTB"
                    required
                />

                <fieldset>
                    <legend>What type of post are you creating?</legend>

                    <label>
                        <input
                            type="radio"
                            name="post_type"
                            value="workout"
                            checked={formData.post_type === "workout"}
                            onChange={handleChange}
                            required
                        />
                        Workout
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="post_type"
                            value="recipe"
                            checked={formData.post_type === "recipe"}
                            onChange={handleChange}
                            required
                        />
                        Recipe
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="post_type"
                            value="advice"
                            checked={formData.post_type === "advice"}
                            onChange={handleChange}
                            required
                        />
                        Advice
                    </label>
                </fieldset>

                <button type="submit" className="secondary">POST</button>
            </form>

            <SuccessPopup
                message="Success! Post created."
                show={showPopup}
                onClose={() => setShowPopup(false)}
            />
        </div>
    );
};

export default Create;
