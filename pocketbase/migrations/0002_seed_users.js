migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // Coordenadora principal (RH)
    const usersToSeed = [
      {
        email: 'adv.gianebatista@gmail.com',
        name: 'Giane Batista',
        role: 'coordenadora',
        cargo: 'Coordenadora de Recursos Humanos',
        setor: 'Recursos Humanos',
        cpf: '123.456.789-00',
      },
      {
        email: 'coordenadoria.rh@prafesta.com.br',
        name: 'Mariana Silva (Coordenação RH)',
        role: 'coordenadora',
        cargo: 'Coordenadora de DHO e Compliance',
        setor: 'Recursos Humanos',
        cpf: '234.567.890-11',
      },
      {
        email: 'carlos.producao@prafesta.com.br',
        name: 'Carlos Eduardo Oliveira',
        role: 'colaborador',
        cargo: 'Auxiliar de Produção I',
        setor: 'Fábrica - Termoformagem',
        cpf: '345.678.901-22',
      },
      {
        email: 'fernanda.qualidade@prafesta.com.br',
        name: 'Fernanda Lima Santos',
        role: 'colaborador',
        cargo: 'Inspetora de Controle de Qualidade',
        setor: 'Qualidade Industrial',
        cpf: '456.789.012-33',
      },
      {
        email: 'lucas.comercial@prafesta.com.br',
        name: 'Lucas Mendes Ramos',
        role: 'colaborador',
        cargo: 'Assistente Comercial',
        setor: 'Vendas & Marketing',
        cpf: '567.890.123-44',
      },
    ]

    for (const u of usersToSeed) {
      let rec
      try {
        rec = app.findAuthRecordByEmail('_pb_users_auth_', u.email)
      } catch (_) {
        rec = new Record(users)
        rec.setEmail(u.email)
      }
      rec.setPassword('Skip@Pass')
      rec.setVerified(true)
      rec.set('name', u.name)
      rec.set('role', u.role)
      rec.set('cargo', u.cargo)
      rec.set('setor', u.setor)
      rec.set('cpf', u.cpf)
      app.save(rec)
    }
  },
  (app) => {
    // down
  },
)
