package com.josetesan.farmatify.repository.search;

import com.josetesan.farmatify.domain.Medicamento;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Medicamento entity.
 */
public interface MedicamentoSearchRepository extends ElasticsearchRepository<Medicamento, Long> {
}
