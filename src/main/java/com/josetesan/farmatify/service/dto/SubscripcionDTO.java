package com.josetesan.farmatify.service.dto;
import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Subscripcion entity.
 */
public class SubscripcionDTO implements Serializable {

    private Long id;

    private Instant fechaInicio;

    private Instant fechaFin;


    private Long farmaciaId;

    private Long usuarioId;

    private Long medicamentoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Instant fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Instant getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Instant fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Long getFarmaciaId() {
        return farmaciaId;
    }

    public void setFarmaciaId(Long farmaciaId) {
        this.farmaciaId = farmaciaId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getMedicamentoId() {
        return medicamentoId;
    }

    public void setMedicamentoId(Long medicamentoId) {
        this.medicamentoId = medicamentoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SubscripcionDTO subscripcionDTO = (SubscripcionDTO) o;
        if (subscripcionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subscripcionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubscripcionDTO{" +
            "id=" + getId() +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaFin='" + getFechaFin() + "'" +
            ", farmacia=" + getFarmaciaId() +
            ", usuario=" + getUsuarioId() +
            ", medicamento=" + getMedicamentoId() +
            "}";
    }
}
