# pedido-familiar

App de pedidos (PWA) do Restaurante Familiar e do Esquinão Lanchonete. Site estático (GitHub Pages) em https://pedidos.restaurantefamiliar.com.br.
Regras de negócio ficam no banco (funções `mr_app_*`); o n8n só liga o site ao banco (`/webhook/app-pedidos/...`).
A cada publicação, trocar `VERSAO` no `index.html` para o app instalado avisar a nova versão.
Os ícones (`icon-192.png`, `icon-512.png`, `logo.png`) são provisórios: trocar pelos definitivos mantendo o mesmo nome.
