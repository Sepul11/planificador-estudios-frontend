// Extrae el objeto de sobrecarga desde la respuesta de error de DRF
function extraerPayload(data) {
  // DRF envuelve ValidationError en non_field_errors
  if (data?.non_field_errors) {
    const inner = Array.isArray(data.non_field_errors)
      ? data.non_field_errors[0]
      : data.non_field_errors;
    // puede ser string o dict
    if (typeof inner === "object") return inner;
  }
  return data;
}

export function detectarSobrecarga(data) {
  if (!data) return null;

  const payload = extraerPayload(data);

  const raw = Array.isArray(payload?.sobrecarga)
    ? payload.sobrecarga[0]
    : payload?.sobrecarga;

  const esSobrecarga =
    raw === true || raw === "True" || raw === "true";

  if (!esSobrecarga) return null;

  const get = (v) => (Array.isArray(v) ? v[0] : v);

  return {
    sobrecarga: true,
    exceso:        parseFloat(get(payload.exceso)        || 0),
    limite:        parseFloat(get(payload.limite)        || 0),
    horas_actuales: parseFloat(get(payload.horas_actuales) || 0),
    recomendaciones: payload.recomendaciones || [],
  };
}

export function mensajeError(data) {
  const payload = extraerPayload(data);

  return Object.entries(payload)
    .filter(([key]) => key !== "recomendaciones" && key !== "sobrecarga")
    .map(([, mensajes]) => {
      if (Array.isArray(mensajes))
        return mensajes
          .map((m) => (typeof m === "object" ? JSON.stringify(m) : m))
          .join(", ");
      if (typeof mensajes === "object") return JSON.stringify(mensajes);
      return mensajes;
    })
    .join(" | ");
}