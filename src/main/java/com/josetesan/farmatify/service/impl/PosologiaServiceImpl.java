package com.josetesan.farmatify.service.impl;

import com.josetesan.farmatify.service.PosologiaService;
import com.josetesan.farmatify.domain.Posologia;
import com.josetesan.farmatify.repository.PosologiaRepository;
import com.josetesan.farmatify.repository.search.PosologiaSearchRepository;
import com.josetesan.farmatify.service.dto.PosologiaDTO;
import com.josetesan.farmatify.service.mapper.PosologiaMapper;
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
 * Service Implementation for managing Posologia.
 */
@Service
@Transactional
public class PosologiaServiceImpl implements PosologiaService {

    private final Logger log = LoggerFactory.getLogger(PosologiaServiceImpl.class);

    private final PosologiaRepository posologiaRepository;

    private final PosologiaMapper posologiaMapper;

    private final PosologiaSearchRepository posologiaSearchRepository;

    public PosologiaServiceImpl(PosologiaRepository posologiaRepository, PosologiaMapper posologiaMapper, PosologiaSearchRepository posologiaSearchRepository) {
        this.posologiaRepository = posologiaRepository;
        this.posologiaMapper = posologiaMapper;
        this.posologiaSearchRepository = posologiaSearchRepository;
    }

    /**
     * Save a posologia.
     *
     * @param posologiaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PosologiaDTO save(PosologiaDTO posologiaDTO) {
        log.debug("Request to save Posologia : {}", posologiaDTO);
        Posologia posologia = posologiaMapper.toEntity(posologiaDTO);
        posologia = posologiaRepository.save(posologia);
        PosologiaDTO result = posologiaMapper.toDto(posologia);
        posologiaSearchRepository.save(posologia);
        return result;
    }

    /**
     * Get all the posologias.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PosologiaDTO> findAll() {
        log.debug("Request to get all Posologias");
        return posologiaRepository.findAll().stream()
            .map(posologiaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one posologia by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PosologiaDTO> findOne(Long id) {
        log.debug("Request to get Posologia : {}", id);
        return posologiaRepository.findById(id)
            .map(posologiaMapper::toDto);
    }

    /**
     * Delete the posologia by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Posologia : {}", id);
        posologiaRepository.deleteById(id);
        posologiaSearchRepository.deleteById(id);
    }

    /**
     * Search for the posologia corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PosologiaDTO> search(String query) {
        log.debug("Request to search Posologias for query {}", query);
        return StreamSupport
            .stream(posologiaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(posologiaMapper::toDto)
            .collect(Collectors.toList());
    }
}
