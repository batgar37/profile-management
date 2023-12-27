package com.bgarrido.profilemanagement.repository;

import com.bgarrido.profilemanagement.entity.TypeUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TypeUserRepository extends JpaRepository<TypeUser,Integer> {
    List<TypeUser> findByType(String type);
}
