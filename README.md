🌬️ Painel de Qualidade do Ar
Essse projeto é parte de um desafio técnico.
O objetivo é oferecer aos cidadãos um painel que exibe, de forma clara e acessível, a qualidade do ar em diferentes bairros do Rio de Janeiro.

📸 Preview

🚀 Tecnologias Utilizadas
Next.js 15
React 19
TypeScript
Tailwind CSS
Leaflet + React Leaflet (para exibir um mapa interativo com os bairros do EJ)
Recharts
Vitest + Testing Library (para testes unitários)

✨ Funcionalidades Implementadas
Visualização da qualidade do ar por bairro no Mapa Interativo.
Tabela com dados recentes de qualidade do ar.
Filtros por bairro e qualidade.
Alternância entre visualização de mapa e tabela.
Exibição de detalhes e gráfico em modal ao clicar em um bairro.
Dados simulados via API mockada interna (/api/qualidade-ar).
Responsividade para dispositivos móveis.
Acessibilidade com uso de labels, roles e navegação por teclado.
Testes automatizados com Vitest para componentes e interações principais.

🧠 Decisões Técnicas
O projeto foi iniciado com o template oficial do Next.js 15 com App Router e Tailwind CSS.
Utilizei componentização para garantir reutilização e facilitar os testes.
Como o SWC do Next não é compatível com todas as bibliotecas de testes, optei por usar Babel com Vitest para conseguir rodar os testes.
As fontes foram configuradas manualmente via CSS para evitar conflito com next/font ao usar Babel.
Os dados estão mockados internamente na rota src/app/api/qualidade-ar/route.ts, simulando uma API REST.

🛠️ Como Rodar o Projeto Localmente
Clone o repositório: git clone https://github.com/prefeitura-rio/desafio-frontend-developer
navegue até o repositório clonado: cd seu-repo

    Instale as dependências: npm install

    Rode o servidor local: npm run dev
    Acesse: http://localhost:3000

📁 Estrutura do Projeto (resumida)
src/
|\_\_ **tests**/
| |**Filtro.test.tsx
| |**page.test.tsx
├── app/
│ ├── api/qualidade-ar/route.ts # Mock da API
│ ├── globals.css
│ └── layout.tsx
| └── page.tsx
├── components/
│ ├── Filtro.tsx
│ ├── Footer.tsx
│ ├── Header.tsx
| |\_\_ Home.tsx
│ ├── Mapa.tsx
│ ├── ModalDetalhes.tsx
│ ├── QualidadeIcone.tsx
│ └── Tabela.tsx
├── hooks/
│ └── useQualidadeAr.ts
├── vitest.setup.ts

🧪 Como Rodar os Testes
npm run test
Ou, para rodar apenas um dos testes:
npm run test src/**tests**/<nome_do_teste_a_ser_rodado>
EX:npm run test src/**tests**/Filtro.test.tsx

✅ Checklist para Entrega
Interface clara e responsiva ✅
Filtros funcionais ✅
Dados e gráfico em modal ✅
Código limpo e organizado ✅
README documentado ✅
Testes automatizados ✅

🤝 Considerações Finais
Este projeto foi desenvolvido com foco em boas práticas de acessibilidade, responsividade, organização e clareza de código.
Os testes foram pensados para garantir confiabilidade nas principais funcionalidades da aplicação.

Fico à disposição para quaisquer dúvidas ou para apresentar o projeto!
