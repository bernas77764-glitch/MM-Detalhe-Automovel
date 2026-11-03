# MM Detalhe Automóvel — Documento de passagem do projeto

> Documento de referência para recuperar, continuar ou entregar o projeto do site
> **www.mmdetalhe.pt** a outra pessoa ou a outra conta (por exemplo, Claude Teams).
> Última atualização: 3 de novembro de 2026.

---

## 1. O essencial em 30 segundos

- **O site vive no GitHub, não na conta Claude.** Tudo o que é necessário para o
  site funcionar está no repositório abaixo. Perder a conversa ou a conta Claude
  **não** afeta o site nem impede continuar o trabalho.
- **Repositório:** https://github.com/bernas77764-glitch/MM-Detalhe-Automovel
  (conta GitHub `bernas77764-glitch`, ramo principal `main`).
- **Site público:** https://www.mmdetalhe.pt (publicado pelo GitHub Pages a partir
  do ramo `main`; `mmdetalhe.pt` sem `www` redireciona para `www`).
- **Endereço técnico alternativo:** https://bernas77764-glitch.github.io/MM-Detalhe-Automovel/
- **Para recuperar o projeto noutra conta Claude:** basta ligar o GitHub à nova
  conta e abrir este repositório. Este documento, o `README.md` e o ficheiro
  `js/config.js` dão todo o contexto necessário.

---

## 2. O negócio

| Campo | Valor |
|---|---|
| Nome | MM Detalhe Automóvel |
| Atividade | Detailing automóvel (limpeza, polimento, proteção, higienização) |
| Morada | Estrada de Polima, R. Outeirinhos 171, 2785-545 São Domingos de Rana |
| Telefone / WhatsApp | 932 739 365 (internacional: 351932739365) |
| Email | mmdetalhe@gmail.com |
| Horário | Seg–Sex 09:30–18:00 · Sáb 09:30–13:30 · Dom encerrado |
| Google Maps | https://maps.app.goo.gl/c5Fsvf2EuE97XDqh8 |
| Instagram | https://www.instagram.com/mmdetalheautomovel.pt |
| Facebook | (ainda não ligado) |
| Logótipo | `assets/logo.jpg` (fundo carvão, "MM" vermelho, texto branco) |

### Serviços e preços (em vigor)

| Serviço | Preço |
|---|---|
| Limpeza simples (manutenção) | 30 € |
| Polimento de faróis (par), ~12 meses de durabilidade | 40 € |
| Higienização de estofos | desde 100 € |
| Polimento de pintura | desde 150 € |
| Aplicação de selantes na pintura | desde 100 € |
| Higienização com ozono | 15 € a 35 € |
| Serviços personalizados | sob orçamento |

Nota apresentada no site: "Preços indicativos. O valor final depende do tamanho e
do estado da viatura — peça o seu orçamento sem compromisso."

### Avaliações no site (copiadas da ficha Google)

Victor Arefiev, Jamie Dixon, Paulo Neto e Hyuntae Kim, todas com 5 estrelas. As
três em inglês têm tradução para português por baixo do texto original.

---

## 3. O que o site tem

Página única, em português de Portugal, com estas secções, por ordem:

1. **Topo** — fotografia de fundo (`assets/fundo.jpg`, carro vermelho em lavagem,
   origem Adobe Stock), título "O seu carro ao detalhe.", botões "Pedir orçamento"
   e "Ver serviços", logótipo à direita.
2. **Serviços e preços** — sete cartões com ícone, descrição e etiqueta de preço.
3. **Sobre nós** — texto de apresentação e lista de pontos fortes.
4. **Como funciona** — quatro passos: contacto, avaliação e orçamento, serviço,
   entrega.
5. **Galeria "Antes / Depois"** — quatro trabalhos com cursor deslizante para
   comparar as duas fotografias: polimento de faróis, higienização de estofos,
   limpeza de jantes, limpeza de carrinha comercial.
6. **Avaliações** — quatro avaliações do Google com ligação para ver todas e para
   deixar uma nova.
7. **Contactos** — telefone, morada, horário, email, botão WhatsApp, Instagram,
   formulário de pedido de orçamento e mapa do Google incorporado.
