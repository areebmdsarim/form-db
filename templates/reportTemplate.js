function renderValue(value) {
  if (value === null || value === undefined || value === "") return "";
  if (Array.isArray(value)) {
    if (value.length === 0) return "";
    let rows = value.map((item) => `<tr><td>${renderValue(item).replace(/<[^>]+>/g, "")}</td></tr>`).join('');
    if (typeof value[0] === 'object') {
      const headers = Object.keys(value[0]);
      const headerRow = headers.map((h) => `<th>${h}</th>`).join('');
      const bodyRows = value.map((item) => `<tr>${headers.map((h) => `<td>${renderValue(item[h])}</td>`).join('')}</tr>`).join('');
      return `<table class="report-table"><thead><tr>${headerRow}</tr></thead><tbody>${bodyRows}</tbody></table>`;
    }
    return `<ul>${value.map((v) => `<li>${renderValue(v)}</li>`).join('')}</ul>`;
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    return `<table class="report-table"><tbody>${keys.map((key) => `<tr><th>${key}</th><td>${renderValue(value[key])}</td></tr>`).join('')}</tbody></table>`;
  }
  return String(value);
}

function renderSection(title, sectionData) {
  if (!sectionData || typeof sectionData !== 'object') {
    return `<section><h3>${title}</h3><p>${renderValue(sectionData)}</p></section>`;
  }
  return `<section><h3>${title}</h3>${renderValue(sectionData)}</section>`;
}

function reportTemplate(data) {
  const payload = data || {};
  const sections = Object.keys(payload).filter((k) => k !== '_id');
  const corpus = sections.map((sec) => renderSection(sec, payload[sec])).join('<hr>');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>SNDT Annual Report</title>
<style>body{font-family:Arial,sans-serif;padding:20px;}h1{color:#2c3e50;} .report-table{width:100%;border-collapse:collapse;margin-bottom:10px;} .report-table th, .report-table td{border:1px solid #444;padding:6px;text-align:left;} table{margin-bottom:12px;} section{margin-bottom:20px;} hr{border:none;border-top:1px solid #ddd;margin:20px 0;}</style></head><body>
  <h1>SNDT Annual Report</h1>
  <p>Generated: ${new Date().toLocaleString()}</p>
  ${renderSection('Report Data', payload)}
</body></html>`;
}

module.exports = reportTemplate;
