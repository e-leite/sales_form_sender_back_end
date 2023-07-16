# Sales Form Sender

## Sobre o projeto
O projeto é uma versão em NodeJs e Angular de uma aplicação real contruída por mim utilizando Microsoft PowerApps para atender a uma necessidade conforme [Documento de requisitos][PlDocReq].

## Objetivo

#### Apresentar os conhecimento adquiridos em:

- Análise de requisitos.
- Modelagem de banco de dados.
- Desenvolvimento de software.

## Modelagem conceitual
![](https://github.com/e-leite/assets_and_documents/blob/main/Modelagem_Conceitual_Sales_Form_Sender.png)

## Modelagem lógica
![](https://github.com/e-leite/assets_and_documents/blob/main/Modelagem_L%C3%B3gica_Sales_Form_Sender.png)

## Requisitos funcionais

### RF001
O sistema deve permitir criação de pedidos.

### RF002
O sistema deve permitir a exclusão de pedidos.

### RF003
O sistema deve apresentar uma lista de pedidos.

### RF004
O sistema deve permitir a adição de produtos ao pedido.

### RF005
O sistema deve permitir que ao adicionar produtos ao pedido possa ser realizado filtro dos produtos por categoria.

### RF006
O sitstema deve permitir que ao adicionar produtos ao pedido possa ser realizado busca pelo nome do produto.

### RF007
O sistema deve permitir listar os produtos do pedido.

### RF008
O sistema deve permitir exclusão de produtos do pedido.

### RF009
O sistema deve permitir a solicitação de autorização para uso da primeira faixa de preço.

### RF010
O sistema deve permitir envio de pedidos para departamento de atendimento.

### RF011
O sistema deve permitir a seleção do local de faturamento durante a criação do pedido.

### RF012
O sistema deve selecionar automaticamente o prazo de pagamento cadastrado para o cliente durante a criação do pedido porém deve ser permitido a escolha das outras opções disponíveis.

### RF013
O sistema deve permitir a seleção do tipo de frete "Por conta do cliente" ou "Por conta da empresa".

### RF014
O sistema deve disponibilizar campo para informar o nome da transportadora quando o frete for por conta do cliente.

### RF015
O sistema deve disponibilizar campo para informar o nome do contato da transportadora quando o frete for por conta do cliente.

### RF016
O sistema deve disponibilizar campo para informar o telefone da transportadora quando o frete for por conta do cliente.

### RF017
O sistema deve disponibilizar campo para informar o e-mail da transportadora quando o frete for por conta do cliente.

## Requisitos não funcionais

### RNF001
O sistema não deve permitir alteração de pedidos com status diferente de rascunho.

### RNF002
O sitema não deve permitir a exclusão de pedidos com status diferente de rascunho.

### RNF003
O sistema não deve permitir que pedidos com status pendente de autorização de preços sejam enviados para o departamento de atendimento.

### RNF004
O sistema não deve permitir que pedidos com status de autorização de preço negada sejam enviados para o departamento de atendimento.

### RNF005
O sistema não deve permitir que o campo quantidade km estrada de chão fique em branco caso o endereço do cliente tenha estrada de chão.

### RNF006
Caso a autorização para uso da primeira faixa de preço seja negada o vendedor deve fazer a alteração do preço utilizado outra faixa.

## Tecnologias utilizadas

### Front end

- Angular
- Angular Material

### Back end

- NodeJs
- Typescript

### Autor

Emerson Leite

[linkedin.com/in/emerson-leite-98ba0a192][PlMyLinkedin]


[PlDocReq]: <https://github.com/e-leite/assets_and_documents/blob/main/Documento-Requisitos.md>
[PlRF]: <https://github.com/e-leite/assets_and_documents/blob/main/rf_sales_form_sender.md>
[PlRNF]: <https://github.com/e-leite/assets_and_documents/blob/main/rnf_sales_form_sender.md>
[PlMyLinkedin]: <https://www.linkedin.com/in/emerson-leite-98ba0a192>
