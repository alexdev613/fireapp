import { useState } from "react";
import { db } from "./firebaseConnection";
import { doc, setDoc, getDoc, addDoc, collection, getDocs } from 'firebase/firestore';

import './app.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const [posts, setPosts] = useState([]);

  async function handleAdd(){
    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    // .then(() => {
    //   console.log("DADO REGISTRADO NO BANCO!")
    // })
    // .catch((error) => {
    //   console.log("GEROU ERRO" + error)
    // })

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log("CADASTRADO COM SUCESSO");
      setTitulo('');
      setAutor('');
    })
    .catch((error) => {
      console.log("ERRO: " + error);
    })
  }

  async function buscarPost() {
    // const postRef = doc(db, "posts", "12345");

    // await getDoc(postRef)
    // .then((snapshot) => {
    //   setAutor(snapshot.data().autor)
    //   setTitulo(snapshot.data().titulo)
    // })
    // .catch(() => {
    //   console.log("ERRO AO BUSCAR");
    // })

    const postsRef = collection(db, "posts");
    await getDocs(postsRef)
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })

      setPosts(lista);

    })
    .catch((error) => {
      console.log("Deu algum erro: " + error);
    })
  }
  return (
    <div>
      <h1>ReactJS + Firebase :)</h1>

      <div className="container">
        <label>Título:</label>
        <textarea
          type="text"
          placeholder="Digite o título"
          value={titulo}
          onChange={ (e) => setTitulo(e.target.value) }
        />

        <label>Autor:</label>
        <input
          type="text"
          placeholder="Autor do post"
          value={autor}
          onChange={ (e) => setAutor(e.target.value) }
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar Post</button>

        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <span>Título: {post.titulo}</span> <br />
                <span>Autor: {post.autor}</span> <br /> <br />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
