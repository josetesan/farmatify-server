package com.josetesan.farmatify.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
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

    @Column(name = "id_medicamento")
    private Long idMedicamento;

    @Column(name = "id_cliente")
    private Long idCliente;

    @Column(name = "id_farmacia")
    private Long idFarmacia;

    @ManyToOne
    @JsonIgnoreProperties("idFarmacias")
    private Farmacia farmacia;

    @ManyToOne
    @JsonIgnoreProperties("idClientes")
    private Cliente cliente;

    @OneToOne
    @JoinColumn(unique = true)
    private Medicamento idMedicamento;

    @OneToOne
    @JoinColumn(unique = true)
    private Farmacia idFarmacia;

    @OneToOne
    @JoinColumn(unique = true)
    private Cliente idCliente;

    @OneToMany(mappedBy = "subscripcion")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Medicamento> idMedicamentos = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdMedicamento() {
        return idMedicamento;
    }

    public Subscripcion idMedicamento(Long idMedicamento) {
        this.idMedicamento = idMedicamento;
        return this;
    }

    public void setIdMedicamento(Long idMedicamento) {
        this.idMedicamento = idMedicamento;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public Subscripcion idCliente(Long idCliente) {
        this.idCliente = idCliente;
        return this;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public Long getIdFarmacia() {
        return idFarmacia;
    }

    public Subscripcion idFarmacia(Long idFarmacia) {
        this.idFarmacia = idFarmacia;
        return this;
    }

    public void setIdFarmacia(Long idFarmacia) {
        this.idFarmacia = idFarmacia;
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

    public Cliente getCliente() {
        return cliente;
    }

    public Subscripcion cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Medicamento getIdMedicamento() {
        return idMedicamento;
    }

    public Subscripcion idMedicamento(Medicamento medicamento) {
        this.idMedicamento = medicamento;
        return this;
    }

    public void setIdMedicamento(Medicamento medicamento) {
        this.idMedicamento = medicamento;
    }

    public Farmacia getIdFarmacia() {
        return idFarmacia;
    }

    public Subscripcion idFarmacia(Farmacia farmacia) {
        this.idFarmacia = farmacia;
        return this;
    }

    public void setIdFarmacia(Farmacia farmacia) {
        this.idFarmacia = farmacia;
    }

    public Cliente getIdCliente() {
        return idCliente;
    }

    public Subscripcion idCliente(Cliente cliente) {
        this.idCliente = cliente;
        return this;
    }

    public void setIdCliente(Cliente cliente) {
        this.idCliente = cliente;
    }

    public Set<Medicamento> getIdMedicamentos() {
        return idMedicamentos;
    }

    public Subscripcion idMedicamentos(Set<Medicamento> medicamentos) {
        this.idMedicamentos = medicamentos;
        return this;
    }

    public Subscripcion addIdMedicamento(Medicamento medicamento) {
        this.idMedicamentos.add(medicamento);
        medicamento.setSubscripcion(this);
        return this;
    }

    public Subscripcion removeIdMedicamento(Medicamento medicamento) {
        this.idMedicamentos.remove(medicamento);
        medicamento.setSubscripcion(null);
        return this;
    }

    public void setIdMedicamentos(Set<Medicamento> medicamentos) {
        this.idMedicamentos = medicamentos;
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
            ", idMedicamento=" + getIdMedicamento() +
            ", idCliente=" + getIdCliente() +
            ", idFarmacia=" + getIdFarmacia() +
            "}";
    }
}
