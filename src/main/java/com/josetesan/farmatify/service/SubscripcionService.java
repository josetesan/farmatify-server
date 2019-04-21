package com.josetesan.farmatify.service;

import com.josetesan.farmatify.service.dto.SubscripcionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Subscripcion.
 */
public interface SubscripcionService {

    /**
     * Save a subscripcion.
     *
     * @param subscripcionDTO the entity to save
     * @return the persisted entity
     */
    SubscripcionDTO save(SubscripcionDTO subscripcionDTO);

    /**
     * Get all the subscripcions.
     *
     * @return the list of entities
     */
    List<SubscripcionDTO> findAll();


    /**
     * Get the "id" subscripcion.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SubscripcionDTO> findOne(Long id);

    /**
     * Delete the "id" subscripcion.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the subscripcion corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<SubscripcionDTO> search(String query);
}
