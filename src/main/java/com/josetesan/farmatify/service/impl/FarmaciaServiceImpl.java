package com.josetesan.farmatify.service.impl;

import com.josetesan.farmatify.service.FarmaciaService;
import com.josetesan.farmatify.domain.Farmacia;
import com.josetesan.farmatify.repository.FarmaciaRepository;
import com.josetesan.farmatify.repository.search.FarmaciaSearchRepository;
import com.josetesan.farmatify.service.dto.FarmaciaDTO;
import com.josetesan.farmatify.service.mapper.FarmaciaMapper;
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
 * Service Implementation for managing Farmacia.
 */
@Service
@Transactional
public class FarmaciaServiceImpl implements FarmaciaService {

    private final Logger log = LoggerFactory.getLogger(FarmaciaServiceImpl.class);

    private final FarmaciaRepository farmaciaRepository;

    private final FarmaciaMapper farmaciaMapper;

    private final FarmaciaSearchRepository farmaciaSearchRepository;

    public FarmaciaServiceImpl(FarmaciaRepository farmaciaRepository, FarmaciaMapper farmaciaMapper, FarmaciaSearchRepository farmaciaSearchRepository) {
        this.farmaciaRepository = farmaciaRepository;
        this.farmaciaMapper = farmaciaMapper;
        this.farmaciaSearchRepository = farmaciaSearchRepository;
    }

    /**
     * Save a farmacia.
     *
     * @param farmaciaDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FarmaciaDTO save(FarmaciaDTO farmaciaDTO) {
        log.debug("Request to save Farmacia : {}", farmaciaDTO);
        Farmacia farmacia = farmaciaMapper.toEntity(farmaciaDTO);
        farmacia = farmaciaRepository.save(farmacia);
        FarmaciaDTO result = farmaciaMapper.toDto(farmacia);
        farmaciaSearchRepository.save(farmacia);
        return result;
    }

    /**
     * Get all the farmacias.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FarmaciaDTO> findAll() {
        log.debug("Request to get all Farmacias");
        return farmaciaRepository.findAll().stream()
            .map(farmaciaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one farmacia by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FarmaciaDTO> findOne(Long id) {
        log.debug("Request to get Farmacia : {}", id);
        return farmaciaRepository.findById(id)
            .map(farmaciaMapper::toDto);
    }

    /**
     * Delete the farmacia by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Farmacia : {}", id);
        farmaciaRepository.deleteById(id);
        farmaciaSearchRepository.deleteById(id);
    }

    /**
     * Search for the farmacia corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FarmaciaDTO> search(String query) {
        log.debug("Request to search Farmacias for query {}", query);
        return StreamSupport
            .stream(farmaciaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(farmaciaMapper::toDto)
            .collect(Collectors.toList());
    }
}
