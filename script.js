const urlAPI = "https://mock-api.driven.com.br/api/v6/uol";

let msg2;
let templatemsg;

// renderizando participantes
function renderizar(resposta){
    console.log("renderizar participantes");
    console.log(resposta.data);
}
//Carregando participantes
function participantes() {
    const promise = axios.get(`${urlAPI}/participants`);
    promise.then(renderizar);
}
//aviso de erro
function erro(erroaologar){
    console.log("Erro na tentativa de login");
}
// renderizando mensagens
function renderizarMsg(resposta){
    console.log(resposta.data);
    const listmgs = document.querySelector(".mensagens")
    listmgs.innerHTML = " ";
    for(let i = 0; i < resposta.data.length; i++){
        msg2 = resposta.data[i];

        if (mgs2.type === "private_message"){
            templatemsg = `
            <li class="mensagen-privada">
                <span class="time">(${msg2.time})</span>
                <strong>${msg2.from}</strong>
                    <span> reservadamente para </span>
                <strong>${msg2.to}:</strong>
                <span>${msg2.text}</span>
            </li>
            `;
        }

        if (msg2.type === "status"){
            templatemsg = `
            <li class="entrada-saida">
                <span class="horario">(${msg2.time})</span>
                <strong>${msg2.from}</strong>
                <span> para </span>
                <strong>${msg2.to}: </strong>
                <span>E${msg2.text}</span>
            </li>
            `;

        }
        if (mgs2.type === "messege"){
            templatemsg = `
            <li class="mensagen-publica">
                <span class="horario">(${msg2.time})</span>
                <strong>${msg2.from}</strong>
                    <span> para </span>
                <strong>${msg2.to}: </strong>
                <span>${msg2.text}</span>
            </li>
            `;
        }

        listmgs.innerHTML += templatemsg;
    }
}

//Carregando mensagens
function cmensagens(resposta){
    console.log("renderizar Msg")
    const promise = axios.get(`${urlAPI}/messages`);
    promise.then(renderizarMsg);

}

//perguntando nome do usuario 
function  perguntarUser(){
    const nome = prompt("Qual é seu lindo nome?");
    const promise = axios.post(`${urlAPI}/participants`, { name: nome });
    promise.then(cmensagens);
    promise.catch(erro);
}

// iniciando chat
function initChat() {
    console.log("iniciar chat");
  
    participantes();
    perguntarUser();
}
initChat();



