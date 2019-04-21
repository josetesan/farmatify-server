package com.josetesan.farmatify.service.mapper;

import com.josetesan.farmatify.domain.*;
import com.josetesan.farmatify.service.dto.MedicamentoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Medicamento and its DTO MedicamentoDTO.
 */
@Mapper(componentModel = "spring", uses = {SubscripcionMapper.class})
public interface MedicamentoMapper extends EntityMapper<MedicamentoDTO, Medicamento> {

    @Mapping(source = "subscripcion.id", target = "subscripcionId")
    MedicamentoDTO toDto(Medicamento medicamento);

    @Mapping(target = "idPosologias", ignore = true)
    @Mapping(source = "subscripcionId", target = "subscripcion")
    Medicamento toEntity(MedicamentoDTO medicamentoDTO);

    default Medicamento fromId(Long id) {
        if (id == null) {
            return null;
        }
        Medicamento medicamento = new Medicamento();
        medicamento.setId(id);
        return medicamento;
    }
}
