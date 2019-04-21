package com.josetesan.farmatify.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Posologia entity.
 */
public class PosologiaDTO implements Serializable {

    private Long id;

    private Integer dias;

    private Integer horas;


    private Long medicamentoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDias() {
        return dias;
    }

    public void setDias(Integer dias) {
        this.dias = dias;
    }

    public Integer getHoras() {
        return horas;
    }

    public void setHoras(Integer horas) {
        this.horas = horas;
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

        PosologiaDTO posologiaDTO = (PosologiaDTO) o;
        if (posologiaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), posologiaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PosologiaDTO{" +
            "id=" + getId() +
            ", dias=" + getDias() +
            ", horas=" + getHoras() +
            ", medicamento=" + getMedicamentoId() +
            "}";
    }
}
