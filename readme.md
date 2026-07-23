# CaseCellShop

Loja virtual de capinhas para celular — mini fluxo de compra (listagem de produtos + checkout) da CaseCellShop.

Stack: Node.js + TypeScript + Express no back-end, React + TypeScript (React Router 8 / Vite) no front-end. Dados de produtos e pedidos ficam em memória (sem banco de dados).

## Estrutura

```
backend/   API REST (Express)
frontend/  Aplicação React (React Router)
```

## Como rodar

Requer Node.js 18+.

### 1. Back-end

```bash
cd backend
npm install
npm run dev
```

A API sobe em `http://localhost:3000`.

### 2. Front-end

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação sobe em `http://localhost:5173`. Abra essa URL no navegador — o front já está configurado para chamar a API em `http://localhost:3000`.

## Endpoints da API

| Método | Rota              | Descrição                                    |
| ------ | ----------------- | --------------------------------------------- |
| GET    | `/products`       | Lista todos os produtos                       |
| GET    | `/products/:id`   | Retorna um produto pelo id (404 se não existir) |
| POST   | `/checkout`       | Cria uma tentativa de compra (ver abaixo)      |

`POST /checkout` espera:

```json
{ "productId": 1, "quantity": 2 }
```

Respostas:
- `201` — pedido criado, retorna o objeto `Order` (id, status, product_id, user_id, quantity, total_price, created_at).
- `400` — `productId`/`quantity` inválidos, ou quantidade maior que o estoque disponível.
- `404` — produto não encontrado.

Todas as rotas têm um atraso artificial (`fakeDelay` middleware, ~1s) para simular latência de rede e permitir observar os estados de carregamento no front.

## Decisões e trade-offs

- **Sem autenticação**: como não há sistema de usuários, `POST /checkout` grava um `user_id` fixo (`0`, "guest"). Em um cenário real isso viria de uma sessão autenticada.
- **Consistência de estoque**: a checagem de estoque e o decremento em `checkout.router.ts` acontecem de forma síncrona, sem `await` entre as duas operações — como o Node.js roda em single thread, isso evita condição de corrida entre requisições concorrentes para o mesmo produto (ver Problema 2 do case).
- **Dados em memória**: produtos e pedidos são arrays em memória, reiniciados a cada restart do servidor — suficiente para o escopo da mini-tarefa, sem necessidade de banco real.
- **Checkout "compre agora"**: cada card de produto leva direto a uma página de checkout para aquele item (com seletor de quantidade), em vez de um carrinho com múltiplos itens — mantém o fluxo simples dado que não havia carrinho pré-existente.

Veja também [PROMPTS.md](PROMPTS.md) para o histórico de uso de IA no desenvolvimento.
