migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    const oldEmail = 'giane.batista@prafesta.com.bt'
    const newEmail = 'giane.batista@prafesta.com.br'

    let oldRecord = null
    try {
      oldRecord = app.findAuthRecordByEmail('_pb_users_auth_', oldEmail)
    } catch (_) {
      oldRecord = null
    }

    let correctRecord = null
    try {
      correctRecord = app.findAuthRecordByEmail('_pb_users_auth_', newEmail)
    } catch (_) {
      correctRecord = null
    }

    if (oldRecord && !correctRecord) {
      // Caso 1: Conta antiga existe com .bt e a conta com .br ainda não existe.
      // Basta atualizar o e-mail, preservando a senha (hash já gravado) e demais dados.
      oldRecord.setEmail(newEmail)
      oldRecord.setVerified(true)
      oldRecord.set('role', 'coordenadora')
      if (!oldRecord.getString('name')) {
        oldRecord.set('name', 'Giane Batista')
      }
      if (!oldRecord.getString('cargo')) {
        oldRecord.set('cargo', 'Coordenadora de Recursos Humanos')
      }
      if (!oldRecord.getString('setor')) {
        oldRecord.set('setor', 'Recursos Humanos')
      }
      app.save(oldRecord)
    } else if (oldRecord && correctRecord) {
      // Caso 2: Ambas existem (possível duplicata ou criação manual).
      // Migrar eventuais assinaturas/treinamentos apontados para a conta antiga para a conta correta,
      // depois remover o registro antigo com typo.
      try {
        app
          .db()
          .newQuery('UPDATE assinaturas SET colaborador = {:newId} WHERE colaborador = {:oldId}')
          .bind({ newId: correctRecord.id, oldId: oldRecord.id })
          .execute()
      } catch (_) {}

      try {
        app
          .db()
          .newQuery('UPDATE treinamentos SET colaborador = {:newId} WHERE colaborador = {:oldId}')
          .bind({ newId: correctRecord.id, oldId: oldRecord.id })
          .execute()
      } catch (_) {}

      // Garantir propriedades da coordenadora na conta com e-mail correto
      correctRecord.setVerified(true)
      correctRecord.set('role', 'coordenadora')
      if (!correctRecord.getString('name')) {
        correctRecord.set('name', 'Giane Batista')
      }
      if (!correctRecord.getString('cargo')) {
        correctRecord.set('cargo', 'Coordenadora de Recursos Humanos')
      }
      if (!correctRecord.getString('setor')) {
        correctRecord.set('setor', 'Recursos Humanos')
      }
      app.save(correctRecord)

      // Deletar a conta antiga com .bt
      app.delete(oldRecord)
    } else if (!oldRecord && correctRecord) {
      // Caso 3: Conta antiga com .bt não existe, mas a com .br já existe.
      // Apenas garantir os dados de coordenadora.
      correctRecord.setVerified(true)
      correctRecord.set('role', 'coordenadora')
      if (!correctRecord.getString('name')) {
        correctRecord.set('name', 'Giane Batista')
      }
      if (!correctRecord.getString('cargo')) {
        correctRecord.set('cargo', 'Coordenadora de Recursos Humanos')
      }
      if (!correctRecord.getString('setor')) {
        correctRecord.set('setor', 'Recursos Humanos')
      }
      app.save(correctRecord)
    } else {
      // Caso 4: Nem a conta antiga nem a conta correta existem (ex: reexecução em banco limpo sem seed 0007).
      // A migration é no-op para não quebrar.
    }
  },
  (app) => {
    // down: reverter se necessário
    try {
      const rec = app.findAuthRecordByEmail('_pb_users_auth_', 'giane.batista@prafesta.com.br')
      rec.setEmail('giane.batista@prafesta.com.bt')
      app.save(rec)
    } catch (_) {}
  },
)
