package com.josetesan.farmatify.service.impl;

import com.josetesan.farmatify.service.SubscripcionService;
import com.josetesan.farmatify.domain.Subscripcion;
import com.josetesan.farmatify.repository.SubscripcionRepository;
import com.josetesan.farmatify.repository.search.SubscripcionSearchRepository;
import com.josetesan.farmatify.service.dto.SubscripcionDTO;
import com.josetesan.farmatify.service.mapper.SubscripcionMapper;
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
 * Service Implementation for managing Subscripcion.
 */
@Service
@Transactional
public class SubscripcionServiceImpl implements SubscripcionService {

    private final Logger log = LoggerFactory.getLogger(SubscripcionServiceImpl.class);

    private final SubscripcionRepository subscripcionRepository;

    private final SubscripcionMapper subscripcionMapper;

    private final SubscripcionSearchRepository subscripcionSearchRepository;

    public SubscripcionServiceImpl(SubscripcionRepository subscripcionRepository, SubscripcionMapper subscripcionMapper, SubscripcionSearchRepository subscripcionSearchRepository) {
        this.subscripcionRepository = subscripcionRepository;
        this.subscripcionMapper = subscripcionMapper;
        this.subscripcionSearchRepository = subscripcionSearchRepository;
    }

    /**
     * Save a subscripcion.
     *
     * @param subscripcionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SubscripcionDTO save(SubscripcionDTO subscripcionDTO) {
        log.debug("Request to save Subscripcion : {}", subscripcionDTO);
        Subscripcion subscripcion = subscripcionMapper.toEntity(subscripcionDTO);
        subscripcion = subscripcionRepository.save(subscripcion);
        SubscripcionDTO result = subscripcionMapper.toDto(subscripcion);
        subscripcionSearchRepository.save(subscripcion);
        return result;
    }

    /**
     * Get all the subscripcions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SubscripcionDTO> findAll() {
        log.debug("Request to get all Subscripcions");
        return subscripcionRepository.findAll().stream()
            .map(subscripcionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one subscripcion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SubscripcionDTO> findOne(Long id) {
        log.debug("Request to get Subscripcion : {}", id);
        return subscripcionRepository.findById(id)
            .map(subscripcionMapper::toDto);
    }

    /**
     * Delete the subscripcion by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Subscripcion : {}", id);
        subscripcionRepository.deleteById(id);
        subscripcionSearchRepository.deleteById(id);
    }

    /**
     * Search for the subscripcion corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SubscripcionDTO> search(String query) {
        log.debug("Request to search Subscripcions for query {}", query);
        return StreamSupport
            .stream(subscripcionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(subscripcionMapper::toDto)
            .collect(Collectors.toList());
    }
}
