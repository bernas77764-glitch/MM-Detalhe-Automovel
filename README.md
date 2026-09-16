# MM Detalhe Automóvel — site

Site institucional da **MM Detalhe Automóvel** (detailing automóvel).
Página única, sem dependências nem processo de build: HTML, CSS e JavaScript puros.

## Estrutura

```
index.html      página principal
css/style.css   estilos (paleta do logótipo: carvão, vermelho, branco)
js/config.js    DADOS DO NEGÓCIO — contactos, horário, redes, avaliações
js/main.js      comportamento (menu, formulário, avaliações, mapa)
assets/logo.jpg logótipo
assets/galeria/ (criar) fotografias dos trabalhos
```

## Atualizar contactos, horário e redes sociais

Edite apenas o ficheiro `js/config.js`. Todos os campos estão comentados:

- `telefone` — como aparece no site (ex.: `912 345 678`)
- `whatsapp` — número internacional sem espaços nem `+` (ex.: `351912345678`)
- `email`, `morada`, `horario`
- `googleMapsUrl` — ligação da ficha no Google Maps
- `googleReviewUrl` — ligação direta para "Escrever avaliação"
- `mapEmbedUrl` — para mostrar o mapa dentro do site: no Google Maps →
  **Partilhar → Incorporar um mapa** → copiar só o valor de `src="..."`
- `servicos` / `precosNota` — lista de serviços com preço, descrição e ícone
- `instagram`, `facebook` — deixar `""` para esconder o ícone
- `avaliacoes` — lista de avaliações apresentadas na secção "Avaliações"

## Adicionar fotografias à galeria (Antes / Depois)

1. Crie a pasta `assets/galeria/` e coloque lá as fotografias (JPG, idealmente
   com 1200 px de largura ou menos). Use um par por trabalho, por exemplo
   `farois-antes.jpg` e `farois-depois.jpg`, tiradas do mesmo ângulo.
2. Em `js/config.js`, acrescente cada par à lista `galeria`:

   ```js
   galeria: [
     { titulo: "Polimento de faróis", antes: "assets/galeria/farois-antes.jpg", depois: "assets/galeria/farois-depois.jpg" },
   ],
   ```

   O site mostra cada par com um cursor deslizante para comparar o antes e o depois.

## Depois de alterar CSS ou JavaScript

Os browsers guardam `css/style.css`, `js/config.js` e `js/main.js` em cache.
Para garantir que os visitantes recebem a versão nova, aumente o número
`?v=` nas três referências no fim e no `<head>` de `index.html`
(por exemplo `?v=3` → `?v=4`) sempre que alterar um desses ficheiros.

## Formulário de contacto

O formulário não precisa de servidor: gera a mensagem e abre o **WhatsApp**
(número em `config.js`) ou o programa de **email** do cliente com o texto
pré-preenchido.

## Publicar (GitHub Pages)

1. No GitHub, em **Settings → Pages**, escolha *Deploy from a branch*,
   ramo `main`, pasta `/ (root)`.
2. O site fica disponível em `https://<utilizador>.github.io/MM-Detalhe-Automovel/`.
3. Para usar um domínio próprio (ex.: `mmdetalheautomovel.pt`), adicione-o em
   **Settings → Pages → Custom domain** e configure o DNS conforme indicado.

## Ver localmente

Abra `index.html` no browser, ou:

```
python3 -m http.server 8000
```

e aceda a <http://localhost:8000>.
