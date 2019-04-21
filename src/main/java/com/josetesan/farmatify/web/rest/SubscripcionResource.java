package com.josetesan.farmatify.web.rest;
import com.josetesan.farmatify.service.SubscripcionService;
import com.josetesan.farmatify.web.rest.errors.BadRequestAlertException;
import com.josetesan.farmatify.web.rest.util.HeaderUtil;
import com.josetesan.farmatify.service.dto.SubscripcionDTO;
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
 * REST controller for managing Subscripcion.
 */
@RestController
@RequestMapping("/api")
public class SubscripcionResource {

    private final Logger log = LoggerFactory.getLogger(SubscripcionResource.class);

    private static final String ENTITY_NAME = "subscripcion";

    private final SubscripcionService subscripcionService;

    public SubscripcionResource(SubscripcionService subscripcionService) {
        this.subscripcionService = subscripcionService;
    }

    /**
     * POST  /subscripcions : Create a new subscripcion.
     *
     * @param subscripcionDTO the subscripcionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subscripcionDTO, or with status 400 (Bad Request) if the subscripcion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/subscripcions")
    public ResponseEntity<SubscripcionDTO> createSubscripcion(@RequestBody SubscripcionDTO subscripcionDTO) throws URISyntaxException {
        log.debug("REST request to save Subscripcion : {}", subscripcionDTO);
        if (subscripcionDTO.getId() != null) {
            throw new BadRequestAlertException("A new subscripcion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubscripcionDTO result = subscripcionService.save(subscripcionDTO);
        return ResponseEntity.created(new URI("/api/subscripcions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /subscripcions : Updates an existing subscripcion.
     *
     * @param subscripcionDTO the subscripcionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subscripcionDTO,
     * or with status 400 (Bad Request) if the subscripcionDTO is not valid,
     * or with status 500 (Internal Server Error) if the subscripcionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/subscripcions")
    public ResponseEntity<SubscripcionDTO> updateSubscripcion(@RequestBody SubscripcionDTO subscripcionDTO) throws URISyntaxException {
        log.debug("REST request to update Subscripcion : {}", subscripcionDTO);
        if (subscripcionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubscripcionDTO result = subscripcionService.save(subscripcionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subscripcionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /subscripcions : get all the subscripcions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of subscripcions in body
     */
    @GetMapping("/subscripcions")
    public List<SubscripcionDTO> getAllSubscripcions() {
        log.debug("REST request to get all Subscripcions");
        return subscripcionService.findAll();
    }

    /**
     * GET  /subscripcions/:id : get the "id" subscripcion.
     *
     * @param id the id of the subscripcionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subscripcionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/subscripcions/{id}")
    public ResponseEntity<SubscripcionDTO> getSubscripcion(@PathVariable Long id) {
        log.debug("REST request to get Subscripcion : {}", id);
        Optional<SubscripcionDTO> subscripcionDTO = subscripcionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subscripcionDTO);
    }

    /**
     * DELETE  /subscripcions/:id : delete the "id" subscripcion.
     *
     * @param id the id of the subscripcionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/subscripcions/{id}")
    public ResponseEntity<Void> deleteSubscripcion(@PathVariable Long id) {
        log.debug("REST request to delete Subscripcion : {}", id);
        subscripcionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/subscripcions?query=:query : search for the subscripcion corresponding
     * to the query.
     *
     * @param query the query of the subscripcion search
     * @return the result of the search
     */
    @GetMapping("/_search/subscripcions")
    public List<SubscripcionDTO> searchSubscripcions(@RequestParam String query) {
        log.debug("REST request to search Subscripcions for query {}", query);
        return subscripcionService.search(query);
    }

}
