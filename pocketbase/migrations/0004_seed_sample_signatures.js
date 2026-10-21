migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    const docs = app.findCollectionByNameOrId('documentos')
    const assinaturasCol = app.findCollectionByNameOrId('assinaturas')
    const treinamentosCol = app.findCollectionByNameOrId('treinamentos')

    // Colaborador Carlos
    let carlos
    try {
      carlos = app.findAuthRecordByEmail('_pb_users_auth_', 'carlos.producao@prafesta.com.br')
    } catch (_) {
      return
    }

    // Documento 1 (Termo Unificado)
    let doc1
    try {
      doc1 = app.findFirstRecordByData('documentos', 'codigo', 'TU-RH-023')
    } catch (_) {
      return
    }

    // Verificar se já existe treinamento
    try {
      app.findFirstRecordByFilter(
        'treinamentos',
        `colaborador = '${carlos.id}' && documento = '${doc1.id}'`,
      )
    } catch (_) {
      const tr = new Record(treinamentosCol)
      tr.set('colaborador', carlos.id)
      tr.set('documento', doc1.id)
      tr.set('nota', 100)
      tr.set('acertos', 6)
      tr.set('total_perguntas', 6)
      tr.set('aprovado', true)
      tr.set('data_conclusao', '2026-10-15T10:30:00.000Z')
      tr.set('nome_colaborador', carlos.getString('name'))
      tr.set(
        'respostas',
        JSON.stringify({
          tu_q1: 1,
          tu_q2: 2,
          tu_q3: 2,
          tu_q4: 1,
          tu_q5: 1,
          tu_q6: 2,
        }),
      )
      app.save(tr)
    }

    // Verificar se já existe assinatura
    try {
      app.findFirstRecordByFilter(
        'assinaturas',
        `colaborador = '${carlos.id}' && documento = '${doc1.id}'`,
      )
    } catch (_) {
      const ass = new Record(assinaturasCol)
      ass.set('colaborador', carlos.id)
      ass.set('documento', doc1.id)
      ass.set('data_hora', '2026-10-15T10:35:12.450Z')
      ass.set('ciencia', true)
      ass.set('nome_colaborador', carlos.getString('name'))
      ass.set('cpf_colaborador', carlos.getString('cpf'))
      ass.set('email_colaborador', carlos.getString('email'))
      ass.set('cargo_colaborador', carlos.getString('cargo'))
      ass.set('termo_assinado_texto', doc1.getString('declaracao_verbatim'))
      ass.set(
        'metadados',
        JSON.stringify({
          ip: '187.56.24.112',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/129.0.0.0 Safari/537.36',
          dispositivo: 'Desktop / Estação RH 04',
          metodo: 'Assinatura Eletrônica Autenticada por Credencial Única PRAFESTA',
          validacaoLegal: 'MP nº 2.200-2/2001 e Lei 12.965/2014',
        }),
      )
      app.save(ass)
    }
  },
  (app) => {},
)
