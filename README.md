# SIM Facilita - Rede Social

## 1. Seção Inicial

Bem-vindo ao projeto de rede social simples da SIM Facilita. Confira o [deploy do projeto aqui](https://desafio-simfacilita-front.vercel.app/).

## 2. Sobre

O projeto frontend atende aos requisitos da SIM Facilita:

- Cadastro e login com campos detalhados;
- Visualização de usuários e seus posts;
- Posts limitados a 500 caracteres;
- Comentários nos posts limitados a 150 caracteres;
- Atualização de informações de perfil e senha;
- Exclusão de conta com remoção total de informações.

Bônus adicionado:
- Segurança: biblioteca bcrypt para que as senhas venham encriptadas;
- Segurança: Persistência do usuário por tokenização;

## 3. Tecnologias

- Vite
- TypeScript
- Axios
- Dayjs
- React
- React-Icons
- React-Loader-Spinner
- React-Modal
- React-Router-Dom
- Styled-Components
- SweetAlert2
- SweetAlert2-React-Content

## 4. Como Rodar

1. Clone o projeto
2. Instale as dependências com `npm i`
3. Crie um arquivo `.env` na raiz do projeto e cole o conteúdo de `.env.example`
4. Execute `npm run dev`

## 5. Pontos de Melhorias Futuras

- O recurso de seguir e deixar de seguir está funcionando corretamente no backend porém no frontend está com um bug ainda sob investigação;
- Adição de funcionalidade para deletar posts e comentários;
- Layout com Sidebar para desktop;
- (Implementado no backend apenas): Exibição do número de seguidores e seguindo;
- Feed apenas com os posts da pessoa que você segue.
- Implementar testes unitários e E2E.

Espero que essas instruções sejam úteis. Em caso de dúvidas ou sugestões, sinta-se à vontade para entrar em contato.
