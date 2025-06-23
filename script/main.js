// Dispara a pergunta sobre a música quando a página carrega
window.addEventListener('load', () => {
    Swal.fire({
        title: 'Quer colocar uma música de fundo?',
        text: "A experiência fica mais completa :)",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: 'Não, obrigado.',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('.song').play();
        }
        // Inicia a animação independentemente da escolha
        animationTimeline();
    });
});

// Função que controla a linha do tempo de toda a animação
const animationTimeline = () => {
    // Separa os textos em letras individuais para animar uma a uma
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
    hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

    // Objetos com configurações de animação para reutilizar
    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // -- INÍCIO DA TIMELINE DE ANIMAÇÃO --
    const tl = new TimelineMax();

    // Cena 1: Mostra o container e a saudação inicial
    tl.to(".container", 0.6, {
        visibility: "visible"
    })
        .from(".one", 0.7, {
            opacity: 0,
            y: 10
        })
        .from(".two", 0.4, {
            opacity: 0,
            y: 10
        })
        // Faz a saudação inicial desaparecer
        .to(".one", 0.7, {
            opacity: 0,
            y: 10
        }, "+=3.5")
        .to(".two", 0.7, {
            opacity: 0,
            y: 10
        }, "-=1")

        // Cena 2: Mostra "É o seu aniversário!"
        .from(".three", 0.7, {
            opacity: 0,
            y: 10
        })
        .to(".three", 0.7, {
            opacity: 0,
            y: 10
        }, "+=3")

        // Cena 3: Mostra a caixa de mensagem e o texto aparece
        .from(".four", 0.7, {
            scale: 0.2,
            opacity: 0,
        })
        .from(".fake-btn", 0.3, {
            scale: 0.2,
            opacity: 0,
        })
        .staggerTo(".hbd-chatbox span", 1.5, {
            visibility: "visible",
        }, 0.05)
        .to(".fake-btn", 0.1, {
            backgroundColor: "rgb(255, 0, 0)",
        }, "+=4")
        .to(".four", 0.5, {
            scale: 0.2,
            opacity: 0,
            y: -150
        }, "+=1")

        // Cena 4: A sequência de "ideias"
        .from(".idea-1", 0.7, ideaTextTrans)
        .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-2", 0.7, ideaTextTrans)
        .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-3", 0.7, ideaTextTrans)
        .to(".idea-3 strong", 0.5, { // Destaque na palavra "especial"
            scale: 1.2,
            x: 10,
            backgroundColor: "rgb(255, 0, 0)",
            color: "#fff",
        })
        .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
        .from(".idea-4", 0.7, ideaTextTrans)
        .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")

        // Cena 5: A transição para "Você é especial DEMAIS"
        .from(".idea-5", 0.7, {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
        }, "+=1.5")

        // =================================================================
        // EFEITO ADICIONADO: Destaque na palavra "especial" desta cena
        // =================================================================
        .to(".idea-5 strong", 0.5, {
            scale: 1.2,
            backgroundColor: "rgb(255, 0, 0)",
            color: "#fff",
        })

        .to(".idea-5 span", 0.7, {
            rotation: 90,
            x: 8,
        }, "+=0.8") // Delay ajustado para melhor fluidez
        .to(".idea-5", 0.7, {
            scale: 0.2,
            opacity: 0,
        }, "+=2")

        // Animação da palavra "DEMAIS"
        .staggerFrom(".idea-6 span", 0.8, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Power3.easeOut,
        }, 0.2)
        .staggerTo(".idea-6 span", 0.3, {
            backgroundColor: "rgb(255, 0, 0)",
            color: "#fff",
            ease: Power3.easeOut,
            yoyo: true,
            repeat: 1,
        }, 0.1, "-=0.5")
        .staggerTo(".idea-6 span", 0.8, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Power3.easeOut,
        }, 0.2, "+=1.5")

        // Cena 6: Balões sobem e a foto aparece
        // VERSÃO COM MOVIMENTO FLUTUANTE
        .staggerFromTo(".baloons img", 4, { // Duração um pouco maior para um voo mais suave
            opacity: 0.9,
            y: 1400,
        }, {
            opacity: 1,
            y: -1000,
            rotation: "random(-20, 20)", // Cada balão gira um pouco
            x: "random(-100, 100)", // Cada balão se move para os lados
            ease: Power1.easeInOut, // Curva de animação mais suave
            yoyo: true, // Faz o movimento do eixo X ir e voltar
            repeat: -1, // Repete o balanço lateral infinitamente
        }, 0.3)
        .from(".profile-picture", 0.5, {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
        }, "-=2")
        .from(".hat", 0.5, {
            x: -100,
            y: 350,
            rotation: -180,
            opacity: 0,
        })

        // Cena 7: Mensagem de "Feliz Aniversário"
        .staggerFrom(".wish-hbd span", 0.7, {
            opacity: 0,
            y: -50,
            rotation: 150,
            skewX: "30deg",
            ease: Elastic.easeOut.config(1, 0.5),
        }, 0.1)
        .staggerFromTo(".wish-hbd span", 0.7, {
            scale: 1.4,
            rotationY: 150,
        }, {
            scale: 1,
            rotationY: 0,
            color: "#ff69b4",
            ease: Power3.easeOut,
        }, 0.1, "party")
        .from(".wish h5", 0.5, {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
        }, "party")

        // Cena 8: Animação dos corações subindo
        .staggerFromTo(".eight .heart", 15,
            {
                y: "100vh",
                opacity: 0,
                scale: "random(0.5, 1.2)"
            },
            {
                y: "-15vh",
                opacity: 1,
                ease: Power0.easeNone,
                repeat: -1,
            },
            1.8,
            "party"
        )

        // Cena 9: Transição final e mensagem para responder
        .to(".six", 0.5, {
            opacity: 0,
            y: 30,
            zIndex: "-1",
        }, "+=3")
        .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
        .to(".last-smile", 0.5, {
            rotation: 90,
        }, "+=1");

    // Reinicia a animação ao clicar no botão
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        tl.restart();
    });
}