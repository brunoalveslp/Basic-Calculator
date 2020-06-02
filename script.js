
function getHistory(){
    return document.getElementById('history-value').innerText
}

function printHistory(num){
    document.getElementById('history-value').innerText=num
}

function getOutput(){
    return document.getElementById('output-value').innerText
}

function printOutput(num){
    if(num==""){
        document.getElementById('output-value').innerText=num
    }else{
        document.getElementById('output-value').innerText=getFormatedNumber(num)
    }
}

function getFormatedNumber(num){
    if (num == "-"){//habilita numeros negativos
        return ""
    }
    let n = Number(num)//faz o retorno num seja formatado para numero e seja armazenado na variavel n
    let value = n.toLocaleString('en')//formata para ter virgulas conforme o numero aumenta
    return value//retorna o valor que esta armazenado na variavel
}

function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''))//retira as virgulas da formatacao feita anteriormente
}

let operator = document.getElementsByClassName('operator')//pega as classes de operadores criadas em html
for(let i = 0; i < operator.length; i++){//se o o tamanho do operador for menor que a variavel i, o vetor operator recebe a variavel i no indice e adiciona o eventlistener para o click em um operador
    operator[i].addEventListener('click', function(){
        if(this.id=="clear"){//se o operator clear for clicado limpa as funcoes que guardam os valores
            printHistory("")
            printOutput("")
        } else if(this.id=="backspace"){//se o backspace for clicado reverte o valor de saida para string e tira o ultimo valor, retorna o valor ja subraido
            let output = reverseNumberFormat(getOutput()).toString()
            if(output){//tem um valor
                output=output.substr(0,output.length-1)
                printOutput(output)
            } 
        } else{
            let output = getOutput()
            let history = getHistory()
            if (output == "" && history != ""){
                if(isNaN(history[history.length-1])){
                    history = history.substr(0,history.length-1)
                }
            }
            if (output != "" || history != ""){
                //condicao?true or false ternario
                output = output==""?
                output:reverseNumberFormat(output) 
                history = history+output
                if(this.id == "igual"){//pega o valor de historico e faz os calculos quando igual e clicado
                    let result = eval(history)
                    printOutput(result)
                    printHistory("")
                } else {
                    history = history+this.id
                    printHistory(history)
                    printOutput("")
                }    
            }
        }
    })
}

let number = document.getElementsByClassName('number')//adiciona o eventlistener para os numeros
for(let i = 0; i < number.length; i++){
    number[i].addEventListener('click', function(){
        let output = reverseNumberFormat(getOutput())
        if(output!=NaN){//se a saida for um numero
            output=output+this.id
            printOutput(output)

        }
    })
}

//www.facebook.com/bruno.alves.snow