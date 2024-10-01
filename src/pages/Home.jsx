import { useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostsContext';
import SavePost from '../components/SavePost';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const { posts, deletePost } = usePosts();
    const [postToEdit, setPostToEdit] = useState(null);

    const handleEditPost = (post) => setPostToEdit(post);

    const handleCancelEdit = () => setPostToEdit(null);

    const handleLogout = async () => {
        await logout(); navigate('/login')
    }

    return (
        <div className='container'>
            {user ? (
                <>
                    <button onClick={handleLogout}>Cerrar Sesión</button>

                    <h1>Bienvenido, {user.email}!</h1>
                    <p>Esta es la página de inicio, accesible solo para usuarios logueados.</p>

                    <SavePost postToEdit={postToEdit} onCancelEdit={handleCancelEdit} />

                    <h2>Tus Publicaciones</h2>
                    <ul>
                        {posts.map((post, index) => (
                            <li key={index}>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <button onClick={() => handleEditPost(post)}>Editar</button>
                                <button onClick={() => deletePost(post.id)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <h1>Cargando...</h1>
            )}
        </div>
    );
};

export default Home;