migrate(
  (app) => {
    // -------------------------------------------------------------------------
    // Migration 0014: Atualização da data base / ano de referência para 2026
    // em TODOS os 4 documentos corporativos da PRAFESTA.
    //
    // Documentos:
    // 1. TU-RH-023: Termo Unificado (já 2026: Rev. 023 (09/10/2026), 09 de outubro de 2026)
    // 2. RI-2026-v1: Regimento Interno 2026 (já 2026: Edição 2026, Janeiro de 2026)
    // 3. CART-ASSEDIO-2023: Cartilha de Prevenção ao Assédio Moral e Sexual:
    //    - revisao: 'Janeiro de 2023' -> 'Edição 2026' (ou 'Janeiro de 2026')
    //    - data_publicacao: 'Janeiro de 2023' -> 'Janeiro de 2026'
    // 4. COD-ETICA-V2: Código de Ética e Conduta Empresarial:
    //    - revisao: 'V2.2023' -> 'Edição 2026' (V2.2026)
    //    - data_publicacao: '2023 (V2.2023)' -> 'Janeiro de 2026 (V2.2026)'
    //    - Seção 10: rodapé "V2.2023" -> "V2.2026"
    //
    // Preservados intactos:
    // - Códigos de identificação (TU-RH-023, RI-2026-v1, CART-ASSEDIO-2023, COD-ETICA-V2)
    // - IDs dos registros e chaves estrangeiras
    // - Citações legais (Leis 14.457/2022, 13.709/2018, 12.965/2014, 9.279/1996, MP 2.200-2/2001 etc.)
    // - Assinaturas e registros de treinamento existentes
    // -------------------------------------------------------------------------

    // 1. Atualizar Cartilha de Prevenção ao Assédio (CART-ASSEDIO-2023)
    try {
      const docCartilha = app.findFirstRecordByData('documentos', 'codigo', 'CART-ASSEDIO-2023')
      docCartilha.set('revisao', 'Edição 2026')
      docCartilha.set('data_publicacao', 'Janeiro de 2026')

      // Atualizar no campo secoes se houver menção à data base 2023 da cartilha
      const secoesStr = docCartilha.getString('secoes')
      if (secoesStr) {
        let secoesArray = []
        try {
          secoesArray = JSON.parse(secoesStr)
        } catch (_) {
          secoesArray = []
        }
        if (Array.isArray(secoesArray)) {
          let modificado = false
          for (let s = 0; s < secoesArray.length; s++) {
            const sec = secoesArray[s]
            if (sec.conteudo && sec.conteudo.indexOf('Janeiro de 2023') !== -1) {
              sec.conteudo = sec.conteudo.replace(/Janeiro de 2023/g, 'Janeiro de 2026')
              modificado = true
            }
          }
          if (modificado) {
            docCartilha.set('secoes', JSON.stringify(secoesArray))
          }
        }
      }

      app.save(docCartilha)
    } catch (err) {
      console.log('Aviso ao atualizar CART-ASSEDIO-2023:', err)
    }

    // 2. Atualizar Código de Ética e Conduta Empresarial (COD-ETICA-V2)
    try {
      const docEtica = app.findFirstRecordByData('documentos', 'codigo', 'COD-ETICA-V2')
      docEtica.set('revisao', 'Edição 2026 (V2.2026)')
      docEtica.set('data_publicacao', 'Janeiro de 2026')

      // Atualizar Seção 10 do Código de Ética: rodapé V2.2023 -> V2.2026
      const secoesStrEtica = docEtica.getString('secoes')
      if (secoesStrEtica) {
        let secoesArray = []
        try {
          secoesArray = JSON.parse(secoesStrEtica)
        } catch (_) {
          secoesArray = []
        }
        if (Array.isArray(secoesArray)) {
          let modificado = false
          for (let s = 0; s < secoesArray.length; s++) {
            const sec = secoesArray[s]
            if (sec.conteudo && sec.conteudo.indexOf('V2.2023') !== -1) {
              sec.conteudo = sec.conteudo.replace(/V2\.2023/g, 'V2.2026')
              modificado = true
            }
          }
          if (modificado) {
            docEtica.set('secoes', JSON.stringify(secoesArray))
          }
        }
      }

      // Atualizar declaracao_verbatim se contiver V2.2023
      const decl = docEtica.getString('declaracao_verbatim')
      if (decl && decl.indexOf('V2.2023') !== -1) {
        docEtica.set('declaracao_verbatim', decl.replace(/V2\.2023/g, 'V2.2026'))
      }

      app.save(docEtica)
    } catch (err) {
      console.log('Aviso ao atualizar COD-ETICA-V2:', err)
    }

    // 3. Garantir que Termo Unificado e Regimento Interno estão confirmados com 2026
    try {
      const docTU = app.findFirstRecordByData('documentos', 'codigo', 'TU-RH-023')
      if (
        !docTU.getString('data_publicacao') ||
        docTU.getString('data_publicacao').indexOf('2026') === -1
      ) {
        docTU.set('data_publicacao', '09 de outubro de 2026')
        docTU.set('revisao', 'Rev. 023 (09/10/2026)')
        app.save(docTU)
      }
    } catch (_) {}

    try {
      const docRI = app.findFirstRecordByData('documentos', 'codigo', 'RI-2026-v1')
      if (
        !docRI.getString('data_publicacao') ||
        docRI.getString('data_publicacao').indexOf('2026') === -1
      ) {
        docRI.set('data_publicacao', 'Janeiro de 2026')
        docRI.set('revisao', 'Edição 2026')
        app.save(docRI)
      }
    } catch (_) {}
  },
  (app) => {
    // Reverter para os valores anteriores caso necessário
    try {
      const docCartilha = app.findFirstRecordByData('documentos', 'codigo', 'CART-ASSEDIO-2023')
      docCartilha.set('revisao', 'Janeiro de 2023')
      docCartilha.set('data_publicacao', 'Janeiro de 2023')
      app.save(docCartilha)
    } catch (_) {}

    try {
      const docEtica = app.findFirstRecordByData('documentos', 'codigo', 'COD-ETICA-V2')
      docEtica.set('revisao', 'V2.2023')
      docEtica.set('data_publicacao', '2023 (V2.2023)')
      app.save(docEtica)
    } catch (_) {}
  },
)
