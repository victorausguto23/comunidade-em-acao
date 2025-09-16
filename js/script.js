// js/script.js

// Garante que o script só seja executado após o carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {

    // Encontra o elemento onde as mensagens de feedback serão exibidas
    const feedbackMessage = document.getElementById('feedback-message');
    
    // Função para exibir mensagens de feedback na tela de forma suave
    const mostrarMensagem = (mensagem, tipo, autoHide = false) => {
        if (!feedbackMessage) return; // Garante que o elemento existe
        
        feedbackMessage.textContent = mensagem;
        
        // Remove classes de estilo anteriores e adiciona a classe correta
        feedbackMessage.classList.remove('success', 'error', 'show');
        feedbackMessage.classList.add(tipo);
        feedbackMessage.classList.add('show');
        
        // Torna o elemento visível para iniciar a transição
        feedbackMessage.style.visibility = 'visible';
        feedbackMessage.style.opacity = 1;

        if (autoHide) {
            setTimeout(() => {
                feedbackMessage.style.opacity = 0; // Inicia o fade-out
                feedbackMessage.addEventListener('transitionend', () => {
                    feedbackMessage.style.visibility = 'hidden';
                    feedbackMessage.classList.remove('show');
                }, { once: true });
            }, 5000);
        }
    };

    // ==========================================================
    // Lógica para o formulário de Agendamento
    // ==========================================================
    const formularioAgendamento = document.querySelector('form');

    if (formularioAgendamento && formularioAgendamento.id !== 'form-contato') {
        
        formularioAgendamento.addEventListener('submit', (evento) => {
            evento.preventDefault(); 
            
            if (feedbackMessage) {
                feedbackMessage.style.opacity = 0;
                feedbackMessage.style.visibility = 'hidden';
                feedbackMessage.classList.remove('show', 'success', 'error');
            }

            const servicoSelecionado = document.getElementById('servico').value;
            const nomeUsuario = document.getElementById('nome').value;
            const dataAgendamento = document.getElementById('data').value;
            const horaAgendamento = document.getElementById('hora').value;

            // --- Validações ---
            if (servicoSelecionado === '') {
                mostrarMensagem('Por favor, selecione um serviço para agendar.', 'error');
                return;
            }

            const dataAtual = new Date();
            const dataEscolhida = new Date(dataAgendamento);

            dataAtual.setHours(0, 0, 0, 0);
            dataEscolhida.setHours(0, 0, 0, 0);

            if (dataEscolhida < dataAtual) {
                mostrarMensagem('A data de agendamento não pode ser no passado.', 'error');
                return;
            }

            const hora = parseInt(horaAgendamento.split(':')[0]);
            const horaInicio = 8;
            const horaFim = 17;

            if (hora < horaInicio || hora > horaFim) {
                mostrarMensagem('Nossos atendimentos são realizados de 8h00 até 17h00. Por favor, escolha um horário dentro deste intervalo.', 'error');
                return;
            }
            
            mostrarMensagem(`Obrigado, ${nomeUsuario}! Seu agendamento para ${servicoSelecionado} em ${dataAgendamento} às ${horaAgendamento}h foi solicitado.`, 'success', true);
            
            formularioAgendamento.reset();
        });
    }

    // ==========================================================
    // Lógica para o formulário de Contato
    // ==========================================================
    const formularioContato = document.getElementById('form-contato');
    
    if (formularioContato) {
        
        formularioContato.addEventListener('submit', (evento) => {
            evento.preventDefault();
            
            if (feedbackMessage) {
                feedbackMessage.style.opacity = 0;
                feedbackMessage.style.visibility = 'hidden';
                feedbackMessage.classList.remove('show', 'success', 'error');
            }
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;

            if (nome.trim() === '' || email.trim() === '' || mensagem.trim() === '') {
                mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            mostrarMensagem(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`, 'success', true);
            formularioContato.reset();
        });
    }

    // ==========================================================
    // Lógica para o Acordeão de Serviços
    // ==========================================================
    const itensAcordeao = document.querySelectorAll('.item-acordeao');

    if (itensAcordeao.length > 0) {
        itensAcordeao.forEach(item => {
            const titulo = item.querySelector('.titulo-acordeao');
            
            titulo.addEventListener('click', () => {
                // Alterna a classe 'ativo' no item clicado
                item.classList.toggle('ativo');

                // Fechar outros itens quando um é aberto
                itensAcordeao.forEach(outroItem => {
                    if (outroItem !== item && outroItem.classList.contains('ativo')) {
                        outroItem.classList.remove('ativo');
                    }
                });
            });
        });
    }
});
