import { useEffect, useState } from 'react';
import { usePosts } from '../context/PostsContext';

const SavePost = ({ postToEdit, onCancelEdit }) => {
    const { addPost, updatePost } = usePosts();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (postToEdit) {
            setTitle(postToEdit.title);
            setContent(postToEdit.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [postToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (postToEdit) {
            updatePost(postToEdit.id, { title, content });
            onCancelEdit(); // Reset the edit state
        } else {
            addPost(title, content);
        }
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                required
            />
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Contenido"
                required
            />
            <button type="submit">{postToEdit ? 'Actualizar' : 'Agregar'} Publicación</button>
            {postToEdit && <button type="button" onClick={onCancelEdit}>Cancelar</button>}
        </form>
    );
};

export default SavePost;