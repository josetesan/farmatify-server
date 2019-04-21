package com.josetesan.farmatify.service.mapper;

import com.josetesan.farmatify.domain.*;
import com.josetesan.farmatify.service.dto.PosologiaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Posologia and its DTO PosologiaDTO.
 */
@Mapper(componentModel = "spring", uses = {MedicamentoMapper.class})
public interface PosologiaMapper extends EntityMapper<PosologiaDTO, Posologia> {

    @Mapping(source = "medicamento.id", target = "medicamentoId")
    PosologiaDTO toDto(Posologia posologia);

    @Mapping(source = "medicamentoId", target = "medicamento")
    Posologia toEntity(PosologiaDTO posologiaDTO);

    default Posologia fromId(Long id) {
        if (id == null) {
            return null;
        }
        Posologia posologia = new Posologia();
        posologia.setId(id);
        return posologia;
    }
}
