package com.josetesan.farmatify.web.rest;

import com.josetesan.farmatify.FarmatifyApp;

import com.josetesan.farmatify.domain.Farmacia;
import com.josetesan.farmatify.repository.FarmaciaRepository;
import com.josetesan.farmatify.repository.search.FarmaciaSearchRepository;
import com.josetesan.farmatify.service.FarmaciaService;
import com.josetesan.farmatify.service.dto.FarmaciaDTO;
import com.josetesan.farmatify.service.mapper.FarmaciaMapper;
import com.josetesan.farmatify.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static com.josetesan.farmatify.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FarmaciaResource REST controller.
 *
 * @see FarmaciaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FarmatifyApp.class)
public class FarmaciaResourceIntTest {

    private static final String DEFAULT_CALLE = "AAAAAAAAAA";
    private static final String UPDATED_CALLE = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO_POSTAL = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_POSTAL = "BBBBBBBBBB";

    private static final String DEFAULT_CIUDAD = "AAAAAAAAAA";
    private static final String UPDATED_CIUDAD = "BBBBBBBBBB";

    private static final String DEFAULT_PROVINCIA = "AAAAAAAAAA";
    private static final String UPDATED_PROVINCIA = "BBBBBBBBBB";

    private static final String DEFAULT_TITULAR = "AAAAAAAAAA";
    private static final String UPDATED_TITULAR = "BBBBBBBBBB";

    @Autowired
    private FarmaciaRepository farmaciaRepository;

    @Autowired
    private FarmaciaMapper farmaciaMapper;

    @Autowired
    private FarmaciaService farmaciaService;

    /**
     * This repository is mocked in the com.josetesan.farmatify.repository.search test package.
     *
     * @see com.josetesan.farmatify.repository.search.FarmaciaSearchRepositoryMockConfiguration
     */
    @Autowired
    private FarmaciaSearchRepository mockFarmaciaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restFarmaciaMockMvc;

