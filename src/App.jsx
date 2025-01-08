import { useState, useEffect } from "react";
import "./App.css";

const url = "http://localhost:3000/produtos";

function App() {
	// const [listaProdutos] = useState(dataBase);
	const [produtos, setProdutos] = useState([]);
	const [nome, setNome] = useState([]);
	const [preco, setPreco] = useState([]);

	//1 - Resgatando dados
	useEffect(() => {
		async function fetchData() {
			//primeiro vamos fazer com que espere receber as informações da url, que no caso está vinculado a variavel 'url'.
			const res = await fetch(url);

			//após receber a confirmação de await da url(res) com as informações, vamos transformar isso em json interno.
			const data = await res.json();

			//agora vamos salvar isso no nosso state de Produtos.
			setProdutos(data);
		}

		fetchData();
	}, []);

	//2 - Adição de produtos
	const handleSubmit = async (submit) => {
		submit.preventDefault();

		const produto = {
			nome,
			preco,
		};

		const res = await fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(produto),
      });


	};

	return (
		<main className="App">
			<h1>Lista de produtos</h1>

			<ul>
				{produtos.map((produto) => (
					<li key={produto.key}>
						{produto.nome} - R$: {produto.preco}
					</li>
				))}
			</ul>

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
