migrate(
  (app) => {
    const assinaturas = app.findCollectionByNameOrId('assinaturas')

    // Adicionar campo instagram (opcional) na coleção assinaturas se ainda não existir
    if (!assinaturas.fields.getByName('instagram')) {
      assinaturas.fields.add(
        new TextField({
          name: 'instagram',
          required: false,
        }),
      )
      app.save(assinaturas)
    }
  },
  (app) => {
    try {
      const assinaturas = app.findCollectionByNameOrId('assinaturas')
      const field = assinaturas.fields.getByName('instagram')
      if (field) {
        assinaturas.fields.removeByName('instagram')
        app.save(assinaturas)
      }
    } catch (_) {}
  },
)
