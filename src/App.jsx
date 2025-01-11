import { useState, useEffect } from "react";
import "./App.css";

// 4 - custom hook
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/produtos";

function App() {
   // const [listaProdutos] = useState(dataBase);
   const [produtos, setProdutos] = useState([]);
   const [nome, setNome] = useState([]);
   const [preco, setPreco] = useState([]);

   const { data: itens, httpConfig, loading } = useFetch(url);

   //1 - Resgatando dados
   // useEffect(() => {
   // 	async function fetchData() {
   // 		//primeiro vamos fazer com que espere receber as informações da url, que no caso está vinculado a variavel 'url'.
   // 		const res = await fetch(url);

   // 		//após receber a confirmação de await da url(res) com as informações, vamos transformar isso em json interno.
   // 		const data = await res.json();

   // 		//agora vamos salvar isso no nosso state de Produtos.
   // 		setProdutos(data);
   // 	}

   // 	fetchData();
   // }, []);

   //2 - Adição de produtos
   const handleSubmit = async (submit) => {
      submit.preventDefault();

      const produto = {
         nome,
         preco,
      };

      // const res = await fetch(url, {
      // 	method: "POST",
      // 	headers: {
      // 		"Content-Type": "application/json",
      // 	},
      // 	body: JSON.stringify(produto),
      // });

      // //3 - Carregamento dinamico dos dados
      // /* Como não podemos adicionar diretamente o res, pois ele é um json,
      //   vamos transformar ele em um objeto JavaScript, dessa forma:  */
      // const produtosAdicionados = await res.json();

      // /* Agora faço com que esses dados sejam acressentados ao meu setprodutos, para fazer o incremento de dados. */
      // setProdutos((prevProdutos) => [...prevProdutos, produtosAdicionados]);
      //   //Utilizamos o spred operator para "espalhar os dados anteriores" e logo após adicionar um novo, com o a variavel após a virgula

      {/* 5- Refatorando POST */ }
      httpConfig(produto, "POST");

      //Após a adição, vamos zerar os inputs com:
      setNome("");
      setPreco("");
   };

   return (
      <main className="App">
         <h1>Lista de produtos</h1>

         {loading && <p>Carregando...</p>}

         {!loading && (
            <ul>
               {itens && itens.map((produto) => (
                  <li key={produto.id}>
                     {produto.nome} - R$ {produto.preco}
                  </li>
               ))}
            </ul>
         )}

         <div className="add-produto">
            <form onSubmit={handleSubmit}>
               <label>
                  Nome:
                  <input
                     type="text"
                     value={nome}
                     name="nome"
                     onChange={(e) => setNome(e.target.value)}
                  />
               </label>
               <label>
                  Preço:
                  <input
                     type="number"
                     value={preco}
                     name="preco"
                     onChange={(e) => setPreco(e.target.value)}
                  />
               </label>
               <input type="submit" value="Criar" />
            </form>
         </div>
      </main>
   );
}

export default App;
