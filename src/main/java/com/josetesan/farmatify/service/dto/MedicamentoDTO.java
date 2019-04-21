package com.josetesan.farmatify.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Medicamento entity.
 */
public class MedicamentoDTO implements Serializable {

    private Long id;

    private String nombre;

    private Double pvp;

    private Integer unidades;


    private Long stockId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPvp() {
        return pvp;
    }

    public void setPvp(Double pvp) {
        this.pvp = pvp;
    }

    public Integer getUnidades() {
        return unidades;
    }

    public void setUnidades(Integer unidades) {
        this.unidades = unidades;
    }

    public Long getStockId() {
        return stockId;
    }

    public void setStockId(Long stockId) {
        this.stockId = stockId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MedicamentoDTO medicamentoDTO = (MedicamentoDTO) o;
        if (medicamentoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medicamentoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedicamentoDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", pvp=" + getPvp() +
            ", unidades=" + getUnidades() +
            ", stock=" + getStockId() +
            "}";
    }
}
