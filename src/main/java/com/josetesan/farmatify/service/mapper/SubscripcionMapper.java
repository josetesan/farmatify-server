package com.josetesan.farmatify.service.mapper;

import com.josetesan.farmatify.domain.*;
import com.josetesan.farmatify.service.dto.SubscripcionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Subscripcion and its DTO SubscripcionDTO.
 */
@Mapper(componentModel = "spring", uses = {FarmaciaMapper.class, ClienteMapper.class, MedicamentoMapper.class})
public interface SubscripcionMapper extends EntityMapper<SubscripcionDTO, Subscripcion> {

    @Mapping(source = "farmacia.id", target = "farmaciaId")
    @Mapping(source = "cliente.id", target = "clienteId")
    @Mapping(source = "idMedicamento.id", target = "idMedicamentoId")
    @Mapping(source = "idFarmacia.id", target = "idFarmaciaId")
    @Mapping(source = "idCliente.id", target = "idClienteId")
    SubscripcionDTO toDto(Subscripcion subscripcion);

    @Mapping(source = "farmaciaId", target = "farmacia")
    @Mapping(source = "clienteId", target = "cliente")
    @Mapping(source = "idMedicamentoId", target = "idMedicamento")
    @Mapping(source = "idFarmaciaId", target = "idFarmacia")
    @Mapping(source = "idClienteId", target = "idCliente")
    @Mapping(target = "idMedicamentos", ignore = true)
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
