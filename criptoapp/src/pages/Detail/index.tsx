import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { type ApiProps } from "../Home"

import styles from "./detalhes.module.css"

interface ResponseData {
  data: ApiProps
}

interface ErrorData {
  error: string
}

type DataProps = ResponseData | ErrorData

export function Detalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<ApiProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCoin() {
      try {
        const response = await fetch(`https://rest.coincap.io/v3/assets/${id}`, {
          headers: {
            Authorization: "Bearer af8f8e664700c3f359e5119955b33df610b4f0f7584678aeb537c45ed63f8dee"
          }
        });

        const data: DataProps = await response.json();
        console.log("API retornou:", data);

        if ("error" in data) {
          navigate("/");
          return;
        }

        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        });

        const priceCompact = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        });

        const resultData = {
          ...data.data,
          precoFormatado: price.format(Number(data.data.priceUsd)),
          marketFormatado: priceCompact.format(Number(data.data.marketCapUsd)),
          volumeFormatado: priceCompact.format(Number(data.data.volumeUsd24Hr)),
          mudancaFormatado24: Number(data.data.changePercent24Hr).toFixed(2),
        };

        setCoin(resultData);
        setLoading(false);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        navigate("/");
      }
    }

    getCoin();
  }, [id]);

  if (loading || !coin) {
    return (
      <div className={styles.container}>
        <h3 className={styles.center}>Carregando detalhes...</h3>
      </div>
    );
  }

   return (
    <div className={styles.container}>
      <h1 className={styles.center}>{coin?.name}</h1>
      <h1 className={styles.center}>{coin?.symbol}</h1>

      <section className={styles.content}>
        <img
          src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
          alt="Logo da moeda"
          className={styles.logo}
        />
        <h1>{coin?.name} | {coin?.symbol}</h1>

        <p><strong>Preço: </strong>{coin?.precoFormatado}</p>

        <a>
          <strong>Mercado: </strong>{coin?.marketFormatado}
        </a>

        <a>
          <strong>Volume: </strong>{coin?.volumeFormatado }
        </a>

        <a>
          <strong>Mudança 24h: </strong><span className={Number(coin?.changePercent24Hr) > 0 ? styles.protift : styles.loss} >{Number(coin?.changePercent24Hr).toFixed(3)}</span>
        </a>


      </section>

    </div>
  );
}