package com.josetesan.farmatify.service.impl;

import com.josetesan.farmatify.service.UsuarioService;
import com.josetesan.farmatify.domain.Usuario;
import com.josetesan.farmatify.repository.UsuarioRepository;
import com.josetesan.farmatify.repository.search.UsuarioSearchRepository;
import com.josetesan.farmatify.service.dto.UsuarioDTO;
import com.josetesan.farmatify.service.mapper.UsuarioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Usuario.
 */
@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService {

    private final Logger log = LoggerFactory.getLogger(UsuarioServiceImpl.class);

    private final UsuarioRepository usuarioRepository;

    private final UsuarioMapper usuarioMapper;

    private final UsuarioSearchRepository usuarioSearchRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper, UsuarioSearchRepository usuarioSearchRepository) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
        this.usuarioSearchRepository = usuarioSearchRepository;
    }

    /**
     * Save a usuario.
     *
     * @param usuarioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UsuarioDTO save(UsuarioDTO usuarioDTO) {
        log.debug("Request to save Usuario : {}", usuarioDTO);
        Usuario usuario = usuarioMapper.toEntity(usuarioDTO);
        usuario = usuarioRepository.save(usuario);
        UsuarioDTO result = usuarioMapper.toDto(usuario);
        usuarioSearchRepository.save(usuario);
        return result;
    }

    /**
     * Get all the usuarios.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UsuarioDTO> findAll() {
        log.debug("Request to get all Usuarios");
        return usuarioRepository.findAll().stream()
            .map(usuarioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one usuario by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UsuarioDTO> findOne(Long id) {
        log.debug("Request to get Usuario : {}", id);
        return usuarioRepository.findById(id)
            .map(usuarioMapper::toDto);
    }

    /**
     * Delete the usuario by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Usuario : {}", id);
        usuarioRepository.deleteById(id);
        usuarioSearchRepository.deleteById(id);
    }

    /**
     * Search for the usuario corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UsuarioDTO> search(String query) {
        log.debug("Request to search Usuarios for query {}", query);
        return StreamSupport
            .stream(usuarioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(usuarioMapper::toDto)
            .collect(Collectors.toList());
    }
}
