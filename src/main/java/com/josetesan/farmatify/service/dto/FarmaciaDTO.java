package com.josetesan.farmatify.service.dto;
import io.swagger.annotations.ApiModel;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Farmacia entity.
 */
@ApiModel(description = "not an ignored comment")
public class FarmaciaDTO implements Serializable {

    private Long id;

    private String calle;

    private String codigoPostal;

    private String ciudad;

    private String provincia;

    private String titular;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FarmaciaDTO farmaciaDTO = (FarmaciaDTO) o;
        if (farmaciaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), farmaciaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FarmaciaDTO{" +
            "id=" + getId() +
            ", calle='" + getCalle() + "'" +
            ", codigoPostal='" + getCodigoPostal() + "'" +
            ", ciudad='" + getCiudad() + "'" +
            ", provincia='" + getProvincia() + "'" +
            ", titular='" + getTitular() + "'" +
            "}";
    }
}
