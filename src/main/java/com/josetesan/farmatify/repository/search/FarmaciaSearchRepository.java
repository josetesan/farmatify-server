package com.josetesan.farmatify.repository.search;

import com.josetesan.farmatify.domain.Farmacia;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Farmacia entity.
 */
public interface FarmaciaSearchRepository extends ElasticsearchRepository<Farmacia, Long> {
}
