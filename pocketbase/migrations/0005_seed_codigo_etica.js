migrate(
  (app) => {
    const docsCol = app.findCollectionByNameOrId('documentos')

    // Documento 4: Código de Ética e Conduta Empresarial (V2.2023)
    const doc4Data = {
      titulo: 'Código de Ética e Conduta Empresarial',
      subtitulo: 'Diretrizes Éticas, Integridade, Compliance e Padrões de Conduta - PRAFESTA',
      codigo: 'COD-ETICA-V2',
      revisao: 'V2.2023',
      data_publicacao: '2023 (V2.2023)',
      ementa:
        'Estabelece os valores, princípios éticos e normas de conduta da PRAFESTA aplicáveis a todos os colaboradores, diretrizes de compliance, tolerância zero a suborno e corrupção, políticas de proteção de dados (LGPD), medidas disciplinares e canal confidencial de denúncias.',
      local_padrao: 'Mairiporã',
      ordem: 4,
      ativo: true,
      secoes: [
        {
          numero: '1',
          titulo: 'A Prafesta',
          conteudo:
            'Há mais de 30 anos, a Prafesta atua no mercado de festas e embalagens para uso doméstico e industrial, fazendo parte dos momentos felizes das pessoas.\n\nAtualmente, sua sede está instalada no Município de Mairiporã – SP, contando com um centro de distribuição em Pernambuco.\n\nDesde sua fundação, é reconhecida pela qualidade de seus produtos e pela sua inovação, pois constantemente investe em equipamentos de última geração e em capacitação profissional de todos seus colaboradores e parceiros que permite oferecer soluções em embalagens para a satisfação do Cliente e consumidor.\n\nCom uma ampla linha de produtos e presença em todo território nacional, a Prafesta é vista pelos Clientes e parceiros como uma excelente prestadora de serviço, que preza pela eficiência, agilidade e qualidade em seu atendimento.\n\nNosso objetivo é ser líder do setor e ser reconhecida pela excelência de nossos produtos e serviços, com desenvolvimento sustentável e responsável.\n\nPara isso, oferecemos produtos e embalagens plásticas de alta qualidade, com inovação e desenvolvemos parcerias com Clientes, Representantes, Fornecedores e Colaboradores.\n\nPara que tudo isso seja possível, nossos valores são ver os nossos Clientes satisfeitos; pessoas valorizadas; integridade; comprometimento; atitude e foco no resultado.\n\nEstamos muito felizes em tê-lo em nossa equipe e, para isso, contamos com o cumprimento obrigatório deste Código de Ética e Conduta Empresarial e também do Manual de Integração, Políticas e Procedimentos Internos.\n\nQualquer colaborador da Prafesta que não cumpra o estipulado no Código de Ética e Conduta Empresarial está sujeito as medidas disciplinares que podem incluir a rescisão do contrato por justo motivo.',
        },
        {
          numero: '2',
          titulo: 'Ética e as 5 Perguntas de Decisão',
          conteudo:
            'A prática de condutas dentro dos padrões éticos e morais, no exercício das atividades empresariais asseguram a credibilidade da Prafesta junto aos órgãos públicos, parceiros, fornecedores e clientes contribuindo para a construção de uma sociedade melhor e mais justa para todos.\n\nO Código de Ética e Conduta Empresarial se aplica sem exceções a todos os colaboradores da Prafesta em todos os níveis da empresa.\n\nAs regras contidas neste Código devem ser cumpridas estritamente a fim de garantir que todas as decisões diárias estão em consonância com as leis, com Manual de Integração, com as Políticas e Procedimentos Internos.\n\nQuando você precisar tomar decisão que inclua aspectos éticos, faça a si mesmo as seguintes perguntas:\n\n• É legal?\n• Está em conformidade com o estabelecido nas nossas políticas e procedimentos?\n• Está conforme o estabelecido na nossa missão, visão e valores?\n• Eu me sentiria confortável explicando a decisão a um terceiro (encarregado, gestor, fiscal, tribunal) ou lendo sobre isso em uma notícia?\n• Eu avaliei todos os riscos envolvidos para a Prafesta?\n\nSe a resposta a uma destas perguntas for não, ou se você não tem certeza, procure orientação a um encarregado direto ou ao gestor.\n\nA Prafesta é inflexível quanto a obediência às normas e procedimentos e aos valores que defende. A partir dessas diretrizes, desenvolvemos o Código de Ética e Conduta Empresarial da Prafesta que apresenta o comportamento desejado para todos os colaboradores, parceiros e fornecedores.\n\nA boa reputação e integridade da Prafesta é um dos seus patrimônios mais valiosos, sendo fruto do comportamento, atitudes e compromisso de todos os seus colaboradores.',
        },
        {
          numero: '2.1',
          titulo: 'Objetivos do Código de Ética e Conduta Empresarial',
          conteudo:
            'O Código de Ética e Conduta Empresarial tem por objetivo deixar claro os valores empresariais para que todos os colaboradores, parceiros e fornecedores possam compreendê-los, respeitá-lo e praticá-los, contribuir para que esses valores sejam respeitados em todas as localidades e seus colaboradores, parceiros e fornecedores ajam de maneira correta, justa, respeitosa em relação à comunidade e ao meio ambiente.',
        },
        {
          numero: '3',
          titulo: 'Valores e Princípios',
          conteudo:
            'A Prafesta tem como valores e princípios fundamentais:\n\na) VALORES\n\n3.1. FOCO NO CLIENTE: A Prafesta está focada em oferecer os melhores produtos e soluções a fim de satisfazer as necessidades e expectativas de nossos clientes, através de melhoria continua dos processos, produtos e serviços, qualificando colaboradores e desenvolvendo parcerias. Nossos colaboradores devem buscar atender as necessidades de nossos clientes internos e externos, com cortesia, identificando a demanda e direcionando esforços a sua satisfação de acordo com as políticas e procedimentos da empresa.\n\n3.2. COMPROMETIMENTO: A Prafesta está empenhada em desenvolver suas atividades com compromisso e qualidade, atendendo as normas e legislação aplicável. Todo colaborador tem a obrigação de se empenhar, cumprir as funções para o qual foi designado, executando suas atividades com qualidade, dedicação e zelo, agindo em conformidade todos as normas, políticas e procedimentos da Prafesta, a fim de satisfazer as necessidades e expectativas da empresa, buscando a melhoria continua dos processos, produtos e serviços.\n\n3.3. SENSO DE URGÊNCIA: A Prafesta está focada em alcançar seus objetivos, agindo de forma proativa, buscando atender as necessidades do mercado e dos clientes, inovando em seus produtos e processos. Esperamos que nossos colaboradores sejam proativos, compartilhem suas ideias de melhorias, estimulando inovações, apontando soluções, antecipando problemas e necessidades da empresa, trabalhando em equipe, ajudando os colegas, não se limitando apenas a fazer o que for solicitado, mas antecipando e melhorando processos dentro daquilo que couber em sua função. Todo colaborador deve estar focado nos mesmos objetivos da empresa, direcionando esforços aos objetivos da empresa, buscando sempre maximizar o desempenho das atividades com qualidade, reconhecendo o valor do tempo e agindo de forma a fazê-lo valer a pena.\n\n3.4. TRABALHO EM EQUIPE: A Prafesta acredita que a união de habilidades, capacidades, talentos e forças facilitam o alcance de melhores resultados, aumentando produtividade e eficiência, tornando o clima organizacional e qualidade de vida no ambiente de trabalho mais saudável. Esperamos que nossos colaboradores sejam proativos, respeitando e ajudando os colegas, não se limitando apenas a fazer o que for solicitado, mas esforçando-se para alcançar o objetivo comum junto à equipe, prezando sempre pela boa comunicação, interação, flexibilidade e empatia.\n\n3.5. PESSOAS VALORIZADAS: Os colaboradores da Prafesta são nosso maior patrimônio. Por este motivo a Prafesta respeita, valoriza e investe em seus colaboradores. Da mesma forma, desejamos que nossos colaboradores reciprocamente se respeitem e valorizem uns aos outros, sem exceção, pois todos exercem atividades essenciais ao bom funcionamento da empresa.\n\n3.6. INTEGRIDADE: A Prafesta desempenha suas atividades de maneira íntegra e honesta, buscando transparência, prevenção e combate a corrupção. Exigimos que nossos colaboradores também ajam desta forma. A integridade é um fundamento básico para a vida pessoal e profissional. Uma pessoa íntegra é uma pessoa que é honesta, imparcial, transparente, que atua de forma correta, honra os seus compromissos e que tem integridade moral.\n• 3.6.1. Dos Serviços: O colaborador deve realizar seu trabalho de modo honesto e profissional, independente e imparcial, não tolerando influências que levem a qualquer desvio dos métodos e procedimentos estabelecidos pela Prafesta.\n• 3.6.2. Das Informações: O colaborador é pessoalmente responsável por toda a informação que prestar, tais como, mas não se limitando a dados, relatórios, documentos, extratos, etc, de forma a assegurar que todas as informações sejam confiáveis, verdadeiras e completas.\n\n3.7. CLIENTES SATISFEITOS: A Prafesta busca satisfazer as necessidades e expectativas de seus clientes, através de melhoria continua dos processos, produtos e serviços, qualificando colaboradores e desenvolvendo parcerias com fornecedores e clientes. Nossos colaboradores devem buscar atender as necessidades de nossos clientes internos e externos, com cortesia, identificando a demanda e direcionando esforços a sua satisfação de acordo com as políticas e procedimentos da empresa.\n\nb) PRINCÍPIOS:\n\n3.8. MEIO AMBIENTE + SAUDÁVEL: A Prafesta está comprometida em proporcionar um local de trabalho seguro e saudável, sem violência, assédio, intimidação e outras condições inseguras ou prejudiciais, adotando medidas que reduzem a exposição a riscos de segurança e saúde de todos os seus colaboradores. Nosso programa de Saúde e Segurança está em conformidade com as leis e os regulamentos aplicáveis. Ele inclui o fornecimento de equipamentos de proteção individual adequados aos colaboradores, o estabelecimento de procedimentos de segurança e programas de formação sobre os riscos no local de trabalho.\n• 3.8.1. Sustentabilidade: A Prafesta no exercício de suas atividades busca manter a integridade do planeta terra, da natureza e das pessoas, como um todo.\n• 3.8.2. Proteção do Ambiente: Todos os colaboradores devem, no exercício de suas atividades, ter compromisso com a preservação do meio ambiente e com a adoção de ações que busquem melhorar a qualidade de vida do ser humano. Todas as atividades da Prafesta devem ser conduzidas em total conformidade com a legislação ambiental, com busca de aperfeiçoamentos nos seus processos operacionais, dentro do conceito de desenvolvimento sustentável.\n• 3.8.3. Direitos Humanos: A Prafesta reconhece os Direitos Humanos de todas as pessoas tal como definidos na Declaração Universal dos Direitos Humanos e os Princípios Orientados das Nações Unidas sobre Empresas e Direitos Humanos. Todos devem se empenhar para manter e aprimorar sistemas e processos para identificar, prevenir e mitigar qualquer abuso de Direitos Humanos, incluindo:\n  A) TRABALHO INFANTIL: A Prafesta proíbe a contratação ou qualquer manifestação de apoio ao trabalho infantil de menores de 16 (dezesseis) anos, que seja moralmente prejudicial às crianças, ou trabalho que prive as crianças de sua infância, potencial ou dignidade, interferindo, por exemplo, com sua escolaridade, exceto na condição de aprendiz. É vedado aos colaboradores com menos de 18 anos o exercício de atividades perigosas que possam afetar sua saúde e a segurança.\n  B) TRABALHO FORÇADO: A Prafesta proíbe qualquer forma de trabalho forçado ou compulsivo, incluindo, sem limitação, o confisco de documentos de identidade do colaborador ou detenção do colaborador devido a servidão por dívida, prisão ou escravatura. Todo trabalho realizado pelos colaboradores ocorre de forma voluntária.\n• 3.8.4. Discriminação e Assédio: A Prafesta proíbe e repudia qualquer forma de discriminação e assédio contra seus colaboradores, com base, mas não se limitando, a suas características pessoais, tais como raça, cor, religião, gênero, idade, opinião política, estrato social, origem social, situação médica, estado civil e orientação sexual. Qualquer forma de assédio deve ser denunciada.\n• 3.8.5. Diversidade e Inclusão: A Prafesta se posiciona de forma firme e incisiva em adotar políticas afirmativas de diversidade e inclusão das minorias buscando um ambiente mais justo e ético com respeito a diversidade de vozes, e com a possibilidade de serem ouvidos e levados à sério.\n\n3.9. QUALIDADE: A Prafesta tem como compromisso fornecer constantemente produtos descartáveis da mais alta qualidade para seus clientes. Sendo assim, é fundamental que este princípio seja garantido e observado durante toda a cadeia de produção. Todos os colaboradores deverão cumprir todos os requisitos necessários para garantir a qualidade dos produtos e serviços prestados à Prafesta, buscando a melhoria continua de seus processos, produtos e serviços, estando comprometidos com o atendimento dos requisitos aplicáveis ao sistema de gestão da qualidade.\n\n3.10. EFICIÊNCIA: A Prafesta está empenhada em produzir seus produtos da melhor forma possível de maneira eficiente de forma a melhorar continuamente seus processos reduzindo custos, tempo, perdas e desperdícios. Todos os colaboradores devem estar engajados na busca de melhorias continuas e de maior eficiência.',
        },
        {
          numero: '4',
          titulo: 'Conduta Empresarial',
          conteudo:
            'A Prafesta se preocupa em gerir os negócios com integridade e transparência, buscando sempre altos padrões éticos e de proteção de dados. A conduta empresarial da Prafesta é responsável e visa garantir a sustentabilidade dos negócios, amparada em seus valores e princípios que permeiam todas as ações, decisões e relacionamentos com seus colaboradores, parceiros, clientes e fornecedores.\n\n4.1. CONDUTA PESSOAL: Os colaboradores devem agir em defesa dos interesses da Prafesta, sempre respeitando as leis vigentes, Código de Ética e Conduta Empresarial, manual de integração, políticas e procedimentos.\n\n4.2. CONDUTA NOS RELACIONAMENTOS:\n\n4.2.1. Relações no Trabalho: As relações no ambiente de trabalho, em todos os locais onde a Prafesta desenvolve suas atividades, devem se pautar pelo respeito ao indivíduo e à sua integridade moral e física, transparência, colaboração, trabalho em equipe, crescimento profissional, foco na qualidade, eficiência, eliminação de desperdícios e melhoria continua dos processos, sempre voltados para o interesse e desenvolvimento da empresa. Os colaboradores também devem zelar pelo patrimônio da empresa, incluindo suas instalações, máquinas, equipamentos, móveis, veículos, valores, marcas, patentes, tecnologia e outros.\n\n4.2.2. Relações com os Clientes: É dever de todos os colaboradores atender aos clientes da Prafesta com cortesia, presteza e eficiência, objetivando conhecer suas necessidades, buscando a sua satisfação e promovendo um relacionamento mutuamente proveitoso e duradouro, sempre de acordo com as políticas comerciais e financeiras e objetivos da empresa. É vedado dar, oferecer, pagar, prometer pagar, ou autorizar o pagamento de qualquer vantagem pessoal a compradores que possam agir como representante do cliente, ou possam ter influência em sua decisão de compra, direta ou indiretamente. O oferecimento de refeições a clientes, como cortesia deve ser praticado de maneira transparente e comedida, sempre no interesse dos negócios da empresa e de acordo com as normas internas aplicáveis. Todos os negócios propostos ou realizados com clientes deverão observar, rigorosamente, a legislação e as normas, políticas e procedimentos.\n\n4.2.3. Relações com Parceiros e Fornecedores: O relacionamento com quaisquer fornecedores ou prestadores de serviço deverá ser conduzido de forma ética e respeitosa. A contratação de fornecedores ou prestadores de serviço deve ser baseada em critérios técnicos e transparentes, devendo obedecer às políticas e procedimentos, visando os interesses da empresa. Não é tolerada a aceitação de qualquer vantagem pessoal, brindes, hospitalidade e entretenimento direta ou indiretamente, por colaboradores da Prafesta, perante fornecedores ou prestadores de serviços. Poderão ser aceitos brindes promocionais corporativos como: canetas, agendas, calendários, desde que não ultrapassem o valor de R$ 150,00 (cento e cinquenta reais). Demais brindes deverão ser encaminhados ao Departamento de Recursos Humanos que providenciará o registro de entrada e destino. Todas as negociações realizadas com fornecedores de produtos ou serviços deverão observar a legislação em vigor, as normas e procedimentos da empresa.\n\n4.2.4. Relações com Veículos de Comunicação: O relacionamento da empresa com veículos de comunicação deve ser realizado apenas por colaboradores autorizados, dentro dos limites dos assuntos nos quais cada Colaborador foi autorizado e sempre zelando pela criação e manutenção da imagem positiva da Prafesta.\n\n4.2.5. Relações com o Poder Público: Nenhum colaborador, fornecedor, parceiro, prestador de serviço, gerente ou sócios devem dar, oferecer, pagar, prometer pagar, ou autorizar o pagamento de, direta ou indiretamente, qualquer dinheiro ou qualquer coisa de valor a qualquer autoridade governamental, consultores, representantes, parceiros, ou quaisquer terceiros, com a finalidade de influenciar qualquer ato ou decisão do agente ou do governo, ou para assegurar qualquer vantagem indevida, ou direcionar negócios para qualquer pessoa, e que violem as Regras Anticorrupção ("Pagamento Proibido"). Um Pagamento Proibido não abrange pagamento de despesas razoáveis e de boa-fé, tais como, exemplificativamente, despesas de viagem e hospedagem, que estão diretamente relacionados com a promoção, a explicação, demonstração ou de produtos ou Serviços, ou de execução de um contrato com um governo ou suas agências, desde que o pagamento seja permitido pela legislação aplicável.',
        },
        {
          numero: '5',
          titulo: 'Política Anticorrupção e Compliance',
          conteudo:
            'A alta direção da Prafesta está empenhada em propagar em todos os seus níveis de relacionamento padrões éticos, sustentáveis e socialmente responsáveis.\n\nA Prafesta rejeita categoricamente todas as formas de suborno, corrupção e tráfico de influência, estando empenhada na total observância de todas as leis e proibições aplicáveis a tais comportamentos, exigindo que seus colaboradores, clientes, parceiros e fornecedores ajam da mesma forma.\n\nA Prafesta pratica tolerância zero para suborno e qualquer forma de comportamento corrupto ou antiéticos. Subornos, propinas, tráfico de influência ou quaisquer outros incentivos ou acordos impróprios envolvendo funcionários públicos, clientes, fornecedores ou quaisquer outras contrapartes são estritamente proibidos. Essa proibição inclui pagamentos de "facilitação", mesmo que não sejam propriamente suborno (como, por exemplo, pequenos pagamentos feitos para assegurar que o funcionário público cumpra determinadas funções oficiais) e, também, as contribuições políticas.\n\nPor meio de políticas, procedimentos e de práticas tais como treinamentos e orientação especificas, a Prafesta procura prevenir e combater a corrupção na empresa.\n\nA promessa, oferta, solicitação, pagamento ou aceitação de qualquer vantagem indevida é uma violação da política da prafesta, pode ser uma ofensa criminal e acarretará uma ação disciplinar apropriada (incluindo, quando apropriado, o término do contrato de trabalho).',
        },
        {
          numero: '6',
          titulo: 'Política de Proteção de Dados e Confidencialidade (LGPD)',
          conteudo:
            'Todos os colaboradores têm a responsabilidade direta pela adoção das medidas necessárias para salvaguardar as informações da empresa de danos, perdas ou incidentes de segurança e garantir a sua custódia segura durante o prazo estipulado nas normas e regulamentos internos.\n\nSão medidas de segurança de proteção de dados:\n• Bloquear a tela do computador ao se ausentar da mesa;\n• Não deixar documentos que contenham dados pessoais expostos ou em locais sem a segurança devida;\n• Não descartar documentos com dados pessoais sem antes realizar a sua destruição, de forma que não seja possível identificar o seu teor;\n• Não repassar dados pessoais a terceiros não autorizados;\n• Não salvar documentos que contenham dados pessoais em pastas de acesso compartilhado com pessoas não autorizadas;\n• Tratar com sigilo e confidencialidade todos os dados pessoais ou sigilosos que tiver acesso em decorrência do trabalho realizado, sob pena de responder pessoalmente pelos danos causados.\n\nO colaborador tem ciência que infringe a Lei 13.709/2018 - LGPD quem divulga ou explora, sem autorização dados pessoais, ou trata de maneira inadequada, sem a observância das regras de proteção de dados, viola os direitos fundamentais à liberdade, à intimidade e privacidade de terceiros, podendo responder judicial, administrativa e criminalmente, bem como ressarcir todos os danos e/ou prejuízos.\n\nToda informação recebida ou comunicada no curso do contrato de trabalho, deve ser tratada como (e permanecer mesmo após o seu encerramento) estritamente confidencial.\n\nTodos os colaboradores estão obrigados pessoalmente:\n• a não utilizar as informações confidenciais a que tiver acesso, para gerar benefício próprio exclusivo e/ou unilateral, presente ou futuro, ou para o uso e/ou benefício de terceiros (ex. serviços de consultoria);\n• a não efetuar nenhuma gravação ou cópia da documentação confidencial a que tiver acesso, bem como fotografar e filmar dentro das dependências da fábrica;\n• a não se apropriar de material confidencial e/ou sigiloso de tecnologia ou projeto que venha a ter acesso ou conhecimento;\n• a não compartilhar documentos confidenciais em pasta pública na rede do computador a que tiver acesso bem como não as enviar a terceiros sem autorização da Gerência;\n• a não repassar o conhecimento das informações confidenciais, responsabilizando-se por todas as pessoas que vierem a ter acesso às informações, por seu intermédio, e obrigando-se, assim, a ressarcir a ocorrência de qualquer dano e/ou prejuízo oriundo de uma eventual quebra de sigilo das informações fornecidas;\n• não discutir assuntos corporativos em ambientes públicos como área de lazer, refeitório, banheiros, praças, restaurantes, etc.\n\nSÃO DADOS PESSOAIS:\nQualquer informação relacionada a pessoa natural identificada ou identificável (exemplo: currículos, ficha de entrevista, relatórios com dados pessoais, holerites, espelho de ponto, atestados, exames, etc).\n\nSÃO DADOS CONFIDENCIAIS:\nDados técnicos e comerciais sobre produtos, objetivos, táticas e estratégias de negócios e comercialização, orçamentos, planejamento de curto e longo prazo, volume e condições de vendas, resultados de pesquisas, dados estatísticos, financeiros, contábeis e produtivos, aspectos societários, projetos, posição mercadológica, estrutura organizacional, informação relativa a segredos de negócio, segredo de fábrica, fórmulas, projetos, produtos, patentes, dados pessoais, bem como quaisquer informações ou dados que estejam vinculados ou relacionados com o interesse da empresa.',
        },
        {
          numero: '7',
          titulo: 'Divulgação e Procedimentos',
          conteudo:
            'Os diretores, gestores, encarregados e líderes deverão transmitir a seus respectivos subordinados as normas constantes deste Código de Ética e Conduta Empresarial, de forma que o mesmo tenha ampla divulgação no ambiente de trabalho, bem como deverão zelar pela sua observância, apresentando aos gestores recomendações para a sua atualização e aprimoramento.\n\nDúvidas específicas a respeito de situações concretas sobre a aplicação ou interpretação das regras constantes deste Código deverão ser encaminhadas ao superior hierárquico imediato, que por sua vez, caso necessário, levará a questão a conhecimento da área de Recursos Humanos.\n\nCada colaborador deve zelar pelo cumprimento do Código de Ética e Conduta Empresarial e demais políticas e normas internas da Prafesta e informar seu superior imediato, a área de Recursos Humanos ou Conselho de Administração, quando souber de alguma violação as normas.\n\nNinguém será punido ou retaliado por informações e boa-fé sobre suspeitas de um comportamento inadequado ou que seja contrário ao Código.\n\nSituações especiais devem sempre ser encaminhadas ao conhecimento do Conselho de Administração.',
        },
        {
          numero: '8',
          titulo: 'Medidas Disciplinares',
          conteudo:
            'O pleno entendimento e atendimento das diretrizes deste código é condição fundamental para a permanência do colaborador nos quadros da Prafesta.\n\nO descumprimento dos princípios e compromissos expressos neste Código de Ética e Conduta Empresarial será tratado como assunto de extrema gravidade, e poderá ensejar a adoção de medidas disciplinares, que poderão incluir orientação, advertência, suspensão e até mesmo demissão por justa causa, de acordo com o nível e a natureza da infração, bem como de acordo com as leis aplicáveis, sem prejuízo da responsabilização civil, criminal e/ou administrativa cabíveis.',
        },
        {
          numero: '9',
          titulo: 'Canal de Denúncia',
          conteudo:
            'A Prafesta tem como canais de denúncias o e-mail denuncia@prafesta.com.br e caixas de denúncias nos vestiários garantindo o sigilo e não retaliações de qualquer tipo aos denunciantes de boa-fé.',
        },
        {
          numero: '10',
          titulo: 'Declaração de Compromisso',
          conteudo:
            'Eu declaro estar ciente de que os colaboradores da PRAFESTA INDUSTRIA E COMERCIO DE EMBALAGENS devem seguir seu comportamento pelos valores e normas contidas no Código de Ética e Conduta Empresarial que estou recebendo neste ato e assumo o compromisso de cumpri-los, tendo recebido nesta data o treinamento acerca de seu conteúdo, tendo compreendido sua importância estando ciente de que poderei esclarecer quaisquer dúvidas a qualquer momento junto ao meu superior ou Departamento Pessoal.\n\nPRAFESTA IND. E COM. EMBALAGENS LTDA\nRua Faustino Felix Bueno, 140 - Terra Preta, Mairiporã - SP, CEP: 07661-635\nTel.: (11) 4486-8100 | www.prafesta.com.br | V2.2023',
        },
      ],
      declaracao_verbatim:
        'Eu declaro estar ciente de que os colaboradores da PRAFESTA INDUSTRIA E COMERCIO DE EMBALAGENS devem seguir seu comportamento pelos valores e normas contidas no Código de Ética e Conduta Empresarial que estou recebendo neste ato e assumo o compromisso de cumpri-los, tendo recebido nesta data o treinamento acerca de seu conteúdo, tendo compreendido sua importância estando ciente de que poderei esclarecer quaisquer dúvidas a qualquer momento junto ao meu superior ou Departamento Pessoal.',
      perguntas_quiz: [
        {
          id: 'ce_q1',
          pergunta:
            'Ao se deparar com uma tomada de decisão que envolva aspectos éticos, quais perguntas o colaborador da PRAFESTA deve fazer a si mesmo?',
          opcoes: [
            'Qual opção trará lucro financeiro imediato mais rápido para o setor?',
            'As 5 perguntas: É legal? Está em conformidade com políticas e procedimentos? Está conforme a missão, visão e valores? Sentiria-me confortável explicando a um terceiro? Avaliei todos os riscos?',
            'Se ninguém estiver olhando na fábrica, a conduta está automaticamente liberada?',
            'A decisão depende apenas da aprovação verbal de um colega do mesmo turno?',
          ],
          respostaCorreta: 1,
          explicacao:
            'Conforme a Seção 2 do Código de Ética, diante de dilemas éticos o colaborador deve se perguntar: 1) É legal? 2) Está em conformidade com nossas políticas? 3) Está conforme missão, visão e valores? 4) Sentiria-me confortável explicando a um terceiro ou lendo em uma notícia? 5) Avaliei todos os riscos para a Prafesta? Se a resposta for não ou houver dúvida, deve buscar orientação superior.',
        },
        {
          id: 'ce_q2',
          pergunta:
            'Qual é o valor limite permitido para aceitação de brindes promocionais corporativos (ex: canetas, agendas, calendários) de fornecedores ou parceiros?',
          opcoes: [
            'Qualquer valor, desde que seja entregue no final do ano',
            'Até R$ 150,00 (cento e cinquenta reais). Brindes acima desse valor devem ser obrigatoriamente encaminhados ao RH para registro e destinação',
            'Até R$ 500,00 em dinheiro ou vale-compras',
            'Não existe limite de valor para brindes na PRAFESTA',
          ],
          respostaCorreta: 1,
          explicacao:
            'Conforme o item 4.2.3 do Código de Ética, somente poderão ser aceitos brindes promocionais corporativos institucionais cujo valor não ultrapasse R$ 150,00 (cento e cinquenta reais). Demais brindes devem ser encaminhados ao Departamento de Recursos Humanos para registro de entrada e destino.',
        },
        {
          id: 'ce_q3',
          pergunta:
            'Quais são os canais oficiais de denúncia disponibilizados pela PRAFESTA e qual garantia é dada aos colaboradores denunciantes de boa-fé?',
          opcoes: [
            'Apenas grupos informais de aplicativo de mensagens, sem sigilo',
            'O e-mail denuncia@prafesta.com.br e as caixas de denúncias nos vestiários, garantindo sigilo absoluto e proteção integral contra retaliações',
            'Apenas comparecimento perante a diretoria geral com identificação obrigatória pública',
            'Publicação anônima em fóruns de internet abertos',
          ],
          respostaCorreta: 1,
          explicacao:
            'Conforme a Seção 9 e Seção 7 do Código de Ética, a PRAFESTA disponibiliza o canal denuncia@prafesta.com.br e caixas físicas nos vestiários, assegurando sigilo e proibição estrita de qualquer tipo de punição ou retaliação aos denunciantes de boa-fé.',
        },
        {
          id: 'ce_q4',
          pergunta:
            'Qual é a diretriz da PRAFESTA em relação a suborno, corrupção e pagamentos de "facilitação" para agentes públicos ou privados?',
          opcoes: [
            'Tolerância zero a qualquer forma de suborno e corrupção, sendo expressamente proibidos pagamentos de facilitação e contribuições políticas ilícitas',
            'Pequenos pagamentos de facilitação são tolerados para agilizar inspeções ou alvarás',
            'Suborno é aceito quando solicitado por clientes de grande porte',
            'Apenas valores acima de R$ 10.000,00 são proibidos pela política',
          ],
          respostaCorreta: 0,
          explicacao:
            'Conforme a Seção 5 (Política Anticorrupção e Compliance), a PRAFESTA pratica tolerância zero para suborno, propinas e corrupção. Pagamentos de facilitação (mesmo pequenos para agilizar rotinas) e contribuições políticas são rigorosamente proibidos, sujeitando a demissão por justa causa e sanções criminais.',
        },
        {
          id: 'ce_q5',
          pergunta:
            'Quais são exemplos de medidas fundamentais de segurança e proteção de dados pessoais e sigilosos exigidas pela LGPD (Lei 13.709/2018) na PRAFESTA?',
          opcoes: [
            'Compartilhar senhas de sistemas e deixar telas abertas durante o horário de almoço',
            'Bloquear a tela do computador ao se ausentar, não deixar papéis com dados expostos, destruir documentos com dados pessoais antes do descarte e manter sigilo profissional',
            'Publicar fotos de holerites e atestados nos murais da fábrica',
            'Enviar relatórios comerciais internos para e-mails pessoais particulares livremente',
          ],
          respostaCorreta: 1,
          explicacao:
            'Conforme a Seção 6 do Código de Ética (Política de Proteção de Dados e Confidencialidade), o colaborador deve bloquear a tela do computador, não deixar documentos expostos, destruir documentos antes do descarte, não salvar dados pessoais em pastas públicas e guardar estrito sigilo de dados pessoais e segredos industriais.',
        },
        {
          id: 'ce_q6',
          pergunta:
            'Qual é a postura inegociável da PRAFESTA em relação ao trabalho infantil, trabalho forçado e discriminação?',
          opcoes: [
            'Permite trabalho de menores de 16 anos em qualquer setor da fábrica',
            'Proibição absoluta de contratação de menores de 16 anos (salvo jovem aprendiz regular), proibição de trabalho noturno/perigoso para menores de 18 anos, tolerância zero a trabalho forçado e repúdio a qualquer discriminação ou assédio',
            'Permite reter a carteira de trabalho e documentos dos colaboradores nos armários da chefia',
            'A empresa não possui diretriz sobre direitos humanos',
          ],
          respostaCorreta: 1,
          explicacao:
            'Conforme o item 3.8.3 do Código de Ética (Direitos Humanos), a PRAFESTA proíbe rigorosamente o trabalho infantil de menores de 16 anos (exceto na condição legal de aprendiz), veda atividades perigosas a menores de 18 anos, proíbe qualquer forma de trabalho forçado ou retenção de documentos e repudia qualquer forma de discriminação e assédio.',
        },
      ],
    }

    let rec
    try {
      rec = app.findFirstRecordByData('documentos', 'codigo', doc4Data.codigo)
    } catch (_) {
      rec = new Record(docsCol)
    }
    rec.set('titulo', doc4Data.titulo)
    rec.set('subtitulo', doc4Data.subtitulo)
    rec.set('codigo', doc4Data.codigo)
    rec.set('revisao', doc4Data.revisao)
    rec.set('data_publicacao', doc4Data.data_publicacao)
    rec.set('ementa', doc4Data.ementa)
    rec.set('conteudo', doc4Data.ementa)
    rec.set('secoes', JSON.stringify(doc4Data.secoes))
    rec.set('declaracao_verbatim', doc4Data.declaracao_verbatim)
    rec.set('local_padrao', doc4Data.local_padrao)
    rec.set('perguntas_quiz', JSON.stringify(doc4Data.perguntas_quiz))
    rec.set('ativo', doc4Data.ativo)
    rec.set('ordem', doc4Data.ordem)
    app.save(rec)
  },
  (app) => {
    // down
    try {
      const rec = app.findFirstRecordByData('documentos', 'codigo', 'COD-ETICA-V2')
      app.delete(rec)
    } catch (_) {}
  },
)
