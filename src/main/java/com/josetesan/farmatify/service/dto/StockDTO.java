package com.josetesan.farmatify.service.dto;
import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Stock entity.
 */
public class StockDTO implements Serializable {

    private Long id;

    private Integer unidades;

    private Instant fechaRepuesta;


    private Long farmaciaId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUnidades() {
        return unidades;
    }

    public void setUnidades(Integer unidades) {
        this.unidades = unidades;
    }

    public Instant getFechaRepuesta() {
        return fechaRepuesta;
    }

    public void setFechaRepuesta(Instant fechaRepuesta) {
        this.fechaRepuesta = fechaRepuesta;
    }

    public Long getFarmaciaId() {
        return farmaciaId;
    }

    public void setFarmaciaId(Long farmaciaId) {
        this.farmaciaId = farmaciaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StockDTO stockDTO = (StockDTO) o;
        if (stockDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stockDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StockDTO{" +
            "id=" + getId() +
            ", unidades=" + getUnidades() +
            ", fechaRepuesta='" + getFechaRepuesta() + "'" +
            ", farmacia=" + getFarmaciaId() +
            "}";
    }
}
