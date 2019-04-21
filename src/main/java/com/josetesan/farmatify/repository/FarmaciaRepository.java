package com.josetesan.farmatify.repository;

import com.josetesan.farmatify.domain.Farmacia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Farmacia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FarmaciaRepository extends JpaRepository<Farmacia, Long> {

}
