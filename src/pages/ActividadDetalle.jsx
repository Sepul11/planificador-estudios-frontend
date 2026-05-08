
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useActividadDetalle } from "../hooks/useActividadDetalle.js";
import { detalleStyles as s } from "../styles/detalleStyles.js";

import DetalleHeader       from "../components/detalle/DetalleHeader.jsx";
import ActividadInfo       from "../components/detalle/ActividadInfo.jsx";
import SubtareasList       from "../components/detalle/SubtareasList.jsx";
import ReprogramarDialog   from "../components/detalle/ReprogramarDialog.jsx";
import AvanceDetalleDialog from "../components/detalle/AvanceDetalleDialog.jsx";
import HistorialDialog     from "../components/detalle/HistorialDialog.jsx";
import RecomendacionesHoy  from "../components/hoy/RecomendacionesHoy.jsx";
import SobrecargaDialog    from "../components/common/SobreCargaDialog.jsx";

import {
  Button, Dialog, DialogActions,
  DialogContent, DialogTitle,
} from "@mui/material";

export default function ActividadDetalle() {
  const navigate = useNavigate();
  const d = useActividadDetalle();

  if (!d.actividad) {
    return (
      <div style={s.loadingContainer}>
        <div style={s.spinner} />
        <p>Cargando actividad...</p>
      </div>
    );
  }

  return (
    <div style={s.pageWrapper}>
      <div style={s.container}>

        <DetalleHeader
          modoEdicion={d.modoEdicion}
          loadingPosponer={d.loadingPosponer}
          onToggleEdicion={() => {
            if (!d.modoEdicion) {
              d.setActividadEdit(JSON.parse(JSON.stringify(d.actividad)));
            }
            d.setModoEdicion(!d.modoEdicion);
          }}
          onGuardar={d.guardarEdicion}
          onPosponer={d.handlePosponer}
          onReprogramar={() => d.setOpenReprogramar(true)}
          onEliminar={() => d.setConfirmDeleteActividad(true)}
        />

        <RecomendacionesHoy recomendaciones={d.recomendaciones} />

        {/* Dialog de sobrecarga — aparece al crear/editar subtarea con conflicto */}
        <SobrecargaDialog
          sobrecarga={d.sobrecarga}
          onClose={() => d.setSobrecarga(null)}
        />
        <SobrecargaDialog
          sobrecarga={d.sobrecargaRepro}
          onClose={() => d.setSobrecargaRepro(null)}
          onAplicarRecomendacion={(rec) => {
            // reutilizamos el endpoint real de reprogramar
            d.setNuevaFechaRepro(rec.nueva_fecha || rec.fecha_1 || rec.fecha);
            d.setSobrecargaRepro(null);
          }}
        />

        <Box sx={s.gridLayout}>
          <ActividadInfo
            actividad={d.actividad}
            actividadEdit={d.actividadEdit}
            setActividadEdit={d.setActividadEdit}
            modoEdicion={d.modoEdicion}
            progreso={d.progreso}
          />

          <SubtareasList
            actividad={d.actividad}
            actividadEdit={d.actividadEdit}
            modoEdicion={d.modoEdicion}
            nuevoTitulo={d.nuevoTitulo} setNuevoTitulo={d.setNuevoTitulo}
            nuevaFecha={d.nuevaFecha}   setNuevaFecha={d.setNuevaFecha}
            nuevasHoras={d.nuevasHoras} setNuevasHoras={d.setNuevasHoras}
            errores={d.errores}         setErrores={d.setErrores}
            onCreate={d.handleCreate}
            onCambio={d.handleCambioSubtarea}
            onDelete={(idSub) => d.setConfirmDeleteSub({ open: true, idSub })}
            onAvance={d.abrirAvance}
            onHistorial={(t) => {
              d.setSubtareaSeleccionada(t);
              d.setOpenHistorial(true);
            }}
          />
        </Box>

        <ReprogramarDialog
          open={d.openReprogramar}
          nuevaFechaRepro={d.nuevaFechaRepro}
          setNuevaFechaRepro={d.setNuevaFechaRepro}
          onClose={() => {
            d.setOpenReprogramar(false);
            d.setNuevaFechaRepro("");
          }}
          onConfirm={d.ejecutarReprogramacion}
        />

        <AvanceDetalleDialog
          open={d.openAvance}
          tipoAvance={d.tipoAvance}
          notaAvance={d.notaAvance}
          setNotaAvance={d.setNotaAvance}
          onClose={() => { d.setOpenAvance(false); d.setNotaAvance(""); }}
          onConfirm={d.confirmarAvance}
        />

        <HistorialDialog
          open={d.openHistorial}
          subtarea={d.subtareaSeleccionada}
          onClose={() => d.setOpenHistorial(false)}
        />

        <Dialog open={d.confirmDeleteSub.open}>
          <DialogTitle>¿Eliminar subtarea?</DialogTitle>
          <DialogActions>
            <Button onClick={() => d.setConfirmDeleteSub({ open: false, idSub: null })}>
              Cancelar
            </Button>
            <Button color="error" onClick={d.confirmarDeleteSubtarea}>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={d.confirmDeleteActividad}>
          <DialogTitle>¿Eliminar actividad completa?</DialogTitle>
          <DialogContent>Esto eliminará todas sus subtareas.</DialogContent>
          <DialogActions>
            <Button onClick={() => d.setConfirmDeleteActividad(false)}>
              Cancelar
            </Button>
            <Button color="error" onClick={d.handleEliminarActividad}>
              Eliminar todo
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </div>
  );
}