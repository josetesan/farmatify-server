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
 * not an ignored comment
 */
@Entity
@Table(name = "farmacia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "farmacia")
public class Farmacia implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "calle")
    private String calle;

    @Column(name = "codigo_postal")
    private String codigoPostal;

    @Column(name = "ciudad")
    private String ciudad;

    @Column(name = "provincia")
    private String provincia;

    @Column(name = "titular")
    private String titular;

    @OneToMany(mappedBy = "farmacia")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Stock> stocks = new HashSet<>();
    @OneToMany(mappedBy = "farmacia")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Subscripcion> subscripciones = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCalle() {
        return calle;
    }

    public Farmacia calle(String calle) {
        this.calle = calle;
        return this;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public Farmacia codigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
        return this;
    }

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getCiudad() {
        return ciudad;
    }

    public Farmacia ciudad(String ciudad) {
        this.ciudad = ciudad;
        return this;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getProvincia() {
        return provincia;
    }

    public Farmacia provincia(String provincia) {
        this.provincia = provincia;
        return this;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getTitular() {
        return titular;
    }

    public Farmacia titular(String titular) {
        this.titular = titular;
        return this;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public Set<Stock> getStocks() {
        return stocks;
    }

    public Farmacia stocks(Set<Stock> stocks) {
        this.stocks = stocks;
        return this;
    }

    public Farmacia addStocks(Stock stock) {
        this.stocks.add(stock);
        stock.setFarmacia(this);
        return this;
    }

    public Farmacia removeStocks(Stock stock) {
        this.stocks.remove(stock);
        stock.setFarmacia(null);
        return this;
    }

    public void setStocks(Set<Stock> stocks) {
        this.stocks = stocks;
    }

    public Set<Subscripcion> getSubscripciones() {
        return subscripciones;
    }

    public Farmacia subscripciones(Set<Subscripcion> subscripcions) {
        this.subscripciones = subscripcions;
        return this;
    }

    public Farmacia addSubscripciones(Subscripcion subscripcion) {
        this.subscripciones.add(subscripcion);
        subscripcion.setFarmacia(this);
        return this;
    }

    public Farmacia removeSubscripciones(Subscripcion subscripcion) {
        this.subscripciones.remove(subscripcion);
        subscripcion.setFarmacia(null);
        return this;
    }

    public void setSubscripciones(Set<Subscripcion> subscripcions) {
        this.subscripciones = subscripcions;
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
        Farmacia farmacia = (Farmacia) o;
        if (farmacia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), farmacia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Farmacia{" +
            "id=" + getId() +
            ", calle='" + getCalle() + "'" +
            ", codigoPostal='" + getCodigoPostal() + "'" +
            ", ciudad='" + getCiudad() + "'" +
            ", provincia='" + getProvincia() + "'" +
            ", titular='" + getTitular() + "'" +
            "}";
    }
}
