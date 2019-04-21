package com.josetesan.farmatify.web.rest;
import com.josetesan.farmatify.service.MedicamentoService;
import com.josetesan.farmatify.web.rest.errors.BadRequestAlertException;
import com.josetesan.farmatify.web.rest.util.HeaderUtil;
import com.josetesan.farmatify.service.dto.MedicamentoDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Medicamento.
 */
@RestController
@RequestMapping("/api")
public class MedicamentoResource {

    private final Logger log = LoggerFactory.getLogger(MedicamentoResource.class);

    private static final String ENTITY_NAME = "medicamento";

    private final MedicamentoService medicamentoService;

    public MedicamentoResource(MedicamentoService medicamentoService) {
        this.medicamentoService = medicamentoService;
    }

    /**
     * POST  /medicamentos : Create a new medicamento.
     *
     * @param medicamentoDTO the medicamentoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medicamentoDTO, or with status 400 (Bad Request) if the medicamento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/medicamentos")
    public ResponseEntity<MedicamentoDTO> createMedicamento(@RequestBody MedicamentoDTO medicamentoDTO) throws URISyntaxException {
        log.debug("REST request to save Medicamento : {}", medicamentoDTO);
        if (medicamentoDTO.getId() != null) {
            throw new BadRequestAlertException("A new medicamento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedicamentoDTO result = medicamentoService.save(medicamentoDTO);
        return ResponseEntity.created(new URI("/api/medicamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /medicamentos : Updates an existing medicamento.
     *
     * @param medicamentoDTO the medicamentoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medicamentoDTO,
     * or with status 400 (Bad Request) if the medicamentoDTO is not valid,
     * or with status 500 (Internal Server Error) if the medicamentoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/medicamentos")
    public ResponseEntity<MedicamentoDTO> updateMedicamento(@RequestBody MedicamentoDTO medicamentoDTO) throws URISyntaxException {
        log.debug("REST request to update Medicamento : {}", medicamentoDTO);
        if (medicamentoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedicamentoDTO result = medicamentoService.save(medicamentoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medicamentoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /medicamentos : get all the medicamentos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of medicamentos in body
     */
    @GetMapping("/medicamentos")
    public List<MedicamentoDTO> getAllMedicamentos() {
        log.debug("REST request to get all Medicamentos");
        return medicamentoService.findAll();
    }

    /**
     * GET  /medicamentos/:id : get the "id" medicamento.
     *
     * @param id the id of the medicamentoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medicamentoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/medicamentos/{id}")
    public ResponseEntity<MedicamentoDTO> getMedicamento(@PathVariable Long id) {
        log.debug("REST request to get Medicamento : {}", id);
        Optional<MedicamentoDTO> medicamentoDTO = medicamentoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(medicamentoDTO);
    }

    /**
     * DELETE  /medicamentos/:id : delete the "id" medicamento.
     *
     * @param id the id of the medicamentoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/medicamentos/{id}")
    public ResponseEntity<Void> deleteMedicamento(@PathVariable Long id) {
        log.debug("REST request to delete Medicamento : {}", id);
        medicamentoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/medicamentos?query=:query : search for the medicamento corresponding
     * to the query.
     *
     * @param query the query of the medicamento search
     * @return the result of the search
     */
    @GetMapping("/_search/medicamentos")
    public List<MedicamentoDTO> searchMedicamentos(@RequestParam String query) {
        log.debug("REST request to search Medicamentos for query {}", query);
        return medicamentoService.search(query);
    }

}
