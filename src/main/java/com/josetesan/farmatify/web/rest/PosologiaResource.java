package com.josetesan.farmatify.web.rest;
import com.josetesan.farmatify.service.PosologiaService;
import com.josetesan.farmatify.web.rest.errors.BadRequestAlertException;
import com.josetesan.farmatify.web.rest.util.HeaderUtil;
import com.josetesan.farmatify.service.dto.PosologiaDTO;
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
 * REST controller for managing Posologia.
 */
@RestController
@RequestMapping("/api")
public class PosologiaResource {

    private final Logger log = LoggerFactory.getLogger(PosologiaResource.class);

    private static final String ENTITY_NAME = "posologia";

    private final PosologiaService posologiaService;

    public PosologiaResource(PosologiaService posologiaService) {
        this.posologiaService = posologiaService;
    }

    /**
     * POST  /posologias : Create a new posologia.
     *
     * @param posologiaDTO the posologiaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new posologiaDTO, or with status 400 (Bad Request) if the posologia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/posologias")
    public ResponseEntity<PosologiaDTO> createPosologia(@RequestBody PosologiaDTO posologiaDTO) throws URISyntaxException {
        log.debug("REST request to save Posologia : {}", posologiaDTO);
        if (posologiaDTO.getId() != null) {
            throw new BadRequestAlertException("A new posologia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PosologiaDTO result = posologiaService.save(posologiaDTO);
        return ResponseEntity.created(new URI("/api/posologias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /posologias : Updates an existing posologia.
     *
     * @param posologiaDTO the posologiaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated posologiaDTO,
     * or with status 400 (Bad Request) if the posologiaDTO is not valid,
     * or with status 500 (Internal Server Error) if the posologiaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/posologias")
    public ResponseEntity<PosologiaDTO> updatePosologia(@RequestBody PosologiaDTO posologiaDTO) throws URISyntaxException {
        log.debug("REST request to update Posologia : {}", posologiaDTO);
        if (posologiaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PosologiaDTO result = posologiaService.save(posologiaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, posologiaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /posologias : get all the posologias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of posologias in body
     */
    @GetMapping("/posologias")
    public List<PosologiaDTO> getAllPosologias() {
        log.debug("REST request to get all Posologias");
        return posologiaService.findAll();
    }

    /**
     * GET  /posologias/:id : get the "id" posologia.
     *
     * @param id the id of the posologiaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the posologiaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/posologias/{id}")
    public ResponseEntity<PosologiaDTO> getPosologia(@PathVariable Long id) {
        log.debug("REST request to get Posologia : {}", id);
        Optional<PosologiaDTO> posologiaDTO = posologiaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(posologiaDTO);
    }

    /**
     * DELETE  /posologias/:id : delete the "id" posologia.
     *
     * @param id the id of the posologiaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/posologias/{id}")
    public ResponseEntity<Void> deletePosologia(@PathVariable Long id) {
        log.debug("REST request to delete Posologia : {}", id);
        posologiaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/posologias?query=:query : search for the posologia corresponding
     * to the query.
     *
     * @param query the query of the posologia search
     * @return the result of the search
     */
    @GetMapping("/_search/posologias")
    public List<PosologiaDTO> searchPosologias(@RequestParam String query) {
        log.debug("REST request to search Posologias for query {}", query);
        return posologiaService.search(query);
    }

}
