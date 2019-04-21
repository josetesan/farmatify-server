package com.josetesan.farmatify.web.rest;

import com.josetesan.farmatify.FarmatifyApp;

import com.josetesan.farmatify.domain.Usuario;
import com.josetesan.farmatify.repository.UsuarioRepository;
import com.josetesan.farmatify.repository.search.UsuarioSearchRepository;
import com.josetesan.farmatify.service.UsuarioService;
import com.josetesan.farmatify.service.dto.UsuarioDTO;
import com.josetesan.farmatify.service.mapper.UsuarioMapper;
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
 * Test class for the UsuarioResource REST controller.
 *
 * @see UsuarioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FarmatifyApp.class)
public class UsuarioResourceIntTest {

    private static final String DEFAULT_USUARIO = "AAAAAAAAAA";
    private static final String UPDATED_USUARIO = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioMapper usuarioMapper;

    @Autowired
    private UsuarioService usuarioService;

    /**
     * This repository is mocked in the com.josetesan.farmatify.repository.search test package.
     *
     * @see com.josetesan.farmatify.repository.search.UsuarioSearchRepositoryMockConfiguration
     */
    @Autowired
    private UsuarioSearchRepository mockUsuarioSearchRepository;

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

    private MockMvc restUsuarioMockMvc;

    private Usuario usuario;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UsuarioResource usuarioResource = new UsuarioResource(usuarioService);
        this.restUsuarioMockMvc = MockMvcBuilders.standaloneSetup(usuarioResource)
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
    public static Usuario createEntity(EntityManager em) {
        Usuario usuario = new Usuario()
            .usuario(DEFAULT_USUARIO)
            .password(DEFAULT_PASSWORD)
            .nombre(DEFAULT_NOMBRE);
        return usuario;
    }

    @Before
    public void initTest() {
        usuario = createEntity(em);
    }

    @Test
    @Transactional
    public void createUsuario() throws Exception {
        int databaseSizeBeforeCreate = usuarioRepository.findAll().size();

        // Create the Usuario
        UsuarioDTO usuarioDTO = usuarioMapper.toDto(usuario);
        restUsuarioMockMvc.perform(post("/api/usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuarioDTO)))
            .andExpect(status().isCreated());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeCreate + 1);
        Usuario testUsuario = usuarioList.get(usuarioList.size() - 1);
        assertThat(testUsuario.getUsuario()).isEqualTo(DEFAULT_USUARIO);
        assertThat(testUsuario.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testUsuario.getNombre()).isEqualTo(DEFAULT_NOMBRE);

        // Validate the Usuario in Elasticsearch
        verify(mockUsuarioSearchRepository, times(1)).save(testUsuario);
    }

    @Test
    @Transactional
    public void createUsuarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = usuarioRepository.findAll().size();

        // Create the Usuario with an existing ID
        usuario.setId(1L);
        UsuarioDTO usuarioDTO = usuarioMapper.toDto(usuario);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsuarioMockMvc.perform(post("/api/usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuarioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeCreate);

        // Validate the Usuario in Elasticsearch
        verify(mockUsuarioSearchRepository, times(0)).save(usuario);
    }

    @Test
    @Transactional
    public void getAllUsuarios() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList
        restUsuarioMockMvc.perform(get("/api/usuarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuario.getId().intValue())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }
    
    @Test
    @Transactional
    public void getUsuario() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get the usuario
        restUsuarioMockMvc.perform(get("/api/usuarios/{id}", usuario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(usuario.getId().intValue()))
            .andExpect(jsonPath("$.usuario").value(DEFAULT_USUARIO.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUsuario() throws Exception {
        // Get the usuario
        restUsuarioMockMvc.perform(get("/api/usuarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUsuario() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();

        // Update the usuario
        Usuario updatedUsuario = usuarioRepository.findById(usuario.getId()).get();
        // Disconnect from session so that the updates on updatedUsuario are not directly saved in db
        em.detach(updatedUsuario);
        updatedUsuario
            .usuario(UPDATED_USUARIO)
            .password(UPDATED_PASSWORD)
            .nombre(UPDATED_NOMBRE);
        UsuarioDTO usuarioDTO = usuarioMapper.toDto(updatedUsuario);

        restUsuarioMockMvc.perform(put("/api/usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuarioDTO)))
            .andExpect(status().isOk());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);
        Usuario testUsuario = usuarioList.get(usuarioList.size() - 1);
        assertThat(testUsuario.getUsuario()).isEqualTo(UPDATED_USUARIO);
        assertThat(testUsuario.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testUsuario.getNombre()).isEqualTo(UPDATED_NOMBRE);

        // Validate the Usuario in Elasticsearch
        verify(mockUsuarioSearchRepository, times(1)).save(testUsuario);
    }

    @Test
    @Transactional
    public void updateNonExistingUsuario() throws Exception {
        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();

        // Create the Usuario
        UsuarioDTO usuarioDTO = usuarioMapper.toDto(usuario);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuarioMockMvc.perform(put("/api/usuarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuarioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Usuario in Elasticsearch
        verify(mockUsuarioSearchRepository, times(0)).save(usuario);
    }

    @Test
    @Transactional
    public void deleteUsuario() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        int databaseSizeBeforeDelete = usuarioRepository.findAll().size();

        // Delete the usuario
        restUsuarioMockMvc.perform(delete("/api/usuarios/{id}", usuario.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Usuario in Elasticsearch
        verify(mockUsuarioSearchRepository, times(1)).deleteById(usuario.getId());
    }

    @Test
    @Transactional
    public void searchUsuario() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);
        when(mockUsuarioSearchRepository.search(queryStringQuery("id:" + usuario.getId())))
            .thenReturn(Collections.singletonList(usuario));
        // Search the usuario
        restUsuarioMockMvc.perform(get("/api/_search/usuarios?query=id:" + usuario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuario.getId().intValue())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Usuario.class);
        Usuario usuario1 = new Usuario();
        usuario1.setId(1L);
        Usuario usuario2 = new Usuario();
        usuario2.setId(usuario1.getId());
        assertThat(usuario1).isEqualTo(usuario2);
        usuario2.setId(2L);
        assertThat(usuario1).isNotEqualTo(usuario2);
        usuario1.setId(null);
        assertThat(usuario1).isNotEqualTo(usuario2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UsuarioDTO.class);
        UsuarioDTO usuarioDTO1 = new UsuarioDTO();
        usuarioDTO1.setId(1L);
        UsuarioDTO usuarioDTO2 = new UsuarioDTO();
        assertThat(usuarioDTO1).isNotEqualTo(usuarioDTO2);
        usuarioDTO2.setId(usuarioDTO1.getId());
        assertThat(usuarioDTO1).isEqualTo(usuarioDTO2);
        usuarioDTO2.setId(2L);
        assertThat(usuarioDTO1).isNotEqualTo(usuarioDTO2);
        usuarioDTO1.setId(null);
        assertThat(usuarioDTO1).isNotEqualTo(usuarioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(usuarioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(usuarioMapper.fromId(null)).isNull();
    }
}
