package com.josetesan.farmatify.web.rest;

import com.josetesan.farmatify.FarmatifyApp;

import com.josetesan.farmatify.domain.Subscripcion;
import com.josetesan.farmatify.repository.SubscripcionRepository;
import com.josetesan.farmatify.repository.search.SubscripcionSearchRepository;
import com.josetesan.farmatify.service.SubscripcionService;
import com.josetesan.farmatify.service.dto.SubscripcionDTO;
import com.josetesan.farmatify.service.mapper.SubscripcionMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Test class for the SubscripcionResource REST controller.
 *
 * @see SubscripcionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FarmatifyApp.class)
public class SubscripcionResourceIntTest {

    private static final Instant DEFAULT_FECHA_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FECHA_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private SubscripcionRepository subscripcionRepository;

    @Autowired
    private SubscripcionMapper subscripcionMapper;

    @Autowired
    private SubscripcionService subscripcionService;

    /**
     * This repository is mocked in the com.josetesan.farmatify.repository.search test package.
     *
     * @see com.josetesan.farmatify.repository.search.SubscripcionSearchRepositoryMockConfiguration
     */
    @Autowired
    private SubscripcionSearchRepository mockSubscripcionSearchRepository;

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

    private MockMvc restSubscripcionMockMvc;

    private Subscripcion subscripcion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubscripcionResource subscripcionResource = new SubscripcionResource(subscripcionService);
        this.restSubscripcionMockMvc = MockMvcBuilders.standaloneSetup(subscripcionResource)
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
    public static Subscripcion createEntity(EntityManager em) {
        Subscripcion subscripcion = new Subscripcion()
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaFin(DEFAULT_FECHA_FIN);
        return subscripcion;
    }

    @Before
    public void initTest() {
        subscripcion = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubscripcion() throws Exception {
        int databaseSizeBeforeCreate = subscripcionRepository.findAll().size();

        // Create the Subscripcion
        SubscripcionDTO subscripcionDTO = subscripcionMapper.toDto(subscripcion);
        restSubscripcionMockMvc.perform(post("/api/subscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscripcionDTO)))
            .andExpect(status().isCreated());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeCreate + 1);
        Subscripcion testSubscripcion = subscripcionList.get(subscripcionList.size() - 1);
        assertThat(testSubscripcion.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testSubscripcion.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);

        // Validate the Subscripcion in Elasticsearch
        verify(mockSubscripcionSearchRepository, times(1)).save(testSubscripcion);
    }

    @Test
    @Transactional
    public void createSubscripcionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscripcionRepository.findAll().size();

        // Create the Subscripcion with an existing ID
        subscripcion.setId(1L);
        SubscripcionDTO subscripcionDTO = subscripcionMapper.toDto(subscripcion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscripcionMockMvc.perform(post("/api/subscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscripcionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeCreate);

        // Validate the Subscripcion in Elasticsearch
        verify(mockSubscripcionSearchRepository, times(0)).save(subscripcion);
    }

    @Test
    @Transactional
    public void getAllSubscripcions() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        // Get all the subscripcionList
        restSubscripcionMockMvc.perform(get("/api/subscripcions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscripcion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())));
    }
    
    @Test
    @Transactional
    public void getSubscripcion() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        // Get the subscripcion
        restSubscripcionMockMvc.perform(get("/api/subscripcions/{id}", subscripcion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subscripcion.getId().intValue()))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaFin").value(DEFAULT_FECHA_FIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSubscripcion() throws Exception {
        // Get the subscripcion
        restSubscripcionMockMvc.perform(get("/api/subscripcions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscripcion() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();

        // Update the subscripcion
        Subscripcion updatedSubscripcion = subscripcionRepository.findById(subscripcion.getId()).get();
        // Disconnect from session so that the updates on updatedSubscripcion are not directly saved in db
        em.detach(updatedSubscripcion);
        updatedSubscripcion
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN);
        SubscripcionDTO subscripcionDTO = subscripcionMapper.toDto(updatedSubscripcion);

        restSubscripcionMockMvc.perform(put("/api/subscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscripcionDTO)))
            .andExpect(status().isOk());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);
        Subscripcion testSubscripcion = subscripcionList.get(subscripcionList.size() - 1);
        assertThat(testSubscripcion.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testSubscripcion.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);

        // Validate the Subscripcion in Elasticsearch
        verify(mockSubscripcionSearchRepository, times(1)).save(testSubscripcion);
    }

    @Test
    @Transactional
    public void updateNonExistingSubscripcion() throws Exception {
        int databaseSizeBeforeUpdate = subscripcionRepository.findAll().size();

        // Create the Subscripcion
        SubscripcionDTO subscripcionDTO = subscripcionMapper.toDto(subscripcion);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscripcionMockMvc.perform(put("/api/subscripcions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscripcionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Subscripcion in the database
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Subscripcion in Elasticsearch
        verify(mockSubscripcionSearchRepository, times(0)).save(subscripcion);
    }

    @Test
    @Transactional
    public void deleteSubscripcion() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);

        int databaseSizeBeforeDelete = subscripcionRepository.findAll().size();

        // Delete the subscripcion
        restSubscripcionMockMvc.perform(delete("/api/subscripcions/{id}", subscripcion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Subscripcion> subscripcionList = subscripcionRepository.findAll();
        assertThat(subscripcionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Subscripcion in Elasticsearch
        verify(mockSubscripcionSearchRepository, times(1)).deleteById(subscripcion.getId());
    }

    @Test
    @Transactional
    public void searchSubscripcion() throws Exception {
        // Initialize the database
        subscripcionRepository.saveAndFlush(subscripcion);
        when(mockSubscripcionSearchRepository.search(queryStringQuery("id:" + subscripcion.getId())))
            .thenReturn(Collections.singletonList(subscripcion));
        // Search the subscripcion
        restSubscripcionMockMvc.perform(get("/api/_search/subscripcions?query=id:" + subscripcion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscripcion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Subscripcion.class);
        Subscripcion subscripcion1 = new Subscripcion();
        subscripcion1.setId(1L);
        Subscripcion subscripcion2 = new Subscripcion();
        subscripcion2.setId(subscripcion1.getId());
        assertThat(subscripcion1).isEqualTo(subscripcion2);
        subscripcion2.setId(2L);
        assertThat(subscripcion1).isNotEqualTo(subscripcion2);
        subscripcion1.setId(null);
        assertThat(subscripcion1).isNotEqualTo(subscripcion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscripcionDTO.class);
        SubscripcionDTO subscripcionDTO1 = new SubscripcionDTO();
        subscripcionDTO1.setId(1L);
        SubscripcionDTO subscripcionDTO2 = new SubscripcionDTO();
        assertThat(subscripcionDTO1).isNotEqualTo(subscripcionDTO2);
        subscripcionDTO2.setId(subscripcionDTO1.getId());
        assertThat(subscripcionDTO1).isEqualTo(subscripcionDTO2);
        subscripcionDTO2.setId(2L);
        assertThat(subscripcionDTO1).isNotEqualTo(subscripcionDTO2);
        subscripcionDTO1.setId(null);
        assertThat(subscripcionDTO1).isNotEqualTo(subscripcionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subscripcionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subscripcionMapper.fromId(null)).isNull();
    }
}
