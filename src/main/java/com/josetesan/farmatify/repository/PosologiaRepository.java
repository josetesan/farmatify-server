package com.josetesan.farmatify.repository;

import com.josetesan.farmatify.domain.Posologia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Posologia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PosologiaRepository extends JpaRepository<Posologia, Long> {

}
