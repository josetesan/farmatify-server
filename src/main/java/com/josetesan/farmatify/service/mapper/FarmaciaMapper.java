package com.josetesan.farmatify.service.mapper;

import com.josetesan.farmatify.domain.*;
import com.josetesan.farmatify.service.dto.FarmaciaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Farmacia and its DTO FarmaciaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FarmaciaMapper extends EntityMapper<FarmaciaDTO, Farmacia> {


    @Mapping(target = "farmacias", ignore = true)
    Farmacia toEntity(FarmaciaDTO farmaciaDTO);

    default Farmacia fromId(Long id) {
        if (id == null) {
            return null;
        }
        Farmacia farmacia = new Farmacia();
        farmacia.setId(id);
        return farmacia;
    }
}
