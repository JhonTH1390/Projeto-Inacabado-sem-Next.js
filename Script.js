    //"PASSAR PÁGINA"
function mostrarPagina(id) {
    const paginas = document.querySelectorAll('#Inicio, #Carta, #Concluido');
    paginas.forEach(p => p.style.display = 'none');

    if (id === 'Frente' || id === 'Verso') {
        const carta = document.getElementById('Carta');
        carta.style.display = 'block';
        document.getElementById('Frente').style.display = (id === 'Frente') ? 'block' : 'none';
        document.getElementById('Verso').style.display = (id === 'Verso') ? 'block' : 'none';
    } else {
        document.getElementById(id).style.display = 'block';
    }
}



    //VALIDAR NÚMERO DO CARTÃO
const Cardinput = document.getElementById('num');

Cardinput.addEventListener('input', () => {
    // Remove qualquer caractere que não seja número
    let value = Cardinput.value.replace(/\D/g, '');
    
    // Limita a 16 dígitos
    value = value.slice(0,16);
    
    // Adiciona os espaços a cada 4 dígitos
    let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    
    Cardinput.value = formatted;
});
    //VALIDAR CPF
const CPFinput = document.getElementById('CPF');

CPFinput.addEventListener('input', () => {
    let value = CPFinput.value.replace(/\D/g, '');//Remover o que não é número
     value = value.slice(0,11);//Limite de dígitos
     CPFinput.value=value
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
});

    //ADIQUIRIR OS DADOS DIGITADOS
const inputnome = document.getElementById('nome');
const inputnum = document.getElementById('num');
const inputnasc = document.getElementById('nasc');
const inputCPF = document.getElementById('CPF');
const MeusCartoes = document.getElementById('MeusCartoes');

let MeusCartoesGuardados = JSON.parse(localStorage.getItem('cartoes')) || [];

function salvarCartao() {
    const nome = inputnome.value.trim();
    const num = inputnum.value.trim();
    const nasc = inputnasc.value.trim();
    const CPF = inputCPF.value.trim();

//Teste "if" para guardar dados
    if (!nome || !num || !nasc || !CPF){
        alert("Preencha o formulário!")
        return;
       }

       const cartao = {nome, num, nasc, CPF } ;
        MeusCartoesGuardados.push(cartao);
        localStorage.setItem('cartoes', JSON.stringify(MeusCartoesGuardados));

    
mostrarCartoes();

        inputnome.value ='';
        inputnum.value ='';
        inputnasc.value ='';
        inputCPF.value ='';
    }

    //MOSTRAR OS DADOS ATUALIZADOS NA PÁGINA PRINCIPAL
    
function mostrarCartoes(){
    const lista = JSON.parse(localStorage.getItem('cartoes')) || [];
    MeusCartoes.innerHTML = '';

    lista.forEach (c => {
        const div = document.createElement('div');
        div.classList.add('cartao');
        div.innerHTML = `
    <p><strong>Nome:</strong> ${c.nome}</p>
    <p><strong>Número:</strong> ${c.num}</p>
    <p><strong>Nascimento:</strong> ${c.nasc}</p>
    <p><strong>CPF:</strong> ${c.CPF}</p>
`;
        MeusCartoes.appendChild(div);
    });
};

const voltar =document.querySelector('.Finalizar');
voltar.addEventListener('click', () =>{
    mostrarPagina('Inicio');
    mostrarCartoes();
});

    //EFEITO DE GIRAR O CARTÃO
function Girar() {
    const carta = document.getElementById('Carta');
    const frente = document.getElementById('Frente');
    const verso = document.getElementById('Verso');

    // Garante que o cartão está visível
    carta.style.display = 'block';
    
    // Alterna a rotação
    carta.classList.toggle('flipped');

    // Alterna visibilidade das faces
    if (carta.classList.contains('flipped')) {
        frente.style.display = 'none';
        verso.style.display = 'block';
    } else {
        frente.style.display = 'block';
        verso.style.display = 'none';
    }
}