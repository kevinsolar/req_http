import { useState } from "react";
import dataBase from "../data/db.json";
import "./App.css";

function App() {
	const [listaProdutos] = useState(dataBase);

	return (
		<main className="App">
			<h1>Lista de produtos</h1>
		</main>
	);
}

export default App;
