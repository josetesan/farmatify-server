package com.josetesan.farmatify.web.rest;
import com.josetesan.farmatify.service.FarmaciaService;
import com.josetesan.farmatify.web.rest.errors.BadRequestAlertException;
import com.josetesan.farmatify.web.rest.util.HeaderUtil;
import com.josetesan.farmatify.service.dto.FarmaciaDTO;
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
 * REST controller for managing Farmacia.
 */
@RestController
@RequestMapping("/api")
public class FarmaciaResource {

    private final Logger log = LoggerFactory.getLogger(FarmaciaResource.class);

    private static final String ENTITY_NAME = "farmacia";

    private final FarmaciaService farmaciaService;

    public FarmaciaResource(FarmaciaService farmaciaService) {
        this.farmaciaService = farmaciaService;
    }

    /**
     * POST  /farmacias : Create a new farmacia.
     *
     * @param farmaciaDTO the farmaciaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new farmaciaDTO, or with status 400 (Bad Request) if the farmacia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/farmacias")
    public ResponseEntity<FarmaciaDTO> createFarmacia(@RequestBody FarmaciaDTO farmaciaDTO) throws URISyntaxException {
        log.debug("REST request to save Farmacia : {}", farmaciaDTO);
        if (farmaciaDTO.getId() != null) {
            throw new BadRequestAlertException("A new farmacia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FarmaciaDTO result = farmaciaService.save(farmaciaDTO);
        return ResponseEntity.created(new URI("/api/farmacias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /farmacias : Updates an existing farmacia.
     *
     * @param farmaciaDTO the farmaciaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated farmaciaDTO,
     * or with status 400 (Bad Request) if the farmaciaDTO is not valid,
     * or with status 500 (Internal Server Error) if the farmaciaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/farmacias")
    public ResponseEntity<FarmaciaDTO> updateFarmacia(@RequestBody FarmaciaDTO farmaciaDTO) throws URISyntaxException {
        log.debug("REST request to update Farmacia : {}", farmaciaDTO);
        if (farmaciaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FarmaciaDTO result = farmaciaService.save(farmaciaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, farmaciaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /farmacias : get all the farmacias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of farmacias in body
     */
    @GetMapping("/farmacias")
    public List<FarmaciaDTO> getAllFarmacias() {
        log.debug("REST request to get all Farmacias");
        return farmaciaService.findAll();
    }

    /**
     * GET  /farmacias/:id : get the "id" farmacia.
     *
     * @param id the id of the farmaciaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the farmaciaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/farmacias/{id}")
    public ResponseEntity<FarmaciaDTO> getFarmacia(@PathVariable Long id) {
        log.debug("REST request to get Farmacia : {}", id);
        Optional<FarmaciaDTO> farmaciaDTO = farmaciaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(farmaciaDTO);
    }

    /**
     * DELETE  /farmacias/:id : delete the "id" farmacia.
     *
     * @param id the id of the farmaciaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/farmacias/{id}")
    public ResponseEntity<Void> deleteFarmacia(@PathVariable Long id) {
        log.debug("REST request to delete Farmacia : {}", id);
        farmaciaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/farmacias?query=:query : search for the farmacia corresponding
     * to the query.
     *
     * @param query the query of the farmacia search
     * @return the result of the search
     */
    @GetMapping("/_search/farmacias")
    public List<FarmaciaDTO> searchFarmacias(@RequestParam String query) {
        log.debug("REST request to search Farmacias for query {}", query);
        return farmaciaService.search(query);
    }

}