8. **Rodapé** — ligações rápidas e contactos.

Extras: menu de telemóvel, botão flutuante de WhatsApp, dados estruturados
(schema.org `AutoDetailing`) para o Google, etiquetas Open Graph para partilhas,
endereço canónico, layout responsivo.

### Formulário de contacto (decisão em vigor)

O formulário **não envia nada por si**: monta a mensagem com nome, telemóvel,
viatura, serviço e texto, e abre o **WhatsApp** (ou o programa de email) do
cliente com tudo preenchido; o cliente carrega em enviar. Foi ponderada uma
alternativa com envio automático por email (serviço de formulários para sites
estáticos) e o proprietário decidiu **manter como está, a reavaliar mais tarde**.

---

## 4. Tecnologia e estrutura

HTML, CSS e JavaScript puros. Sem frameworks, sem dependências, sem processo de
build. Qualquer editor de texto serve.

```
index.html          página (estrutura e textos fixos)
css/style.css       estilos; paleta: #2b2b2b carvão, #e8262b vermelho, branco
js/config.js        DADOS DO NEGÓCIO — contactos, horário, serviços, galeria,
                    avaliações, redes sociais, fotografia de fundo
js/main.js          comportamento: preenche a página a partir de config.js,
                    menu, formulário, comparador antes/depois, mapa
assets/logo.jpg     logótipo
assets/fundo.jpg    fotografia de fundo do topo (2000 px, ~230 KB)
assets/galeria/     8 fotografias antes/depois (1200 px cada, ~1,6 MB no total)
CNAME               contém "www.mmdetalhe.pt" — NÃO APAGAR (fixa o domínio)
.nojekyll           faz o GitHub Pages servir os ficheiros tal como estão
README.md           instruções de edição e publicação
PROJETO.md          este documento
```

Tipo de letra: Montserrat, carregada do Google Fonts.

### Regra para alterar CSS ou JavaScript

Os browsers guardam `css/style.css`, `js/config.js` e `js/main.js` em cache.
Sempre que um destes ficheiros mudar, aumentar o número `?v=` nas três
referências em `index.html` (hoje `?v=5`; passar a `?v=6`, e assim por diante).
Sem isto, os visitantes podem ver a versão antiga durante uns minutos.

---

## 5. Como fazer as alterações mais comuns

Quase tudo se faz em **`js/config.js`**, sem tocar no resto:

| Quero… | Onde |
|---|---|
| Mudar telefone, email, morada, horário | campos no topo de `config.js` |
| Mudar preços ou acrescentar/retirar serviços | lista `servicos` |
| Acrescentar fotografias antes/depois | carregar os JPG em `assets/galeria/` e acrescentar o par à lista `galeria` |
| Trocar a fotografia de fundo | substituir `assets/fundo.jpg` (ou alterar `fundoHero`) |
| Acrescentar/trocar avaliações | lista `avaliacoes` |
| Ligar o Facebook | campo `facebook` |
| Mostrar o mapa de outra forma | campo `mapEmbedUrl` |
| Mudar os textos fixos (títulos, "Sobre nós", passos) | `index.html` |

