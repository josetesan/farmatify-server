package com.josetesan.farmatify.web.rest;

import com.josetesan.farmatify.FarmatifyApp;

import com.josetesan.farmatify.domain.Medicamento;
import com.josetesan.farmatify.repository.MedicamentoRepository;
import com.josetesan.farmatify.repository.search.MedicamentoSearchRepository;
import com.josetesan.farmatify.service.MedicamentoService;
import com.josetesan.farmatify.service.dto.MedicamentoDTO;
import com.josetesan.farmatify.service.mapper.MedicamentoMapper;
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
 * Test class for the MedicamentoResource REST controller.
 *
 * @see MedicamentoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FarmatifyApp.class)
public class MedicamentoResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Integer DEFAULT_STOCK = 1;
    private static final Integer UPDATED_STOCK = 2;

    private static final Double DEFAULT_PVP = 1D;
    private static final Double UPDATED_PVP = 2D;

    private static final Integer DEFAULT_UNIDADES = 1;
    private static final Integer UPDATED_UNIDADES = 2;

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Autowired
    private MedicamentoMapper medicamentoMapper;

    @Autowired
    private MedicamentoService medicamentoService;

    /**
     * This repository is mocked in the com.josetesan.farmatify.repository.search test package.
     *
     * @see com.josetesan.farmatify.repository.search.MedicamentoSearchRepositoryMockConfiguration
     */
    @Autowired
    private MedicamentoSearchRepository mockMedicamentoSearchRepository;

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

    private MockMvc restMedicamentoMockMvc;

    private Medicamento medicamento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedicamentoResource medicamentoResource = new MedicamentoResource(medicamentoService);
        this.restMedicamentoMockMvc = MockMvcBuilders.standaloneSetup(medicamentoResource)
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
    public static Medicamento createEntity(EntityManager em) {
        Medicamento medicamento = new Medicamento()
            .nombre(DEFAULT_NOMBRE)
            .stock(DEFAULT_STOCK)
            .pvp(DEFAULT_PVP)
            .unidades(DEFAULT_UNIDADES);
        return medicamento;
    }

    @Before
    public void initTest() {
        medicamento = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedicamento() throws Exception {
        int databaseSizeBeforeCreate = medicamentoRepository.findAll().size();

        // Create the Medicamento
        MedicamentoDTO medicamentoDTO = medicamentoMapper.toDto(medicamento);
        restMedicamentoMockMvc.perform(post("/api/medicamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicamentoDTO)))
            .andExpect(status().isCreated());

        // Validate the Medicamento in the database
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeCreate + 1);
        Medicamento testMedicamento = medicamentoList.get(medicamentoList.size() - 1);
        assertThat(testMedicamento.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testMedicamento.getStock()).isEqualTo(DEFAULT_STOCK);
        assertThat(testMedicamento.getPvp()).isEqualTo(DEFAULT_PVP);
        assertThat(testMedicamento.getUnidades()).isEqualTo(DEFAULT_UNIDADES);

        // Validate the Medicamento in Elasticsearch
        verify(mockMedicamentoSearchRepository, times(1)).save(testMedicamento);
    }

    @Test
    @Transactional
    public void createMedicamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medicamentoRepository.findAll().size();

        // Create the Medicamento with an existing ID
        medicamento.setId(1L);
        MedicamentoDTO medicamentoDTO = medicamentoMapper.toDto(medicamento);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedicamentoMockMvc.perform(post("/api/medicamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicamentoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Medicamento in the database
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeCreate);

        // Validate the Medicamento in Elasticsearch
        verify(mockMedicamentoSearchRepository, times(0)).save(medicamento);
    }

    @Test
    @Transactional
    public void getAllMedicamentos() throws Exception {
        // Initialize the database
        medicamentoRepository.saveAndFlush(medicamento);

        // Get all the medicamentoList
        restMedicamentoMockMvc.perform(get("/api/medicamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medicamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].stock").value(hasItem(DEFAULT_STOCK)))
            .andExpect(jsonPath("$.[*].pvp").value(hasItem(DEFAULT_PVP.doubleValue())))
            .andExpect(jsonPath("$.[*].unidades").value(hasItem(DEFAULT_UNIDADES)));
    }
    
    @Test
    @Transactional
    public void getMedicamento() throws Exception {
        // Initialize the database
        medicamentoRepository.saveAndFlush(medicamento);

        // Get the medicamento
        restMedicamentoMockMvc.perform(get("/api/medicamentos/{id}", medicamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medicamento.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.stock").value(DEFAULT_STOCK))
            .andExpect(jsonPath("$.pvp").value(DEFAULT_PVP.doubleValue()))
            .andExpect(jsonPath("$.unidades").value(DEFAULT_UNIDADES));
    }

    @Test
    @Transactional
    public void getNonExistingMedicamento() throws Exception {
        // Get the medicamento
        restMedicamentoMockMvc.perform(get("/api/medicamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedicamento() throws Exception {
        // Initialize the database
        medicamentoRepository.saveAndFlush(medicamento);

        int databaseSizeBeforeUpdate = medicamentoRepository.findAll().size();

        // Update the medicamento
        Medicamento updatedMedicamento = medicamentoRepository.findById(medicamento.getId()).get();
        // Disconnect from session so that the updates on updatedMedicamento are not directly saved in db
        em.detach(updatedMedicamento);
        updatedMedicamento
            .nombre(UPDATED_NOMBRE)
            .stock(UPDATED_STOCK)
            .pvp(UPDATED_PVP)
            .unidades(UPDATED_UNIDADES);
        MedicamentoDTO medicamentoDTO = medicamentoMapper.toDto(updatedMedicamento);

        restMedicamentoMockMvc.perform(put("/api/medicamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicamentoDTO)))
            .andExpect(status().isOk());

        // Validate the Medicamento in the database
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeUpdate);
        Medicamento testMedicamento = medicamentoList.get(medicamentoList.size() - 1);
        assertThat(testMedicamento.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testMedicamento.getStock()).isEqualTo(UPDATED_STOCK);
        assertThat(testMedicamento.getPvp()).isEqualTo(UPDATED_PVP);
        assertThat(testMedicamento.getUnidades()).isEqualTo(UPDATED_UNIDADES);

        // Validate the Medicamento in Elasticsearch
        verify(mockMedicamentoSearchRepository, times(1)).save(testMedicamento);
    }

    @Test
    @Transactional
    public void updateNonExistingMedicamento() throws Exception {
        int databaseSizeBeforeUpdate = medicamentoRepository.findAll().size();

        // Create the Medicamento
        MedicamentoDTO medicamentoDTO = medicamentoMapper.toDto(medicamento);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedicamentoMockMvc.perform(put("/api/medicamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medicamentoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Medicamento in the database
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Medicamento in Elasticsearch
        verify(mockMedicamentoSearchRepository, times(0)).save(medicamento);
    }

    @Test
    @Transactional
    public void deleteMedicamento() throws Exception {
        // Initialize the database
        medicamentoRepository.saveAndFlush(medicamento);

        int databaseSizeBeforeDelete = medicamentoRepository.findAll().size();

        // Delete the medicamento
        restMedicamentoMockMvc.perform(delete("/api/medicamentos/{id}", medicamento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Medicamento in Elasticsearch
        verify(mockMedicamentoSearchRepository, times(1)).deleteById(medicamento.getId());
    }

    @Test
    @Transactional
    public void searchMedicamento() throws Exception {
        // Initialize the database
        medicamentoRepository.saveAndFlush(medicamento);
        when(mockMedicamentoSearchRepository.search(queryStringQuery("id:" + medicamento.getId())))
            .thenReturn(Collections.singletonList(medicamento));
        // Search the medicamento
        restMedicamentoMockMvc.perform(get("/api/_search/medicamentos?query=id:" + medicamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medicamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].stock").value(hasItem(DEFAULT_STOCK)))
            .andExpect(jsonPath("$.[*].pvp").value(hasItem(DEFAULT_PVP.doubleValue())))
            .andExpect(jsonPath("$.[*].unidades").value(hasItem(DEFAULT_UNIDADES)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Medicamento.class);
        Medicamento medicamento1 = new Medicamento();
        medicamento1.setId(1L);
        Medicamento medicamento2 = new Medicamento();
        medicamento2.setId(medicamento1.getId());
        assertThat(medicamento1).isEqualTo(medicamento2);
        medicamento2.setId(2L);
        assertThat(medicamento1).isNotEqualTo(medicamento2);
        medicamento1.setId(null);
        assertThat(medicamento1).isNotEqualTo(medicamento2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedicamentoDTO.class);
        MedicamentoDTO medicamentoDTO1 = new MedicamentoDTO();
        medicamentoDTO1.setId(1L);
        MedicamentoDTO medicamentoDTO2 = new MedicamentoDTO();
        assertThat(medicamentoDTO1).isNotEqualTo(medicamentoDTO2);
        medicamentoDTO2.setId(medicamentoDTO1.getId());
        assertThat(medicamentoDTO1).isEqualTo(medicamentoDTO2);
        medicamentoDTO2.setId(2L);
        assertThat(medicamentoDTO1).isNotEqualTo(medicamentoDTO2);
        medicamentoDTO1.setId(null);
        assertThat(medicamentoDTO1).isNotEqualTo(medicamentoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(medicamentoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(medicamentoMapper.fromId(null)).isNull();
    }
}
