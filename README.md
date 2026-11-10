# Technalum Esquadrias

Site em React e Vite, com páginas de soluções e informações legais.

## Desenvolvimento

- `npm install`: instala as dependências.
- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: gera o site em `dist`.
- `npm run preview`: permite conferir o build localmente.
- `npm run lint`: verifica o código com ESLint.

## Organização dos arquivos

```text
public/
  favicon.svg
  images/
    carrossel/       Imagens dos cards de soluções
    fundos/          Imagens de fundo do hero e do contato
    icones/          Ícones de redes sociais
    logos/           Identidade visual da Technalum
    marcas/          Logos dos parceiros
    solucoes/        Galerias separadas por tipo de solução
  videos/            Vídeos utilizados pelo site
assets/
  nao-utilizados/    Materiais preservados sem referência no código
src/                Componentes React e estilos
```

Os arquivos de `public` são servidos diretamente pela raiz do site. Por exemplo,
`public/images/logos/technalum.png` é usado como `/images/logos/technalum.png`.
Use nomes em letras minúsculas, sem espaços ou acentos e com palavras separadas
por hífen. Ao renomear ou mover uma imagem, atualize suas referências no código.

A pasta `assets/nao-utilizados` preserva o vídeo comprimido alternativo, o logo
escrito, o sprite de ícones e as imagens do template sem uso atual. Esses arquivos
não entram no build automaticamente. Para utilizá-los, mova-os para a categoria
correspondente em `public` e inclua a referência no código.

Os arquivos HTML na raiz são os pontos de entrada configurados em `vite.config.js`.
