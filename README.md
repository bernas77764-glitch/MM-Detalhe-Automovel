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
- `fundoHero` — fotografia de fundo do topo (ficheiro em `assets/`, ex.: `assets/fundo.jpg`); `""` desliga
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

O site é publicado automaticamente a partir do ramo `main` (Settings → Pages,
*Deploy from a branch*, ramo `main`, pasta `/ (root)`).

### Domínio próprio: www.mmdetalhe.pt

O ficheiro `CNAME` na raiz contém `www.mmdetalhe.pt` e diz ao GitHub Pages
qual é o domínio do site. Não o apague. No registador do domínio, o DNS
deve ter:

| Tipo  | Nome | Valor                          |
|-------|------|--------------------------------|
| A     | @    | 185.199.108.153                |
| A     | @    | 185.199.109.153                |
| A     | @    | 185.199.110.153                |
| A     | @    | 185.199.111.153                |
| CNAME | www  | bernas77764-glitch.github.io   |

Depois, em Settings → Pages → *Custom domain*, confirmar `www.mmdetalhe.pt`
e ativar *Enforce HTTPS*. O endereço sem `www` (mmdetalhe.pt) redireciona
automaticamente para o endereço com `www`.

## Ver localmente

Abra `index.html` no browser, ou:

```
python3 -m http.server 8000
```

e aceda a <http://localhost:8000>.
