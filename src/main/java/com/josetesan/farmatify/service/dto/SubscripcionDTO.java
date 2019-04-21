package com.josetesan.farmatify.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Subscripcion entity.
 */
public class SubscripcionDTO implements Serializable {

    private Long id;

    private Long idMedicamento;

    private Long idCliente;

    private Long idFarmacia;


    private Long farmaciaId;

    private Long clienteId;

    private Long idMedicamentoId;

    private Long idFarmaciaId;

    private Long idClienteId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdMedicamento() {
        return idMedicamento;
    }

    public void setIdMedicamento(Long idMedicamento) {
        this.idMedicamento = idMedicamento;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public Long getIdFarmacia() {
        return idFarmacia;
    }

    public void setIdFarmacia(Long idFarmacia) {
        this.idFarmacia = idFarmacia;
    }

    public Long getFarmaciaId() {
        return farmaciaId;
    }

    public void setFarmaciaId(Long farmaciaId) {
        this.farmaciaId = farmaciaId;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public Long getIdMedicamentoId() {
        return idMedicamentoId;
    }

    public void setIdMedicamentoId(Long medicamentoId) {
        this.idMedicamentoId = medicamentoId;
    }

    public Long getIdFarmaciaId() {
        return idFarmaciaId;
    }

    public void setIdFarmaciaId(Long farmaciaId) {
        this.idFarmaciaId = farmaciaId;
    }

    public Long getIdClienteId() {
        return idClienteId;
    }

    public void setIdClienteId(Long clienteId) {
        this.idClienteId = clienteId;
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
            ", idMedicamento=" + getIdMedicamento() +
            ", idCliente=" + getIdCliente() +
            ", idFarmacia=" + getIdFarmacia() +
            ", farmacia=" + getFarmaciaId() +
            ", cliente=" + getClienteId() +
            ", idMedicamento=" + getIdMedicamentoId() +
            ", idFarmacia=" + getIdFarmaciaId() +
            ", idCliente=" + getIdClienteId() +
            "}";
    }
}
