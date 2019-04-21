package com.josetesan.farmatify.repository.search;

import com.josetesan.farmatify.domain.Posologia;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Posologia entity.
 */
public interface PosologiaSearchRepository extends ElasticsearchRepository<Posologia, Long> {
}
