class Phrase {
    constructor() {}

    static movimentarOpcao() {
        const optionBox = document.querySelectorAll(".boxOption")
        let optionGrab

        document.addEventListener("dragstart", (event) => {
            event.target.classList.add("dragging")
            optionGrab = event.target
        })

        document.addEventListener("dragend", (event) => {
            event.target.classList.remove("dragging")
        })

        optionBox.forEach((option) => {
            option.addEventListener("dragover", (event) => {
                if(option.childNodes.length < 1 || option.classList[0] == "optionTrue" || option.classList[0] == "optionFalse") {
                    const dragging = document.querySelector(".dragging")
                    const applyAfter = this.pegarNovaPosicao(option, event.clientY)
            
                    if(applyAfter) {
                        applyAfter.insertAdjacentElement("afterend", dragging)
                    } else {
                        option.prepend(dragging)
                    }
                }
            })
        })
    }

    static pegarNovaPosicao(option, posY) {
        const optionsGame = option.querySelectorAll(".boxOption")
        let result

        for(let reference of optionsGame) {
            const box = reference.getBoundingClientRect()
            const boxCenterY = box.y + box.height / 2

            if(posY >= boxCenterY) {
                result = reference
            }
        }

        return result
    }

    static verificarFinal() {
        const botaoVerificar = document.querySelector(".verificar")
        botaoVerificar.addEventListener("click", (event) => {
            const phraseBox = document.querySelector('.phraseBox')
            const boxOptions = phraseBox.querySelectorAll('.boxOption')
            boxOptions.forEach((box) => {
                if(box.childNodes[0]?.classList[0] == box.classList[1]) {
                    box.style.backgroundColor = 'green'
                    box.children[0].setAttribute('draggable', 'false')
                    box.children[0].classList.add('certa')
                } else {
                    console.log('elado')
                }
            })
        })
    }
}

function resetGame() {
    const botaoReset = document.querySelector('.reset')
    botaoReset.addEventListener('click', () => {
        window.location.reload()
    })
}

resetGame()
Phrase.movimentarOpcao()
Phrase.verificarFinal()