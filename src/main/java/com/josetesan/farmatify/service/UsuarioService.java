package com.josetesan.farmatify.service;

import com.josetesan.farmatify.service.dto.UsuarioDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Usuario.
 */
public interface UsuarioService {

    /**
     * Save a usuario.
     *
     * @param usuarioDTO the entity to save
     * @return the persisted entity
     */
    UsuarioDTO save(UsuarioDTO usuarioDTO);

    /**
     * Get all the usuarios.
     *
     * @return the list of entities
     */
    List<UsuarioDTO> findAll();


    /**
     * Get the "id" usuario.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<UsuarioDTO> findOne(Long id);

    /**
     * Delete the "id" usuario.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the usuario corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<UsuarioDTO> search(String query);
}
