migrate(
  (app) => {
    const docsCol = app.findCollectionByNameOrId('documentos')

    // Documento 1: Termo Unificado
    const doc1Data = {
      titulo: 'Termo Unificado de Compromissos, Normas Internas e Uso de Tecnologias',
      subtitulo: 'Termos de Admissão de Colaborador e Compromisso com Normas Internas',
      codigo: 'TU-RH-023',
      revisao: 'Rev. 023 (09/10/2026)',
      data_publicacao: '09 de outubro de 2026',
      ementa:
        'Formaliza a ciência e adesão às normas internas da PRAFESTA, regulamento de ponto eletrônico, uso da rede de TI, IA generativa, biometria e reconhecimento facial, câmeras, mídia social, LGPD e EPIs.',
      local_padrao: 'Atibaia / Mairiporã',
      ordem: 1,
      ativo: true,
      secoes: [
        {
          numero: '1',
          titulo: 'Objetivo',
          conteudo:
            'O presente documento tem por objetivo formalizar a ciência e a adesão do colaborador às normas internas da PRAFESTA INDUSTRIA E COMERCIO DE EMBALAGENS LTDA., estabelecendo diretrizes claras sobre o compromisso com a legislação vigente, práticas de compliance, transparência institucional e gestão de riscos. Este termo unifica as obrigações relativas à conduta profissional, uso de recursos tecnológicos e proteção de dados, garantindo a integridade das operações e a segurança jurídica de ambas as partes.',
        },
        {
          numero: '2',
          titulo: 'Regulamento de Marcação de Ponto',
          conteudo:
            '2.1. Horário de Trabalho: O colaborador deverá cumprir a jornada de trabalho estabelecida em seu contrato individual, respeitando rigorosamente os horários de entrada, saída e intervalos para repouso e alimentação.\n\n2.2. Marcação Correta do Ponto: A marcação do ponto é obrigatória e pessoal. Será observada a tolerância máxima de 05 (cinco) minutos em cada marcação, não excedendo 10 (dez) minutos diários. O intervalo mínimo para repouso e alimentação é de 01 (uma) hora, sendo vedada a sua supressão ou redução sem autorização prévia. A marcação de ponto será realizada por meio dos sistemas de biometria e reconhecimento facial adotados pela empresa.\n\n2.3. Atrasos: Eventuais atrasos que excedam o limite estabelecido no Art. 58, §1º da CLT acarretarão o desconto proporcional das horas não trabalhadas e do Descanso Semanal Remunerado (DSR), além de sujeitarem o colaborador a medidas disciplinares, conforme a reincidência e gravidade.\n\n2.4. Saídas Antecipadas: Qualquer saída antes do término da jornada contratual depende de autorização expressa da chefia imediata mediante preenchimento de formulário próprio. A realização de horas extras somente será permitida quando solicitada e autorizada previamente pela empresa.',
        },
        {
          numero: '3',
          titulo: 'Uso da Rede e Confidencialidade das Informações',
          conteudo:
            "3.1 a 3.5. Recursos de Rede, E-mail e Equipamentos: Os recursos de rede, internet e sistemas são ferramentas de trabalho disponibilizadas exclusivamente para o desempenho das funções profissionais. O e-mail corporativo deve ser utilizado estritamente para fins profissionais. É vedada a instalação de softwares ou alteração de hardware sem prévia autorização da TI.\n\n3.6. Celulares e Dispositivos Particulares: Fica proibido o uso de aparelhos celulares particulares durante o horário de trabalho em áreas produtivas ou onde a segurança e produtividade possam ser afetadas. Apenas colaboradores em cargos específicos com autorização expressa da diretoria poderão portar aparelhos em áreas restritas.\n\n3.7 e 3.8. Monitoramento e Sigilo Comercial: A PRAFESTA realiza monitoramento de tráfego de dados e uso de sistemas. O colaborador compromete-se a manter sigilo absoluto sobre dados técnicos, segredos comerciais e industriais. A violação configura concorrência desleal e apropriação indébita, sujeitando a demissão por justa causa e sanções da LGPD.\n\n3.9. Uso de Inteligência Artificial (IA):\n- Regra Geral: O uso de ferramentas de IA (ChatGPT, Gemini, Copilot etc.) é permitido única e exclusivamente para fins profissionais relacionados às atribuições do cargo.\n- PROIBIÇÃO EXPRESSA: Fica EXPRESSAMENTE PROIBIDO inserir, transmitir, colar ou disponibilizar dados sigilosos, confidenciais, estratégicos ou DADOS PESSOAIS / DADOS PESSOAIS SENSÍVEIS (LGPD - Lei 13.709/2018) em ferramentas de IA públicas ou privadas.\n- Comitê de IA e TI: Qualquer nova ferramenta exige avaliação técnica da área de TI e aprovação do Comitê de IA.\n- Propriedade Intelectual: Todo resultado gerado com auxílio de IA no trabalho pertence exclusivamente à PRAFESTA.\n- Responsabilidade Única pela Revisão: O colaborador é o único responsável por revisar todo conteúdo gerado por IA; erros ou 'alucinações' da ferramenta não eximem a responsabilidade do colaborador.\n- Credenciais: Proibido compartilhar credenciais de ferramentas de IA.\n\n3.10. Biometria, Reconhecimento Facial e Câmeras com IA:\n- Consentimento livre e informado para tratamento de dados biométricos sensíveis para controle de acesso, segurança patrimonial e marcação de ponto (art. 74 CLT).\n- Câmeras com IA em áreas comuns, administrativas e de produção (vedadas em sanitários e vestiários).\n- É proibida qualquer tentativa de burla (fotos, máscaras, réplicas).\n- A revogação do consentimento biométrico por escrito pode inviabilizar o vínculo empregatício.\n\n3.11. Rede Wi-Fi Corporativa: O uso condicionado ao aceite das políticas de rede; tráfego monitorado; vedado uso pessoal ilícito.\n\n3.12. Política de Mídia Social e Uso de Imagem:\n- Publicações em nome da empresa dependem de prévia autorização do Marketing.\n- Vedado envolvimento com concorrentes ou ofensas.\n- O colaborador autoriza o uso de sua imagem a título gratuito durante a vigência do contrato de trabalho, revogável por escrito.\n- Canal de denúncia: denuncia@prafesta.com.br.",
        },
        {
          numero: '4',
          titulo: 'Autorização de Uso de Dados Pessoais (LGPD)',
          conteudo:
            '4.1 a 4.7. O colaborador autoriza o tratamento de dados pessoais (nome, RG, CPF, endereço, dados bancários, histórico profissional, exames ocupacionais, imagem e dados biométricos) para finalidades de folha de pagamento, benefícios, eSocial, segurança interna e gestão de talentos, bem como compartilhamento com órgãos públicos, bancos e operadoras, garantidos todos os direitos do titular pela LGPD (Lei nº 13.709/2018).',
        },
        {
          numero: '5',
          titulo: 'Uso do Estacionamento',
          conteudo:
            'Acesso por reconhecimento facial. Proibido estacionar em vagas de visitantes ou reservadas, devendo utilizar exclusivamente vagas de colaboradores. O uso é liberalidade e a PRAFESTA não responde por furto, roubo ou avarias em veículos ou pertences deixados no interior.',
        },
        {
          numero: '6',
          titulo: 'Treinamento de Segurança do Trabalho e Uso de EPI',
          conteudo:
            'O colaborador declara ter recebido treinamento de segurança do trabalho e assume a obrigação de utilizar e conservar os Equipamentos de Proteção Individual (EPIs) fornecidos pela PRAFESTA.',
        },
        {
          numero: '7',
          titulo: 'Integração sobre Normas e Políticas Internas',
          conteudo:
            'Ciência do conteúdo do Manual de Integração e Código de Ética e Conduta Empresarial da PRAFESTA, abrangendo Segurança do Trabalho, Qualidade, Recursos Humanos, Ética e Políticas de Tecnologia, IA e Inovação.',
        },
      ],
      declaracao_verbatim:
        "Declaro, para os devidos fins, que recebi da PRAFESTA o link de acesso ao presente Termo em meio digital, tive acesso integral ao seu conteúdo, li e compreendi integralmente todas as cláusulas e condições acima estabelecidas, incluindo, expressamente, as regras relativas ao uso de Inteligência Artificial (cláusula 3.9), aos sistemas de biometria e reconhecimento facial e às câmeras com inteligência artificial (cláusula 3.10), ao uso da rede Wi-Fi (cláusula 3.11) e à Política de Mídia Social e uso de imagem (cláusula 3.12), comprometendo-me a cumpri-las fielmente durante todo o período de meu vínculo empregatício com a PRAFESTA INDUSTRIA E COMERCIO DE EMBALAGENS LTDA.\n\nO ACEITE AO PRESENTE TERMO SERÁ REALIZADO DE FORMA ELETRÔNICA, por meio do acesso ao documento através de link seguro enviado pela PRAFESTA ao COLABORADOR (por e-mail corporativo, aplicativo de mensagens corporativo, plataforma de recursos humanos ou ferramenta de assinatura eletrônica adotada pela empresa), com a confirmação eletrônica da leitura e concordância ('Li e aceito' ou equivalente) e/ou assinatura eletrônica no sistema. O simples acesso ao link, a abertura e a leitura do documento e a confirmação eletrônica, registrados pelo sistema com data, horário, identificação do colaborador, dispositivo e demais metadados — incluindo, quando aplicável, a identificação do perfil da Conta Comercial atribuído ao colaborador —, constituem ciência e aceite plenos do presente instrumento, sendo meio hábil e suficiente de comprovação, com validade e eficácia jurídicas plenas, equivalentes à assinatura física de próprio punho, nos termos do art. 10 da Medida Provisória nº 2.200-2/2001, dos arts. 107 e 219 do Código Civil e do art. 10 da Lei nº 12.965/2014 (Marco Civil da Internet). A PRAFESTA manterá em seus registros o controle do envio do link, do acesso e da confirmação de aceite, podendo emitir relatório ou certificado de aceite eletrônico como prova da ciência e concordância do COLABORADOR.\n\nO COLABORADOR declara, ainda, ciência de que NÃO RECEBERÁ CÓPIA IMPRESSA (física) do presente Termo, tendo acesso permanente ao documento em meio digital, por meio do sistema corporativo, e-mail ou portal da empresa, e podendo solicitar, a qualquer tempo, junto ao RH/Departamento Pessoal, uma via digital ou impressa atualizada do instrumento. O COLABORADOR declara, ainda, que o link de acesso permanecerá válido e acessível enquanto durar o vínculo empregatício, podendo o documento ser novamente consultado a qualquer momento.",
      perguntas_quiz: [
        {
          id: 'tu_q1',
          pergunta: 'Qual é a tolerância máxima permitida para a marcação do ponto eletrônico?',
          opcoes: [
            '15 minutos em cada marcação, sem limite diário',
            'Até 05 minutos em cada marcação, não excedendo 10 minutos diários',
            '30 minutos apenas no início da jornada',
            'Não há tolerância, qualquer minuto de atraso é falta gravíssima imediata',
          ],
          respostaCorreta: 1,
          explicacao:
            'Conforme o item 2.2 do Termo Unificado, é observada a tolerância máxima de 05 (cinco) minutos em cada marcação, não excedendo 10 (dez) minutos diários (Art. 58 §1º da CLT).',
        },
        {
          id: 'tu_q2',
          pergunta:
            'É permitido inserir dados de clientes, fórmulas industriais ou dados pessoais em ferramentas de IA (como ChatGPT ou Gemini)?',
          opcoes: [
            'Sim, desde que a ferramenta seja paga pela empresa',
            'Sim, contanto que o colaborador apague o histórico no final do dia',
            'É terminantemente proibido inserir dados sigilosos, estratégicos ou dados pessoais em qualquer ferramenta de IA',
            'Sim, qualquer colaborador pode alimentar IA livremente',
          ],
          respostaCorreta: 2,
          explicacao:
            'Conforme a cláusula 3.9.3, fica EXPRESSAMENTE PROIBIDO ao colaborador inserir dados sigilosos, confidenciais, estratégicos ou dados pessoais (LGPD) em ferramentas de Inteligência Artificial públicas ou privadas.',
        },
        {
          id: 'tu_q3',
          pergunta:
            'Quem é o responsável pela verificação e revisão de conteúdos gerados por Inteligência Artificial?',
          opcoes: [
            'O fornecedor da ferramenta de Inteligência Artificial',
            'O departamento de TI exclusivamente',
            "O próprio colaborador que utilizou a ferramenta, não podendo alegar erro ou 'alucinação' da IA como justificativa",
            'Ninguém, pois a IA é considerada infalível',
          ],
          respostaCorreta: 2,
          explicacao:
            'O item 3.9.7 estipula que o colaborador é o único responsável pela conferência e revisão de todo conteúdo gerado por IA antes de sua utilização ou envio.',
        },
        {
          id: 'tu_q4',
          pergunta:
            'O uso de celular particular é permitido livremente nas áreas produtivas da fábrica?',
          opcoes: [
            'Sim, para ouvir música com fones de ouvido durante a operação',
            'Não, é proibido nas áreas produtivas, devendo ser guardado nos armários, ressalvadas exceções autorizadas pela diretoria',
            'Sim, desde que o colaborador atenda apenas chamadas familiares urgentes',
            'Sim, a qualquer hora e setor da fábrica',
          ],
          respostaCorreta: 1,
          explicacao:
            'Conforme a cláusula 3.6, é expressamente proibido o uso e porte de celular e fones nas áreas produtivas por razões de segurança e produtividade, devendo ficar nos armários individuais.',
        },
        {
          id: 'tu_q5',
          pergunta:
            'O sistema de reconhecimento facial na portaria de entrada substitui a marcação de ponto no REP?',
          opcoes: [
            'Sim, passar na portaria já registra automaticamente o ponto de trabalho',
            'Não, o reconhecimento na portaria é apenas controle de acesso e segurança; a marcação no REP é obrigatória e separada',
            'Substitui apenas nos dias de chuva',
            'Substitui para os colaboradores do 3º turno',
          ],
          respostaCorreta: 1,
          explicacao:
            'O reconhecimento facial na portaria garante o controle de acesso e segurança, mas NÃO substitui a obrigatoriedade da marcação de ponto no sistema eletrônico (REP) no início/fim da jornada e intervalos.',
        },
        {
          id: 'tu_q6',
          pergunta:
            'A assinatura eletrônica deste Termo pelo sistema corporativo possui validade jurídica equivalente à assinatura de próprio punho?',
          opcoes: [
            'Não, a empresa é obrigada a imprimir uma via para colher assinatura à caneta',
            'Apenas se for feita por meio de certificado digital emitido em cartório físico',
            'Sim, nos termos da MP nº 2.200-2/2001, do Código Civil e da Lei nº 12.965/2014 (Marco Civil da Internet), possui plena validade e eficácia jurídica',
            'Não tem validade alguma perante a Justiça do Trabalho',
          ],
          respostaCorreta: 2,
          explicacao:
            'A Declaração e a legislação brasileira (MP 2.200-2/2001, art. 107/219 CC e Marco Civil) conferem validade plena ao aceite eletrônico com registro de data, hora e metadados de autenticação.',
        },
      ],
    }

    // Documento 2: Regimento Interno 2026
    const doc2Data = {
      titulo: 'Regimento Interno 2026',
      subtitulo: 'Guia Oficial de Normas, Condutas, Direitos e Deveres - PRAFESTA',
      codigo: 'RI-2026-v1',
      revisao: 'Edição 2026',
      data_publicacao: 'Janeiro de 2026',
      ementa:
        'Diretrizes de conduta, jornada, atestados médicos presenciais e regras de teleconsulta, faltas, férias, benefícios, higiene, proibições na fábrica, sanções disciplinares e canal de denúncia.',
      local_padrao: 'Atibaia',
      ordem: 2,
      ativo: true,
      secoes: [
        {
          numero: '1',
          titulo: 'Introdução e Nossa Empresa',
          conteudo:
            'O Regimento Interno é o guia essencial da PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA. (fundada em 22 de julho de 1986). Nossa MISSÃO é facilitar o dia a dia das pessoas, oferecendo os melhores produtos e soluções em embalagens de alta qualidade. Nossa VISÃO é ser referência de mercado, reconhecida pela excelência de nossos produtos e serviços com desenvolvimento sustentável. Nossos VALORES fundamentais incluem: foco no cliente, comprometimento, senso de urgência, trabalho em equipe, valorização das pessoas e integridade.',
        },
        {
          numero: '2',
          titulo: 'Princípios e Diretrizes da Administração de Pessoal',
          conteudo:
            "Princípios: Respeito à dignidade humana, igualdade e não discriminação, valorização profissional, transparência e ética, excelência e inovação, e proteção de dados (LGPD).\n\nJornada e Ponto: Horário contratual deve ser rigorosamente cumprido. A marcação de ponto no REP é obrigatória, pessoal e intransferível. O reconhecimento facial na portaria NÃO substitui a marcação de ponto no REP no local de trabalho.\n\nAlocação e Transferência: Cargos de natureza comum (ex: Auxiliar de Produção) podem ser realocados entre setores conforme necessidade operacional, com comunicação prévia e observância de EPIs.\n\nAtrasos e Saídas Antecipadas: Atrasos são descontados do salário conforme a lei. Atrasos recorrentes e saídas injustificadas constituem infrações disciplinares.\n\nFaltas e Atestados Médicos:\n- Falta deve ser comunicada e justificada em até 48 horas a contar do primeiro dia de ausência. O original deve ser apresentado no retorno ao trabalho.\n- Critérios do atestado: emitido no nome do colaborador, carimbo legível, assinatura, CRM ou CRO, data de atendimento, sem rasuras, com período de afastamento/horas.\n- Todos os atestados passam por validação e triagem da Medicina do Trabalho.\n- Ao ultrapassar 3 atestados no ano, o colaborador entra em avaliação e acompanhamento preventivo de saúde.\n- Não serão aceitos para abono: declarações de mero comparecimento sem incapacidade laboral, consultas de rotina no horário de trabalho (salvo comprovada impossibilidade e com validação), documentos sem CRM/CRO como 'atestado'.\n- 3º Turno (22h30–06h00): O atestado abona sempre o turno completo sem fracionamento.\n- Atestados de Teleconsulta: Regra geral NÃO são aceitos para abono. Exceção única: comprovada impossibilidade de atendimento presencial imediato, emitido exclusivamente pelo SUS ou plataforma oficial do convênio médico da empresa, com validação obrigatória da Medicina do Trabalho. Teleconsultas particulares não são aceitas.\n\nFérias: Direito a 30 dias após 12 meses de trabalho (período aquisitivo). Concessão em até 12 meses seguintes (período concessivo), avisada com 30 dias de antecedência. Possibilidade de fracionamento em até 3 períodos. Pagamento em até 2 dias antes do início do gozo. Venda de até 1/3 de férias deve ser pedida até 15 dias antes do fim do período aquisitivo. Início não pode coincidir com finais de semana ou feriados.\n\nIntervalo de Café na Produção: Intervalo de 10 minutos para descanso e revigoramento, respeitando os horários comunicados pela liderança.\n\nEstacionamento: A PRAFESTA não se responsabiliza por furtos, roubos ou danos em veículos ou pertences deixados no estacionamento.\n\nBenefícios e VT: Salário pago até o 5º dia útil do mês subsequente. Benefícios incluem VT (adotado pagamento em dinheiro correspondente à rota pública de menor custo economicamente viável), VR/VA, Prêmio-Cartão Destaque, Assistência Médica/Odontológica, Convênio Farmácia e Seguro de Vida.\n\nApresentação Pessoal e Higiene:\n- Cabelos protegidos/cobertos.\n- Unhas curtas e limpas (esmalte somente na cor incolor).\n- Uniforme limpo e conservado.\n- Armários limpos; estritamente proibido guardar drogas, armas, produtos ilícitos ou alimentos perecíveis sem embalagem.\n- Proibição absoluta de alimentar animais nas dependências da empresa (risco sanitário para produtos em contato com alimentos).\n- Mesas de trabalho administrativas: proibidas refeições completas na mesa; permitidos pequenos lanches rápidos (frutas, biscoitos) com discrição e limpeza.",
        },
        {
          numero: '3',
          titulo: 'Segurança e Desenvolvimento Profissional',
          conteudo:
            'Segurança e Medicina do Trabalho: Cumprimento inegociável de NRs e normas internas. O colaborador é responsável direto pela guarda e conservação dos EPIs. Comunicação imediata de qualquer risco, situação insegura ou acidente à liderança e CIPA. Obrigatoriedade de comparecimento a exames médicos periódicos, admissionais, de retorno e demissionais.\n\nDesenvolvimento Profissional: Gestão por competências, Avaliação de Desempenho e Plano de Desenvolvimento Individual (PDI), além de treinamentos contínuos.\n\nUso de TI e LGPD: Equipamentos e redes de TI destinados a fins exclusivamente profissionais, com monitoramento corporativo.',
        },
        {
          numero: '4',
          titulo: 'Conformidade, Normas de Conduta e Canal de Denúncia',
          conteudo:
            'Normas de Conduta:\n- Proibições graves: Improbidade (atestado falso, fraude no ponto, furto), incontinência de conduta (assédio moral ou sexual, ofensas, pornografia), desídia (atrasos recorrentes, negligência), embriaguez ou drogas, indisciplina/insubordinação e abandono de emprego (ausência injustificada superior a 30 dias consecutivos).\n- Celulares na Fábrica: Proibido o uso e porte em áreas internas e de produção; obrigatório guardar nos armários.\n- Elevador: Uso restrito a colaboradores com incapacidade física validada pelo RH/Médico do Trabalho ou idade igual/superior a 60 anos.\n\nSanções Disciplinares Progressivas:\n1. Registro Interno de Constatação (desvios leves / alinhamento);\n2. Advertência Escrita;\n3. Suspensão Disciplinar (de 1 a 30 dias);\n4. Demissão por Justa Causa (Art. 482 da CLT).\nEm faltas de gravidade excepcional, a penalidade mais severa pode ser aplicada de imediato.\n\nCanal de Denúncia:\n- E-mail exclusivo: denuncia@prafesta.com.br e caixas físicas lacradas nas dependências da empresa.\n- Garantia absoluta de sigilo, imparcialidade e NÃO RETALIAÇÃO ao denunciante de boa-fé.',
        },
      ],
      declaracao_verbatim:
        'TERMO DE CIÊNCIA E COMPROMISSO DO REGIMENTO INTERNO\n\nEu, ______________________________________________________________, portador do CPF nº ____________________________, declaro para todos os fins de direito que:\n\nRecebi nesta data uma cópia completa deste Regimento Interno da PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA.\n\nLi, compreendi integralmente o seu conteúdo e me comprometo a cumprir rigorosamente todas as normas, políticas, deveres e obrigações nele estabelecidas, bem como as demais diretrizes da Empresa comunicadas por meus superiores hierárquicos.\n\nEstou ciente de que o descumprimento de qualquer item deste Regimento Interno, ou das políticas e procedimentos da Empresa, sujeitar-me-á às sanções disciplinares previstas, incluindo a possibilidade de rescisão do meu contrato de trabalho por justa causa, conforme a gravidade e a reiteração da falta.\n\nComprometo-me a procurar meu superior direto ou o Departamento de Recursos Humanos para esclarecer quaisquer dúvidas que possam surgir em relação a este documento.\n\nAtibaia, ____ de ___________________ de _________.\nAssinatura do Colaborador',
      perguntas_quiz: [
        {
          id: 'ri_q1',
          pergunta:
            'Em quanto tempo o colaborador deve comunicar e justificar a falta ao serviço e entregar o atestado médico?',
          opcoes: [
            'Em até 10 dias corridos',
            'No prazo máximo de 48 horas a contar do primeiro dia de ausência',
            'Apenas no final do mês',
            'Não há prazo fixo',
          ],
          respostaCorreta: 1,
          explicacao:
            "Conforme o item 'Faltas e Atestados Médicos', as faltas devem ser comunicadas e os atestados entregues no prazo máximo de 48 (quarenta e oito) horas a contar do primeiro dia de ausência.",
        },
        {
          id: 'ri_q2',
          pergunta:
            'Atestados médicos emitidos por teleconsulta particular (fora do SUS e do convênio da empresa) são aceitos para abono de faltas?',
          opcoes: [
            'Sim, qualquer teleconsulta comprada na internet é aceita sem restrições',
            'Não, atestados de plataformas digitais particulares não são aceitos para fins de abono',
            'Sim, se o colaborador pagar do próprio bolso',
            'Sim, desde que a consulta dure mais de 20 minutos',
          ],
          respostaCorreta: 1,
          explicacao:
            'O Regimento veda atestados de teleconsultas em plataformas digitais particulares. Somente em caso de comprovada impossibilidade presencial, emitidos pelo SUS ou plataforma oficial do convênio da empresa, sujeitos à validação médica da PRAFESTA.',
        },
        {
          id: 'ri_q3',
          pergunta:
            'Qual é a regra de esmalte de unhas permitida para os colaboradores na fábrica da PRAFESTA?',
          opcoes: [
            'Qualquer cor, inclusive com glitter e adesivos',
            'Unhas curtas e limpas, sendo permitido apenas esmalte incolor (base incolor)',
            'Esmalte vermelho ou preto exclusivamente',
            'Unhas postiças compridas são incentivadas',
          ],
          respostaCorreta: 1,
          explicacao:
            'Por se tratar de indústria de embalagens plásticas para alimentos, a higiene exige unhas curtas, limpas e esmalte apenas na cor base incolor, sem unhas postiças.',
        },
        {
          id: 'ri_q4',
          pergunta:
            'Por que é estritamente proibido alimentar animais nas dependências da empresa?',
          opcoes: [
            'Porque os animais consomem os descartes da fábrica',
            'Para evitar atração de pragas/animais que possam comprometer a higiene e a segurança dos produtos em contato com alimentos',
            'Apenas por economia de ração',
            'Não há essa proibição no regimento',
          ],
          respostaCorreta: 1,
          explicacao:
            'A presença e alimentação de animais atrai vetores de contaminação e compromete diretamente a higiene e a segurança dos produtos fabricados pela PRAFESTA, destinados ao contato direto com alimentos.',
        },
        {
          id: 'ri_q5',
          pergunta:
            'Qual é a sequência da progressão padrão das sanções disciplinares na PRAFESTA?',
          opcoes: [
            '1. Demissão direta sem conversa prévia',
            '1. Registro Interno de Constatação; 2. Advertência Escrita; 3. Suspensão Disciplinar (1 a 30 dias); 4. Demissão por Justa Causa',
            '1. Multa salarial; 2. Trabalho comunitário',
            '1. Advertência verbal apenas, sem registro formal',
          ],
          respostaCorreta: 1,
          explicacao:
            'As sanções disciplinares progressivas são: 1. Registro Interno de Constatação; 2. Advertência Escrita; 3. Suspensão Disciplinar (1 a 30 dias); 4. Demissão por Justa Causa (art. 482 CLT).',
        },
        {
          id: 'ri_q6',
          pergunta: 'Quem tem permissão para utilizar o elevador da empresa?',
          opcoes: [
            'Qualquer colaborador a qualquer momento',
            'Apenas colaboradores com incapacidade física comprovada e validada pelo RH/Médico do Trabalho ou idade igual ou superior a 60 anos',
            'Apenas funcionários com mais de 5 anos de casa',
            'Colaboradores carregando qualquer tipo de mochila',
          ],
          respostaCorreta: 1,
          explicacao:
            'Conforme o item de normas de comportamento, o uso do elevador é restrito a colaboradores com incapacidade física validada pelo RH/Médico do Trabalho ou pessoas com 60 anos ou mais.',
        },
      ],
    }

    // Documento 3: Cartilha de Prevenção ao Assédio Moral e Sexual
    const doc3Data = {
      titulo: 'Cartilha de Prevenção ao Assédio Moral e Sexual',
      subtitulo: 'Ambiente de Trabalho Mais Saudável - Diretrizes de Prevenção e Combate',
      codigo: 'CART-ASSEDIO-2023',
      revisao: 'Janeiro de 2023',
      data_publicacao: 'Janeiro de 2023',
      ementa:
        'Conceituação de assédio moral e sexual, distinção jurídica, alvos preferenciais, condutas inaceitáveis, o que não é assédio, consequências e canal confidencial de denúncia.',
      local_padrao: 'Mairiporã',
      ordem: 3,
      ativo: true,
      secoes: [
        {
          numero: '1',
          titulo: 'Apresentação e Compromisso da PRAFESTA',
          conteudo:
            'A PRAFESTA busca fornecer um ambiente de trabalho saudável e positivo a seus colaboradores. Sabemos que as condições de trabalho e as relações interpessoais influenciam diretamente a qualidade de vida e a produtividade. Pensando na melhoria contínua desse ambiente, a empresa está firmemente engajada em promover políticas preventivas e repressivas de combate a qualquer tipo de assédio, preservando a dignidade humana e os direitos fundamentais.',
        },
        {
          numero: '2',
          titulo: 'O que é Assédio e Formas de Ocorrência',
          conteudo:
            'Assédio é a exposição de pessoas a situações humilhantes ou constrangedoras no ambiente de trabalho, conceituado como MORAL ou SEXUAL.\n\nFormas em que pode ocorrer:\n- De cima para baixo (do superior para o subordinado - vertical descendente);\n- De baixo para cima (do subordinado para o superior - vertical ascendente);\n- Na mesma hierarquia (entre colegas do mesmo nível - horizontal);\n- Misto (combinação de horizontal e vertical).\n\nAssédio Moral Interpessoal: Ocorre de maneira individual, direta e pessoal, visando prejudicar ou eliminar o profissional na equipe.\n\nAssédio Moral Institucional: Ocorre quando a própria organização incentiva ou tolera atos de assédio, utilizando estratégias desumanas de humilhação e controle para bater metas.',
        },
        {
          numero: '3',
          titulo: 'Assédio Moral: Conceito, Exemplos e o que NÃO é Assédio',
          conteudo:
            "Conceito: Toda e qualquer conduta abusiva, manifestada por comportamentos, palavras, atos, gestos ou escritos reiterados que tragam danos à personalidade, dignidade, integridade física ou psíquica da pessoa, degradando o ambiente de trabalho.\n\nExemplos comuns de assédio moral:\n- Retirar autonomia ou instrumentos de trabalho;\n- Contestar a todo momento decisões e criticar injustamente em tom exagerado;\n- Sobrecarregar de tarefas de forma permanente ou estipular prazos impossíveis;\n- Atribuir tarefas muito inferiores ou incompatíveis com o cargo de propósito;\n- Controlar a frequência e o tempo de uso do banheiro;\n- Dificultar ou impedir promoções;\n- Invadir a vida privada da pessoa com mensagens fora de hora;\n- Não atribuir atividades, deixando o colaborador no ócio humilhante ('geladeira');\n- Evitar comunicação direta, falando apenas por bilhetes ou terceiros;\n- Agressões verbais, gestos de desprezo, gritos ou ameaças físicas;\n- Espalhar boatos, fofocas ou piadas depreciativas;\n- Isolar de confraternizações e almoços com colegas;\n- Práticas contra mulheres: dificultar consultas médicas de gestantes, interferir no planejamento familiar ou desconsiderar sua opinião técnica.\n\nO que NÃO é assédio moral:\n- Feedbacks construtivos sobre o trabalho (desde que não em público e sem humilhação);\n- Exigências profissionais legítimas de eficiência e metas dentro da normalidade;\n- Aumento de volume de trabalho ou serviço extraordinário dentro dos limites da lei;\n- Mecanismos tecnológicos de controle (como o ponto eletrônico).\n\nATENÇÃO: Situações isoladas de conflito podem configurar desentendimento ou até dano moral eventual, mas NÃO caracterizam assédio moral. O assédio moral exige reiteração sistemática e intenção prolongada de prejudicar.",
        },
        {
          numero: '4',
          titulo: 'Alvos Preferenciais, Causas e Consequências',
          conteudo:
            'Alvos preferenciais: Mulheres (especialmente mulheres negras, alvos mais frequentes segundo estatísticas), raça/etnia, Pessoas com Deficiência (PcDs), pessoas LGBTI+, doentes e acidentados de trabalho.\n\nCausas: Abuso do poder diretivo, busca incessante de metas, cultura autoritária, despreparo de lideranças, rivalidade e inveja.\n\nConsequências:\n- Para o indivíduo: dores, palpitações, distúrbios digestivos, cefaleia, hipertensão, insônia, depressão, síndrome do pânico, estresse, esgotamento físico/emocional (burnout), perda do sentido do trabalho e até suicídio.\n- Para a empresa: queda de produtividade, absenteísmo, alta rotatividade, custos com licenças, danos à reputação e passivos jurídicos trabalhistas.\n- Para a sociedade: custos previdenciários e sobrecarga do sistema de saúde pública.',
        },
        {
          numero: '5',
          titulo: 'Assédio Sexual: Conceito, Espécies e Legislação',
          conteudo:
            "Conceito: Toda conduta indesejada de natureza sexual que restrinja a liberdade sexual da vítima. DIFERENÇA CRUCIAL: No assédio sexual, a reiteração NÃO é necessária — um único ato grave é suficiente para configurar o crime e a falta grave.\n\nEspécies:\n1. Por chantagem (quid pro quo): Quando a aceitação ou recusa da investida sexual é determinante para uma decisão laboral (promoção, permanência no emprego, benefícios);\n2. Por intimidação (ambiente hostil): Instigações inoportunas verbais, físicas ou visuais que criam ambiente ofensivo, constrangedor e hostil, violando o 'poder de dizer não'.\n\nLegislação:\n- Código Penal Brasileiro, Art. 216-A: Crime punível com pena de detenção de 1 a 2 anos.\n- Convenção/Recomendação 111 da OIT (discriminação no trabalho).\n- Falta grave na CLT sujeita à Demissão por Justa Causa imediata e responsabilização civil/regressiva.",
        },
        {
          numero: '6',
          titulo: 'Como Prevenimos e Canal de Denúncia',
          conteudo:
            'Ações da PRAFESTA:\n- Promoção de palestras e treinamentos sobre respeito e diversidade;\n- Aplicação rigorosa e igualitária do Código de Ética;\n- Apoio e acolhimento psicológico no RH para eventuais vítimas;\n- Canal de denúncia seguro, independente e com proteção absoluta contra retaliação: e-mail denuncia@prafesta.com.br.',
        },
      ],
      declaracao_verbatim:
        'DECLARAÇÃO DE COMPROMISSO\n\nEu, _________________________________________________,\ndeclaro ter recebido treinamento sobre assédio moral e sexual ministrado pela PRAFESTA INDUSTRIA E COMERCIO DE EMBALAGENS e assumo o compromisso de prevenir e denunciar qualquer forma de assédio ou discriminação no ambiente de trabalho.\n\nMAIRIPORÃ, ______/_______/_________\n___________________________________________\nAssinatura do colaborador',
      perguntas_quiz: [
        {
          id: 'as_q1',
          pergunta:
            'Qual a diferença fundamental entre o assédio moral e o assédio sexual quanto à repetição dos atos?',
          opcoes: [
            'Ambos exigem exatamente 10 atos comprovados em juízo',
            'O assédio moral exige a reiteração da conduta (atos repetidos e prolongados), enquanto no assédio sexual a prática de um único ato já é suficiente',
            'O assédio sexual precisa de testemunhas e repetição diária por 6 meses',
            'Não há diferença entre eles',
          ],
          respostaCorreta: 1,
          explicacao:
            'Conforme a Cartilha, o assédio moral exige reiteração sistemática no tempo, enquanto o assédio sexual pode ser configurado por um único ato grave que viole a liberdade sexual da vítima.',
        },
        {
          id: 'as_q2',
          pergunta: 'Qual conduta abaixo NÃO configura assédio moral?',
          opcoes: [
            'Crítica construtiva realizada em ambiente reservado com foco profissional no desempenho (feedback adequado)',
            'Controlar o tempo e a quantidade de idas ao banheiro do colaborador',
            'Retirar tarefas e deixar o colaborador em isolamento humilhante',
            'Espalhar boatos maliciosos sobre a vida íntima do colaborador',
          ],
          respostaCorreta: 0,
          explicacao:
            'Feedbacks construtivos e cobranças profissionais legítimas, feitos sem humilhação ou exposição pública, são atos normais de gestão e NÃO constituem assédio moral.',
        },
        {
          id: 'as_q3',
          pergunta: 'O que caracteriza o assédio sexual por chantagem?',
          opcoes: [
            'Uma conversa comum sobre futebol no refeitório',
            'Quando a aceitação ou rejeição de uma investida sexual é condicionada a uma decisão favorável ou prejudicial no emprego (promoção, permanência etc.)',
            'Apenas piadas de duplo sentido em grupos de amigos',
            'Exigência de uso de uniforme e crachá',
          ],
          respostaCorreta: 1,
          explicacao:
            'O assédio sexual por chantagem ocorre quando o assediador utiliza sua posição hierárquica para condicionar benefícios ou ameaçar a estabilidade da vítima caso ela não ceda à investida.',
        },
        {
          id: 'as_q4',
          pergunta:
            'Qual é a pena prevista no Código Penal Brasileiro (Art. 216-A) para a prática de assédio sexual?',
          opcoes: [
            'Apenas pedido formal de desculpas',
            'Pena de detenção de 1 a 2 anos, além de justa causa trabalhista e responsabilização civil',
            'Prestação de serviços comunitários apenas no final de semana',
            'Multa administrativa de trânsito',
          ],
          respostaCorreta: 1,
          explicacao:
            'O Art. 216-A do Código Penal tipifica o crime de assédio sexual com pena de detenção de 1 a 2 anos, além das punições na esfera cível e demissão por justa causa na CLT.',
        },
        {
          id: 'as_q5',
          pergunta:
            'Qual canal oficial confidencial da PRAFESTA deve ser utilizado para relatar situações de assédio?',
          opcoes: [
            'Postar em redes sociais abertas',
            'E-mail dedicado denuncia@prafesta.com.br ou caixas físicas seguras',
            'Comentar com colegas no horário do café da fábrica',
            'Deixar recado anônimo no banheiro',
          ],
          respostaCorreta: 1,
          explicacao:
            'A PRAFESTA disponibiliza o canal seguro e confidencial denuncia@prafesta.com.br e caixas físicas lacradas, garantindo proteção total contra retaliação ao denunciante de boa-fé.',
        },
      ],
    }

    const docs = [doc1Data, doc2Data, doc3Data]

    for (const d of docs) {
      let rec
      try {
        rec = app.findFirstRecordByData('documentos', 'codigo', d.codigo)
      } catch (_) {
        rec = new Record(docsCol)
      }
      rec.set('titulo', d.titulo)
      rec.set('subtitulo', d.subtitulo)
      rec.set('codigo', d.codigo)
      rec.set('revisao', d.revisao)
      rec.set('data_publicacao', d.data_publicacao)
      rec.set('ementa', d.ementa)
      rec.set('conteudo', d.ementa)
      rec.set('secoes', JSON.stringify(d.secoes))
      rec.set('declaracao_verbatim', d.declaracao_verbatim)
      rec.set('local_padrao', d.local_padrao)
      rec.set('perguntas_quiz', JSON.stringify(d.perguntas_quiz))
      rec.set('ativo', d.ativo)
      rec.set('ordem', d.ordem)
      app.save(rec)
    }
  },
  (app) => {
    // down
  },
)
