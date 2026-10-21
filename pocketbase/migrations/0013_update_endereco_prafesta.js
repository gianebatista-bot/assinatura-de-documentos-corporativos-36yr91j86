migrate(
  (app) => {
    // Endereço correto verbatim do usuário:
    // "Rua Antônio da Cunha Leite, 615, acesso Rod. Arão Sahm, 80, Portão, Atibaia/SP"
    const NOVO_ENDERECO_COMPLETO =
      'Rua Antônio da Cunha Leite, 615, acesso Rod. Arão Sahm, 80, Portão, Atibaia/SP'
    const NOVO_LOCAL_PADRAO = 'Atibaia/SP'

    // Textos antigos mapeados para substituição
    const ENDERECO_ANTIGO_SECAO10 =
      'PRAFESTA IND. E COM. EMBALAGENS LTDA\nRua Faustino Felix Bueno, 140 - Terra Preta, Mairiporã - SP, CEP: 07661-635\nTel.: (11) 4486-8100 | www.prafesta.com.br | V2.2023'

    const ENDERECO_NOVO_SECAO10 =
      'PRAFESTA IND. E COM. EMBALAGENS LTDA\n' +
      NOVO_ENDERECO_COMPLETO +
      '\nTel.: (11) 4486-8100 | www.prafesta.com.br | V2.2023'

    // Carrega todos os documentos
    const docs = app.findRecordsByFilter('documentos', '1=1', '', 100, 0)

    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i]
      let alterado = false

      // 1. Atualizar local_padrao caso ainda seja Atibaia / Mairiporã ou Mairiporã
      const localAtual = doc.getString('local_padrao')
      if (
        localAtual === 'Atibaia / Mairiporã' ||
        localAtual === 'Mairiporã' ||
        localAtual === 'Atibaia'
      ) {
        doc.set('local_padrao', NOVO_LOCAL_PADRAO)
        alterado = true
      }

      // 2. Atualizar secoes
      const secoesStr = doc.getString('secoes')
      if (secoesStr) {
        let secoesModificadas = false
        let secoesArray = []
        try {
          secoesArray = JSON.parse(secoesStr)
        } catch (_) {
          secoesArray = []
        }

        if (Array.isArray(secoesArray)) {
          for (let s = 0; s < secoesArray.length; s++) {
            const secao = secoesArray[s]
            let conteudo = secao.conteudo || ''

            // Caso A: Seção 10 do Código de Ética (bloco com endereço de Mairiporã)
            if (conteudo.indexOf('Rua Faustino Felix Bueno') !== -1) {
              conteudo = conteudo.replace(ENDERECO_ANTIGO_SECAO10, ENDERECO_NOVO_SECAO10)
              // Substituição pontual de segurança caso haja variação de formatação
              conteudo = conteudo.replace(
                /Rua Faustino Felix Bueno, 140 - Terra Preta, Mairiporã - SP, CEP: 07661-635/g,
                NOVO_ENDERECO_COMPLETO,
              )
              secao.conteudo = conteudo
              secoesModificadas = true
            }

            // Caso B: Seção 1 do Código de Ética ("Atualmente, sua sede está instalada no Município de Mairiporã – SP")
            if (
              conteudo.indexOf('instalada no Município de Mairiporã') !== -1 ||
              conteudo.indexOf('instalada no Município de Mairipora') !== -1
            ) {
              conteudo = conteudo.replace(
                'Atualmente, sua sede está instalada no Município de Mairiporã – SP, contando com um centro de distribuição em Pernambuco.',
                'Atualmente, sua sede fabril e administrativa está instalada em Atibaia – SP (' +
                  NOVO_ENDERECO_COMPLETO +
                  '), contando com um centro de distribuição em Pernambuco.',
              )
              secao.conteudo = conteudo
              secoesModificadas = true
            }

            // Caso C: Seção 1.1 do Regimento Interno (RI-2026-v1) - adicionar o endereço oficial à qualificação
            if (
              doc.getString('codigo') === 'RI-2026-v1' &&
              secao.numero === '1' &&
              conteudo.indexOf('CNPJ 56.173.131/0001-25') !== -1 &&
              conteudo.indexOf('Antônio da Cunha Leite') === -1
            ) {
              conteudo = conteudo.replace(
                'PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA. (CNPJ 56.173.131/0001-25)',
                'PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA. (CNPJ 56.173.131/0001-25, sediada na ' +
                  NOVO_ENDERECO_COMPLETO +
                  ')',
              )
              secao.conteudo = conteudo
              secoesModificadas = true
            }

            // Caso D: Seção 1 do Termo Unificado (TU-RH-023) - qualificação da empresa
            if (
              doc.getString('codigo') === 'TU-RH-023' &&
              secao.numero === '1' &&
              conteudo.indexOf(
                'estabelecidas pela PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA.',
              ) !== -1 &&
              conteudo.indexOf('Antônio da Cunha Leite') === -1
            ) {
              conteudo = conteudo.replace(
                'estabelecidas pela PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA.',
                'estabelecidas pela PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA. (' +
                  NOVO_ENDERECO_COMPLETO +
                  ').',
              )
              secao.conteudo = conteudo
              secoesModificadas = true
            }

            // Caso E: Seção 1 da Cartilha de Assédio (CART-ASSEDIO-2023) - qualificação da empresa
            if (
              doc.getString('codigo') === 'CART-ASSEDIO-2023' &&
              secao.numero === '1' &&
              conteudo.indexOf(
                'A PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA. busca permanentemente',
              ) !== -1 &&
              conteudo.indexOf('Antônio da Cunha Leite') === -1
            ) {
              conteudo = conteudo.replace(
                'A PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA. busca permanentemente',
                'A PRAFESTA INDÚSTRIA E COMÉRCIO DE EMBALAGENS LTDA. (' +
                  NOVO_ENDERECO_COMPLETO +
                  ') busca permanentemente',
              )
              secao.conteudo = conteudo
              secoesModificadas = true
            }
          }
        }

        if (secoesModificadas) {
          doc.set('secoes', JSON.stringify(secoesArray))
          alterado = true
        }
      }

      // 3. Atualizar declaracao_verbatim se houver alguma menção antiga
      let declaracao = doc.getString('declaracao_verbatim')
      if (declaracao && declaracao.indexOf('Faustino Felix Bueno') !== -1) {
        declaracao = declaracao.replace(
          /Rua Faustino Felix Bueno, 140 - Terra Preta, Mairiporã - SP, CEP: 07661-635/g,
          NOVO_ENDERECO_COMPLETO,
        )
        doc.set('declaracao_verbatim', declaracao)
        alterado = true
      }

      if (alterado) {
        app.save(doc)
      }
    }
  },
  (app) => {
    // down migration reversível
  },
)
