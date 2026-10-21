migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // Adicionar campo role ao users se ainda não existir
    if (!users.fields.getByName('role')) {
      users.fields.add(
        new SelectField({
          name: 'role',
          required: false,
          values: ['coordenadora', 'colaborador'],
          maxSelect: 1,
        }),
      )
    }

    // Adicionar campo cpf e cargo ao users para o registro formal de assinatura
    if (!users.fields.getByName('cpf')) {
      users.fields.add(
        new TextField({
          name: 'cpf',
          required: false,
        }),
      )
    }
    if (!users.fields.getByName('cargo')) {
      users.fields.add(
        new TextField({
          name: 'cargo',
          required: false,
        }),
      )
    }
    if (!users.fields.getByName('setor')) {
      users.fields.add(
        new TextField({
          name: 'setor',
          required: false,
        }),
      )
    }

    // Regras de acesso para users:
    // Coordenadora pode ver e gerenciar todos os colaboradores.
    // Colaborador pode ver a si mesmo.
    // Criar: aberto ou autenticado por coordenadora (a aplicação restringe via UI para coordenadora).
    users.listRule =
      "@request.auth.id != '' && (@request.auth.role = 'coordenadora' || id = @request.auth.id)"
    users.viewRule =
      "@request.auth.id != '' && (@request.auth.role = 'coordenadora' || id = @request.auth.id)"
    users.createRule = ''
    users.updateRule =
      "@request.auth.id != '' && (@request.auth.role = 'coordenadora' || id = @request.auth.id)"
    users.deleteRule = "@request.auth.id != '' && @request.auth.role = 'coordenadora'"

    app.save(users)

    // 1. Coleção documentos
    // Base collection: titulo, codigo, revisao, data_publicacao, ementa, conteudo, secoes, declaracao_verbatim, local_padrao, ativo, ordem, perguntas_quiz (json)
    const documentos = new Collection({
      name: 'documentos',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != '' && @request.auth.role = 'coordenadora'",
      updateRule: "@request.auth.id != '' && @request.auth.role = 'coordenadora'",
      deleteRule: "@request.auth.id != '' && @request.auth.role = 'coordenadora'",
      fields: [
        { name: 'titulo', type: 'text', required: true },
        { name: 'subtitulo', type: 'text' },
        { name: 'codigo', type: 'text' },
        { name: 'revisao', type: 'text' },
        { name: 'data_publicacao', type: 'text' },
        { name: 'ementa', type: 'text' },
        { name: 'conteudo', type: 'text' },
        { name: 'secoes', type: 'json' },
        { name: 'declaracao_verbatim', type: 'text' },
        { name: 'local_padrao', type: 'text' },
        { name: 'perguntas_quiz', type: 'json' },
        { name: 'ativo', type: 'bool' },
        { name: 'ordem', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_docs_ativo ON documentos (ativo, ordem)'],
    })
    app.save(documentos)

    // 2. Coleção assinaturas
    // colaborador (relation users), documento (relation documentos), data_hora (text ISO), ciencia (bool), ip_metadados (json), termo_assinado_texto (text)
    const assinaturas = new Collection({
      name: 'assinaturas',
      type: 'base',
      listRule:
        "@request.auth.id != '' && (@request.auth.role = 'coordenadora' || colaborador = @request.auth.id)",
      viewRule:
        "@request.auth.id != '' && (@request.auth.role = 'coordenadora' || colaborador = @request.auth.id)",
      createRule: "@request.auth.id != '' && colaborador = @request.auth.id",
      updateRule: "@request.auth.id != '' && @request.auth.role = 'coordenadora'",
      deleteRule: "@request.auth.id != '' && @request.auth.role = 'coordenadora'",
      fields: [
        {
          name: 'colaborador',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'documento',
          type: 'relation',
          required: true,
          collectionId: documentos.id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'data_hora', type: 'text', required: true },
        { name: 'ciencia', type: 'bool' },
        { name: 'nome_colaborador', type: 'text' },
        { name: 'cpf_colaborador', type: 'text' },
        { name: 'email_colaborador', type: 'text' },
        { name: 'cargo_colaborador', type: 'text' },
        { name: 'termo_assinado_texto', type: 'text' },
        { name: 'metadados', type: 'json' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_ass_colab_doc ON assinaturas (colaborador, documento)'],
    })
    app.save(assinaturas)

    // 3. Coleção treinamentos
    // colaborador (relation users), documento (relation documentos), respostas (json), nota (number 0..100), aprovado (bool), data_conclusao (text), total_perguntas (number), acertos (number)
    const treinamentos = new Collection({
      name: 'treinamentos',
      type: 'base',
      listRule:
        "@request.auth.id != '' && (@request.auth.role = 'coordenadora' || colaborador = @request.auth.id)",
      viewRule:
        "@request.auth.id != '' && (@request.auth.role = 'coordenadora' || colaborador = @request.auth.id)",
      createRule: "@request.auth.id != '' && colaborador = @request.auth.id",
      updateRule:
        "@request.auth.id != '' && (@request.auth.role = 'coordenadora' || colaborador = @request.auth.id)",
      deleteRule: "@request.auth.id != '' && @request.auth.role = 'coordenadora'",
      fields: [
        {
          name: 'colaborador',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'documento',
          type: 'relation',
          required: true,
          collectionId: documentos.id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'respostas', type: 'json' },
        { name: 'nota', type: 'number' },
        { name: 'acertos', type: 'number' },
        { name: 'total_perguntas', type: 'number' },
        { name: 'aprovado', type: 'bool' },
        { name: 'data_conclusao', type: 'text', required: true },
        { name: 'nome_colaborador', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE INDEX idx_trein_colab_doc ON treinamentos (colaborador, documento)'],
    })
    app.save(treinamentos)
  },
  (app) => {
    try {
      const assinaturas = app.findCollectionByNameOrId('assinaturas')
      app.delete(assinaturas)
    } catch (_) {}

    try {
      const treinamentos = app.findCollectionByNameOrId('treinamentos')
      app.delete(treinamentos)
    } catch (_) {}

    try {
      const documentos = app.findCollectionByNameOrId('documentos')
      app.delete(documentos)
    } catch (_) {}
  },
)
