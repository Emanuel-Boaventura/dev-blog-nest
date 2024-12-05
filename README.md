# DevBlog

Back-end do site DevBlog. Este projeto precisa rodar em conjunto com o [front-end](https://github.com/Emanuel-Boaventura/dev-blog-next).

## Como rodar

- Clone o repositório e instale as dependências com `npm install`.
- Configure as variáveis de ambiente criando um arquivo `.env` com o secret do JWT.
- Caso altere a porta do backend para algo além de `33333` altere também a porta no front-end no arquivo `next.config.ts` para carregar as imagens corretamente.
- Existe já um banco db.sqlite que está levemente populado, mas caso queria testar com um banco novo só deletar o arquivo.
- Rode `npm run start:dev` para iniciar o servidor em ambiente de desenvolvimento.

## TECNOLOGIAS UTILIZADAS

Os frameworks e bibliotecas foram escolhidos por suas vantagens técnicas e por serem amplamente utilizados no meu ambiente profissional atual. Essa familiaridade garantiu um desenvolvimento mais rápido e eficiente.

### NestJS

O NestJS é um framework robusto que oferece uma arquitetura modular e escalável, ideal para desenvolvimento backend moderno. Sua integração nativa com TypeScript e suporte a ferramentas como TypeORM e validação com decorators tornam o desenvolvimento mais produtivo e estruturado, além de oferecer bibliotecas que funcionam muito bem com ele, que é o caso do typeorm, class-validator, class-transformer e @nestjs/jwt.

### TypeORM e SQLite3

- **TypeORM:** Facilita a manipulação de dados por meio de entidades e repositórios, tornando a implementação mais limpa e menos propensa a erros.
- **SQLite:** Escolhido por ser leve, prático e ideal para o escopo do projeto, permitindo rápida configuração e simplicidade de uso.

### Class-validator e Class-transformer

- **Class-validator:** Valida as propriedades de objetos com base em regras definidas nos DTOs, garantindo dados consistentes e seguros.
- **Class-transformer:** Transforma objetos em instâncias de classe e vice-versa, melhorando a consistência no fluxo de dados e permitindo o uso de decorators para validação.

### @nestjs/jwt

Fornece integração com JWT, permitindo autenticação e proteção de rotas. JWT é amplamente utilizado para transmissão segura de informações entre cliente e servidor, sendo essencial para gerenciar sessões e autorizações.
