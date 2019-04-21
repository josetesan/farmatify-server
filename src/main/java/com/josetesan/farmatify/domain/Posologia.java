package com.josetesan.farmatify.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Posologia.
 */
@Entity
@Table(name = "posologia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "posologia")
public class Posologia implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "dias")
    private Integer dias;

    @Column(name = "horas")
    private Integer horas;

    @ManyToOne
    @JsonIgnoreProperties("posologias")
    private Medicamento medicamento;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDias() {
        return dias;
    }

    public Posologia dias(Integer dias) {
        this.dias = dias;
        return this;
    }

    public void setDias(Integer dias) {
        this.dias = dias;
    }

    public Integer getHoras() {
        return horas;
    }

    public Posologia horas(Integer horas) {
        this.horas = horas;
        return this;
    }

    public void setHoras(Integer horas) {
        this.horas = horas;
    }

    public Medicamento getMedicamento() {
        return medicamento;
    }

    public Posologia medicamento(Medicamento medicamento) {
        this.medicamento = medicamento;
        return this;
    }

    public void setMedicamento(Medicamento medicamento) {
        this.medicamento = medicamento;
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
        Posologia posologia = (Posologia) o;
        if (posologia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), posologia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Posologia{" +
            "id=" + getId() +
            ", dias=" + getDias() +
            ", horas=" + getHoras() +
            "}";
    }
}
