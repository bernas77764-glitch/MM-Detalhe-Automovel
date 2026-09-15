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
- `instagram`, `facebook` — deixar `""` para esconder o ícone
- `avaliacoes` — lista de avaliações apresentadas na secção "Avaliações"

## Adicionar fotografias à galeria

1. Crie a pasta `assets/galeria/` e coloque lá as fotografias (JPG, idealmente
   com 1200 px de largura ou menos).
2. Em `index.html`, na secção `id="galeria"`, substitua cada bloco

   ```html
   <figure class="gallery-item ph"><figcaption>Polimento e correção de pintura</figcaption></figure>
   ```

   por

   ```html
   <figure class="gallery-item">
     <img src="assets/galeria/polimento-1.jpg" alt="Polimento em BMW Série 3" loading="lazy" />
     <figcaption>Polimento e correção de pintura</figcaption>
   </figure>
   ```

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
