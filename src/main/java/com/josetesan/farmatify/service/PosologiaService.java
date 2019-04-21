package com.josetesan.farmatify.service;

import com.josetesan.farmatify.service.dto.PosologiaDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Posologia.
 */
public interface PosologiaService {

    /**
     * Save a posologia.
     *
     * @param posologiaDTO the entity to save
     * @return the persisted entity
     */
    PosologiaDTO save(PosologiaDTO posologiaDTO);

    /**
     * Get all the posologias.
     *
     * @return the list of entities
     */
    List<PosologiaDTO> findAll();


    /**
     * Get the "id" posologia.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PosologiaDTO> findOne(Long id);

    /**
     * Delete the "id" posologia.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the posologia corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<PosologiaDTO> search(String query);
}