Fotografias: carregar aos pares, do mesmo ângulo, idealmente com 1200 px de
largura ou menos. Pode carregar-se diretamente no GitHub ("Add file → Upload
files") e depois pedir para as ligar à galeria.

### Fluxo de trabalho usado até agora

1. Alterações feitas num ramo de trabalho
   (`claude/mm-detalhe-automovel-site-w34xh2`).
2. Pull request para o `main`, revisto e fundido pelo proprietário (ou pelo
   assistente a pedido).
3. O GitHub Pages publica o `main` automaticamente em 1–2 minutos.

Para quem continuar o projeto noutra conta: qualquer ramo novo serve; o
importante é que as alterações acabem no `main`.

---

## 6. Publicação, domínio e DNS

**GitHub Pages:** Settings → Pages → "Deploy from a branch", ramo `main`, pasta
`/ (root)`. Custom domain: `www.mmdetalhe.pt`. "Enforce HTTPS" deve ficar
marcado (confirmar se ainda estiver cinzento: o certificado demora até uma hora
a ser emitido na primeira vez).

**Domínio:** `mmdetalhe.pt`, registado pelo proprietário num registador externo
(o nome do registador não ficou registado nesta conversa; a renovação anual é
feita lá). Registos DNS configurados e verificados a 1 de outubro de 2026:

| Tipo | Nome | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | bernas77764-glitch.github.io |

Se o site deixar de abrir no domínio: verificar (1) que o ficheiro `CNAME`
continua no `main`, (2) que os registos acima continuam no registador, (3) que o
domínio não expirou.

---

## 7. Histórico do que foi feito

| Data | Pull request | Conteúdo |
|---|---|---|
| 15 set 2026 | #1 | Site inicial: estrutura, design, contactos, horário, Instagram, email, avaliações do Google |
| 16 set 2026 | #2 | Lista de serviços e preços atual; galeria antes/depois com 8 fotografias otimizadas |
| 16 set 2026 | #3 | Número de versão nos ficheiros CSS/JS para contornar a cache dos browsers |
| 16 set 2026 | #4 | Fotografia de fundo no topo da página (otimizada de 8,8 MB para 230 KB) |
| 16 set 2026 | #5 | Correção: "colantes" → "selantes" na pintura, com descrição e ícone adequados |
| 1 out 2026 | #6 | Domínio próprio www.mmdetalhe.pt: CNAME, endereço canónico, Open Graph, DNS documentado |

Todos os pull requests estão fundidos. O histórico completo está em
https://github.com/bernas77764-glitch/MM-Detalhe-Automovel/commits/main.

---

## 8. Decisões e pendentes

**Decidido:**
- Site estático no GitHub Pages, sem custos de alojamento.
- Formulário abre o WhatsApp em vez de enviar automaticamente (ver secção 3).
- Fotografias originais de alta resolução são substituídas por versões otimizadas
  no repositório; os originais ficam no histórico do Git.

**Pendente / ideias para o futuro:**
- Envio automático do pedido de orçamento por email, com agradecimento na página
  (a reavaliar pelo proprietário).
- Ligar a página de Facebook, se existir.
- Atualizar o site na ficha do Google Maps e no Instagram para www.mmdetalhe.pt.
- Mais trabalhos na galeria à medida que houver fotografias.
- Google Business Profile e Google Search Console para acompanhar visitas e
  pesquisas (opcional).

---

## 9. O que NÃO está no GitHub (e onde está)

| Item | Onde vive | Nota |
|---|---|---|
| Domínio mmdetalhe.pt | Registador externo, conta do proprietário | Renovação anual; DNS configurado lá |
| Pré-visualização em claude.ai | Conta Claude pessoal (artefacto) | Apenas demonstração; o site real é o do GitHub. Pode ser ignorada |
| Conta GitHub `bernas77764-glitch` | github.com | É aqui que está o projeto. Convém guardar as credenciais e ativar autenticação de dois fatores |
| Licença da fotografia de fundo | Adobe Stock (imagem 598538072) | Confirmar que a licença está em nome do negócio |
| Fotografias originais | Histórico do Git (commits "Add files via upload") | Recuperáveis com `git show` se forem precisas |

---

## 10. Como recuperar o projeto numa conta nova (checklist)

1. Ligar o GitHub à nova conta Claude (ou dar acesso ao repositório a outra conta
   GitHub, em Settings → Collaborators).
2. Abrir o repositório `bernas77764-glitch/MM-Detalhe-Automovel`.
3. Ler este `PROJETO.md` e o `README.md`.
4. Confirmar que o site abre em https://www.mmdetalhe.pt.
5. Continuar a trabalhar: alterar `js/config.js` ou `index.html`, subir o `?v=`,
   fazer pull request para o `main`.

Se o repositório tiver de mudar de dono (por exemplo, para uma organização
GitHub da empresa): Settings → General → "Transfer ownership". Depois, em
Settings → Pages, confirmar o domínio `www.mmdetalhe.pt`, e no registador
atualizar o CNAME `www` para `<novo-dono>.github.io`.