    private Farmacia farmacia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FarmaciaResource farmaciaResource = new FarmaciaResource(farmaciaService);
        this.restFarmaciaMockMvc = MockMvcBuilders.standaloneSetup(farmaciaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Farmacia createEntity(EntityManager em) {
        Farmacia farmacia = new Farmacia()
            .calle(DEFAULT_CALLE)
            .codigoPostal(DEFAULT_CODIGO_POSTAL)
            .ciudad(DEFAULT_CIUDAD)
            .provincia(DEFAULT_PROVINCIA)
            .titular(DEFAULT_TITULAR);
        return farmacia;
    }

    @Before
    public void initTest() {
        farmacia = createEntity(em);
    }

    @Test
    @Transactional
    public void createFarmacia() throws Exception {
        int databaseSizeBeforeCreate = farmaciaRepository.findAll().size();

        // Create the Farmacia
        FarmaciaDTO farmaciaDTO = farmaciaMapper.toDto(farmacia);
        restFarmaciaMockMvc.perform(post("/api/farmacias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(farmaciaDTO)))
            .andExpect(status().isCreated());

        // Validate the Farmacia in the database
        List<Farmacia> farmaciaList = farmaciaRepository.findAll();
        assertThat(farmaciaList).hasSize(databaseSizeBeforeCreate + 1);
        Farmacia testFarmacia = farmaciaList.get(farmaciaList.size() - 1);
        assertThat(testFarmacia.getCalle()).isEqualTo(DEFAULT_CALLE);
        assertThat(testFarmacia.getCodigoPostal()).isEqualTo(DEFAULT_CODIGO_POSTAL);
        assertThat(testFarmacia.getCiudad()).isEqualTo(DEFAULT_CIUDAD);
        assertThat(testFarmacia.getProvincia()).isEqualTo(DEFAULT_PROVINCIA);
        assertThat(testFarmacia.getTitular()).isEqualTo(DEFAULT_TITULAR);

        // Validate the Farmacia in Elasticsearch
        verify(mockFarmaciaSearchRepository, times(1)).save(testFarmacia);
    }

    @Test
    @Transactional
    public void createFarmaciaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = farmaciaRepository.findAll().size();

        // Create the Farmacia with an existing ID
        farmacia.setId(1L);
        FarmaciaDTO farmaciaDTO = farmaciaMapper.toDto(farmacia);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFarmaciaMockMvc.perform(post("/api/farmacias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(farmaciaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Farmacia in the database
        List<Farmacia> farmaciaList = farmaciaRepository.findAll();
        assertThat(farmaciaList).hasSize(databaseSizeBeforeCreate);

        // Validate the Farmacia in Elasticsearch
        verify(mockFarmaciaSearchRepository, times(0)).save(farmacia);
    }

    @Test
    @Transactional
    public void getAllFarmacias() throws Exception {
        // Initialize the database
        farmaciaRepository.saveAndFlush(farmacia);

        // Get all the farmaciaList
        restFarmaciaMockMvc.perform(get("/api/farmacias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(farmacia.getId().intValue())))
            .andExpect(jsonPath("$.[*].calle").value(hasItem(DEFAULT_CALLE.toString())))
            .andExpect(jsonPath("$.[*].codigoPostal").value(hasItem(DEFAULT_CODIGO_POSTAL.toString())))
            .andExpect(jsonPath("$.[*].ciudad").value(hasItem(DEFAULT_CIUDAD.toString())))
            .andExpect(jsonPath("$.[*].provincia").value(hasItem(DEFAULT_PROVINCIA.toString())))
            .andExpect(jsonPath("$.[*].titular").value(hasItem(DEFAULT_TITULAR.toString())));
    }
    
    @Test
    @Transactional
    public void getFarmacia() throws Exception {
        // Initialize the database
        farmaciaRepository.saveAndFlush(farmacia);

        // Get the farmacia
        restFarmaciaMockMvc.perform(get("/api/farmacias/{id}", farmacia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(farmacia.getId().intValue()))
            .andExpect(jsonPath("$.calle").value(DEFAULT_CALLE.toString()))
            .andExpect(jsonPath("$.codigoPostal").value(DEFAULT_CODIGO_POSTAL.toString()))
            .andExpect(jsonPath("$.ciudad").value(DEFAULT_CIUDAD.toString()))
            .andExpect(jsonPath("$.provincia").value(DEFAULT_PROVINCIA.toString()))
            .andExpect(jsonPath("$.titular").value(DEFAULT_TITULAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFarmacia() throws Exception {
        // Get the farmacia
        restFarmaciaMockMvc.perform(get("/api/farmacias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFarmacia() throws Exception {
        // Initialize the database
        farmaciaRepository.saveAndFlush(farmacia);

        int databaseSizeBeforeUpdate = farmaciaRepository.findAll().size();

        // Update the farmacia
        Farmacia updatedFarmacia = farmaciaRepository.findById(farmacia.getId()).get();
        // Disconnect from session so that the updates on updatedFarmacia are not directly saved in db
        em.detach(updatedFarmacia);
        updatedFarmacia
            .calle(UPDATED_CALLE)
            .codigoPostal(UPDATED_CODIGO_POSTAL)
            .ciudad(UPDATED_CIUDAD)
            .provincia(UPDATED_PROVINCIA)
            .titular(UPDATED_TITULAR);
        FarmaciaDTO farmaciaDTO = farmaciaMapper.toDto(updatedFarmacia);

        restFarmaciaMockMvc.perform(put("/api/farmacias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(farmaciaDTO)))
            .andExpect(status().isOk());

        // Validate the Farmacia in the database
        List<Farmacia> farmaciaList = farmaciaRepository.findAll();
        assertThat(farmaciaList).hasSize(databaseSizeBeforeUpdate);
        Farmacia testFarmacia = farmaciaList.get(farmaciaList.size() - 1);
        assertThat(testFarmacia.getCalle()).isEqualTo(UPDATED_CALLE);
        assertThat(testFarmacia.getCodigoPostal()).isEqualTo(UPDATED_CODIGO_POSTAL);
        assertThat(testFarmacia.getCiudad()).isEqualTo(UPDATED_CIUDAD);
        assertThat(testFarmacia.getProvincia()).isEqualTo(UPDATED_PROVINCIA);
        assertThat(testFarmacia.getTitular()).isEqualTo(UPDATED_TITULAR);

        // Validate the Farmacia in Elasticsearch
        verify(mockFarmaciaSearchRepository, times(1)).save(testFarmacia);
    }

    @Test
    @Transactional
    public void updateNonExistingFarmacia() throws Exception {
        int databaseSizeBeforeUpdate = farmaciaRepository.findAll().size();

        // Create the Farmacia
        FarmaciaDTO farmaciaDTO = farmaciaMapper.toDto(farmacia);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFarmaciaMockMvc.perform(put("/api/farmacias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(farmaciaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Farmacia in the database
        List<Farmacia> farmaciaList = farmaciaRepository.findAll();
        assertThat(farmaciaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Farmacia in Elasticsearch
        verify(mockFarmaciaSearchRepository, times(0)).save(farmacia);
    }

    @Test
    @Transactional
    public void deleteFarmacia() throws Exception {
        // Initialize the database
        farmaciaRepository.saveAndFlush(farmacia);

        int databaseSizeBeforeDelete = farmaciaRepository.findAll().size();

        // Delete the farmacia
        restFarmaciaMockMvc.perform(delete("/api/farmacias/{id}", farmacia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Farmacia> farmaciaList = farmaciaRepository.findAll();
        assertThat(farmaciaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Farmacia in Elasticsearch
        verify(mockFarmaciaSearchRepository, times(1)).deleteById(farmacia.getId());
    }

    @Test
    @Transactional
    public void searchFarmacia() throws Exception {
        // Initialize the database
        farmaciaRepository.saveAndFlush(farmacia);
        when(mockFarmaciaSearchRepository.search(queryStringQuery("id:" + farmacia.getId())))
            .thenReturn(Collections.singletonList(farmacia));
        // Search the farmacia
        restFarmaciaMockMvc.perform(get("/api/_search/farmacias?query=id:" + farmacia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(farmacia.getId().intValue())))
            .andExpect(jsonPath("$.[*].calle").value(hasItem(DEFAULT_CALLE)))
            .andExpect(jsonPath("$.[*].codigoPostal").value(hasItem(DEFAULT_CODIGO_POSTAL)))
            .andExpect(jsonPath("$.[*].ciudad").value(hasItem(DEFAULT_CIUDAD)))
            .andExpect(jsonPath("$.[*].provincia").value(hasItem(DEFAULT_PROVINCIA)))
            .andExpect(jsonPath("$.[*].titular").value(hasItem(DEFAULT_TITULAR)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Farmacia.class);
        Farmacia farmacia1 = new Farmacia();
        farmacia1.setId(1L);
        Farmacia farmacia2 = new Farmacia();
        farmacia2.setId(farmacia1.getId());
        assertThat(farmacia1).isEqualTo(farmacia2);
        farmacia2.setId(2L);
        assertThat(farmacia1).isNotEqualTo(farmacia2);
        farmacia1.setId(null);
        assertThat(farmacia1).isNotEqualTo(farmacia2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FarmaciaDTO.class);
        FarmaciaDTO farmaciaDTO1 = new FarmaciaDTO();
        farmaciaDTO1.setId(1L);
        FarmaciaDTO farmaciaDTO2 = new FarmaciaDTO();
        assertThat(farmaciaDTO1).isNotEqualTo(farmaciaDTO2);
        farmaciaDTO2.setId(farmaciaDTO1.getId());
        assertThat(farmaciaDTO1).isEqualTo(farmaciaDTO2);
        farmaciaDTO2.setId(2L);
        assertThat(farmaciaDTO1).isNotEqualTo(farmaciaDTO2);
        farmaciaDTO1.setId(null);
        assertThat(farmaciaDTO1).isNotEqualTo(farmaciaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(farmaciaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(farmaciaMapper.fromId(null)).isNull();
    }
}
