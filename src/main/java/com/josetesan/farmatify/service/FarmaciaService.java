package com.josetesan.farmatify.service;

import com.josetesan.farmatify.service.dto.FarmaciaDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Farmacia.
 */
public interface FarmaciaService {

    /**
     * Save a farmacia.
     *
     * @param farmaciaDTO the entity to save
     * @return the persisted entity
     */
    FarmaciaDTO save(FarmaciaDTO farmaciaDTO);

    /**
     * Get all the farmacias.
     *
     * @return the list of entities
     */
    List<FarmaciaDTO> findAll();


    /**
     * Get the "id" farmacia.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FarmaciaDTO> findOne(Long id);

    /**
     * Delete the "id" farmacia.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the farmacia corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<FarmaciaDTO> search(String query);
}
