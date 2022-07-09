let yourVote = document.querySelector('.d1-1 span');
let cargo = document.querySelector('.d1-2 span');
let description = document.querySelector('.d1-4');
let warning = document.querySelector('.d-2');
let lateral = document.querySelector('.d1-right');
let numbers =document.querySelector('.d1-3');


let atualStep = 0;
let number = '';
let whiteVote = false;
let votes =

function beginStep(){
    let etapa = steps[atualStep];

    let numberHtml = '';
    number = '';
    whiteVote = false

    for(let i=0; i<etapa.numbers;i++){
        if(i === 0){
            numberHtml += '<div class="number pisca"></div>'
        } else{
        numberHtml += '<div class="number "></div>';
        }
    }

    yourVote.style.display = 'none';
    cargo.innerHTML = etapa.title;
    description.innerHTML = '';
    warning.style.display = 'none';
    lateral.innerHTML = '';
    numbers.innerHTML = numberHtml;

}

function refreshInterface(){
    let etapa = steps[atualStep];

    let candidate = etapa.candidates.filter((item) =>{
        if(item.number === number){
           return true; 
        } else{
            return false;
        }
    });
    if(candidate.length > 0){
        candidate = candidate[0];
        yourVote.style.display = 'block';
        cargo.innerHTML = etapa.title;
        description.innerHTML = `Nome: ${candidate.nome}<br>Partido:${candidate.party}`;
        warning.style.display = 'block';

        let picsHtml = '';
        for( let i in candidate.pics){
            if(candidate.pics[i].small){
                picsHtml += `<div class="d1-image small"><img src="/img/${candidate.pics[i].url}" alt="">${candidate.pics[i].legenda}</div>`;
            }else{
            picsHtml += `<div class="d1-image"><img src="/img/${candidate.pics[i].url}" alt="">${candidate.pics[i].legenda}</div>`; 
        }
        }
        lateral.innerHTML = picsHtml;

    } else{
        yourVote.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }

    console.log("Candidato, ", candidate);

}

function clicou(n) {
    let elNumber = document.querySelector('.number.pisca');
    if (elNumber !== null){
        elNumber.innerHTML = n;
        number = `${number}${n}`;

        elNumber.classList.remove('pisca');
        if(elNumber.nextElementSibling !== null){
        elNumber.nextElementSibling.classList.add('pisca')
        } else{
            refreshInterface();
        }
    }
}

function white(){
    if(number === ''){
        whiteVote = true;
        yourVote.style.display = 'block';
        numbers.innerHTML = '';
        description.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
        warning.style.display = 'block';
    }else{
        alert("Para votar em branco, não digite nenhum número.")
    }
}

function corrige(){
    beginStep();
}

function confirm(){
    let etapa = steps[atualStep];

    let confirmedVote = false;

    if(whiteVote === true){
        confirmedVote = true;

    }else if(number.length === etapa.numbers){
        confirmedVote = true;
            
    }

    if(confirmedVote) {
        atualStep++;
        if(steps[atualStep] !== undefined){
            beginStep();
        } else{
            document.querySelector('.screen').innerHTML = '<div class="aviso-extra pisca">FIM</div>'
        }

    }
}

beginStep();