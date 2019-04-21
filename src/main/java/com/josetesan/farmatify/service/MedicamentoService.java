package com.josetesan.farmatify.service;

import com.josetesan.farmatify.service.dto.MedicamentoDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Medicamento.
 */
public interface MedicamentoService {

    /**
     * Save a medicamento.
     *
     * @param medicamentoDTO the entity to save
     * @return the persisted entity
     */
    MedicamentoDTO save(MedicamentoDTO medicamentoDTO);

    /**
     * Get all the medicamentos.
     *
     * @return the list of entities
     */
    List<MedicamentoDTO> findAll();


    /**
     * Get the "id" medicamento.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MedicamentoDTO> findOne(Long id);

    /**
     * Delete the "id" medicamento.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the medicamento corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<MedicamentoDTO> search(String query);
}
