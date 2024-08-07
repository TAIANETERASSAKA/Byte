//let saldo =3000;
//const elementoSaldo = document.querySelector( ".saldo-valor .valor")  //que o elementoSaldo fornecera o numero para a tag span 'valor' que esta dentro da tag pai 'saldo valor'
//elementoSaldo.textContent= saldo; //faz com que a variavel saldo seja inserido no elemento saldo
//agora preciso pegar os elementos  que foram inseridos no formulario de 'block-nova-transaçao', no estanto queremos pegar apenas o que ta no form//
//const elementoFormulario = document.querySelector(".block-nova-transacao form")
//agora preciso adicionar uma função, para toda vez que o EVENTO de SUBMISSAO informações dentro do formulario, pois o 
//comportamento padrao é que ao submeter,a pagina recarrega, e nesse caso quero o formulario seja submetido sem recarregar a pagina//
//elementoFormulario.addEventListener('submit', function(event){
// event.preventDefault();  //o preventdefault impede que o comportamento padrao seja executado
//alem disso, toda vez que o formulario for submetido, queremos ter certeza que todos os campos foram preenchidos, então:
//if(!elementoFormulario.checkValidity()){  //ou seja, SE for verificado que elementoFormulario não esta todo preenchido
//alert("Por favor, preencha todos os campos da transação"); //essa mensagem será exibida
// return;
//} 
//agora preciso coletar as informações inseridas no formulario
//primeiro vamos nomea-las
//const inputTipo= elementoFormulario.querySelector("#tipoTransacao")
//const inputValor= elementoFormulario.querySelector("#valor")
//const inputData= elementoFormulario.querySelector("#data")
//agora precisamos recebelas, então criaremos algumas variaveis
//let tipoTransacao= inputTipo.value //ou seja a variavel tipoTransacao recebera o valor guardado dentro da constante inputTipo
//let data= inputData.value //ou seja a variavel data recebera o valor guardado dentro da constante inputData
//let valor= inputValor.value //ou seja a variavel valor recebera o valor guardado dentro da constante inputValor
//agora faremos a atualização do saldo de acordo com o tipo de transação
//if(tipoTransacao= "Depósito"){
// saldo+=  valor; //ou seja o valor é somado ao saldo
//}else if(tipoTransacao= "Transferência"){
//saldo-= valor; //ou seja, o valor é subtraido ao saldo
//}else if(tipoTransacao= "Pagamento de Boleto"){
//saldo-= valor; //ou seja, o valor é subtraido ao saldo
//}else{
//alert("Tipo de Transação invalida")
//return;
//}
//para que o saldo receba o valor atualizado
//elementoSaldo.textContent= saldo;
//apos isso, voce vera que ao inves de somar/subtrair o JS concatenou os valor, isso porque o JS ve toda informação vinda
//de formulario, ao inves de somar/subtrair, ele concatena, por isso, as vezes, é interessante usar o typescript
//agora criarei um objeto com todas essas informaoes
//const novaTransacao={
//tipoTransacao: tipoTransacao,
//valor: valor,
//data: data
//}
//console.log(novaTransacao) //isso é só para conferir atraves do devTools se as informações foram guardadas
//apos coletarmos todas as informaçoes, podemos resetar o formulario
//elementoFormulario.reset();
//});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//para corrigirmos o erro, vamos mudar o arquivo de js para ts
//apos isso varios erros que antes nao apareciam, comecarção ser indicados
var saldo = 3000;
var elementoSaldo = document.querySelector(".saldo-valor .valor");
elementoSaldo.textContent = saldo.toString(); //enquanto saldo é um tipo numerico, o textContent só aceita string no ts, entao é necessario
//coverter o saldo para uma string (adicionando o .toStting() ao saldo)
//além disso, o ts esta mostrando que o elementoSaldo, alguma hora pode ficar nulo e isso geraria um erro, entao para evitar esse erro
//precisamos assegurar que o que vai ser atribuido a constante elementoSaldo de fato é um elemento do HTML e nao um NULL
//para isso, convertemos para o tipo HTMLElemento (adicionando o 'as HTMLElement')
var elementoFormulario = document.querySelector(".block-nova-transacao form"); //novamente o ts avisa
// que o elementoFormulario pode ser nulo, entao convertemos para o tipo HTMLFormElement 
elementoFormulario.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação");
        return;
    }
    //note que o .value (quando definimos as let na linha 104 105 106)  esta aparecendo como erro
    // pois o TS não consegue identificar o tipo da const inputTipo, então precisamor definir qual o tipo de cada const
    var inputTipo = elementoFormulario.querySelector("#tipoTransacao"); //aqui inserimos o tipo da constante para que o value apareca sem erro
    var inputValor = elementoFormulario.querySelector("#valor"); ///aqui inserimos o tipo da constante para que o value apareca sem erro
    var inputData = elementoFormulario.querySelector("#data"); ///aqui inserimos o tipo da constante para que o value apareca sem erro
    //agora para resolver o problema de ocorrer a concatenaçao, inves da soma e subtraçao, precisamos entender
    //que isso ocorre pois o ts enxerga os todos os valores vindos de formularios (input.Tipo, inputData, inputValor) 
    //como strings, e não é possivel fazer operaçoes aritmeticas com strings, portanto devemos definir os tipos de cada variavel
    var tipoTransacao = inputTipo.value;
    var data = new Date(inputData.value);
    var valor = inputValor.valueAsNumber;
    if (tipoTransacao == "Depósito") {
        saldo += valor;
    }
    else if (tipoTransacao == "Transferência") {
        saldo -= valor;
    }
    else if (tipoTransacao == "Pagamento de Boleto") {
        saldo -= valor;
    }
    else {
        alert("Tipo de Transação inválida");
        return;
    }
    elementoSaldo.textContent = saldo.toString();
    //NOVAMENTE enquanto saldo é um tipo numerico, o textContent só aceita string no ts, entao é necessario
    //coverter o saldo para uma string (adicionando o .toStting() ao saldo)
    var novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoFormulario.reset();
});
//agora parou de funcionar, pois o arquivo depende de um arquivo js e nao temos mais ele, então para consertarmos isso
//vamos fazer o seguinte:
//abrir terminal e digitar
//cd js (enter)
//tsc bytebank.ts
