migrate(
  (app) => {
    const docsCol = app.findCollectionByNameOrId('documentos')

    // =========================================================================
    // 1. TERMO UNIFICADO DE COMPROMISSOS, NORMAS INTERNAS E USO DE TECNOLOGIAS
    // Código: TU-RH-023 | Revisão: Rev. 023 (09/10/2026)
    // Texto na íntegra, cláusula por cláusula, sem resumos ou truncamentos
    // =========================================================================
    const secoesTermoUnificado = [
      {
        numero: '1',
        titulo: 'Objetivo e Âmbito de Aplicação',
        conteudo:
          'O presente Termo Unificado tem por objetivo formalizar e consolidar a ciência inequívoca, a adesão irrevogável e o compromisso solene do colaborador com as diretrizes, regulamentos, manuais, procedimentos e normas internas estabelecidas pela PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA.\n\nEste instrumento estabelece os padrões inegociáveis de conformidade legal, ética corporativa, transparência operacional e gestão preventiva de riscos, aplicando-se integralmente a todos os empregados em todas as plantas industriais, centros de distribuição, escritórios administrativos e dependências operacionais da PRAFESTA.\n\nA assinatura eletrônica ou adesão digital ao presente instrumento vincula o colaborador às suas disposições durante toda a vigência do contrato de trabalho e, no tocante aos deveres de sigilo, confidencialidade e propriedade intelectual, mesmo após o seu término.',
      },
      {
        numero: '2',
        titulo: 'Regulamento de Marcação e Controle de Ponto Eletrônico',
        conteudo:
          '2.1. Horário de Trabalho e Pontualidade:\nO colaborador obriga-se a cumprir com rigor a jornada de trabalho fixada em seu contrato individual de trabalho e respectivos aditivos contratuais, respeitando pontualmente os horários determinados para entrada, intervalos legais para repouso e alimentação, retorno às atividades e saída ao término do expediente.\n\n2.2. Marcação Correta, Obrigatória e Pessoal:\nA marcação do ponto é ato estritamente pessoal, obrigatório e indelegável em todos os momentos de início e término da jornada e de cada intervalo intra e interjornada. Nos termos do Art. 58, § 1º da CLT e das normas regulamentares vigentes, é admitida a tolerância máxima e estrita de até 05 (cinco) minutos em cada registro de marcação, desde que não exceda o limite cumulativo de 10 (dez) minutos diários. A marcação de ponto é executada exclusivamente através dos Registradores Eletrônicos de Ponto (REP) e sistemas biométricos homologados pela empresa. É terminantemente proibido marcar ponto para terceiros ou solicitar que outrem o faça, conduta que constitui falta grave e ato de improbidade passível de demissão por justa causa imediata.\n\n2.3. Intervalo Intrajornada para Repouso e Alimentação:\nO intervalo para descanso e refeição tem duração mínima de 01 (uma) hora para jornadas superiores a seis horas, sendo vedada a sua supressão, redução ou prorrogação sem a prévia, expressa e formal autorização da gerência e alinhamento com a legislação aplicável. Durante o intervalo, o colaborador está inteiramente dispensado da prestação de serviços.\n\n2.4. Atrasos, Faltas e Medidas Disciplinares:\nQuaisquer atrasos injustificados que ultrapassem a tolerância legal acarretarão o desconto pecuniário proporcional das horas não trabalhadas, bem como a dedução do Descanso Semanal Remunerado (DSR) correspondente, sujeitando ainda o empregado às sanções disciplinares progressivas (Registro de Constatação, advertência escrita, suspensão disciplinar e dispensa motivada por justa causa).\n\n2.5. Saídas Antecipadas e Horas Extras:\nÉ terminantemente proibido ausentar-se do posto de trabalho ou encerrar o expediente antes do término regular contratual sem autorização prévia, expressa e formal de sua chefia imediata, mediante protocolo em formulário do Departamento Pessoal. Da mesma forma, a realização de horas suplementares (horas extras) é medida de absoluta exceção, dependendo de prévia solicitação ou expressa autorização da chefia competente.',
      },
      {
        numero: '3.1',
        titulo: 'Recursos de Rede Corporativa, E-mail e Infraestrutura de TI',
        conteudo:
          '3.1. Destinação Exclusivamente Profissional:\nOs recursos de rede, cabeamento estruturado, acessos à internet corporativa, sistemas informatizados (ERPs, WMS, planilhas e softwares dedicados), contas de correio eletrônico corporativo, estações de trabalho físicas, notebooks, tablets e impressoras são instrumentos e ferramentas de trabalho fornecidos pela PRAFESTA única e estritamente para a execução das atividades e encargos decorrentes do contrato de trabalho.\n\n3.2. Proibição de Uso Pessoal Ilícito ou Inadequado:\nÉ terminantemente vedada a utilização da rede e dos computadores corporativos para finalidades de interesse exclusivamente particular, bem como para navegação em sítios impróprios, redes sociais alheias à função, jogos, comércio eletrônico pessoal, consumo ou transmissão de conteúdos ofensivos, preconceituosos, pornográficos ou ilegais.\n\n3.3. E-mail Institucional e Ausência de Expectativa de Privacidade:\nO endereço de e-mail institucional concedido ao colaborador é patrimônio corporativo da PRAFESTA. O colaborador tem plena ciência e declara expressamente que não há qualquer expectativa de privacidade no uso do e-mail profissional, da rede e dos equipamentos da empresa, reservando-se à PRAFESTA o direito inalienável de monitorar, auditar e inspecionar o conteúdo dos arquivos trafegados para garantia da segurança cibernética e do cumprimento das normas legais.\n\n3.4. Instalação de Softwares e Segurança de Senhas:\nÉ expressamente proibida a instalação de qualquer software, aplicativo, extensão de navegador, jogos ou ferramentas não autorizadas previamente e por escrito pelo Departamento de Tecnologia da Informação (TI). As senhas de rede e acessos a sistemas são estritamente pessoais e intransferíveis, respondendo o titular do acesso por qualquer operação realizada com suas credenciais.',
      },
      {
        numero: '3.2',
        titulo: 'Uso de Aparelhos Celulares e Dispositivos Móveis Particulares',
        conteudo:
          '3.6. Restrições Estritas de Aparelhos Celulares na Área Fabril:\nPor imperativos absolutos de segurança do trabalho, prevenção de acidentes com maquinários em movimento, empilhadeiras e pontes rolantes, bem como para assegurar a atenção, o foco e a produtividade, fica EXPRESSAMENTE PROIBIDO o uso, porte, porte de fones de ouvido e manipulação de telefones celulares particulares durante a jornada de trabalho em todas as áreas produtivas, galpões de fabricação, áreas de injeção, termoformagem, expedição e estoques da PRAFESTA.\n\nOs aparelhos celulares particulares deverão permanecer desligados ou em modo silencioso, devidamente guardados nos armários individuais dos vestiários durante todo o expediente de trabalho do colaborador.\n\nA permissão para porte e utilização de telefones móveis na área produtiva aplica-se estritamente aos colaboradores que exerçam cargos de liderança ou gestão com formal designação e expressa autorização da Gerência Geral e da Diretoria.\n\nEm situações de emergência familiar inadiável, os familiares do colaborador deverão entrar em contato imediato pelo telefone fixo oficial da Portaria ou do Departamento de Recursos Humanos da PRAFESTA, que providenciará a imediata comunicação e atendimento ao empregado.',
      },
      {
        numero: '3.3',
        titulo: 'Monitoramento Corporativo, Auditoria e Sigilo Comercial',
        conteudo:
          '3.7. Monitoramento e Tráfego de Dados:\nA PRAFESTA mantém registros, logs de auditoria e monitoramento contínuo de todo o tráfego de dados, transferências de arquivos, uso de links de internet e histórico de sistemas operados dentro de sua infraestrutura tecnológica, prerrogativa exercida em estrita conformidade com a legislação aplicável e com o Marco Civil da Internet (Lei nº 12.965/2014).\n\n3.8. Sigilo Comercial, Segredos Industriais e Concorrência Desleal:\nO colaborador compromete-se a guardar absoluto e rigoroso sigilo acerca de todas as informações técnicas, fórmulas químicas de matérias-primas e plásticos, parâmetros de injeção e moldagem, projetos de embalagens, moldes, custos operacionais, carteira de clientes, margens comerciais, estratégias de precificação, planilhas e dados industriais a que tiver acesso em razão de suas atividades na PRAFESTA.\n\nA revelação, cópia, compartilhamento não autorizado, transmissão a terceiros ou utilização de qualquer dado ou segredo empresarial em benefício próprio ou de outrem constitui ilícito civil, quebra de dever ético, crime de concorrência desleal (Lei nº 9.279/1996) e falta gravíssima capitulada no Art. 482 da CLT, ensejando rescisão imediata do contrato de trabalho por justa causa, além das devidas indenizações cíveis e criminais.',
      },
      {
        numero: '3.4',
        titulo: 'Regulamento de Uso de Ferramentas de Inteligência Artificial (IA)',
        conteudo:
          "3.9.1. Destinação Exclusivamente Profissional:\nO acesso e o emprego de plataformas, modelos e ferramentas de Inteligência Artificial Generativa e correlatas (tais como ChatGPT, Claude, Microsoft Copilot, Gemini e ferramentas especializadas) são facultados única e estritamente para atividades profissionais diretamente pertinentes às atribuições do cargo exercido na empresa.\n\n3.9.2. PROIBIÇÃO EXPRESSA E ABSOLUTA DE INSERÇÃO DE DADOS SIGILOSOS E PESSOAIS:\nFica terminantemente e EXPRESSAMENTE PROIBIDO a qualquer colaborador inserir, colar, carregar, digitar, submeter via prompt ou de qualquer forma alimentar qualquer ferramenta de Inteligência Artificial (pública, aberta, gratuita ou comercial externa) com:\na) Dados confidenciais, estratégicos, industriais ou comerciais da PRAFESTA;\nb) Informações financeiras, balancetes, custos, margens e precificação;\nc) Fórmulas, fichas técnicas de produtos, matrizes e especificações de embalagens;\nd) DADOS PESSOAIS e DADOS PESSOAIS SENSÍVEIS de quaisquer empregados, clientes, parceiros, fornecedores ou terceiros protegidos pela Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).\n\n3.9.3. Homologação Prévia pelo Comitê de TI e IA:\nNenhuma nova ferramenta, plugin, API ou extensão baseada em Inteligência Artificial poderá ser contratada, instalada ou integrada aos computadores da empresa sem a expressa e prévia avaliação técnica do Departamento de Tecnologia da Informação (TI) e formal aprovação da Diretoria.\n\n3.9.4. Propriedade Intelectual Exclusiva da PRAFESTA:\nTodo e qualquer documento, texto, código, design, metodologia, relatório, análise técnica ou trabalho intelectual produzido ou desenvolvido pelo colaborador com o auxílio ou utilização de ferramentas de Inteligência Artificial no exercício de suas funções pertence única, total e exclusivamente à PRAFESTA, cedendo o colaborador todos os eventuais direitos patrimoniais correlatos.\n\n3.9.5. Responsabilidade Pessoal e Indelegável pela Revisão Humana:\nO colaborador assume responsabilidade integral, individual e intransferível pela revisão, conferência fática, validação técnica, veracidade e exatidão de todo e qualquer material, texto ou dado gerado ou processado com apoio de Inteligência Artificial antes de sua veiculação, aplicação prática ou entrega. Erros, omissões, imprecisões ou 'alucinações' do modelo de IA jamais poderão ser invocados como escusa ou justificativa para descumprimento de deveres contratuais.\n\n3.9.6. Guarda e Intransferibilidade de Credenciais:\nAs credenciais, licenças e logins de acesso a ferramentas de Inteligência Artificial corporativa são pessoais e intransferíveis, sendo terminantemente proibido o seu empréstimo ou compartilhamento com colegas de trabalho ou terceiros.",
      },
      {
        numero: '3.5',
        titulo: 'Biometria, Reconhecimento Facial e Câmeras com IA',
        conteudo:
          '3.10.1. Consentimento Livre, Informado e Específico para Tratamento de Dados Biométricos:\nO colaborador manifesta sua ciência integral e outorga seu livre, expresso, inequívoco e informado consentimento para o tratamento de seus dados biométricos sensíveis (impressão digital e biometria/reconhecimento facial), estritamente direcionados às finalidades legítimas de controle de acesso físico às dependências da empresa, fiscalização de segurança predial e marcação de ponto eletrônico nos termos do Art. 74 da CLT e da LGPD.\n\n3.10.2. Câmeras com Inteligência Artificial para Segurança e Prevenção Operacional:\nA PRAFESTA utiliza câmeras dotadas de recursos analíticos de imagem e Inteligência Artificial nas áreas externas, portarias, corredores de circulação, depósitos e áreas produtivas com a finalidade exclusiva de proteção patrimonial, detecção de riscos operacionais, prevenção de acidentes e segurança coletiva.\n\nFica solenemente ratificado que é TERMINANTEMENTE PROIBIDA a instalação de quaisquer câmeras, sensores ópticos ou equipamentos de gravação em vestiários, sanitários e áreas destinadas ao repouso e intimidade dos colaboradores.\n\n3.10.3. Proibição de Fraude e Tentativas de Burla:\nConstitui ato de indisciplina e falta de gravidade máxima qualquer tentativa de ludibriar, burlar, fraudar ou impedir o regular funcionamento dos dispositivos biométricos e câmeras, inclusive pelo uso de fotografias, máscaras, imagens reproduzidas em telas ou outros artifícios ilícitos, conduta capitulada como justa causa imediata.\n\n3.10.4. Revogação de Consentimento Biométrico:\nA revogação do consentimento para tratamento de biometria por escrito poderá ser realizada pelo titular, ciente o empregado de que tal manifestação poderá ensejar a incompatibilidade técnica e operacional com os procedimentos de segurança e controle legal de frequência.',
      },
      {
        numero: '3.6',
        titulo: 'Uso da Rede Wi-Fi Corporativa',
        conteudo:
          '3.11.1. Conexão Condicionada ao Cumprimento das Políticas Internas:\nO eventual acesso à rede sem fio (Wi-Fi) institucional da PRAFESTA, seja em computadores portáteis da empresa ou em dispositivos expressamente autorizados, sujeita-se à aceitação automática de todas as diretrizes de segurança da informação e uso da rede.\n\n3.11.2. Monitoramento e Filtros de Conteúdo:\nA rede corporativa possui filtros automáticos de conteúdo e firewalls que bloqueiam downloads ilegais, redes de compartilhamento ponto a ponto (torrents), sítios de jogos de azar e conteúdos nocivos à segurança cibernética da organização.',
      },
      {
        numero: '3.7',
        titulo: 'Política de Mídias Sociais e Direito de Uso de Imagem',
        conteudo:
          '3.12.1. Manifestações em Redes Sociais e Representação Institucional:\nÉ vedado a qualquer colaborador emitir declarações públicas, criar perfis, responder em nome da PRAFESTA ou divulgar imagens de linhas de produção, equipamentos internos, produtos antes do lançamento oficial ou documentos da empresa sem autorização prévia e expressa do Departamento de Marketing e da Diretoria.\n\n3.12.2. Respeito e Reputação da Marca:\nO colaborador obriga-se a abster-se de postagens, comentários difamatórios ou condutas em redes sociais públicas que denigram a reputação da PRAFESTA, de seus clientes, produtos, marcas ou de colegas de trabalho.\n\n3.12.3. Autorização de Uso de Imagem Corporativa:\nO colaborador autoriza a PRAFESTA, a título gratuito, em caráter não exclusivo e durante todo o período em que mantiver vínculo com a empresa, a capturar, fixar e veicular sua imagem e voz em fotografias, vídeos institucionais, murais internos, campanhas educativas de segurança do trabalho e treinamentos internos. Esta autorização poderá ser revogada por requerimento escrito formal junto ao RH.',
      },
      {
        numero: '4',
        titulo: 'Autorização e Tratamento de Dados Pessoais (LGPD - Lei nº 13.709/2018)',
        conteudo:
          '4.1. Escopo e Finalidades do Tratamento de Dados:\nO colaborador tem pleno conhecimento e manifesta expressa ciência e autorização para que a PRAFESTA efetue o tratamento (coleta, armazenamento, cruzamento, utilização e arquivamento) de seus dados pessoais — incluindo nome civil, números de RG e CPF, dados da CTPS, PIS, endereço, estado civil, histórico funcional, dados bancários para crédito salarial, registros de exames ocupacionais admissionais/periódicos (PCMSO) e dados de dependentes.\n\n4.2. Bases Legais Aplicáveis:\nO tratamento dos dados apoia-se no estrito cumprimento de obrigações legais e regulatórias trabalhistas, previdenciárias e fiscais (eSocial, CLT, INSS, Receita Federal), na execução do contrato individual de trabalho e no legítimo interesse da empresa na gestão de recursos humanos e segurança patrimonial.\n\n4.3. Compartilhamento Estritamente Necessário:\nOs dados pessoais poderão ser compartilhados com instituições financeiras contratadas para processamento de folha de pagamento, operadoras de planos de assistência médica e odontológica, fornecedores de vale-transporte e alimentação, bem como órgãos públicos fiscalizadores, garantindo-se sempre a confidencialidade e a segurança das informações.\n\n4.4. Direitos do Titular:\nFicam assegurados ao colaborador todos os direitos previstos no Artigo 18 da LGPD, tais como confirmação da existência de tratamento, acesso aos dados, correção de dados incompletos ou inexatos e esclarecimentos sobre o compartilhamento, mediante solicitação formal ao Encarregado de Proteção de Dados (DPO) através dos canais oficiais da empresa.',
      },
      {
        numero: '5',
        titulo: 'Regulamento de Estacionamento e Vagas de Veículos',
        conteudo:
          '5.1. Acesso e Utilização:\nO acesso e o uso do estacionamento nas dependências da fábrica e unidades da PRAFESTA são concedidos por mera liberalidade da empresa, constituindo benefício de comodidade aos colaboradores autorizados, sujeito ao controle de entrada pela portaria e sistemas biométricos.\n\n5.2. Regras de Trânsito e Vagas Determinadas:\nO motorista obriga-se a respeitar o limite de velocidade interna de 10 km/h, as faixas de pedestres e as vagas demarcadas. É estritamente vedado estacionar veículos particulares em vagas reservadas a visitantes, clientes, diretores, prestadores de serviços, ambulâncias ou vagas sinalizadas para pessoas com deficiência (PcD).\n\n5.3. Exclusão de Responsabilidade por Danos ou Furtos:\nA PRAFESTA não assume guarda ou depósito dos veículos automotores ou motocicletas, não se responsabilizando por quaisquer furtos, roubos, colisões, danos mecânicos, amassados, riscos ou pelo extravio de pertences, objetos de valor ou documentos pessoais deixados no interior dos veículos estacionados.',
      },
      {
        numero: '6',
        titulo: 'Segurança do Trabalho e Uso Obrigatório de EPIs',
        conteudo:
          '6.1. Obrigatoriedade de Uso dos Equipamentos de Proteção Individual:\nO colaborador declara que recebeu todos os Equipamentos de Proteção Individual (EPIs) adequados aos riscos de suas funções, bem como treinamento técnico de segurança do trabalho ministrado pela equipe de Segurança do Trabalho e CIPA da PRAFESTA.\n\n6.2. Compromissos Inegociáveis do Empregado:\nO colaborador compromete-se de forma expressa e inegociável a:\na) Usar rigorosamente os EPIs fornecidos durante todo o tempo de permanência nos postos de trabalho e áreas fabris designadas;\nb) Responsabilizar-se pela higienização, conservação, guarda e manutenção adequada dos equipamentos recebidos;\nc) Comunicar imediatamente à chefia e à equipe de Segurança do Trabalho qualquer alteração, desgaste ou extravio que torne o EPI impróprio para uso, solicitando sua substituição imediata;\nd) Submeter-se aos treinamentos periódicos, simulados de emergência e orientações de prevenção de acidentes.\n\n6.3. Falta Grave e Recusa Injustificada:\nA recusa injustificada do empregado em utilizar os EPIs fornecidos ou a inobservância das ordens de serviço e normas de segurança emitidas pela empresa constituem ato de indisciplina e falta grave punível nos termos do Art. 158 da CLT, podendo acarretar demissão por justa causa.',
      },
      {
        numero: '7',
        titulo: 'Integração Institucional, Políticas Internas e Disposições Finais',
        conteudo:
          '7.1. Conhecimento Pleno das Políticas da Empresa:\nO colaborador declara que participou do programa de Integração Institucional da PRAFESTA, tendo recebido orientações e acesso completo aos Manuais de Procedimentos Internos, Diretrizes de Qualidade, Sistema de Gestão Ambiental e ao Código de Ética e Conduta Empresarial.\n\n7.2. Primazia do Cumprimento Normativo:\nO colaborador declara estar ciente de que o estrito cumprimento de todas as diretrizes expressas neste Termo Unificado e nas normas internas constitui dever fundamental inerente ao seu contrato de trabalho, cujo descumprimento sujeita o infrator às medidas disciplinares cabíveis.\n\n7.3. Canal Confidencial para Esclarecimentos e Denúncias:\nPara dirimir dúvidas acerca da interpretação destas cláusulas ou reportar condutas contrárias a este Termo com sigilo absoluto e proteção contra retaliação, a empresa disponibiliza o canal de denúncias pelo e-mail denuncia@prafesta.com.br e as urnas de manifestação instaladas nas plantas.',
      },
    ]

    const declaracaoVerbatimTU =
      'Declaro, para os devidos fins de direito, que recebi da PRAFESTA o acesso integral ao presente Termo Unificado de Compromissos, Normas Internas e Uso de Tecnologias em meio digital, tive acesso irrestrito ao seu conteúdo, li atenciosamente e compreendi integralmente todas as cláusulas e condições estabelecidas nas Seções 1 a 7, incluindo expressamente as regras relativas ao uso de Inteligência Artificial (cláusula 3.4 / 3.9), aos sistemas de biometria e reconhecimento facial e câmeras com inteligência artificial (cláusula 3.5 / 3.10), ao uso da infraestrutura de TI e Wi-Fi (cláusula 3.1 e 3.6), à Política de Mídia Social e uso de imagem (cláusula 3.7 / 3.12), à proteção de dados pela LGPD (Seção 4) e ao uso obrigatório dos Equipamentos de Proteção Individual - EPIs (Seção 6), comprometendo-me a cumpri-las fielmente durante todo o período de meu vínculo empregatício com a PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA.\n\nO ACEITE AO PRESENTE TERMO É REALIZADO DE FORMA ELETRÔNICA, por meio do acesso ao portal institucional de assinatura corporativa, com a confirmação eletrônica da leitura e concordância e/ou assinatura eletrônica no sistema. O registro eletrônico gerado pelo sistema com aposição de data, horário com fuso oficial de Brasília, identificação cadastral e funcional do colaborador, endereço de e-mail, protocolo criptográfico e metadados de autenticação constituem meio hábil, pleno e suficiente de comprovação jurídica, com validade e eficácia equivalentes à assinatura física de próprio punho, nos termos do art. 10 da Medida Provisória nº 2.200-2/2001, dos arts. 107 e 219 do Código Civil e do art. 10 da Lei nº 12.965/2014 (Marco Civil da Internet).\n\nO COLABORADOR declara, ainda, ciência de que terá acesso permanente a este instrumento em meio digital no portal corporativo para consulta a qualquer momento e que poderá solicitar, a qualquer tempo, via digital atualizada junto ao Departamento de Recursos Humanos.'

    // =========================================================================
    // 2. REGIMENTO INTERNO 2026
    // Código: RI-2026-v1 | Revisão: Edição 2026
    // Texto na íntegra, todas as normas, diretrizes, benefícios e sanções
    // =========================================================================
    const secoesRegimentoInterno = [
      {
        numero: '1',
        titulo: 'Introdução, Nossa Empresa, Missão, Visão e Valores',
        conteudo:
          '1.1. Sobre a PRAFESTA:\nFundada em 22 de julho de 1986, a PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA. (CNPJ 56.173.131/0001-25) consolidou-se como líder na fabricação e comercialização de descartáveis plásticos e embalagens de alta qualidade para uso doméstico, comercial e industrial, marcando presença indelével nos momentos mais felizes de milhões de lares e negócios em todo o Brasil.\n\n1.2. Finalidade do Regimento Interno:\nO presente Regimento Interno constitui o estatuto normativo básico da PRAFESTA, definindo os direitos, deveres, prerrogativas e padrões de conduta que disciplinam as relações recíprocas entre a empresa e seus empregados, em harmonia com a Consolidação das Leis do Trabalho (CLT), as Convenções Coletivas e a legislação aplicável.\n\n1.3. Nossa Missão:\nFacilitar o dia a dia e tornar as celebrações e o consumo de alimentos mais práticos, seguros e sustentáveis, desenvolvendo e produzindo soluções inovadoras e confiáveis em embalagens plásticas descartáveis de alta qualidade com máxima eficiência.\n\n1.4. Nossa Visão:\nSer perenemente reconhecida pelo mercado, parceiros e clientes como referência máxima nacional em inovação, excelência operacional, agilidade no atendimento e sustentabilidade na indústria de embalagens plásticas.\n\n1.5. Nossos Valores Inegociáveis:\n• FOCO NO CLIENTE: Satisfazer e superar as expectativas dos clientes internos e externos com cortesia, pontualidade e excelência de serviço.\n• COMPROMETIMENTO: Atuar com dedicação, assiduidade e responsabilidade com as metas e com a segurança da coletividade.\n• SENSO DE URGÊNCIA: Agir com proatividade, rapidez e eficácia para antecipar problemas e otimizar soluções.\n• TRABALHO EM EQUIPE: Promover a colaboração mútua, a empatia, o respeito à diversidade e a solidariedade entre todos os colaboradores.\n• PESSOAS VALORIZADAS: Respeitar a integridade humana e proporcionar condições de crescimento pessoal e profissional.\n• INTEGRIDADE: Agir com retidão, probidade, honestidade e absoluta transparência em todos os atos.',
      },
      {
        numero: '2',
        titulo: 'Princípios e Diretrizes da Administração de Pessoal',
        conteudo:
          '2.1. Princípios Norteadores:\nA gestão de pessoas na PRAFESTA orienta-se pela observância rigorosa do respeito à dignidade da pessoa humana, igualdade de oportunidades, proibição expressa de qualquer discriminação (de gênero, raça, credo, orientação sexual ou idade), valorização meritória do desempenho, transparência na comunicação interna e estrita observância das normas de segurança, saúde do trabalho e proteção de dados pessoais (LGPD).\n\n2.2. Da Contratação e Documentação:\nTodo colaborador é admitido mediante contrato de trabalho celebrado de acordo com os preceitos da CLT, com anotação em Carteira de Trabalho e Previdência Social digital (CTPS). É obrigação do colaborador manter seu cadastro pessoal rigorosamente atualizado perante o Departamento Pessoal (mudança de endereço, estado civil, nascimento de filhos, dados bancários e contato telefônico).',
      },
      {
        numero: '3',
        titulo: 'Jornada de Trabalho, Marcação de Ponto e Escalas de Revezamento',
        conteudo:
          '3.1. Jornada Contratual:\nA jornada de trabalho é estipulada no contrato individual de trabalho de cada colaborador, devendo ser estritamente cumprida segundo as escalas e turnos operacionais homologados pela empresa.\n\n3.2. Marcação Obrigatória no REP:\nTodos os colaboradores abrangidos pelo controle de jornada deverão registrar pessoalmente e obrigatoriamente suas entradas, intervalos e saídas nos relógios de ponto eletrônico (REP). O sistema de reconhecimento facial existente na portaria e catracas de pedestres da fábrica destina-se unicamente ao controle de acesso e segurança patrimonial, NÃO substituindo a marcação de ponto no REP localizado nos setores.\n\n3.3. Intervalo de Descanso Intrajornada:\nÉ assegurado o intervalo legal mínimo para repouso e alimentação, com registro no REP. É vedado trabalhar durante o período designado para refeição.\n\n3.4. Intervalo de Café na Produção:\nPara proporcionar bem-estar e descanso fisiológico aos colaboradores dos setores operacionais e fabris, a empresa concede um intervalo diário de 10 (dez) minutos para lanche e revigoramento, devendo ser respeitada rigorosamente a escala de revezamento estabelecida pela liderança do setor a fim de evitar a paralisação indevida dos equipamentos.\n\n3.5. Realocação e Transferência Operacional:\nColaboradores que exerçam cargos de natureza genérica ou multifuncional (tais como Auxiliar de Produção, Operador e Ajudante) poderão ser transitoriamente realocados entre linhas, postos ou turnos conforme imperativos operacionais e ordens da chefia, mediante comunicação prévia e observada a devida capacitação e proteção individual.',
      },
      {
        numero: '4',
        titulo: 'Faltas, Atrasos, Atestados Médicos e Regras de Teleconsulta',
        conteudo:
          '4.1. Comunicação Imediata de Ausência:\nEm caso de impossibilidade de comparecimento ao trabalho por motivo de doença ou motivo de força maior, o colaborador tem a obrigação de comunicar sua ausência à chefia imediata e ao Departamento Pessoal no prazo máximo e improrrogável de até 48 (quarenta e oito) horas a contar do primeiro dia da ausência.\n\n4.2. Requisitos de Validade do Atestado Médico Presencial:\nPara fins de abono de faltas justificadas por motivo de saúde, o atestado médico ou odontológico original deverá ser entregue ao Departamento Pessoal ou ao SESMT no retorno imediato do empregado às suas atividades, preenchendo obrigatoriamente os seguintes requisitos formais:\na) Emissão em nome completo do colaborador;\nb) Carimbo legível, assinatura física ou digital homologada e número de inscrição no Conselho Regional de Medicina (CRM) ou de Odontologia (CRO);\nc) Data clara do atendimento presencial;\nd) Especificação exata do período de repouso recomendado (dias ou fração horária);\ne) Ausência absoluta de emendas, rasuras ou indícios de adulteração;\nf) Código CID (Classificação Internacional de Doenças), mediante concordância expressa do trabalhador.\n\n4.3. Validação pelo Médico do Trabalho e Acompanhamento Preventivo:\nTodos os atestados médicos apresentados passam obrigatoriamente por auditoria e validação pericial do Médico do Trabalho da PRAFESTA. O colaborador que acumular mais de 3 (três) atestados no período de 12 meses será convocado para avaliação clínica preventiva de saúde ocupacional pelo SESMT.\n\n4.4. Atestados de Teleconsulta (Consultas Virtuais à Distância):\nComo regra geral, ATESTADOS MÉDICOS PROVENIENTES DE TELECONSULTA OU PLATAFORMAS DIGITAIS PARTICULARES NÃO SÃO ACEITOS para efeito de abono de falta laboral na PRAFESTA.\n\nAdmite-se uma ÚNICA exceção estrita: atestados de teleconsulta expedidos por plataformas oficiais do Sistema Único de Saúde (SUS) ou pela telemedicina homologada do plano de assistência médica corporativo fornecido pela PRAFESTA, desde que comprovada a inviabilidade absoluta de comparecimento a pronto atendimento físico e mediante validação individual indelegável do Médico do Trabalho da empresa. Atestados adquiridos em sítios de receitas/atestados virtuais comerciais sem atendimento qualificado serão sumariamente rejeitados e encaminhados para apuração disciplinar e criminal.\n\n4.5. Regra Especial do 3º Turno Noturno:\nPara os colaboradores que cumprem o terceiro turno (das 22h30 às 06h00), o atestado médico que justifique a ausência na data do plantão abonará integralmente o turno de trabalho correspondente, sem fracionamento prejudicial ao empregado.\n\n4.6. Documentos que NÃO Abonam Faltas:\nDeclarações de comparecimento que não declarem expressamente a incapacidade temporária de trabalho, bem como agendamento de consultas de rotina e exames que poderiam ser agendados fora da escala de trabalho, não acarretam o abono de jornada integral, sendo abonado unicamente o tempo exato despendido no deslocamento e consulta previamente alinhada.',
      },
      {
        numero: '5',
        titulo: 'Férias Individuais e Coletivas',
        conteudo:
          '5.1. Período Aquisitivo e Concessivo:\nApós cada período de 12 (doze) meses de vigência do contrato de trabalho (período aquisitivo), o colaborador adquire direito a até 30 (trinta) dias de férias remuneradas, as quais serão concedidas pela empresa nos 12 (doze) meses subsequentes (período concessivo), conforme conveniência operacional da fábrica e previsão legal.\n\n5.2. Aviso Prévio e Pagamento:\nA data de fruição das férias será comunicada por escrito ao colaborador com antecedência mínima de 30 (trinta) dias. O pagamento da remuneração das férias acrescido do terço constitucional será efetuado em até 2 (dois) dias antes do início do respectivo período de descanso.\n\n5.3. Fracionamento de Férias:\nMediante concordância expressa do empregado, as férias poderão ser usufruídas em até 3 (três) períodos, sendo que um deles não poderá ser inferior a 14 (quatorze) dias corridos e os demais não poderão ser inferiores a 5 (cinco) dias corridos cada um. É vedado o início das férias nos dois dias que antecedem feriados ou dias de repouso semanal remunerado.\n\n5.4. Abono Pecuniário (Conversão de 1/3 em Dinheiro):\nO colaborador que desejar converter 1/3 (um terço) do seu período de férias em abono pecuniário deverá requerer a conversão formalmente ao Departamento Pessoal em até 15 (quinze) dias antes do término do respectivo período aquisitivo.',
      },
      {
        numero: '6',
        titulo: 'Remuneração, Benefícios Corporativos e Transporte',
        conteudo:
          "6.1. Pagamento Salarial:\nOs salários mensais serão quitados impreterivelmente até o 5º (quinto) dia útil do mês subsequente ao trabalhado, mediante depósito ou transferência eletrônica na conta salário aberta para tal fim em instituição financeira conveniada.\n\n6.2. Vale-Transporte (VT):\nO benefício do Vale-Transporte é concedido a todos os empregados que dele necessitarem para o deslocamento residência-trabalho e vice-versa. Por autorização da legislação vigente e normas coletivas, a empresa efetua o pagamento do benefício em pecúnia equivalente ao valor da tarifa pública das rotas de transporte coletivo mais econômicas e eficientes, aplicando-se o desconto legal de até 6% do salário base.\n\n6.3. Pacote de Benefícios Corporativos:\nA PRAFESTA proporciona a seus colaboradores um abrangente conjunto de benefícios complementares, incluindo:\na) Vale-Refeição / Vale-Alimentação;\nb) Seguro de Vida em Grupo;\nc) Assistência Médica e Assistência Odontológica (com coparticipação nos termos do plano);\nd) Convênio Farmácia com desconto em folha;\ne) Programa 'Cartão Destaque' e premiações vinculadas à assiduidade, qualidade e cumprimento de metas.",
      },
      {
        numero: '7',
        titulo: 'Apresentação Pessoal, Vestuário, Higiene e Conduta Fabril',
        conteudo:
          '7.1. Primazia da Higiene na Indústria de Embalagens para Alimentos:\nPor atuar na fabricação de recipientes plásticos e produtos destinados ao contato direto com alimentos, a PRAFESTA exige dos colaboradores padrão irrepreensível de asseio corporal, higiene sanitária e adequação visual.\n\n7.2. Padrões de Vestuário e Uniforme:\nÉ obrigatório o uso do uniforme completo fornecido pela empresa, devendo estar sempre limpo, conservado e identificado. Em hipótese alguma é permitido ingressar ou trabalhar sem calçado de segurança fechado apropriado ou com roupas rasgadas.\n\n7.3. Cabelos, Barba e Unhas:\nNas dependências de fabricação e embalamento:\na) Cabelos devem estar totalmente presos e devidamente protegidos por toucas descartáveis fornecidas;\nb) Barba e bigode devem estar mantidos curtos e aparados, ou totalmente cobertos por protetores faciais adequados;\nc) As unhas devem ser mantidas rigorosamente curtas, limpas e livres de sujidade. É EXPRESSAMENTE VEDADO O USO DE ESMALTES COLORIDOS OU UNHAS POSTIÇAS, permitindo-se unicamente o uso de base ou esmalte incolor, a fim de evitar qualquer risco de desprendimento e contaminação física do lote de embalagens produzidas.\n\n7.4. Guarda-Roupas e Armários Individuais:\nOs armários individuais postos à disposição nos vestiários destinam-se exclusivamente à guarda de roupas civis e pertences indispensáveis. É TERMINANTEMENTE PROIBIDO armazenar nos armários: substâncias ilícitas, bebidas alcoólicas, armas de qualquer natureza, produtos químicos inflamáveis ou alimentos perecíveis destampados.\n\n7.5. Proibição Absoluta de Alimentar Animais nas Dependências:\nÉ terminantemente proibido alimentar, atrair ou abrigar cães, gatos, pássaros ou quaisquer outros animais nas imediações dos galpões, refeitório, portarias e áreas internas da fábrica. A atração de animais configura risco sanitário gravíssimo e descumprimento de boas práticas de fabricação alimentícia.\n\n7.6. Alimentação nas Mesas de Escritório:\nNas áreas administrativas, é terminantemente proibida a realização de refeições completas sobre as mesas e postos de trabalho. São tolerados unicamente pequenos lanches rápidos e discretos (frutas ou biscoitos secos), zelando pela preservação de documentos, aparelhos eletrônicos e limpeza.',
      },
      {
        numero: '8',
        titulo: 'Regras de Circulação, Elevadores e Uso do Estacionamento',
        conteudo:
          '8.1. Circulação Fabril e Faixas de Pedestres:\nTodo colaborador deve transitar pelas passarelas e faixas de circulação de pedestres devidamente pintadas no piso da fábrica, respeitando as sinalizações visuais e a preferência de tráfego de empilhadeiras e carrinhos industriais.\n\n8.2. Restrição de Uso do Elevador Predial:\nO elevador instalado nas dependências da empresa é destinado primariamente ao transporte de cargas ou, excepcionalmente, ao uso exclusivo de colaboradores com deficiência motora, mobilidade reduzida comprovada e validada pelo SESMT ou idade igual ou superior a 60 (sessenta) anos, além de gestantes em período avançado autorizadas pelo médico do trabalho.\n\n8.3. Estacionamento da Empresa:\nO estacionamento de veículos automotores e motocicletas constitui facilidade gratuita concedida pela PRAFESTA, isentando-se a empresa de qualquer dever de indenização por amassados, danos mecânicos, furtos parciais ou totais ocorridos nas vagas.',
      },
      {
        numero: '9',
        titulo: 'Segurança, Medicina do Trabalho e Prevenção de Acidentes',
        conteudo:
          '9.1. Inegociabilidade da Segurança do Trabalho:\nA vida, a saúde e a integridade física de todos os colaboradores constituem o valor primordial da PRAFESTA. Nenhuma meta de produção ou exigência de entrega justifica a exposição a riscos não controlados ou a violação de normas de segurança.\n\n9.2. Cumprimento das Normas Regulamentadoras (NRs):\nO colaborador deve acatar estritamente todas as ordens de serviço sobre segurança, usar todos os EPIs prescritos pelo SESMT, participar ativamente dos treinamentos da CIPA, submeter-se aos exames periódicos admissionais, anuais e demissionais do PCMSO e comunicar imediatamente qualquer incidente, quase-acidente ou máquina defeituosa.',
      },
      {
        numero: '10',
        titulo: 'Deveres, Obrigações e Proibições no Ambiente de Trabalho',
        conteudo:
          "10.1. Deveres do Colaborador:\nSão deveres fundamentais do empregado:\na) Desempenhar com zelo, honestidade e assiduidade as funções atribuídas;\nb) Acatar as ordens legais e instruções de trabalho transmitidas por supervisores e gestores;\nc) Guardar segredo absoluto sobre dados e projetos da empresa;\nd) Manter conduta respeitosa e ética perante colegas, clientes e superiores;\ne) Conservar em perfeito estado os maquinários, ferramentas e instalações sob sua responsabilidade.\n\n10.2. Proibições Expressas e Faltas Graves:\nÉ expressamente proibido ao colaborador:\na) Praticar atos de improbidade (fraude em ponto, apresentação de atestado médico falso, desvio de materiais, furto);\nb) Praticar incontinência de conduta ou mau procedimento (assédio moral ou sexual, exibição de pornografia, ofensas verbais ou gestuais);\nc) Desídia no desempenho das funções (atrasos reiterados, negligência, abandono de máquina sem renderização);\nd) Comparecer ao trabalho embriagado ou sob o efeito de substâncias entorpecentes ilegais;\ne) Praticar jogos de azar ou rifas no local de trabalho;\nf) Usar ou portar aparelhos celulares particulares em áreas operacionais ou manipular máquinas fazendo uso de fones de ouvido;\ng) Ausentar-se do trabalho por mais de 30 (trinta) dias consecutivos sem qualquer comunicação (abandono de emprego, Art. 482 'i' da CLT).",
      },
      {
        numero: '11',
        titulo: 'Regime Disciplinar e Gradação de Penalidades',
        conteudo:
          '11.1. Gradação Pedagógica das Sanções Disciplinares:\nO descumprimento dos deveres contratuais e das regras estipuladas neste Regimento Interno sujeitará o empregado à aplicação das seguintes medidas disciplinares em ordem progressiva:\n\n1º) REGISTRO INTERNO DE CONSTATAÇÃO:\nAplicado por escrito como advertência inicial e alinhamento de conduta em face de desvios operacionais leves ou primeiros atrasos injustificados;\n\n2º) ADVERTÊNCIA ESCRITA FORMAL:\nAplicada em casos de reincidência de falta leve ou prática de conduta desidiosa de média relevância;\n\n3º) SUSPENSÃO DISCIPLINAR:\nAplicada pelo prazo de 01 (um) a 30 (trinta) dias com perda total da remuneração e dos reflexos trabalhistas, nas hipóteses de reiteração de condutas infracionais ou faltas graves;\n\n4º) DEMISSÃO POR JUSTA CAUSA:\nAplicada nos moldes do Artigo 482 da Consolidação das Leis do Trabalho (CLT), com rompimento imediato do liame empregatício sem pagamento das verbas rescisórias indenizatórias.\n\n11.2. Aplicação Imediata de Penalidade Grave:\nEm faltas de gravidade manifesta ou ato criminoso (tais como agressão física nas dependências da empresa, furto comprovado, fraude documental, adulteração de atestado ou embriaguez em serviço), a penalidade de suspensão ou de demissão por justa causa será aplicada de forma imediata, independentemente do histórico prévio de advertências.',
      },
      {
        numero: '12',
        titulo: 'Canal Confidencial de Denúncia e Termo de Encerramento',
        conteudo:
          '12.1. Canal Oficial e Independente de Denúncias:\nA PRAFESTA assegura a todos os colaboradores um canal confidencial, seguro e permanente para comunicar irregularidades, desvios éticos, casos de assédio, descumprimento de normas sanitárias ou violações deste Regimento.\nAs denúncias podem ser formalizadas através do e-mail exclusivo:\ndenuncia@prafesta.com.br\nou mediante depósito em urnas físicas lacradas localizadas nos vestiários da empresa.\n\n12.2. Garantia Absoluta de Não Retaliação:\nA PRAFESTA assegura sigilo absoluto da identidade do denunciante e proíbe categoricamente qualquer medida de represália, perseguição ou retaliação contra quem, de boa-fé, relatar descumprimentos normativos.',
      },
    ]

    const declaracaoVerbatimRI =
      'TERMO DE CIÊNCIA E COMPROMISSO DO REGIMENTO INTERNO\n\nEu declaro, para todos os fins de direito e efeitos legais, que recebi da PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA. (CNPJ 56.173.131/0001-25) o acesso integral a este Regimento Interno 2026 em meio digital, tive tempo suficiente para sua leitura integral e compreendi todas as suas normas, diretrizes, direitos, deveres, políticas de saúde, segurança, benefícios e regime disciplinar.\n\nComprometo-me formalmente a cumprir com fidelidade e rigor todas as disposições expressas neste Regimento e nas ordens de serviço da empresa, ciente de que as transgressões voluntárias importarão nas penalidades disciplinares cabíveis, inclusive demissão por justa causa nos termos do Art. 482 da CLT.\n\nEstou ciente de que este instrumento permanece permanentemente disponível para minha consulta no sistema digital corporativo.'

    // =========================================================================
    // 3. CARTILHA DE PREVENÇÃO AO ASSÉDIO MORAL E SEXUAL (Edição 2023)
    // Código: CART-ASSEDIO-2023 | Revisão: Janeiro de 2023
    // Texto na íntegra com todos os conceitos, exemplos, distinções e condutas
    // =========================================================================
    const secoesCartilhaAssedio = [
      {
        numero: '1',
        titulo: 'Apresentação Institucional e Compromisso da PRAFESTA',
        conteudo:
          'A PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA. busca permanentemente fornecer e consolidar um ambiente de trabalho saudável, positivo, inclusivo e seguro a todos os seus colaboradores e prestadores de serviço.\n\nSabemos que a qualidade das relações interpessoais e as condições emocionais do ambiente de trabalho influenciam de forma direta o bem-estar psicológico, a dignidade, a satisfação pessoal e a produtividade de cada equipe.\n\nPensando na melhoria contínua desse ambiente e no cumprimento das legislações protetivas vigentes (incluindo as disposições da Lei nº 14.457/2022 - Programa Emprega + Mulheres e regras da CIPA), a PRAFESTA está firmemente engajada em promover ações preventivas, formativas e repressivas contra qualquer modalidade de assédio moral, assédio sexual ou conduta discriminatória em suas dependências.\n\nEsta cartilha foi elaborada para esclarecer de maneira transparente os conceitos jurídicos e comportamentais, apresentar exemplos práticos, distinguir situações normais de gestão de abusos intoleráveis e reafirmar o canal oficial para denúncias seguras.',
      },
      {
        numero: '2',
        titulo: 'Conceituação Geral de Assédio e Formas de Manifestação',
        conteudo:
          '2.1. O que é Assédio no Ambiente Corporativo:\nDe maneira geral, compreende-se por assédio a exposição sistemática de colaboradores a situações humilhantes, vexatórias, hostis ou constrangedoras no exercício de suas atividades laborais. No âmbito jurídico e organizacional, o assédio desdobra-se principalmente em duas categorias fundamentais:\n• ASSÉDIO MORAL;\n• ASSÉDIO SEXUAL.\n\n2.2. Sentidos e Direções da Manifestação do Assédio:\nO assédio moral pode ocorrer segundo diversas dinâmicas relacionais no ambiente de trabalho:\n\na) VERTICAL DESCENDENTE (de cima para baixo): Ocorre quando o superior hierárquico (gestor, gerente, encarregado) utiliza abusivamente de sua autoridade funcional para subjugar, intimidar ou desestabilizar subordinados;\n\nb) VERTICAL ASCENDENTE (de baixo para cima): Ocorre quando um grupo de subordinados ou liderados se une deliberadamente para boicotar, constranger, desmoralizar ou sabotar a liderança de um encarregado ou gestor;\n\nc) HORIZONTAL (entre pares do mesmo nível hierárquico): Manifesta-se entre colegas de mesmo nível ou setor, motivado por rivalidade, inveja, disputa predatória por promoções, preconceitos individuais ou discriminação velada;\n\nd) MISTO: Combinação em que a conduta hostil provém simultaneamente de colegas do mesmo setor e conta com a tolerância, omissão ou conivência da chefia direta.',
      },
      {
        numero: '3',
        titulo: 'Assédio Moral Interpessoal vs. Institucional',
        conteudo:
          '3.1. Assédio Moral Interpessoal:\nÉ a modalidade clássica que ocorre de forma individualizada, direcionada e pontual contra determinado colaborador ou pequeno grupo de pessoas, tendo como objetivo velado isolar a vítima, humilhá-la perante os demais, abalar sua autoestima profissional e provocar, frequentemente, seu pedido de demissão voluntária.\n\n3.2. Assédio Moral Institucional ou Organizacional:\nOcorre quando a própria gestão corporativa adota ou tolera deliberadamente práticas abusivas como método estrutural de cobrança e controle de metas, utilizando humilhações públicas, rankings vexatórios, penalidades psicológicas ou ameaças constantes de desemprego para induzir aumentos artificiais de produtividade à custa da integridade psicológica dos trabalhadores.\n\nA PRAFESTA repudia veementemente tanto o assédio interpessoal quanto qualquer prática de assédio institucional, mantendo cultura de metas justas e pautadas no respeito à integridade física e emocional de seus empregados.',
      },
      {
        numero: '4',
        titulo: 'Conceito Preciso e Exemplos Práticos de Assédio Moral',
        conteudo:
          "4.1. Conceito Jurídico e Clínico de Assédio Moral:\nConsidera-se assédio moral toda e qualquer conduta abusiva, intencional e reiterada no tempo, manifestada mediante comportamentos, palavras ofensivas, atos hostis, gestos de menosprezo ou ordens humilhantes que ataquem a dignidade, integridade psíquica ou física de uma pessoa, ameaçando seu emprego ou degradando sensivelmente o clima de trabalho.\n\n4.2. Exemplos Comuns e Inaceitáveis de Condutas de Assédio Moral:\n• Retirar injustificadamente instrumentos, computadores ou ferramentas necessárias ao trabalho da vítima para impedi-la de atuar;\n• Criticar sistematicamente decisões e trabalhos normais em tom agressivo e exagerado, especialmente na presença de colegas;\n• Sobrecarregar deliberadamente a pessoa com prazos inexequíveis de propósito para forçar o erro e posterior advertência;\n• Atribuir ordens vexatórias ou tarefas manifestamente incompatíveis com o cargo para diminuir o profissional;\n• Controlar o tempo e a quantidade de idas ao sanitário de forma degradante;\n• Bloquear ou dificultar promoções por motivos exclusivamente pessoais e discriminatórios;\n• Invadir de forma excessiva a vida íntima e familiar do colaborador com telefonemas e mensagens insistentes fora do expediente;\n• Colocar o colaborador no ócio forçado ('geladeira'), privando-o de atribuições normais enquanto seus colegas trabalham;\n• Recusar-se a comunicar-se verbalmente com a pessoa, falando apenas por bilhetes hostis ou recados com terceiros;\n• Proferir agressões verbais, piadas de mau gosto, boatos infundados ou apelidos pejorativos;\n• Isolar propositalmente a pessoa das reuniões de setor, eventos e conversas cotidianas;\n• Práticas discriminatórias contra mulheres: criar empecilhos a consultas médicas de gestantes, zombar de licenças de maternidade ou desqualificar sua competência técnica em razão do gênero.",
      },
      {
        numero: '5',
        titulo: 'O que NÃO é Assédio Moral: Limites Legais do Poder Diretivo',
        conteudo:
          'Para evitar confusões operacionais e denúncias improcedentes que sobrecarreguem os canais da empresa, é fundamental esclarecer as condutas que NÃO CONFIGURAM ASSÉDIO MORAL:\n\n5.1. Feedback Construtivo e Avaliação de Desempenho:\nA cobrança de qualidade, apontamento de erros técnicos cometidos e a emissão de feedbacks sobre tarefas mal executadas NÃO CONSTITUEM ASSÉDIO, desde que realizados em ambiente reservado, com linguagem profissional, respeitosa e sem ofensas pessoais.\n\n5.2. Metas de Produção e Exigências Legítimas de Eficiência:\nO estabelecimento de metas operacionais razoáveis, compatíveis com a capacidade média do setor e dentro das normas legais da CLT, é direito legítimo decorrente do poder de direção da empresa.\n\n5.3. Serviço Extraordinário e Horas Extras dentro da Lei:\nA convocação para jornada suplementar em situações de necessidade justificada da fábrica, remunerada com o adicional devido e respeitados os limites legais e de descanso, não configura assédio moral.\n\n5.4. Mecanismos de Controle e Ponto Eletrônico:\nA exigência do cumprimento rigoroso dos horários de entrada, almoço e saída, fiscalizada mediante registro de ponto eletrônico homologado e câmeras em áreas comuns, é dever regulamentar estipulado pela CLT e não caracteriza assédio.\n\n5.5. Conflitos e Desentendimentos Pontuais e Isolados:\nEventuais discussões acaloradas, desentendimentos passageiros ou atritos pontuais em momentos de pressão operacional NÃO CONSTITUEM ASSÉDIO MORAL. O assédio moral exige OBRIGATORIAMENTE a reiteração sistemática, prolongamento no tempo e perseguição continuada.',
      },
      {
        numero: '6',
        titulo: 'Alvos Preferenciais, Causas Estruturais e Danos à Saúde',
        conteudo:
          '6.1. Alvos Preferenciais do Assédio:\nEstudos e levantamentos empíricos revelam que o assédio moral e a discriminação atingem preferencialmente grupos específicos:\n• Mulheres (em especial mulheres negras, mães recentes e gestantes);\n• Pessoas pertencentes a minorias étnico-raciais;\n• Pessoas com Deficiência (PcDs);\n• Colaboradores pertencentes à comunidade LGBTI+;\n• Trabalhadores acometidos por doenças crônicas ou que retornam de afastamento acidentário do INSS.\n\n6.2. Causas Favoráveis ao Assédio:\nDespreparo de gestores, cultura organizacional excessivamente autoritária, tolerância a brincadeiras desrespeitosas, disputas corporativas desleais e ausência de canais seguros de denúncia.\n\n6.3. Consequências e Danos Severos:\n• PARA O COLABORADOR: Dores de cabeça crônicas, distúrbios digestivos, insônia persistente, crises de hipertensão, ansiedade generalizada, depressão profunda, síndrome do pânico, Síndrome de Burnout (esgotamento profissional) e, em estágios agudos, risco de automutilação e ideação suicida;\n• PARA A PRAFESTA: Queda na produtividade, aumento substancial de absenteísmo (faltas injustificadas e atestados médicos), alta rotatividade da força de trabalho, deterioração do clima organizacional, danos severos à imagem pública da marca e pesados passivos em ações judiciais perante a Justiça do Trabalho;\n• PARA A SOCIEDADE: Sobrecarga nos serviços públicos de saúde mental e impacto financeiro nos cofres da Previdência Social com auxílios-doença e aposentadorias precoces por invalidez.',
      },
      {
        numero: '7',
        titulo: 'Assédio Sexual: Conceito, Espécies e Enquadramento Criminal',
        conteudo:
          "7.1. Conceito Jurídico de Assédio Sexual:\nCaracteriza-se o assédio sexual por toda conduta indesejada, verbal, não verbal, física ou visual, de natureza eminentemente sexual, que constranja, perturbe ou restrinja a liberdade e autodeterminação sexual da vítima no ambiente de trabalho ou em conexão com ele.\n\n7.2. DIFERENÇA CRUCIAL EM RELAÇÃO AO ASSÉDIO MORAL:\nEnquanto o assédio moral exige indispensavelmente a repetição continuada dos atos no tempo, NO ASSÉDIO SEXUAL UM ÚNICO ATO GRAVE É JURIDICAMENTE SUFICIENTE PARA CONFIGURAR A CONDUTA ILÍCITA E A FALTA GRAVÍSSIMA.\n\n7.3. As Duas Espécies de Assédio Sexual:\n\na) ASSÉDIO SEXUAL POR CHANTAGEM ('Quid Pro Quo' - Troca de Favores):\nOcorre quando o assediador utiliza expressamente sua posição superior na empresa para condicionar benefícios funcionais (tais como admissão, promoção, aumento salarial, abono de faltas, escolha de turnos ou manutenção do emprego) à concessão de vantagens ou favores sexuais por parte do empregado subordinado;\n\nb) ASSÉDIO SEXUAL POR INTIMIDAÇÃO OU AMBIENTE HOSTIL:\nOcorre quando manifestações importunas, olhares invasivos, comentários com conotação erótica, toques não autorizados, envio de fotos íntimas ou convites insistentes constrangem a pessoa e geram um ambiente de trabalho intimidatório, degradante e hostil, violando frontalmente a dignidade da vítima e seu pleno 'direito de dizer não'.\n\n7.4. Tipificação Penal (Artigo 216-A do Código Penal Brasileiro):\nO assédio sexual é crime capitulado pelo Código Penal Brasileiro:\n'Art. 216-A. Constranger alguém com o intuito de obter vantagem ou favorecimento sexual, prevalecendo-se o agente da sua condição de superior hierárquico ou ascendência inerentes ao exercício de emprego, cargo ou função:\nPena - detenção, de 1 (um) a 2 (dois) anos.'\n\n7.5. Punições Trabalhistas e Cíveis:\nAlém da sanção penal privativa de liberdade, a prática de assédio sexual acarreta a rescisão contratual imediata por JUSTA CAUSA prevista no Artigo 482 da CLT, além de ação regressiva de indenização cível por danos morais.",
      },
      {
        numero: '8',
        titulo: 'Ações Preventivas, Apoio Psicológico e Canal Confidencial de Denúncia',
        conteudo:
          '8.1. Ações Preventivas e Políticas da PRAFESTA:\nA PRAFESTA mantém postura de tolerância zero contra qualquer espécie de assédio. Nossas ações incluem:\n• Palestras e treinamentos periódicos integrados à SIPAT e programas de liderança humanizada;\n• Atuação vigilante da CIPA (Comissão Interna de Prevenção de Acidentes e Assédio - Lei nº 14.457/2022);\n• Rigorosa auditoria de denúncias por comissão imparcial de integridade e RH;\n• Encaminhamento confidencial para suporte médico e acolhimento psicológico a eventuais vítimas.\n\n8.2. Canal Oficial de Denúncia e Acolhimento:\nSe você foi vítima ou presenciou atos de assédio moral ou sexual nas dependências da PRAFESTA, denuncie imediatamente através dos nossos canais oficiais:\n• E-MAIL EXCLUSIVO E SEGURO: denuncia@prafesta.com.br\n• URNAS FÍSICAS CONFIDENCIAIS: localizadas estrategicamente nos vestiários de todas as fábricas.\n\n8.3. Garantias Inegociáveis ao Denunciante de Boa-Fé:\n• SIGILO ABSOLUTO: A apuração é sigilosa e os relatos são tratados com máxima reserva;\n• NÃO RETALIAÇÃO: A empresa proíbe rigorosamente e punirá qualquer tentativa de intimidação, punição ou retaliação dirigida a quem denunciar condutas contrárias à ética.',
      },
    ]

    const declaracaoVerbatimCartilha =
      'DECLARAÇÃO DE COMPROMISSO E PREVENÇÃO AO ASSÉDIO\n\nEu declaro ter recebido treinamento e acesso completo ao conteúdo desta Cartilha de Prevenção ao Assédio Moral e Sexual ministrado e disponibilizado pela PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA. (CNPJ 56.173.131/0001-25).\n\nDeclaro que compreendi integralmente as definições e diferenças entre assédio moral e assédio sexual, os padrões inaceitáveis de comportamento e as garantias de confidencialidade e proteção do canal oficial de denúncias (denuncia@prafesta.com.br).\n\nAssumo o compromisso pessoal e intransferível de pautar minha conduta pelo respeito mútuo, integridade e dignidade perante todos os meus colegas de trabalho e de comunicar imediatamente qualquer situação de assédio que venha a presenciar no exercício de minhas atividades profissionais.'

    // =========================================================================
    // UPSERT E ATUALIZAÇÃO NO BANCO DE DADOS POCKETBASE
    // Atualiza os registros existentes pelo campo 'codigo' para preservar IDs
    // e preencher o texto integral no campo 'secoes' e 'conteudo'
    // =========================================================================
    const docsParaAtualizar = [
      {
        codigo: 'TU-RH-023',
        titulo: 'Termo Unificado de Compromissos, Normas Internas e Uso de Tecnologias',
        subtitulo: 'Termos de Admissão de Colaborador e Compromisso com Normas Internas',
        revisao: 'Rev. 023 (09/10/2026)',
        data_publicacao: '09 de outubro de 2026',
        ementa:
          'Formaliza a ciência e adesão integral às normas internas da PRAFESTA, regulamento de ponto eletrônico, uso da rede de TI, inteligência artificial generativa, biometria e reconhecimento facial, câmeras inteligentes, mídia social, LGPD e EPIs.',
        local_padrao: 'Atibaia / Mairiporã',
        ordem: 1,
        secoes: secoesTermoUnificado,
        declaracao: declaracaoVerbatimTU,
      },
      {
        codigo: 'RI-2026-v1',
        titulo: 'Regimento Interno 2026',
        subtitulo: 'Guia Oficial de Normas, Condutas, Direitos e Deveres - PRAFESTA',
        revisao: 'Edição 2026',
        data_publicacao: 'Janeiro de 2026',
        ementa:
          'Diretrizes integrais de conduta, jornada, atestados médicos presenciais e regras estritas de teleconsulta, faltas, férias, benefícios, higiene fabril, proibições, sanções disciplinares progressivas e canal de denúncia.',
        local_padrao: 'Atibaia',
        ordem: 2,
        secoes: secoesRegimentoInterno,
        declaracao: declaracaoVerbatimRI,
      },
      {
        codigo: 'CART-ASSEDIO-2023',
        titulo: 'Cartilha de Prevenção ao Assédio Moral e Sexual',
        subtitulo: 'Ambiente de Trabalho Mais Saudável - Diretrizes de Prevenção e Combate',
        revisao: 'Janeiro de 2023',
        data_publicacao: 'Janeiro de 2023',
        ementa:
          'Conceituação completa e jurídica de assédio moral e sexual, distinção legal de repetição de atos, alvos preferenciais, condutas inaceitáveis, limites do poder diretivo (o que não é assédio), consequências biopsicossociais e canal confidencial de denúncia.',
        local_padrao: 'Mairiporã',
        ordem: 3,
        secoes: secoesCartilhaAssedio,
        declaracao: declaracaoVerbatimCartilha,
      },
    ]

    for (const d of docsParaAtualizar) {
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
      // Campo conteudo preenchido com a ementa completa descritiva
      rec.set('conteudo', d.ementa)
      rec.set('secoes', JSON.stringify(d.secoes))
      rec.set('declaracao_verbatim', d.declaracao)
      rec.set('local_padrao', d.local_padrao)
      rec.set('ativo', true)
      rec.set('ordem', d.ordem)
      app.save(rec)
    }

    // Também garante que o Documento 4 (Código de Ética) tenha seu conteúdo e seções preservados com padrão integral
    try {
      const rec4 = app.findFirstRecordByData('documentos', 'codigo', 'COD-ETICA-V2')
      if (rec4) {
        rec4.set('ativo', true)
        rec4.set('ordem', 4)
        app.save(rec4)
      }
    } catch (_) {}
  },
  (app) => {
    // down migration: no-op defensivo para manter consistência
  },
)
