# PROMPTS.md

Registro dos prompts usados durante o desenvolvimento deste projeto com Claude.

A IA foi utilizada como ferramenta de apoio para acelerar tarefas repetitivas, revisar implementações e gerar sugestões. Todo o código gerado foi revisado, adaptado ao projeto e validado manualmente antes de ser incorporado.

## Front-end

**Prompt:** "add a spinner loading when load page"
Criou um componente `Spinner` reutilizável e adicionou estado de `loading` explícito na Home (antes o fetch só deixava a lista vazia durante o carregamento, o que renderizava "nenhum produto" incorretamente).

**Prompt:** "add custom 404 page"
Criou `pages/NotFound` com o mesmo estilo visual das outras páginas e uma rota catch-all (`route("*", ...)`) no `routes.ts`.

**Prompt:** "adicione um resumo do pedido pos compra no front com base no retorno do checkout"
Trocou a tela de sucesso (que usava apenas estado local) por uma tela que renderiza os campos reais devolvidos pelo `POST /checkout` (id do pedido, status, quantidade, total, data), sincronizando o tipo `Order` do front com o do back-end.

## Back-end

**Prompt:** "add a middleware that add delay (fake) to api"
Centralizou os `setTimeout` que estavam espalhados em rotas individuais em um middleware único (`middleware/fakeDelay.ts`), aplicado globalmente no `index.ts`, e removeu a duplicação nas rotas.

## Documentação
**Prompt:** "Gere um README.md e PROMPTS.md inicial"
Criou os arquivos `README.md` e `PROMPTS.md` na raiz do projeto, contendo instruções de instalação e execução, visão geral da solução e o registro inicial dos prompts utilizados durante o desenvolvimento.
