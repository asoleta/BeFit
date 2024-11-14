import React from "react";
import { useState } from "react";

const Create = () => {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        caption: '',
        type: ''
    });

    //handles any changes to the form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    //handle the submit
    const handleSubmit = (e) => {
        e.preventDefault(); //prevents the page reload
        console.log('Form Submitted:', formData);
    }

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
                    required />

                <label htmlFor="image">Image URL:</label>
                <input 
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required />

                <label htmlFor="caption">Caption:</label>
                <input
                    type="text"
                    id="caption"
                    name="caption"
                    value={formData.caption}
                    onChange={handleChange}
                    required />

                <fieldset>
                    <legend>What type of post are you creating?</legend>

                    <label>
                        <input 
                            type="radio" 
                            name="type" 
                            value="workout" 
                            checked={formData.type === "workout"}
                            onChange={handleChange}
                            required />
                        Workout
                    </label>

                    <label>
                        <input 
                            type="radio" 
                            name="type" 
                            value="recipe" 
                            checked={formData.type === "recipe"}
                            onChange={handleChange}
                            required />
                        Recipe
                    </label>

                    <label>
                        <input 
                            type="radio" 
                            name="type" 
                            value="advice" 
                            checked={formData.type === "advice"}
                            onChange={handleChange}
                            required />
                        Advice
                    </label>
                </fieldset>

                <button type="submit" className="secondary">POST</button>
            </form>
        </div>
    )
}

export default Create;