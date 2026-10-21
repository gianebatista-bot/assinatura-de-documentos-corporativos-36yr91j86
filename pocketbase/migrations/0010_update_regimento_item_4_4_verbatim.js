migrate(
  (app) => {
    // Busca o documento do Regimento Interno 2026 pelo código ou id
    let rec
    try {
      rec = app.findFirstRecordByData('documentos', 'codigo', 'RI-2026-v1')
    } catch (_) {
      try {
        rec = app.findRecordById('documentos', 'bdr22hmpkyr9rdg')
      } catch (err) {
        console.log('Regimento Interno 2026 não encontrado para atualização:', err)
        return
      }
    }

    // Leitura e parse defensivo das seções atuais
    const secoesRaw = rec.getString('secoes')
    let secoes = []
    try {
      secoes = JSON.parse(secoesRaw) || []
    } catch (err) {
      console.log('Erro ao fazer parse das seções existentes:', err)
      return
    }

    // Item 4.4 atualizado com a frase verbatim solicitada pelo usuário:
    // "Como regra geral, ATESTADOS MÉDICOS PROVENIENTES DE TELECONSULTA OU PLATAFORMAS DIGITAIS PARTICULARES NÃO SÃO ACEITOS para efeito de abono de falta laboral na PRAFESTA."
    // Preservando:
    // - A exceção de plataformas oficiais do SUS / telemedicina homologada do plano corporativo condicionada à impossibilidade física e avaliação do Médico do Trabalho
    // - A cláusula de que nenhuma falta será abonada sem prévia validação/chancela do Médico do Trabalho da PRAFESTA (SESMT)
    // - Todos os demais itens da Seção 4 (4.1, 4.2, 4.3, 4.5 e 4.6) e das outras seções
    const novoConteudoSecao4 =
      '4.1. Comunicação Imediata de Ausência:\n' +
      'Em caso de impossibilidade de comparecimento ao trabalho por motivo de doença ou motivo de força maior, o colaborador tem a obrigação de comunicar sua ausência à chefia imediata e ao Departamento Pessoal no prazo máximo e improrrogável de até 48 (quarenta e oito) horas a contar do primeiro dia da ausência.\n\n' +
      '4.2. Requisitos de Validade do Atestado Médico Presencial:\n' +
      'Para fins de abono de faltas justificadas por motivo de saúde, o atestado médico ou odontológico original deverá ser entregue ao Departamento Pessoal ou ao SESMT no retorno imediato do empregado às suas atividades, preenchendo obrigatoriamente os seguintes requisitos formais:\n' +
      'a) Emissão em nome completo do colaborador;\n' +
      'b) Carimbo legível, assinatura física ou digital homologada e número de inscrição no Conselho Regional de Medicina (CRM) ou de Odontologia (CRO);\n' +
      'c) Data clara do atendimento presencial;\n' +
      'd) Especificação exata do período de repouso recomendado (dias ou fração horária);\n' +
      'e) Ausência absoluta de emendas, rasuras ou indícios de adulteração;\n' +
      'f) Código CID (Classificação Internacional de Doenças), mediante concordância expressa do trabalhador.\n\n' +
      '4.3. Validação pelo Médico do Trabalho e Acompanhamento Preventivo:\n' +
      'Todos os atestados médicos apresentados passam obrigatoriamente por auditoria e validação pericial do Médico do Trabalho da PRAFESTA. O colaborador que acumular mais de 3 (três) atestados no período de 12 meses será convocado para avaliação clínica preventiva de saúde ocupacional pelo SESMT.\n\n' +
      '4.4. Atestados de Teleconsulta e Validação Obrigatória pelo Médico do Trabalho:\n' +
      'Como regra geral, ATESTADOS MÉDICOS PROVENIENTES DE TELECONSULTA OU PLATAFORMAS DIGITAIS PARTICULARES NÃO SÃO ACEITOS para efeito de abono de falta laboral na PRAFESTA.\n\n' +
      'Admite-se uma ÚNICA exceção estrita: atestados de teleconsulta expedidos por plataformas oficiais do Sistema Único de Saúde (SUS) ou pela telemedicina homologada do plano de assistência médica corporativo fornecido pela PRAFESTA, desde que comprovada a inviabilidade absoluta de comparecimento a pronto atendimento físico e mediante validação individual indelegável do Médico do Trabalho da empresa. Atestados adquiridos em sítios de receitas/atestados virtuais comerciais sem atendimento qualificado serão sumariamente rejeitados e encaminhados para apuração disciplinar e criminal.\n\n' +
      'VALIDAÇÃO OBRIGATÓRIA PARA QUALQUER ABONO (REGRA GERAL E ABSOLUTA): Nenhuma falta ao trabalho será abonada pela PRAFESTA — em nenhuma hipótese ou modalidade, seja o atendimento de natureza presencial ou decorrente da estrita exceção de teleconsulta — sem a prévia e expressa auditoria, chancela e validação técnica do Médico do Trabalho da empresa (SESMT). A entrega tempestiva e a regularidade formal do documento médico constituem requisitos indispensáveis, porém não automáticos, condicionados permanentemente ao crivo pericial ocupacional para a concessão do respectivo abono remuneratório.\n\n' +
      '4.5. Regra Especial do 3º Turno Noturno:\n' +
      'Para os colaboradores que cumprem o terceiro turno (das 22h30 às 06h00), o atestado médico que justifique a ausência na data do plantão abonará integralmente o turno de trabalho correspondente, sem fracionamento prejudicial ao empregado.\n\n' +
      '4.6. Documentos que NÃO Abonam Faltas:\n' +
      'Declarações de comparecimento que não declarem expressamente a incapacidade temporária de trabalho, bem como agendamento de consultas de rotina e exames que poderiam ser agendados fora da escala de trabalho, não acarretam o abono de jornada integral, sendo abonado unicamente o tempo exato despendido no deslocamento e consulta previamente alinhada.'

    let secao4Encontrada = false
    const secoesAtualizadas = secoes.map((s) => {
      if (s.numero === '4' || s.numero === 4) {
        secao4Encontrada = true
        return {
          ...s,
          numero: '4',
          titulo: s.titulo || 'Faltas, Atrasos, Atestados Médicos e Regras de Teleconsulta',
          conteudo: novoConteudoSecao4,
        }
      }
      return s
    })

    if (!secao4Encontrada) {
      console.log('Seção 4 não encontrada no array de seções do Regimento Interno')
      return
    }

    // Preserva e atualiza defensivamente as perguntas do quiz para garantir que ri_q2 esteja totalmente alinhada
    const quizRaw = rec.getString('perguntas_quiz')
    let perguntasQuiz = []
    try {
      perguntasQuiz = JSON.parse(quizRaw) || []
    } catch (_) {
      perguntasQuiz = []
    }

    if (Array.isArray(perguntasQuiz) && perguntasQuiz.length > 0) {
      const quizAtualizado = perguntasQuiz.map((q) => {
        if (q.id === 'ri_q2') {
          return {
            ...q,
            pergunta:
              'Atestados médicos emitidos por teleconsulta particular (fora do SUS e do convênio da empresa) são aceitos para abono de faltas?',
            opcoes: [
              'Sim, qualquer teleconsulta comprada na internet é aceita sem restrições',
              'Não. Como regra geral, atestados de teleconsulta ou plataformas digitais particulares não são aceitos para abono',
              'Sim, se o colaborador pagar do próprio bolso',
              'Sim, desde que a consulta dure mais de 20 minutos',
            ],
            respostaCorreta: 1,
            explicacao:
              'Como regra geral, ATESTADOS MÉDICOS PROVENIENTES DE TELECONSULTA OU PLATAFORMAS DIGITAIS PARTICULARES NÃO SÃO ACEITOS para efeito de abono de falta laboral na PRAFESTA. A única exceção admitida é para plataformas oficiais do SUS ou convênio oficial da empresa em caso de inviabilidade física comprovada, sempre condicionada à validação e chancela obrigatória do Médico do Trabalho (SESMT).',
          }
        }
        return q
      })
      rec.set('perguntas_quiz', JSON.stringify(quizAtualizado))
    }

    rec.set('secoes', JSON.stringify(secoesAtualizadas))
    app.save(rec)
  },
  (app) => {
    // Down migration: restaura o estado anterior
    let rec
    try {
      rec = app.findFirstRecordByData('documentos', 'codigo', 'RI-2026-v1')
    } catch (_) {
      try {
        rec = app.findRecordById('documentos', 'bdr22hmpkyr9rdg')
      } catch (_) {
        return
      }
    }

    const secoesRaw = rec.getString('secoes')
    let secoes = []
    try {
      secoes = JSON.parse(secoesRaw) || []
    } catch (_) {
      return
    }

    const conteudoAnteriorSecao4 =
      '4.1. Comunicação Imediata de Ausência:\n' +
      'Em caso de impossibilidade de comparecimento ao trabalho por motivo de doença ou motivo de força maior, o colaborador tem a obrigação de comunicar sua ausência à chefia imediata e ao Departamento Pessoal no prazo máximo e improrrogável de até 48 (quarenta e oito) horas a contar do primeiro dia da ausência.\n\n' +
      '4.2. Requisitos de Validade do Atestado Médico Presencial:\n' +
      'Para fins de abono de faltas justificadas por motivo de saúde, o atestado médico ou odontológico original deverá ser entregue ao Departamento Pessoal ou ao SESMT no retorno imediato do empregado às suas atividades, preenchendo obrigatoriamente os seguintes requisitos formais:\n' +
      'a) Emissão em nome completo do colaborador;\n' +
      'b) Carimbo legível, assinatura física ou digital homologada e número de inscrição no Conselho Regional de Medicina (CRM) ou de Odontologia (CRO);\n' +
      'c) Data clara do atendimento presencial;\n' +
      'd) Especificação exata do período de repouso recomendado (dias ou fração horária);\n' +
      'e) Ausência absoluta de emendas, rasuras ou indícios de adulteração;\n' +
      'f) Código CID (Classificação Internacional de Doenças), mediante concordância expressa do trabalhador.\n\n' +
      '4.3. Validação pelo Médico do Trabalho e Acompanhamento Preventivo:\n' +
      'Todos os atestados médicos apresentados passam obrigatoriamente por auditoria e validação pericial do Médico do Trabalho da PRAFESTA. O colaborador que acumular mais de 3 (três) atestados no período de 12 meses será convocado para avaliação clínica preventiva de saúde ocupacional pelo SESMT.\n\n' +
      '4.4. Atestados de Teleconsulta (Consultas Virtuais à Distância):\n' +
      'Como regra geral, ATESTADOS MÉDICOS PROVENIENTES DE TELECONSULTA OU PLATAFORMAS DIGITAIS PARTICULARES NÃO SÃO ACEITOS para efeito de abono de falta laboral na PRAFESTA.\n\n' +
      'Admite-se uma ÚNICA exceção estrita: atestados de teleconsulta expedidos por plataformas oficiais do Sistema Único de Saúde (SUS) ou pela telemedicina homologada do plano de assistência médica corporativo fornecido pela PRAFESTA, desde que comprovada a inviabilidade absoluta de comparecimento a pronto atendimento físico e mediante validação individual indelegável do Médico do Trabalho da empresa. Atestados adquiridos em sítios de receitas/atestados virtuais comerciais sem atendimento qualificado serão sumariamente rejeitados e encaminhados para apuração disciplinar e criminal.\n\n' +
      '4.5. Regra Especial do 3º Turno Noturno:\n' +
      'Para os colaboradores que cumprem o terceiro turno (das 22h30 às 06h00), o atestado médico que justifique a ausência na data do plantão abonará integralmente o turno de trabalho correspondente, sem fracionamento prejudicial ao empregado.\n\n' +
      '4.6. Documentos que NÃO Abonam Faltas:\n' +
      'Declarações de comparecimento que não declarem expressamente a incapacidade temporária de trabalho, bem como agendamento de consultas de rotina e exames que poderiam ser agendados fora da escala de trabalho, não acarretam o abono de jornada integral, sendo abonado unicamente o tempo exato despendido no deslocamento e consulta previamente alinhada.'

    const secoesRevertidas = secoes.map((s) => {
      if (s.numero === '4' || s.numero === 4) {
        return {
          ...s,
          numero: '4',
          titulo: s.titulo || 'Faltas, Atrasos, Atestados Médicos e Regras de Teleconsulta',
          conteudo: conteudoAnteriorSecao4,
        }
      }
      return s
    })

    rec.set('secoes', JSON.stringify(secoesRevertidas))
    app.save(rec)
  },
)
