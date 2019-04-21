package com.josetesan.farmatify.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Medicamento.
 */
@Entity
@Table(name = "medicamento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "medicamento")
public class Medicamento implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "pvp")
    private Double pvp;

    @Column(name = "unidades")
    private Integer unidades;

    @OneToOne
    @JoinColumn(unique = true)
    private Stock stock;

    @OneToMany(mappedBy = "medicamento")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Posologia> posologias = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Medicamento nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPvp() {
        return pvp;
    }

    public Medicamento pvp(Double pvp) {
        this.pvp = pvp;
        return this;
    }

    public void setPvp(Double pvp) {
        this.pvp = pvp;
    }

    public Integer getUnidades() {
        return unidades;
    }

    public Medicamento unidades(Integer unidades) {
        this.unidades = unidades;
        return this;
    }

    public void setUnidades(Integer unidades) {
        this.unidades = unidades;
    }

    public Stock getStock() {
        return stock;
    }

    public Medicamento stock(Stock stock) {
        this.stock = stock;
        return this;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public Set<Posologia> getPosologias() {
        return posologias;
    }

    public Medicamento posologias(Set<Posologia> posologias) {
        this.posologias = posologias;
        return this;
    }

    public Medicamento addPosologias(Posologia posologia) {
        this.posologias.add(posologia);
        posologia.setMedicamento(this);
        return this;
    }

    public Medicamento removePosologias(Posologia posologia) {
        this.posologias.remove(posologia);
        posologia.setMedicamento(null);
        return this;
    }

    public void setPosologias(Set<Posologia> posologias) {
        this.posologias = posologias;
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
        Medicamento medicamento = (Medicamento) o;
        if (medicamento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medicamento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Medicamento{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", pvp=" + getPvp() +
            ", unidades=" + getUnidades() +
            "}";
    }
}
