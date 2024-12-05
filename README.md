# DevBlog

Back-end do site DevBlog. Este projeto pode ser rodado sozinho e testado via postman, insomnia ou outra ferramente de preferencia, mas recomendo testar diretamente com o [front-end](https://github.com/Emanuel-Boaventura/dev-blog-next) que foi construído para integrar.

## Como rodar

- Os projeto foi desenvolvido na versão `20.10.0` do node, recomendo utilizar a mesma para evitar conflitos.
- Clone o repositório e instale as dependências com `npm install`.
- Não é preciso alterar o arquivo `.env`, caso o faça siga o padrão estabelecido.
- Caso altere a porta do backend para algo além de `33333` altere também a porta no front-end no `.env` e no arquivo `next.config.ts` para comunicar corretamente com o front.
- Existe já um banco `db.sqlite` que está levemente populado, mas caso queria testar com um banco novo é só deletar o arquivo.
- Rode `npm run start:dev` para iniciar o servidor em ambiente de desenvolvimento.

## TECNOLOGIAS UTILIZADAS

Os frameworks e bibliotecas foram escolhidos por serem os mais utilizados atualmente no marcado, além de serem os que eu mais uso no dia a dia, o que me facilita no desenvolvimento do projeto.

### NestJS

O NestJS é um framework robusto que oferece uma arquitetura modular e escalável, ideal para desenvolvimento backend moderno. Seu suporte nativo a ferramentas como TypeORM, class-validator, class-transformer e @nestjs/jwt tornam o desenvolvimento mais produtivo e estruturado, onde as coisas funcionam sem ser necessário fazer muitas configurações.

### TypeORM e SQLite3

- **TypeORM:** Um dos principais ORM utilizados no mercado para manipulação de dados por meio de entidades e repositórios, tornando a implementação mais limpa e menos propensa a erros.
- **SQLite:** Escolhido por ser leve, prático e ideal para o escopo do projeto, permitindo rápida configuração e simplicidade de uso.

### Class-validator e Class-transformer

São bibliotecas que validam e transformam dados no NestJS. class-validator verifica regras definidas em DTOs, e class-transformer converte objetos recebidos em instâncias válidas. Recomendadas pelo Nest, funcionam com o ValidationPipe para validação automática e segura no pipeline.

### @nestjs/jwt

Fornece integração com JWT, permitindo autenticação e proteção de rotas. JWT é amplamente utilizado para transmissão segura de informações entre cliente e servidor, ajudando a gerenciar sessões e autorizações.
