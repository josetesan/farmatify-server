package com.josetesan.farmatify.web.rest;

import com.josetesan.farmatify.FarmatifyApp;

import com.josetesan.farmatify.domain.Posologia;
import com.josetesan.farmatify.repository.PosologiaRepository;
import com.josetesan.farmatify.repository.search.PosologiaSearchRepository;
import com.josetesan.farmatify.service.PosologiaService;
import com.josetesan.farmatify.service.dto.PosologiaDTO;
import com.josetesan.farmatify.service.mapper.PosologiaMapper;
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
 * Test class for the PosologiaResource REST controller.
 *
 * @see PosologiaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FarmatifyApp.class)
public class PosologiaResourceIntTest {

    private static final Integer DEFAULT_DIAS = 1;
    private static final Integer UPDATED_DIAS = 2;

    private static final Integer DEFAULT_HORAS = 1;
    private static final Integer UPDATED_HORAS = 2;

    @Autowired
    private PosologiaRepository posologiaRepository;

    @Autowired
    private PosologiaMapper posologiaMapper;

    @Autowired
    private PosologiaService posologiaService;

    /**
     * This repository is mocked in the com.josetesan.farmatify.repository.search test package.
     *
     * @see com.josetesan.farmatify.repository.search.PosologiaSearchRepositoryMockConfiguration
     */
    @Autowired
    private PosologiaSearchRepository mockPosologiaSearchRepository;

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

    private MockMvc restPosologiaMockMvc;

    private Posologia posologia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PosologiaResource posologiaResource = new PosologiaResource(posologiaService);
        this.restPosologiaMockMvc = MockMvcBuilders.standaloneSetup(posologiaResource)
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
    public static Posologia createEntity(EntityManager em) {
        Posologia posologia = new Posologia()
            .dias(DEFAULT_DIAS)
            .horas(DEFAULT_HORAS);
        return posologia;
    }

    @Before
    public void initTest() {
        posologia = createEntity(em);
    }

