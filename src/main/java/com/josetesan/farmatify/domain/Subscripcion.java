package com.josetesan.farmatify.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Subscripcion.
 */
@Entity
@Table(name = "subscripcion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "subscripcion")
public class Subscripcion implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha_inicio")
    private Instant fechaInicio;

    @Column(name = "fecha_fin")
    private Instant fechaFin;

    @ManyToOne
    @JsonIgnoreProperties("farmacias")
    private Farmacia farmacia;

    @ManyToOne
    @JsonIgnoreProperties("usuarios")
    private Usuario usuario;

    @OneToMany(mappedBy = "subscripcion")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Medicamento> medicamentos = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFechaInicio() {
        return fechaInicio;
    }

    public Subscripcion fechaInicio(Instant fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(Instant fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Instant getFechaFin() {
        return fechaFin;
    }

    public Subscripcion fechaFin(Instant fechaFin) {
        this.fechaFin = fechaFin;
        return this;
    }

    public void setFechaFin(Instant fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Farmacia getFarmacia() {
        return farmacia;
    }

    public Subscripcion farmacia(Farmacia farmacia) {
        this.farmacia = farmacia;
        return this;
    }

    public void setFarmacia(Farmacia farmacia) {
        this.farmacia = farmacia;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Subscripcion usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<Medicamento> getMedicamentos() {
        return medicamentos;
    }

    public Subscripcion medicamentos(Set<Medicamento> medicamentos) {
        this.medicamentos = medicamentos;
        return this;
    }

    public Subscripcion addMedicamento(Medicamento medicamento) {
        this.medicamentos.add(medicamento);
        medicamento.setSubscripcion(this);
        return this;
    }

    public Subscripcion removeMedicamento(Medicamento medicamento) {
        this.medicamentos.remove(medicamento);
        medicamento.setSubscripcion(null);
        return this;
    }

    public void setMedicamentos(Set<Medicamento> medicamentos) {
        this.medicamentos = medicamentos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Subscripcion subscripcion = (Subscripcion) o;
        if (subscripcion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subscripcion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Subscripcion{" +
            "id=" + getId() +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaFin='" + getFechaFin() + "'" +
            "}";
    }
}
