package com.josetesan.farmatify.repository;

import com.josetesan.farmatify.domain.Subscripcion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Subscripcion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscripcionRepository extends JpaRepository<Subscripcion, Long> {

}
