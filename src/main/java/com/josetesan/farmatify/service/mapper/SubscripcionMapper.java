package com.josetesan.farmatify.service.mapper;

import com.josetesan.farmatify.domain.*;
import com.josetesan.farmatify.service.dto.SubscripcionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Subscripcion and its DTO SubscripcionDTO.
 */
@Mapper(componentModel = "spring", uses = {FarmaciaMapper.class, UsuarioMapper.class, MedicamentoMapper.class})
public interface SubscripcionMapper extends EntityMapper<SubscripcionDTO, Subscripcion> {

    @Mapping(source = "farmacia.id", target = "farmaciaId")
    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "medicamento.id", target = "medicamentoId")
    SubscripcionDTO toDto(Subscripcion subscripcion);

    @Mapping(source = "farmaciaId", target = "farmacia")
    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(source = "medicamentoId", target = "medicamento")
    Subscripcion toEntity(SubscripcionDTO subscripcionDTO);

    default Subscripcion fromId(Long id) {
        if (id == null) {
            return null;
        }
        Subscripcion subscripcion = new Subscripcion();
        subscripcion.setId(id);
        return subscripcion;
    }
}
