import type { Documento, Assinatura, Treinamento, User } from '@/types'

function formatarDataHoraBR(dataIso: string): string {
  try {
    const d = new Date(dataIso)
    return d.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  } catch {
    return dataIso
  }
}

export function gerarHTMLCertificado(params: {
  documento: Documento
  treinamento: Treinamento
  assinatura?: Assinatura | null
  usuario: User
}): string {
  const { documento, treinamento, assinatura, usuario } = params
  const dataConclusaoBR = formatarDataHoraBR(treinamento.data_conclusao)
  const dataAssinaturaBR = assinatura ? formatarDataHoraBR(assinatura.data_hora) : 'Pendente'
  const codigoAutenticacao = `${treinamento.id.toUpperCase()}-${(assinatura?.id || 'CERT').slice(0, 8).toUpperCase()}`

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Certificado de Conclusão e Treinamento - PRAFESTA</title>
  <style>
    @page { size: A4 landscape; margin: 12mm; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f8fafc;
      color: #1e293b;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cert-container {
      background: #ffffff;
      border: 8px solid #0f172a;
      outline: 2px solid #e11d48;
      outline-offset: -14px;
      padding: 40px 50px;
      min-height: 180mm;
      box-sizing: border-box;
      position: relative;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 15px;
      margin-bottom: 25px;
    }
    .brand {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -1px;
      color: #e11d48;
    }
    .brand-sub {
      font-size: 11px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
    }
    .doc-badge {
      background: #0f172a;
      color: #fff;
      padding: 6px 14px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .title-box {
      text-align: center;
      margin: 20px 0 30px;
    }
    .title-box h1 {
      font-size: 30px;
      margin: 0 0 8px;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #0f172a;
    }
    .title-box p {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }
    .body-text {
      font-size: 16px;
      line-height: 1.8;
      text-align: center;
      max-width: 820px;
      margin: 0 auto 30px;
    }
    .highlight-name {
      font-size: 24px;
      font-weight: 800;
      color: #0f172a;
      text-decoration: underline;
      text-decoration-color: #e11d48;
      display: block;
      margin: 10px 0;
    }
    .doc-highlight {
      font-weight: 700;
      color: #e11d48;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      background: #f1f5f9;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 35px;
      text-align: center;
    }
    .metric-label {
      font-size: 11px;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 600;
    }
    .metric-value {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 4px;
    }
    .footer-signatures {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      padding-top: 20px;
    }
    .signature-block {
      text-align: center;
      width: 42%;
      border-top: 1px dashed #94a3b8;
      padding-top: 10px;
      font-size: 12px;
    }
    .signature-name {
      font-weight: 700;
      color: #0f172a;
    }
    .signature-meta {
      color: #64748b;
      font-size: 11px;
    }
    .auth-banner {
      margin-top: 25px;
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
      font-size: 10px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
    .no-print {
      margin-bottom: 20px;
      text-align: center;
    }
    .btn-print {
      background: #e11d48;
      color: #fff;
      border: none;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
    }
    @media print {
      .no-print { display: none !important; }
      body { background: #fff; padding: 0; }
      .cert-container { border-width: 6px; }
    }
  </style>
</head>
<body>
  <div class="no-print">
    <button class="btn-print" onclick="window.print()">Salvar / Imprimir Certificado em PDF</button>
  </div>
  <div class="cert-container">
    <div class="header">
      <div>
        <div class="brand">PRAFESTA</div>
        <div class="brand-sub">Indústria e Comércio de Embalagens Ltda. • CNPJ 55.772.580/0001-92</div>
      </div>
      <div class="doc-badge">Programa de Compliance & Integração</div>
    </div>

    <div class="title-box">
      <h1>Certificado de Treinamento e Adesão</h1>
      <p>Emissão Digital Automatizada • Plataforma de Assinatura Corporativa</p>
    </div>

    <div class="body-text">
      Certificamos para todos os fins de direito e cumprimento de normas regulamentadoras que o(a) colaborador(a)
      <span class="highlight-name">${usuario.name.toUpperCase()}</span>
      ${usuario.cpf ? `portador(a) do CPF nº <strong>${usuario.cpf}</strong>, ` : ''}
      ocupante da função de <strong>${usuario.cargo || 'Colaborador(a)'}</strong> no setor de <strong>${usuario.setor || 'Geral'}</strong>,
      concluiu com aproveitamento integral a leitura detalhada, o treinamento interativo com avaliação de eficácia e a respectiva formalização eletrônica do documento:
      <br><br>
      <span class="doc-highlight">"${documento.titulo}"</span>
      ${documento.codigo ? ` (Código: ${documento.codigo} • ${documento.revisao || ''})` : ''}
    </div>

    <div class="metrics-grid">
      <div>
        <div class="metric-label">Nota na Avaliação</div>
        <div class="metric-value">${treinamento.nota}% (${treinamento.acertos}/${treinamento.total_perguntas} acertos)</div>
      </div>
      <div>
        <div class="metric-label">Status do Treinamento</div>
        <div class="metric-value" style="color: #16a34a;">Aprovado</div>
      </div>
      <div>
        <div class="metric-label">Data do Treinamento</div>
        <div class="metric-value">${dataConclusaoBR}</div>
      </div>
      <div>
        <div class="metric-label">Data da Assinatura</div>
        <div class="metric-value">${dataAssinaturaBR}</div>
      </div>
    </div>

    <div class="footer-signatures">
      <div class="signature-block">
        <div class="signature-name">${usuario.name}</div>
        <div class="signature-meta">Colaborador(a) • ${usuario.email}</div>
        <div class="signature-meta">Assinatura Eletrônica Registrada</div>
      </div>
      <div class="signature-block">
        <div class="signature-name">PRAFESTA EMBALAGENS LTDA.</div>
        <div class="signature-meta">Coordenação de Recursos Humanos & Compliance</div>
        <div class="signature-meta">Validação Digital Automatizada</div>
      </div>
    </div>

    <div class="auth-banner">
      <div>Chave de Autenticidade: <strong>${codigoAutenticacao}</strong></div>
      <div>Válido nos termos da MP 2.200-2/2001 e Lei 12.965/2014 • Emitido em ${new Date().toLocaleDateString('pt-BR')}</div>
    </div>
  </div>
</body>
</html>`
}

export function gerarHTMLDocumentoAssinado(params: {
  documento: Documento
  assinatura: Assinatura
  usuario?: User | null
  treinamento?: Treinamento | null
}): string {
  const { documento, assinatura, treinamento } = params
  const dataAssinaturaBR = formatarDataHoraBR(assinatura.data_hora)
  const dataTreinamentoBR = treinamento
    ? formatarDataHoraBR(treinamento.data_conclusao)
    : 'Não registrado'

  const secoesHtml = (documento.secoes || [])
    .map(
      (sec) => `
    <div style="margin-bottom: 24px; page-break-inside: avoid;">
      <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
        ${sec.numero}. ${sec.titulo}
      </h3>
      <div style="font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${sec.conteudo}</div>
    </div>
  `,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${documento.titulo} - Registro de Assinatura Eletrônica PRAFESTA</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 24px;
      background: #f8fafc;
      color: #0f172a;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .wrapper {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 35px 40px;
      max-width: 900px;
      margin: 0 auto;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px solid #e11d48;
      padding-bottom: 15px;
      margin-bottom: 25px;
    }
    .company {
      font-size: 24px;
      font-weight: 900;
      color: #e11d48;
    }
    .company-sub {
      font-size: 11px;
      color: #64748b;
    }
    .doc-meta {
      text-align: right;
      font-size: 12px;
      color: #475569;
    }
    .doc-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .doc-subtitle {
      font-size: 13px;
      color: #64748b;
      margin-bottom: 25px;
    }
    .protocol-box {
      background: #f0fdf4;
      border: 1px solid #86efac;
      padding: 14px 18px;
      border-radius: 6px;
      margin-bottom: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .protocol-title {
      font-size: 13px;
      font-weight: 800;
      color: #166534;
    }
    .protocol-sub {
      font-size: 11px;
      color: #15803d;
    }
    .verbatim-box {
      background: #fffbeb;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      margin: 25px 0;
      font-size: 12px;
      line-height: 1.6;
      color: #78350f;
      white-space: pre-wrap;
    }
    .signature-card {
      background: #f8fafc;
      border: 2px solid #0f172a;
      border-radius: 8px;
      padding: 20px;
      margin-top: 30px;
      page-break-inside: avoid;
    }
    .sig-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      font-size: 12px;
      margin-top: 12px;
    }
    .sig-field label {
      font-weight: 700;
      color: #475569;
      display: block;
      font-size: 11px;
    }
    .sig-field span {
      color: #0f172a;
      font-weight: 600;
    }
    .no-print {
      text-align: center;
      margin-bottom: 20px;
    }
    .btn-download {
      background: #0f172a;
      color: #ffffff;
      border: none;
      padding: 10px 24px;
      font-size: 14px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
    }
    @media print {
      .no-print { display: none !important; }
      body { background: #fff; padding: 0; }
      .wrapper { box-shadow: none; border: none; padding: 0; }
    }
  </style>
</head>
<body>
  <div class="no-print">
    <button class="btn-download" onclick="window.print()">Imprimir / Salvar Registro em PDF</button>
  </div>
  <div class="wrapper">
    <div class="header">
      <div>
        <div class="company">PRAFESTA</div>
        <div class="company-sub">Prafesta Indústria e Comércio de Embalagens Ltda. • CNPJ 55.772.580/0001-92</div>
      </div>
      <div class="doc-meta">
        <div><strong>Código:</strong> ${documento.codigo || 'DOC-PRAFESTA'}</div>
        <div><strong>Revisão:</strong> ${documento.revisao || 'Única'}</div>
        <div><strong>Data Base:</strong> ${documento.data_publicacao || '2026'}</div>
      </div>
    </div>

    <div class="protocol-box">
      <div>
        <div class="protocol-title">DOCUMENTO ASSINADO ELETRONICAMENTE</div>
        <div class="protocol-sub">Validade jurídica nos termos da MP 2.200-2/2001, Código Civil arts. 107/219 e Marco Civil da Internet (Lei 12.965/2014)</div>
      </div>
      <div style="text-align: right; font-size: 12px; font-weight: 800; color: #166534;">
        AUTENTICADO
      </div>
    </div>

    <div class="doc-title">${documento.titulo}</div>
    ${documento.subtitulo ? `<div class="doc-subtitle">${documento.subtitulo}</div>` : ''}

    <div style="margin-bottom: 30px;">
      ${secoesHtml}
    </div>

    <div style="font-weight: 800; font-size: 14px; color: #0f172a; margin-top: 30px;">
      TERMO FORMAL DE CIÊNCIA E DECLARAÇÃO FINAL (VERBATIM):
    </div>
    <div class="verbatim-box">
      ${documento.declaracao_verbatim || 'Declaro ter lido e compreendido integralmente o presente instrumento.'}
    </div>

    <div class="signature-card">
      <div style="font-weight: 800; font-size: 14px; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;">
        REGISTRO E EVIDÊNCIA DE ASSINATURA ELETRÔNICA
      </div>
      <div class="sig-grid">
        <div class="sig-field">
          <label>Nome do Colaborador:</label>
          <span>${assinatura.nome_colaborador || 'Não informado'}</span>
        </div>
        <div class="sig-field">
          <label>CPF do Colaborador:</label>
          <span>${assinatura.cpf_colaborador || 'Não informado'}</span>
        </div>
        <div class="sig-field">
          <label>E-mail do Colaborador:</label>
          <span>${assinatura.email_colaborador || 'Não informado'}</span>
        </div>
        <div class="sig-field">
          <label>Cargo / Função:</label>
          <span>${assinatura.cargo_colaborador || 'Não informado'}</span>
        </div>
        <div class="sig-field">
          <label>Data e Horário da Assinatura:</label>
          <span>${dataAssinaturaBR}</span>
        </div>
        <div class="sig-field">
          <label>Treinamento Prévio Concluído:</label>
          <span>${treinamento ? `Aprovado (${treinamento.nota}% em ${dataTreinamentoBR})` : 'Sim'}</span>
        </div>
        <div class="sig-field">
          <label>Ciência e Aceite Pleno:</label>
          <span style="color: #16a34a; font-weight: 800;">CONFIRMADO PELO COLABORADOR</span>
        </div>
        <div class="sig-field">
          <label>ID Único de Assinatura (Hash/Protocolo):</label>
          <span style="font-family: monospace;">${assinatura.id}</span>
        </div>
        <div class="sig-field" style="grid-column: span 2;">
          <label>Metadados Técnicos de Auditoria:</label>
          <span style="font-family: monospace; font-size: 10px; color: #64748b;">
            IP: ${assinatura.metadados?.ip || 'Registrado'} | Agente: ${assinatura.metadados?.userAgent?.slice(0, 70) || 'Navegador Web'}...
          </span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
}

export function baixarArquivoHTML(nomeArquivo: string, conteudoHtml: string): void {
  const blob = new Blob([conteudoHtml], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nomeArquivo
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
