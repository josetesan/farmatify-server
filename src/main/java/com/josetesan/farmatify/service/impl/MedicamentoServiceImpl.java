package com.josetesan.farmatify.service.impl;

import com.josetesan.farmatify.service.MedicamentoService;
import com.josetesan.farmatify.domain.Medicamento;
import com.josetesan.farmatify.repository.MedicamentoRepository;
import com.josetesan.farmatify.repository.search.MedicamentoSearchRepository;
import com.josetesan.farmatify.service.dto.MedicamentoDTO;
import com.josetesan.farmatify.service.mapper.MedicamentoMapper;
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
 * Service Implementation for managing Medicamento.
 */
@Service
@Transactional
public class MedicamentoServiceImpl implements MedicamentoService {

    private final Logger log = LoggerFactory.getLogger(MedicamentoServiceImpl.class);

    private final MedicamentoRepository medicamentoRepository;

    private final MedicamentoMapper medicamentoMapper;

    private final MedicamentoSearchRepository medicamentoSearchRepository;

    public MedicamentoServiceImpl(MedicamentoRepository medicamentoRepository, MedicamentoMapper medicamentoMapper, MedicamentoSearchRepository medicamentoSearchRepository) {
        this.medicamentoRepository = medicamentoRepository;
        this.medicamentoMapper = medicamentoMapper;
        this.medicamentoSearchRepository = medicamentoSearchRepository;
    }

    /**
     * Save a medicamento.
     *
     * @param medicamentoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MedicamentoDTO save(MedicamentoDTO medicamentoDTO) {
        log.debug("Request to save Medicamento : {}", medicamentoDTO);
        Medicamento medicamento = medicamentoMapper.toEntity(medicamentoDTO);
        medicamento = medicamentoRepository.save(medicamento);
        MedicamentoDTO result = medicamentoMapper.toDto(medicamento);
        medicamentoSearchRepository.save(medicamento);
        return result;
    }

    /**
     * Get all the medicamentos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MedicamentoDTO> findAll() {
        log.debug("Request to get all Medicamentos");
        return medicamentoRepository.findAll().stream()
            .map(medicamentoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one medicamento by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MedicamentoDTO> findOne(Long id) {
        log.debug("Request to get Medicamento : {}", id);
        return medicamentoRepository.findById(id)
            .map(medicamentoMapper::toDto);
    }

    /**
     * Delete the medicamento by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Medicamento : {}", id);
        medicamentoRepository.deleteById(id);
        medicamentoSearchRepository.deleteById(id);
    }

    /**
     * Search for the medicamento corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MedicamentoDTO> search(String query) {
        log.debug("Request to search Medicamentos for query {}", query);
        return StreamSupport
            .stream(medicamentoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(medicamentoMapper::toDto)
            .collect(Collectors.toList());
    }
}
