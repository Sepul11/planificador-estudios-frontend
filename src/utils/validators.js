export function validarActividad(data) {

  const errores = {};

  if (!data.titulo.trim()) {
    errores.titulo = "El título es obligatorio";
  }else if (data.titulo.length < 3) {
        errores.titulo = "Debe tener al menos 3 caracteres";
        }

  if (!data.fecha) {
    errores.fecha = "Selecciona una fecha";
  }

  if (!data.horaInicio) {
    errores.horaInicio = "Selecciona hora inicio";
  }

  if (!data.horaFin) {
    errores.horaFin = "Selecciona hora fin";
  }

  if (
    data.horaInicio &&
    data.horaFin &&
    data.horaInicio >= data.horaFin
  ) {
    errores.horaFin =
      "La hora fin debe ser mayor";
  }

  return errores;
}