    @Test
    @Transactional
    public void createPosologia() throws Exception {
        int databaseSizeBeforeCreate = posologiaRepository.findAll().size();

        // Create the Posologia
        PosologiaDTO posologiaDTO = posologiaMapper.toDto(posologia);
        restPosologiaMockMvc.perform(post("/api/posologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(posologiaDTO)))
            .andExpect(status().isCreated());

        // Validate the Posologia in the database
        List<Posologia> posologiaList = posologiaRepository.findAll();
        assertThat(posologiaList).hasSize(databaseSizeBeforeCreate + 1);
        Posologia testPosologia = posologiaList.get(posologiaList.size() - 1);
        assertThat(testPosologia.getDias()).isEqualTo(DEFAULT_DIAS);
        assertThat(testPosologia.getHoras()).isEqualTo(DEFAULT_HORAS);

        // Validate the Posologia in Elasticsearch
        verify(mockPosologiaSearchRepository, times(1)).save(testPosologia);
    }

    @Test
    @Transactional
    public void createPosologiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = posologiaRepository.findAll().size();

        // Create the Posologia with an existing ID
        posologia.setId(1L);
        PosologiaDTO posologiaDTO = posologiaMapper.toDto(posologia);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPosologiaMockMvc.perform(post("/api/posologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(posologiaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Posologia in the database
        List<Posologia> posologiaList = posologiaRepository.findAll();
        assertThat(posologiaList).hasSize(databaseSizeBeforeCreate);

        // Validate the Posologia in Elasticsearch
        verify(mockPosologiaSearchRepository, times(0)).save(posologia);
    }

    @Test
    @Transactional
    public void getAllPosologias() throws Exception {
        // Initialize the database
        posologiaRepository.saveAndFlush(posologia);

        // Get all the posologiaList
        restPosologiaMockMvc.perform(get("/api/posologias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(posologia.getId().intValue())))
            .andExpect(jsonPath("$.[*].dias").value(hasItem(DEFAULT_DIAS)))
            .andExpect(jsonPath("$.[*].horas").value(hasItem(DEFAULT_HORAS)));
    }
    
    @Test
    @Transactional
    public void getPosologia() throws Exception {
        // Initialize the database
        posologiaRepository.saveAndFlush(posologia);

        // Get the posologia
        restPosologiaMockMvc.perform(get("/api/posologias/{id}", posologia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(posologia.getId().intValue()))
            .andExpect(jsonPath("$.dias").value(DEFAULT_DIAS))
            .andExpect(jsonPath("$.horas").value(DEFAULT_HORAS));
    }

    @Test
    @Transactional
    public void getNonExistingPosologia() throws Exception {
        // Get the posologia
        restPosologiaMockMvc.perform(get("/api/posologias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePosologia() throws Exception {
        // Initialize the database
        posologiaRepository.saveAndFlush(posologia);

        int databaseSizeBeforeUpdate = posologiaRepository.findAll().size();

        // Update the posologia
        Posologia updatedPosologia = posologiaRepository.findById(posologia.getId()).get();
        // Disconnect from session so that the updates on updatedPosologia are not directly saved in db
        em.detach(updatedPosologia);
        updatedPosologia
            .dias(UPDATED_DIAS)
            .horas(UPDATED_HORAS);
        PosologiaDTO posologiaDTO = posologiaMapper.toDto(updatedPosologia);

        restPosologiaMockMvc.perform(put("/api/posologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(posologiaDTO)))
            .andExpect(status().isOk());

        // Validate the Posologia in the database
        List<Posologia> posologiaList = posologiaRepository.findAll();
        assertThat(posologiaList).hasSize(databaseSizeBeforeUpdate);
        Posologia testPosologia = posologiaList.get(posologiaList.size() - 1);
        assertThat(testPosologia.getDias()).isEqualTo(UPDATED_DIAS);
        assertThat(testPosologia.getHoras()).isEqualTo(UPDATED_HORAS);

        // Validate the Posologia in Elasticsearch
        verify(mockPosologiaSearchRepository, times(1)).save(testPosologia);
    }

    @Test
    @Transactional
    public void updateNonExistingPosologia() throws Exception {
        int databaseSizeBeforeUpdate = posologiaRepository.findAll().size();

        // Create the Posologia
        PosologiaDTO posologiaDTO = posologiaMapper.toDto(posologia);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPosologiaMockMvc.perform(put("/api/posologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(posologiaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Posologia in the database
        List<Posologia> posologiaList = posologiaRepository.findAll();
        assertThat(posologiaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Posologia in Elasticsearch
        verify(mockPosologiaSearchRepository, times(0)).save(posologia);
    }

    @Test
    @Transactional
    public void deletePosologia() throws Exception {
        // Initialize the database
        posologiaRepository.saveAndFlush(posologia);

        int databaseSizeBeforeDelete = posologiaRepository.findAll().size();

        // Delete the posologia
        restPosologiaMockMvc.perform(delete("/api/posologias/{id}", posologia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Posologia> posologiaList = posologiaRepository.findAll();
        assertThat(posologiaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Posologia in Elasticsearch
        verify(mockPosologiaSearchRepository, times(1)).deleteById(posologia.getId());
    }

    @Test
    @Transactional
    public void searchPosologia() throws Exception {
        // Initialize the database
        posologiaRepository.saveAndFlush(posologia);
        when(mockPosologiaSearchRepository.search(queryStringQuery("id:" + posologia.getId())))
            .thenReturn(Collections.singletonList(posologia));
        // Search the posologia
        restPosologiaMockMvc.perform(get("/api/_search/posologias?query=id:" + posologia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(posologia.getId().intValue())))
            .andExpect(jsonPath("$.[*].dias").value(hasItem(DEFAULT_DIAS)))
            .andExpect(jsonPath("$.[*].horas").value(hasItem(DEFAULT_HORAS)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Posologia.class);
        Posologia posologia1 = new Posologia();
        posologia1.setId(1L);
        Posologia posologia2 = new Posologia();
        posologia2.setId(posologia1.getId());
        assertThat(posologia1).isEqualTo(posologia2);
        posologia2.setId(2L);
        assertThat(posologia1).isNotEqualTo(posologia2);
        posologia1.setId(null);
        assertThat(posologia1).isNotEqualTo(posologia2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PosologiaDTO.class);
        PosologiaDTO posologiaDTO1 = new PosologiaDTO();
        posologiaDTO1.setId(1L);
        PosologiaDTO posologiaDTO2 = new PosologiaDTO();
        assertThat(posologiaDTO1).isNotEqualTo(posologiaDTO2);
        posologiaDTO2.setId(posologiaDTO1.getId());
        assertThat(posologiaDTO1).isEqualTo(posologiaDTO2);
        posologiaDTO2.setId(2L);
        assertThat(posologiaDTO1).isNotEqualTo(posologiaDTO2);
        posologiaDTO1.setId(null);
        assertThat(posologiaDTO1).isNotEqualTo(posologiaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(posologiaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(posologiaMapper.fromId(null)).isNull();
    }
}
