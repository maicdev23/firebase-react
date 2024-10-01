import { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

import { db } from "../config/firebase";
import { useAuth } from "./AuthContext";

export const PostsContext = createContext();

export const usePosts = () => {
    const context = useContext(PostsContext);

    if (!context) console.log("No auth context")

    return context
};

export function PostsProvider({ children }) {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            if (user) {
                const userPosts = [];

                const querySnapshot = await getDocs(collection(db, "posts"));
                querySnapshot.docs.forEach(doc => {
                    const post = { id: doc.id, ...doc.data() };
                    if (post.userId === user.uid) userPosts.push(post);
                });

                setPosts(userPosts);
            }
        }; fetchPosts();
    }, [user]);
    

    const addPost = async (title, content) => {
        if (user) {
            await addDoc(collection(db, "posts"), {
                title,
                content,
                userId: user.uid,
                createdAt: new Date(),
            });
            const newPost = { title, content, userId: user.uid, createdAt: new Date() };
            setPosts(prev => [...prev, newPost]);
        }
    };

    const updatePost = async (postId, updatedData) => {
        if (user) {
            const postRef = doc(db, "posts", postId);
            await updateDoc(postRef, updatedData);
            setPosts(prev => prev.map(post => (post.id === postId ? { ...post, ...updatedData } : post)));
        }
    };

    const deletePost = async (postId) => {
        await deleteDoc(doc(db, "posts", postId));
        setPosts(prev => prev.filter(post => post.id !== postId));
    };

    return (
        <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
            {children}
        </PostsContext.Provider>
    );
}