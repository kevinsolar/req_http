import { useState, useEffect } from "react";


//4 - custom hook
export const useFetch = (url) => {
   const [data, setData] = useState(null);

   {/* 5 - refatorando o POST */ }
   //config -> sera responsavel por fazer a confiugração do metodo, headers e body.
   const [config, setConfig] = useState(null);

   //method -> sera responsavel por fazer a configuração do metodo. ex: POST, GET, PUT, DELETE
   const [method, setMethod] = useState(null);

   //callFetch -> sera responsavel por ser mapeado, sempre que eu altera-lo, vou chamar o Fetch novamente para poder trazer os dados de novo.
   const [callFetch, setCallFetch] = useState(false);

   {/* 6 - Loading */}
   const [loading, setLoading] = useState(false);

   {/* 7 - Error */}
   const [error, setError] = useState(null);

   //Fazendo a configuração do metodo POST automaticamente, para não precisar ficar passando toda vez que for fazer um POST.
   const httpConfig = (data, method) => {
      if (method === "POST") {
         setConfig({
            method,
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });

         setMethod(method);
      }
   }

   useEffect(() => {
      const fetchData = async () => {
         //6 - Loading
         setLoading(true);

         try {
            const res = await fetch(url);

            const json = await res.json();

            setData(json);
         } catch (error) {
            setError("Ocorreu um erro ao buscar os dados");
         }

         setLoading(false);
      }

      fetchData();
   }, [url, callFetch]);

   {/* 5 - refatorando o POST */ }
   useEffect(() => {
      const httpRequest = async () => {
         if (method === "POST") {
            let fetchOptions = [url, config];

            const res = await fetch(...fetchOptions);

            const json = await res.json();

            setCallFetch(json)
         }
      }

      httpRequest();
   }, [config, method, url]);

   return { data, httpConfig, loading, error };
}