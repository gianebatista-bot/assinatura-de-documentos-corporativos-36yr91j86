migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    const coordenadorasToSeed = [
      {
        email: 'giane.batista@prafesta.com.bt',
        name: 'Giane Batista',
        role: 'coordenadora',
        cargo: 'Coordenadora de Recursos Humanos',
        setor: 'Recursos Humanos',
      },
      {
        email: 'talitha.zamplonio@prafesta.com.br',
        name: 'Talitha Zamplonio',
        role: 'coordenadora',
        cargo: 'Coordenadora',
        setor: 'Recursos Humanos',
      },
    ]

    for (const c of coordenadorasToSeed) {
      let rec
      let isNew = false
      try {
        rec = app.findAuthRecordByEmail('_pb_users_auth_', c.email)
      } catch (_) {
        rec = new Record(users)
        rec.setEmail(c.email)
        rec.setPassword('Prafesta@2026')
        isNew = true
      }

      rec.setVerified(true)
      rec.set('role', c.role)

      if (isNew || !rec.getString('name')) {
        rec.set('name', c.name)
      }
      if (isNew || !rec.getString('cargo')) {
        rec.set('cargo', c.cargo)
      }
      if (isNew || !rec.getString('setor')) {
        rec.set('setor', c.setor)
      }

      app.save(rec)
    }
  },
  (app) => {
    // down: reverter contas caso necessário
    const emails = ['giane.batista@prafesta.com.bt', 'talitha.zamplonio@prafesta.com.br']
    for (const email of emails) {
      try {
        const rec = app.findAuthRecordByEmail('_pb_users_auth_', email)
        app.delete(rec)
      } catch (_) {}
    }
  },
)
