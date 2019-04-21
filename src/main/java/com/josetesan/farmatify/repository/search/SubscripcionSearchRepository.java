package com.josetesan.farmatify.repository.search;

import com.josetesan.farmatify.domain.Subscripcion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Subscripcion entity.
 */
public interface SubscripcionSearchRepository extends ElasticsearchRepository<Subscripcion, Long> {
}
